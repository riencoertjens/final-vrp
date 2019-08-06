import React from "react"
import { graphql } from "gatsby"
import Layout from "../../Layout"
import BreadCrumbs from "../../BreadCrumbs"
import { AspectRatioImage } from "../../webhart-components"
import WpBlocksContent from "../../WpBlocksContent"
import SEO from "../../webhart-components/SEO"

const NieuwsPageTemplate = ({
  data: {
    page: { title, content, featured_img, excerpt },
  },
  pageContext: { slug },
}) => (
  <Layout>
    <SEO
      title={title}
      pathname={`nieuws/${slug}/`}
      description={excerpt}
      image={featured_img && featured_img.SEOImage.childImageSharp.SEO.src}
    />
    {featured_img && (
      <AspectRatioImage ratio={1200 / 630} image={featured_img} />
    )}
    <BreadCrumbs
      crumbs={[
        {
          label: "Nieuws",
          link: "nieuws",
        },
        {
          label: title,
        },
      ]}
    />
    <section>
      <h1>{title}</h1>
      <WpBlocksContent content={content} />
    </section>
  </Layout>
)

export default NieuwsPageTemplate

export const query = graphql`
  query($slug: String!) {
    page: collectionsJson(post_type: { eq: "post" }, post_name: { eq: $slug }) {
      title: post_title
      content: post_content
      excerpt: post_excerpt
      featured_img {
        ...HeroImageFragment
        SEOImage: file {
          ...SEOImageFragment
        }
      }
      # acf {
      #   prijs
      #   naam_laureaat
      #   website_laureaat
      #   social_laureaat
      #   meer_info
      # }
    }
  }
`

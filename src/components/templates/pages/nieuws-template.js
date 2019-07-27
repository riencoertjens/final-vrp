import React from "react"
import { graphql } from "gatsby"
import Layout from "../../Layout"
import BreadCrumbs from "../../BreadCrumbs"
import { AspectRatioImage, OutboundLink } from "../../webhart-components"
import WpBlocksContent from "../../WpBlocksContent"

const prijsLabels = {
  "vrp-planningsprijs": "VRP Planningsprijs",
  "vrp-afstudeerprijs": "VRP Afstudeerprijs",
  openruimtebeker: "Openruimtebeker",
}

const NieuwsPageTemplate = ({
  data: {
    page: { title, content, featured_img, acf },
  },
}) => (
  <Layout>
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

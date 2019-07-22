import React from "react"
import { graphql } from "gatsby"
import Layout from "../../Layout"

import { AspectRatioImage } from "../../webhart-components"
import WpBlocksContent from "../../WpBlocksContent"

const WpPageTemplate = ({
  data: {
    page: { title, content, featured_img },
  },
  pageContext: { slug },
}) => (
  <Layout>
    {featured_img && (
      <AspectRatioImage ratio={1200 / 630} image={featured_img} />
    )}
    <section>
      <h1>{title}</h1>
      <WpBlocksContent content={content} />
    </section>
  </Layout>
)

export default WpPageTemplate

export const query = graphql`
  query($slug: String!) {
    page: collectionsJson(post_type: { eq: "page" }, post_name: { eq: $slug }) {
      title: post_title
      content: post_content
      featured_img {
        ...HeroImageFragment
        SEOImage: file {
          ...SEOImageFragment
        }
      }
    }
  }
`

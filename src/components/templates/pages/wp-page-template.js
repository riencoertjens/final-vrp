import React from "react"
import { graphql } from "gatsby"
import Layout from "../../Layout"

import { AspectRatioImage } from "../../webhart-components"
import { getCropFocus } from "../../webhart-components/style-functions"
import WpBlocksContent from "../../WpBlocksContent"

const WpPageTemplate = ({ data: { page }, pageContext: { slug } }) => (
  <Layout>
    {page.featured_img && (
      <AspectRatioImage
        ratio={1200 / 630}
        image={page.featured_img}
        cropfocus={getCropFocus(page.featured_img.smartcrop_image_focus)}
      />
    )}
    <section>
      <h1>{page.title}</h1>
      <WpBlocksContent content={page.content} />
    </section>
  </Layout>
)

export default WpPageTemplate

export const query = graphql`
  query($slug: String!) {
    page: collectionsJson(post_type: { eq: "page" }, post_name: { eq: $slug }) {
      title: post_title
      content: post_content
      # featured_img {
      #   ...HeroImageFragment
      #   SEOImage: file {
      #     ...SEOImageFragment
      #   }
      # }
    }
  }
`

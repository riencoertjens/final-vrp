import React from "react"
import { graphql } from "gatsby"
import Layout from "../../Layout"
import css from "@emotion/css"
import { AspectRatioImage, AspectRatioBox } from "../../webhart-components"
import "../../../css/wp-blocks-revised.css"
import { getCropFocus } from "../../webhart-components/style-functions"

const WpPageTemplate = ({ data: { page }, pageContext }) => (
  <Layout>
    {page.featured_media ? (
      <AspectRatioImage
        ratio={1200 / 630}
        image={page.featured_media}
        cropfocus={getCropFocus(page.featured_media.smartcrop_image_focus)}
      />
    ) : (
      <AspectRatioBox
        ratio={1200 / 630}
        css={css`
          background: grey;
        `}
      />
    )}
    <section>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </section>
  </Layout>
)

export default WpPageTemplate

export const query = graphql`
  query($slug: String!) {
    page: wordpressPage(slug: { eq: $slug }) {
      title
      content
      featured_media {
        ...HeroImageFragment
        SEOImage: localFile {
          ...SEOImageFragment
        }
      }
    }
  }
`

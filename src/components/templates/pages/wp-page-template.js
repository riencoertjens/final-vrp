import React from "react"
import { graphql } from "gatsby"
import Layout from "../../Layout"
import css from "@emotion/css"
import { AspectRatioImage } from "../../webhart-components"
import "../../../css/wp-blocks-revised.css"
import { getCropFocus } from "../../webhart-components/style-functions"

const WpPageTemplate = ({ data: { page }, pageContext: { slug } }) => (
  <Layout>
    {page.featured_media && (
      <AspectRatioImage
        ratio={1200 / 630}
        image={page.featured_media}
        cropfocus={getCropFocus(page.featured_media.smartcrop_image_focus)}
      />
    )}
    <section>
      <h1>{page.title}</h1>
      <div
        css={
          (slug === "sponsors" || slug === "partners") &&
          css`
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            align-items: center;
            p {
              flex: 0 0 100%;
            }
            a.logo_block {
              filter: grayscale(1) opacity(0.75);
              transition: 0.2s;
              :hover {
                filter: unset;
              }
              margin: 1rem;
              display: block;
              max-width: 195px;
              overflow: hidden;
              .gatsby-image-wrapper {
                max-width: 100%;
              }
              flex: 0 1 195px;
              span {
                display: none;
              }
            }
          `
        }
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
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

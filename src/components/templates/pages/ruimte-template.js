import React from "react"
import { graphql } from "gatsby"
import Layout from "../../Layout"
import SEO from "../../webhart-components/SEO"
import { AspectRatioImage, AspectRatioBox } from "../../webhart-components"
import css from "@emotion/css"
import { getCropFocus } from "../../webhart-components/style-functions"
// import SEO from "../../webhart-components/SEO"
// import css from "@emotion/css"
// import { colors } from "../../../site/styles"
// import { AspectRatioImage, AspectRatioBox } from "../../webhart-components"

const RuimtePageTemplate = ({
  data: {
    ruimte: {
      acf: { nummer, datum_publicatie },
      featured_media,
      content_raw,
      content,
    },
  },
  pageContext: { slug },
}) => {
  return (
    <Layout>
      <SEO
        pathname={`ruimte/${slug}`}
        title={`Ruimte ${nummer}`}
        description={content_raw}
        image={
          featured_media && featured_media.SEOImage.childImageSharp.SEO.src
        }
      />
      {featured_media ? (
        <AspectRatioImage
          ratio={1200 / 630}
          image={featured_media}
          cropfocus={getCropFocus(featured_media.smartcrop_image_focus)}
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
        <h1>Ruimte {nummer}</h1>
        <span>{datum_publicatie}</span>
        {/* {prijs.description && (
          <p
            css={css`
              color: ${colors.orange};
              font-weight: 500;
              font-size: 1.25rem;
            `}
          >
            {thema.description}
          </p>
        )} */}
        {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
      </section>
    </Layout>
  )
}

export default RuimtePageTemplate

export const query = graphql`
  query($slug: String!) {
    ruimte: wordpressWpRuimte(slug: { eq: $slug }) {
      slug
      wordpress_id
      content_raw
      content
      acf {
        nummer
        datum_publicatie
      }
      featured_media {
        ...HeroImageFragment
        SEOImage: localFile {
          ...SEOImageFragment
        }
      }
    }
    artikels: allWordpressWpRuimteArtikel(
      filter: { acf: { ruimte: { post_name: { eq: "ruimte-39" } } } }
    ) {
      edges {
        node {
          title
          acf {
            beschrijving
            featured_media {
              localFile {
                url
              }
            }
          }
        }
      }
    }
  }
`

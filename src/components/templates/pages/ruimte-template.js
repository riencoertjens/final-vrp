import React from "react"
import { graphql } from "gatsby"
import Layout from "../../Layout"
import SEO from "../../webhart-components/SEO"
import { AspectRatioImage, AspectRatioBox } from "../../webhart-components"
import css from "@emotion/css"
import { getCropFocus, MqMin } from "../../webhart-components/style-functions"
import GatsbyLink from "gatsby-link"
import GatsbyImage from "gatsby-image"
import { maanden } from "../../../site/functions"
import { Button, colors } from "../../../site/styles"
import BreadCrumbs from "../../BreadCrumbs"

const RuimtePageTemplate = ({
  data: {
    ruimte: {
      acf: { nummer, date_year, date_month },
      f_media,
      f_media: {
        cover: {
          childImageSharp: { fixed: cover },
        },
      },
      content_raw,
      content,
    },
    artikels,
  },

  pageContext: { slug },
}) => {
  return (
    <Layout>
      <SEO
        pathname={`ruimte/${slug}`}
        title={`Ruimte ${nummer}`}
        description={content_raw}
        image={f_media && f_media.SEOImage.childImageSharp.SEO.src}
      />
      {f_media ? (
        <AspectRatioImage
          ratio={1200 / 630}
          image={f_media}
          cropfocus={getCropFocus(f_media.smartcrop_image_focus)}
        />
      ) : (
        <AspectRatioBox
          ratio={1200 / 630}
          css={css`
            background: grey;
          `}
        />
      )}
      <BreadCrumbs
        crumbs={[
          {
            link: "/ruimte",
            label: "Ruimte",
          },
          {
            label: `Ruimte ${nummer}`,
          },
        ]}
      />
      <section>
        <h1>Ruimte {nummer}</h1>
        <span
          css={css`
            display: inline-block;
            color: ${colors.blue};
            margin-bottom: 1rem;
          `}
        >
          {maanden[date_month - 1]} {date_year}
        </span>
        <div
          css={css`
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            .gatsby-image-wrapper {
              ${MqMin("490px")} {
                margin-left: 1rem;
              }
              flex: 0 0 auto;
            }
          `}
        >
          {content ? (
            <div
              css={css`
                flex: 1 0 200px;
              `}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <div
              css={css`
                flex: 1 0 200px;
              `}
            >
              content goes here
            </div>
          )}
          {cover && <GatsbyImage fixed={cover} />}
        </div>
      </section>
      <section
        css={css`
          background: ${colors.orange};
          h1,
          h2,
          h3,
          p {
            color: white;
          }
        `}
      >
        <h1>artikels</h1>
        <ul
          css={css`
            list-style: none;
            margin: 0 -1rem;
            padding: 0;
            li {
              padding: 1rem;
              border-bottom: 1px solid ${colors.blue};
            }
            li:last-child {
              border-bottom: none;
            }
          `}
        >
          {artikels.edges.map(({ node: artikel }, i) => (
            <li>
              <h3 dangerouslySetInnerHTML={{ __html: artikel.title }} />
              <p>{artikel.acf.beschrijving}</p>
              <Button
                right={1}
                component={GatsbyLink}
                to={`/ruimte/${slug}/${artikel.slug}`}
                css={css`
                  background: ${colors.blue};
                `}
              >
                lees meer
              </Button>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export default RuimtePageTemplate

export const query = graphql`
  query($slug: String!) {
    ruimte: wordpressWpRuimte(slug: { eq: $slug }) {
      ...BlockListFragment_ruimte
      content_raw
      content
      f_media: featured_media {
        ...HeroImageFragment
        SEOImage: localFile {
          ...SEOImageFragment
        }
        cover: localFile {
          childImageSharp {
            fixed(width: 250) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
    artikels: allWordpressWpRuimteArtikel(
      filter: { acf: { ruimte: { post_name: { eq: $slug } } } }
    ) {
      edges {
        node {
          title
          slug
          acf {
            beschrijving
            pdf_thumb {
              localFile {
                publicURL
              }
            }
          }
        }
      }
    }
  }
`

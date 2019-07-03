import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import PostList from "../components/PostList"
import SEO from "../components/webhart-components/SEO"
import css from "@emotion/css"
import { colors, Button } from "../site/styles"
import GatsbyImage from "gatsby-image"
import { maanden } from "../site/functions"
import {
  AspectRatioImage,
  AspectRatioBox,
} from "../components/webhart-components"
import GatsbyLink from "gatsby-link"
import { getCropFocus } from "../components/webhart-components/style-functions"

const AllRuimtePage = () => (
  <StaticQuery
    query={graphql`
      {
        pageInfo: wordpressPage(slug: { eq: "ruimte" }) {
          title
          content
          content_raw
        }
        allRuimte: allWordpressWpRuimte(
          sort: { fields: acf___datum_publicatie, order: DESC }
        ) {
          edges {
            node {
              ...BlockListFragment_ruimte
            }
          }
        }
        lastRuimteEdges: allWordpressWpRuimte(
          sort: { fields: acf___datum_publicatie, order: DESC }
          limit: 1
        ) {
          edges {
            node {
              slug
              content
              slug
              acf {
                datum_publicatie
                nummer
                date_year: datum_publicatie(formatString: "Y")
                date_month: datum_publicatie(formatString: "M")
              }
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
          }
        }
      }
    `}
    render={({
      pageInfo: { title, content, content_raw },
      allRuimte,
      lastRuimteEdges,
    }) => {
      const lastRuimte = lastRuimteEdges.edges[0].node
      const { f_media } = lastRuimte
      return (
        <Layout>
          <SEO
            title="Ruimte magazine"
            pathname="/ruimte"
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
          <div
            css={css`
              display: flex;
              flex-wrap: wrap;
            `}
          >
            <section
              css={css`
                flex: 1 0 350px;
                padding-bottom: 0;
              `}
            >
              <h1>{title}</h1>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </section>
            <LastRuimte ruimte={lastRuimte} />
          </div>

          <section
            css={css`
              h2 {
                color: white;
              }
              background: ${colors.orange};
            `}
          >
            <h2>voorbije edities</h2>
            <PostList posts={[allRuimte.edges]} />
          </section>
        </Layout>
      )
    }}
  />
)
export default AllRuimtePage

const LastRuimte = ({ ruimte }) => {
  const {
    content,
    slug,
    acf: { nummer, date_year, date_month },
    f_media: {
      cover: {
        childImageSharp: { fixed: cover },
      },
    },
  } = ruimte
  return (
    <aside
      css={css`
        padding: 1rem;
        color: white;
        flex: 0 0 calc(250px + 2rem);
        background: ${colors.orange};
        h2,
        h3 {
          margin: 0 0 0.5rem;
          color: inherit;
        }
      `}
    >
      <h2>laatste editie</h2>
      <h3
        css={css`
          span {
            font-size: 1rem;
            font-weight: normal;
          }
        `}
      >
        Ruimte {nummer}{" "}
        <span>
          {maanden[date_month - 1]} {date_year}
        </span>
      </h3>
      {cover && <GatsbyImage fixed={cover} />}
      <div
        css={css`
          margin-bottom: 1rem;
          && * {
            color: white;
          }
        `}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <Button right={1} light={1} component={GatsbyLink} to={`/ruimte/${slug}`}>
        lees meer
      </Button>
      {/* <GatsbyLink to={`/ruimte/${slug}`}>lees meer...</GatsbyLink> */}
    </aside>
  )
}

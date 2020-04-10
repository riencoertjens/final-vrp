import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import PostList from "../components/PostList"
import SEO from "../components/webhart-components/SEO"
import css from "@emotion/css"
import { colors, Button, breakpoints } from "../site/styles"
import GatsbyImage from "gatsby-image"
import { maanden } from "../site/utils"
import { AspectRatioImage } from "../components/webhart-components"
import GatsbyLink from "gatsby-link"
import { MqMin } from "../components/webhart-components/style-functions"
import WpBlocksContent from "../components/WpBlocksContent"

const AllRuimtePage = () => (
  <StaticQuery
    query={graphql`
      {
        pageInfo: collectionsJson(
          post_type: { eq: "page" }
          post_name: { eq: "ruimte" }
        ) {
          title: post_title
          content: post_content
          excerpt: post_excerpt
        }
        allRuimte: allCollectionsJson(
          filter: { post_type: { eq: "ruimte" } }
          sort: { fields: acf___datum_publicatie, order: DESC }
        ) {
          edges {
            node {
              ...PostListFragment
            }
          }
        }
        lastRuimteEdges: allCollectionsJson(
          filter: { post_type: { eq: "ruimte" } }
          sort: { fields: acf___datum_publicatie, order: DESC }
          limit: 1
        ) {
          edges {
            node {
              post_title
              post_content
              post_name
              post_excerpt
              acf {
                datum_publicatie
                nummer
                subject
                cover {
                  url {
                    childImageSharp {
                      fixed(width: 250, quality: 50) {
                        ...GatsbyImageSharpFixed
                      }
                    }
                  }
                  SEOImage: url {
                    ...SEOImageFragment
                  }
                }
                date_year: datum_publicatie(formatString: "Y")
                date_month: datum_publicatie(formatString: "M")
              }
              f_media: featured_img {
                ...HeroImageFragment
              }
            }
          }
        }
      }
    `}
    render={({
      pageInfo: { title, content, post_excerpt },
      allRuimte,
      lastRuimteEdges,
    }) => {
      const lastRuimte = lastRuimteEdges.edges[0].node
      const {
        f_media,
        acf: {
          cover: {
            url: { SEOImage },
          },
        },
      } = lastRuimte

      return (
        <Layout>
          <SEO
            title="Ruimte magazine"
            pathname="ruimte"
            description={post_excerpt}
            image={SEOImage && SEOImage.childImageSharp.SEO.src}
          />
          {f_media && <AspectRatioImage ratio={1200 / 630} image={f_media} />}
          <div
            css={css`
              display: grid;
              flex-wrap: wrap;
              ${MqMin(breakpoints[2])} {
                grid-template-columns: 1fr calc(250px + 2rem);
              }
            `}
          >
            <section
              css={css`
                padding-bottom: 0;
              `}
            >
              <h1>{title}</h1>
              <WpBlocksContent content={content} />
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
            <PostList posts={allRuimte} type={"ruimte"} />
          </section>
        </Layout>
      )
    }}
  />
)
export default AllRuimtePage

const LastRuimte = ({ ruimte }) => {
  const {
    post_title,
    post_content,
    post_name,
    acf: {
      subject,
      date_year,
      date_month,
      cover: { url: cover },
    },
    f_media,
  } = ruimte
  return (
    <aside
      css={css`
        padding: 1rem;
        color: white;
        background: ${colors.orange};
        h2,
        h3 {
          margin: 0 0 0.5rem;
          color: inherit;
        }
        display: grid;
        ${MqMin(breakpoints[0])} {
          grid-template-columns: auto auto;
        }
        ${MqMin(breakpoints[2])} {
          grid-template-columns: auto;
        }
        grid-column-gap: 2rem;
        grid-template-rows: max-content;
      `}
    >
      <div css={css``}>
        <h2>laatste editie</h2>
        <h3
          css={css`
            span {
              font-size: 1rem;
              font-weight: normal;
            }
          `}
        >
          {post_title}{" "}
          <span>
            {maanden[date_month - 1]} {date_year}
          </span>
        </h3>
        {f_media && <GatsbyImage fixed={cover.childImageSharp.fixed} />}
      </div>
      <div>
        <h2>{subject}</h2>
        <div
          css={css`
            && * {
              color: white;
            }
          `}
          dangerouslySetInnerHTML={{ __html: post_content }}
        />
        <Button
          right={1}
          light={1}
          component={GatsbyLink}
          to={`/ruimte/${post_name}`}
        >
          lees meer
        </Button>
      </div>
    </aside>
  )
}

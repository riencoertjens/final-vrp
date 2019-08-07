import React from "react"
import { graphql } from "gatsby"
import Layout from "../../Layout"
import SEO from "../../webhart-components/SEO"
import { AspectRatioImage, AspectRatioBox } from "../../webhart-components"
import css from "@emotion/css"
import { MqMin } from "../../webhart-components/style-functions"
import GatsbyLink from "gatsby-link"
import GatsbyImage from "gatsby-image"
import { maanden } from "../../../site/functions"
import { Button, colors } from "../../../site/styles"
import BreadCrumbs from "../../BreadCrumbs"
import WpBlocksContent from "../../WpBlocksContent"

const RuimtePageTemplate = ({
  data: {
    ruimte: {
      post_title,
      acf: { date_year, date_month },
      f_media,
      post_excerpt,
      content,
    },
    artikels,
    featured_artikel,
  },

  pageContext: { slug },
}) => {
  console.log(featured_artikel)
  return (
    <Layout>
      <SEO
        pathname={`ruimte/${slug}`}
        title={post_title}
        description={post_excerpt}
        image={f_media && f_media.SEOImage.childImageSharp.SEO.src}
      />
      {f_media ? (
        <AspectRatioImage ratio={1200 / 630} image={f_media} />
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
            label: post_title,
          },
        ]}
      />
      <section>
        <h1>{post_title}</h1>
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
            <WpBlocksContent
              content={content}
              css={css`
                flex: 1 0 200px;
              `}
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
          {f_media && (
            <GatsbyImage fixed={f_media.cover.childImageSharp.fixed} />
          )}
        </div>
      </section>
      <section
        css={css`
          background: ${colors.orange};
          h1,
          h2,
          h3,
          p,
          span {
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
          `}
        >
          {featured_artikel && <Artikel artikel={featured_artikel} ruimteSlug={slug} featured={1} />}
          {artikels.edges.map(({ node: artikel }, i) => (
            <Artikel artikel={artikel} ruimteSlug={slug} key={i} />
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export default RuimtePageTemplate

export const query = graphql`
  query($slug: String!, $featured_artikel: [Int!]) {
    ruimte: collectionsJson(
      post_type: { eq: "ruimte" }
      post_name: { eq: $slug }
    ) {
      post_title
      acf {
        date_year: datum_publicatie(formatString: "Y")
        date_month: datum_publicatie(formatString: "M")
      }
      post_excerpt
      content: post_content
      f_media: featured_img {
        ...HeroImageFragment
        SEOImage: file {
          ...SEOImageFragment
        }
        cover: file {
          childImageSharp {
            fixed(width: 250) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
    featured_artikel: collectionsJson(ID: { in: $featured_artikel }) {
      title: post_title
      slug: post_name
      acf {
        beschrijving
      }
    }
    artikels: allCollectionsJson(
      filter: {
        post_type: { eq: "ruimte_artikel" }
        ID: { nin: $featured_artikel }
        acf: { ruimte: { post_name: { eq: $slug } } }
      }
      sort: { fields: post_name }
    ) {
      edges {
        node {
          title: post_title
          slug: post_name
          acf {
            beschrijving
          }
        }
      }
    }
  }
`

const Artikel = ({ artikel, ruimteSlug, featured }) => (
  <li
    css={css`
      padding: 1rem;
      border-bottom: 1px solid ${colors.blue};
      :last-of-type {
        border-bottom: none;
      }
      ${featured &&
        `
        background: ${colors.blue};
      `}
      span {
        display: inline-block;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
      }
    `}
  >
    {featured && <span>sneak peek | lees het volledige artikel</span>}
    <h3 dangerouslySetInnerHTML={{ __html: artikel.title }} />
    <p>{artikel.acf.beschrijving}</p>
    <Button
      right={1}
      component={GatsbyLink}
      to={`/ruimte/${ruimteSlug}/${artikel.slug}`}
      css={css`
        ${!featured && `background: ${colors.blue};`}
      `}
    >
      lees meer
    </Button>
  </li>
)

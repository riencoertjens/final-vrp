import React from "react"
import Layout from "../../Layout"
import { graphql } from "gatsby"
import { AspectRatioImage, AspectRatioBox } from "../../webhart-components"
import { getCropFocus } from "../../webhart-components/style-functions"
import css from "@emotion/css"
import GatsbyImage from "gatsby-image"
import GatsbyLink from "gatsby-link"
import {
  FaAngleRight as ArrowRightIcon,
  FaAngleLeft as ArrowLeftIcon,
} from "react-icons/fa"
import SEO from "../../webhart-components/SEO"
import BreadCrumbs from "../../BreadCrumbs"

const ArtikelPageTemplate = ({
  data: {
    artikel: {
      featured_media,
      title: artikelTitle,
      slug,
      acf: {
        beschrijving,
        pdf_thumb: {
          localFile: {
            childImageSharp: { fixed: pdf_thumb },
          },
        },
        pdf: {
          url: {
            localFile: { publicURL: pdf_url, relativePath },
          },
        },
        ruimte,
      },
    },
  },
  pageContext: { next, prev },
}) => {
  console.log(ruimte)
  const title = `Ruimte ${ruimte.acf.nummer}: ${artikelTitle}`
  return (
    <Layout>
      <SEO
        title={title}
        pathname={`ruimte/${ruimte.post_name}/${slug}/`}
        description={beschrijving}
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
      <BreadCrumbs
        crumbs={[
          {
            link: "/ruimte",
            label: "Ruimte",
          },
          {
            link: `/ruimte/${ruimte.post_name}`,
            label: `Ruimte ${ruimte.acf.nummer}`,
          },
          {
            label: artikelTitle,
          },
        ]}
      />
      <section>
        <h1>{title}</h1>
        <div
          css={css`
            display: grid;
            grid-template-columns: auto auto;
            grid-column-gap: 1rem;
            margin-bottom: 1rem;
          `}
        >
          <a href={pdf_url} target="_blank" rel="noopener noreferrer">
            <GatsbyImage fixed={pdf_thumb} />
            <br />
            <span>open pdf</span>
          </a>
          <p>{beschrijving}</p>
        </div>
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            a {
            }
          `}
        >
          {prev && (
            <GatsbyLink
              css={css`
                margin-right: auto;
              `}
              to={`/ruimte/${prev.node.acf.ruimte.slug}/${prev.node.slug}/`}
            >
              <ArrowLeftIcon />
              {prev.node.title}
            </GatsbyLink>
          )}
          {next && (
            <GatsbyLink
              css={css`
                margin-left: auto;
              `}
              to={`/ruimte/${next.node.acf.ruimte.slug}/${next.node.slug}/`}
            >
              {next.node.title}
              <ArrowRightIcon />
            </GatsbyLink>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default ArtikelPageTemplate

export const query = graphql`
  query($slug: String!, $ruimteSlug: String!) {
    artikel: wordpressWpRuimteArtikel(slug: { eq: $slug }) {
      title
      slug
      featured_media {
        ...HeroImageFragment
        SEOImage: localFile {
          ...SEOImageFragment
        }
      }
      acf {
        beschrijving
        ruimte {
          post_name
          acf {
            nummer
          }
        }
        pdf {
          url {
            localFile {
              publicURL
              relativePath
            }
          }
        }
        pdf_thumb {
          localFile {
            childImageSharp {
              fixed(width: 300) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
    ruimte: wordpressWpRuimteArtikel(slug: { eq: $ruimteSlug }) {
      slug
    }
  }
`

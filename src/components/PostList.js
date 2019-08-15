import React from "react"
import { graphql } from "gatsby"
import css from "@emotion/css"
import { AspectRatioBox } from "./webhart-components"
import GatsbyLink from "gatsby-link"
import { colors, boxShadow } from "../site/styles"
import GatsbyImage from "gatsby-image/withIEPolyfill"
import { getAspectRatioImage } from "./webhart-components/style-functions"
import { ReactComponent as VRPLabel } from "../images/svg/vrp-label.svg"

export const postTypes = {
  ruimte: "ruimte",
  ruimte_artikel: "artikel",
  activiteit: "activiteit",
  prijs: "prijsuitreiking",
  post: "nieuws",
  blog: "blog",
  job_listing: "vacature",
}

const PostList = ({ posts, multiTypes, type }) => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-column-gap: 1rem;
        grid-row-gap: 1rem;
      `}
    >
      {posts.edges.map(({ node }, i) => {
        let showImage = null

        if (node.post_type === "ruimte" && node.acf.cover.url.childImageSharp) {
          showImage = {
            image: node.acf.cover.url.childImageSharp.fluid,
            cropFocus: "0 50%",
          }
        }

        if (!showImage) {
          showImage = getAspectRatioImage(node.featured_img, 1)
        }

        const typeName = postTypes[node.post_type]

        let itemSlug = "/"

        if (node.post_type === "ruimte_artikel") {
          itemSlug += `ruimte/${node.acf.ruimte.post_name}/`
        } else if (node.post_type !== "page") {
          itemSlug += `${typeName}`
        }

        if (node.post_type === "page") {
          itemSlug = node.pathname
        } else if (node.post_type === "post") {
          itemSlug += node.pathname
        } else {
          itemSlug += `/${node.post_name}`
        }

        return (
          <AspectRatioBox
            ratio={type === "ruimte" ? 17 / 20 : 1} // change ratio when postList type === ruimte
            component={GatsbyLink}
            key={i}
            css={css`
              box-shadow: ${boxShadow};
              transition: 0.2s;

              .gatsby-image-wrapper {
                transition: 0.1s;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
              }
              &:hover {
                & .gatsby-image-wrapper {
                  transform: scale(1.05);
                }
                & > div > div {
                  background: rgba(255, 255, 255, 0.85);
                }
              }
            `}
            to={itemSlug}
          >
            {showImage && (
              <GatsbyImage
                fluid={showImage.image}
                objectPosition={showImage.cropFocus}
              />
            )}

            <div
              css={css`
                position: absolute;
                width: 100%;
                bottom: 0;
                background: white;
                padding: 0.5rem;
                transition: 0.2s;
                h3 {
                  margin-bottom: 0;
                  font-size: 1rem;
                  color: black;
                }
                span {
                  color: ${colors.grey};
                  font-weight: 300;
                  line-height: 1;
                  margin-bottom: 0.25rem;
                  display: block;
                  text-transform: uppercase;
                  letter-spacing: 0.16rem;
                  font-size: ${2 / 3}rem;
                  &:empty {
                    margin: 0;
                  }
                }
                color: black;
                svg {
                  height: 0.75rem;
                  margin-right: 0.25rem;
                }
              `}
            >
              <span>
                {typeName === "nieuws"
                  ? node.acf.nieuws_type_label + " | "
                  : multiTypes && typeName}
                {typeName === "activiteit" && node.acf.date && (
                  <>
                    {multiTypes && " | "}
                    {node.acf.dateFormatted}
                  </>
                )}
                {node.post_type === "post" && `${node.post_date}`}
              </span>
              <h3>
                {node.acf.is_vrp && <VRPLabel />}
                {node.post_title}
                {node.acf.subject && ` - ${node.acf.subject}`}
              </h3>
            </div>
          </AspectRatioBox>
        )
      })}
    </div>
  )
}

export default PostList

export const PostListFragment = graphql`
  fragment PostListFragment on CollectionsJson {
    post_title
    post_type
    post_name
    pathname
    post_date(formatString: "DD-MM-Y")
    acf {
      nieuws_type_label
      datum_publicatie
      is_vrp
      date
      dateFormatted: date(formatString: "DD-MM-Y")
      ruimte {
        post_name
      }
      subject
      cover {
        url {
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    featured_img {
      ...BlockImageFragment
    }
  }
`

export const BlockImageFragment = graphql`
  fragment BlockImageFragment on CollectionsJsonFeatured_img {
    smartcrop_image_focus {
      left
      top
    }
    file {
      image: childImageSharp {
        maxWidth: fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
        maxHeight: fluid(maxHeight: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
  fragment BlockImageFragmentThemas on TermsJsonFeatured_img {
    smartcrop_image_focus {
      left
      top
    }
    file {
      image: childImageSharp {
        maxWidth: fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
        maxHeight: fluid(maxHeight: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

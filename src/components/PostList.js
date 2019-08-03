import React from "react"
import { graphql } from "gatsby"
import css from "@emotion/css"
import { AspectRatioBox } from "./webhart-components"
import GatsbyLink from "gatsby-link"
import { colors, boxShadow } from "../site/styles"
import GatsbyImage from "gatsby-image/withIEPolyfill"
import { getAspectRatioImage } from "./webhart-components/style-functions"

export const postTypes = {
  ruimte: "ruimte",
  ruimte_artikel: "artikel",
  activity: "activiteit",
  prijs: "prijsuitreiking",
  post: "nieuws",
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
        const showImage = getAspectRatioImage(node.featured_img, 1)

        const typeName = postTypes[node.post_type]

        let itemSlug = "/"

        if (node.post_type === "ruimte_artikel") {
          itemSlug += `ruimte/${node.acf.ruimte.post_name}/`
        } else if (node.post_type !== "page") {
          itemSlug += `${typeName}/`
        }
        itemSlug += node.post_name

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
                padding: 0.25rem 0.5rem 0.5rem;
                transition: 0.2s;
                h3 {
                  margin-bottom: 0;
                }
                span {
                  color: ${colors.grey};
                  font-weight: 300;
                  text-transform: uppercase;
                  letter-spacing: 0.16rem;
                  font-size: 0.666rem;
                }
                color: black;
              `}
            >
              <span>
                {multiTypes && typeName}
                {typeName === "activiteit" && node.acf.date && (
                  <>
                    {multiTypes && " | "}
                    {node.acf.dateFormatted}
                  </>
                )}
                {node.post_type === "post" && (
                  <>
                    {multiTypes && " | "}
                    {node.post_date}
                  </>
                )}
              </span>
              <h3>{node.post_title}</h3>
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
    post_date(formatString: "DD-MM-Y")
    acf {
      datum_publicatie
      date
      dateFormatted: date(formatString: "DD-MM-Y")
      ruimte {
        post_name
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
          ...GatsbyImageSharpFluid_tracedSVG
        }
        maxHeight: fluid(maxHeight: 500) {
          ...GatsbyImageSharpFluid_tracedSVG
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
          ...GatsbyImageSharpFluid_tracedSVG
        }
        maxHeight: fluid(maxHeight: 500) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`

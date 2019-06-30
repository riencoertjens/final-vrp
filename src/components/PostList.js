import React from "react"
import { graphql } from "gatsby"
import css from "@emotion/css"
import { AspectRatioBox } from "./webhart-components"
import GatsbyLink from "gatsby-link"
import { colors, boxShadow } from "../site/styles"
import GatsbyImage from "gatsby-image/withIEPolyfill"
import { getShowImage } from "./webhart-components/style-functions"

export const postTypes = {
  ruimte: "ruimte",
  activity: "activiteit",
  prijs: "prijsuitreking",
  post: "nieuws",
}

const PostList = ({ posts }) => {
  const sortedPosts =
    posts.length > 1
      ? [].concat(...posts).sort((a, b) => {
          if (a.node.date > b.node.date) {
            return -1
          }
          if (a.node.date < b.node.date) {
            return 1
          }
          return 0
        })
      : posts[0]

  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-column-gap: 1rem;
        grid-row-gap: 1rem;
      `}
    >
      {sortedPosts.map(({ node }, i) => {
        const showImage = getShowImage(node.featured_media, 1)
        const cropFocus =
          showImage && node.featured_media.smartcrop_image_focus.length > 0
            ? `${node.featured_media.smartcrop_image_focus[0].left}% ${
                node.featured_media.smartcrop_image_focus[0].top
              }%`
            : "50% 50%"

        const typeName = postTypes[node.type]

        return (
          <AspectRatioBox
            ratio={typeName === "ruimte" && posts.length === 1 ? 17 / 20 : 1}
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
            to={`/${typeName}/${node.slug}`}
          >
            {showImage && (
              <GatsbyImage fluid={showImage} objectPosition={cropFocus} />
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
                  /* line-height: 100%; */
                }
                color: black;
              `}
            >
              {posts.length > 1 && <span>{typeName}</span>}
              {typeName === "activiteit" && (
                <span>
                  {posts.length > 1 && " | "}
                  {node.dateFormatted}
                </span>
              )}
              <h3>
                {node.title ||
                  (node.type === "ruimte" &&
                    `${node.acf.nummer} | ${node.acf.date_year}/${Math.ceil(
                      (node.acf.date_month / 12) * 4
                    )}`)}
              </h3>
            </div>
          </AspectRatioBox>
        )
      })}
    </div>
  )
}

export default PostList

export const BlockImageFragment = graphql`
  fragment BlockImageFragment on wordpress__wp_media {
    smartcrop_image_focus {
      left
      top
    }
    localFile {
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

export const BlockListFragment = graphql`
  fragment BlockListFragment_post on wordpress__POST {
    title
    type
    slug
    date
    featured_media {
      ...BlockImageFragment
    }
  }
  fragment BlockListFragment_activity on wordpress__wp_activities {
    title
    type
    slug
    dateFormatted: date(formatString: "D-MM-YY")
    featured_media {
      ...BlockImageFragment
    }
  }
  fragment BlockListFragment_price on wordpress__wp_prijs {
    title
    type
    slug
    date
    featured_media {
      ...BlockImageFragment
    }
  }
  fragment BlockListFragment_ruimte on wordpress__wp_ruimte {
    slug
    type
    date
    acf {
      nummer
      datum_publicatie
      date_year: datum_publicatie(formatString: "Y")
      date_month: datum_publicatie(formatString: "M")
    }
    featured_media {
      ...BlockImageFragment
    }
  }
`

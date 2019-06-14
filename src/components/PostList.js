import React from "react"
import { graphql } from "gatsby"
import css from "@emotion/css"
import { AspectRatioBox } from "./webhart-components"
import GatsbyLink from "gatsby-link"
import { colors } from "../site/styles"
import GatsbyImage from "gatsby-image/withIEPolyfill"

export const postTypes = {
  ruimte: "Ruimte",
  activity: "Activiteit",
  prijs: "Prijsuitreking",
  post: "Nieuws",
}

const PostList = ({ posts }) => {
  const sortedPosts = [].concat(...posts).sort((a, b) => {
    if (a.node.date > b.node.date) {
      return -1
    }
    if (a.node.date < b.node.date) {
      return 1
    }
    return 0
  })

  return (
    <div
      css={css`
        display: grid;
        padding: 1rem;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-column-gap: 1rem;
        grid-row-gap: 1rem;
      `}
    >
      {sortedPosts.map(({ node }, i) => {
        const showImage =
          node.featured_media && node.featured_media.localFile
            ? node.featured_media.localFile.image.maxWidth.aspectRatio > 1
              ? node.featured_media.localFile.image.maxWidth
              : node.featured_media.localFile.image.maxHeight
            : false

        return (
          <AspectRatioBox
            component={GatsbyLink}
            key={i}
            css={css`
              box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.25);
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
            to={`/activiteiten/${node.slug}`}
          >
            {showImage && (
              <GatsbyImage
                fluid={showImage}
                objectPosition={`${
                  node.featured_media.smartcrop_image_focus[0].left
                }% ${node.featured_media.smartcrop_image_focus[0].top}%`}
              />
            )}
            {/* {node.featured_media && node.featured_media.localFile ? (
              <AspectRatioImage
                image={node.featured_media.localFile.image}
                cropfocus={node.featured_media.smartcrop_image_focus[0]}
              />
            ) : (
              <AspectRatioBox
                css={css`
                  background: grey;
                `}
              />
            )} */}
            <div
              css={css`
                position: absolute;
                width: 100%;
                bottom: 0;
                background: white;
                padding: 0.5rem;
                transition: 0.2s;

                h3 {
                  margin: 0;
                }
                color: black;
              `}
            >
              <span
                css={css`
                  color: ${colors.grey};
                  font-weight: 300;
                  text-transform: uppercase;
                  letter-spacing: 0.16rem;
                  font-size: 0.666rem;
                  line-height: 100%;
                `}
              >
                {postTypes[node.type]}
              </span>
              <h3>
                {node.title ||
                  (node.type === "ruimte" && `Ruimte ${node.acf.nummer}`)}
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
        maxWidth: fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
        maxHeight: fluid(maxHeight: 300) {
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
    date
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
    }
    featured_media {
      ...BlockImageFragment
    }
  }
`

import React from "react"
import { graphql } from "gatsby"
import css from "@emotion/css"
import { AspectRatioBox, AspectRatioImage } from "./webhart-components"
import GatsbyLink from "gatsby-link"

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
        padding: 2rem;
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 2rem;
        grid-row-gap: 1rem;
      `}
    >
      {sortedPosts.map(({ node }, i) => {
        return (
          <AspectRatioBox
            component={GatsbyLink}
            key={i}
            css={css`
              box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.25);
            `}
            to={`/activiteiten/${node.slug}`}
          >
            {node.featured_media && node.featured_media.localFile ? (
              <AspectRatioImage
                image={node.featured_media.localFile.image}
                cropfocus={node.featured_media.smartcrop_image_focus[0]}
                ratio={300 / 200}
              />
            ) : (
              <AspectRatioBox
                ratio={300 / 200}
                css={css`
                  background: grey;
                `}
              />
            )}
            <h3>
              {node.title ||
                (node.type === "ruimte" && `Ruimte ${node.acf.nummer}`)}
            </h3>
            {node.type}
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
        maxHeight: fluid(maxHeight: 200) {
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

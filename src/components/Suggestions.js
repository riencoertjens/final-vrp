import { graphql } from "gatsby"

import React from "react"
import css from "@emotion/css"
import { AspectRatioImage, AspectRatioBox } from "./webhart-components"
import {
  getAspectRatioImage,
  MqMin,
} from "./webhart-components/style-functions"
import { ReactComponent as VRPLabel } from "../images/svg/vrp-label.svg"
import { getPostLabel, getPathname } from "../site/utils"
import { colors, breakpoints } from "../site/styles"
import GatsbyLink from "gatsby-link"

export const Suggestions = ({ items }) => {
  return (
    <aside
      css={css`
        padding: 1rem;
        background: whitesmoke;
      `}
    >
      <h2>Suggesties</h2>
      {items.edges.map(({ node: post }, i) => {
        let showImage = false
        if (post.post_type === "ruimte" && post.acf.cover.url.childImageSharp) {
          showImage = {
            image: post.acf.cover.url.childImageSharp.fluid,
            cropFocus: "0 50%",
          }
        }

        if (!showImage) {
          showImage = getAspectRatioImage(post.featured_img, 1)
        }

        return (
          <GatsbyLink
            to={getPathname(post)}
            key={i}
            css={css`
              color: inherit;
              text-decoration: none;
              display: grid;
              grid-template-columns: 60px auto;
              grid-gap: 0.5rem;
              margin-top: 1.5rem;
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
              h4 {
                margin: 0;
                overflow-wrap: break-word;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2; /* number of lines to show */
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                line-height: 1.2; /* fallback */
                max-height: ${1.2 * 2}rem; /* fallback 2 x line-height */
                svg {
                  height: 0.75rem;
                  margin-right: 0.25rem;
                }
              }
            `}
          >
            {showImage ? (
              <AspectRatioImage image={post.featured_img} />
            ) : (
              <AspectRatioBox
                css={css`
                  background: grey;
                `}
              />
            )}
            <div>
              <span>{getPostLabel(post, true)}</span>
              <h4>
                {post.acf.is_vrp && <VRPLabel />}
                {post.post_title}
                {post.acf.subject && ` - ${post.acf.subject}`}
              </h4>
            </div>
          </GatsbyLink>
        )
      })}
    </aside>
  )
}

const SuggestionsAsideWrapper = ({ suggestions, children }) =>
  suggestions.edges.length > 0 ? (
    <div
      css={css`
        display: grid;
        ${MqMin(breakpoints[2])} {
          grid-template-columns: 1fr calc(300px + 2rem);
        }
      `}
    >
      <div>{children}</div>
      <Suggestions items={suggestions}></Suggestions>
    </div>
  ) : (
    <div>{children}</div>
  )

export default SuggestionsAsideWrapper

export const SuggestionsItemFragment = graphql`
  fragment SuggestionsItemFragment on CollectionsJson {
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
      cover {
        url {
          childImageSharp {
            fluid(maxWidth: 60, quality: 50) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      subject
    }
    featured_img {
      smartcrop_image_focus {
        left
        top
      }
      file {
        image: childImageSharp {
          maxWidth: fluid(maxWidth: 60, quality: 50) {
            ...GatsbyImageSharpFluid
          }
          maxHeight: fluid(maxHeight: 60, quality: 50) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`

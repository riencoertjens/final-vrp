import React from "react"
import { OutboundLink as AnalyticsOutboundLink } from "gatsby-plugin-google-analytics"
import GatsbyImage from "gatsby-image/withIEPolyfill"

import { css } from "@emotion/core"
// import styled from "@emotion/styled"

import normalize from "./normalize"

import { globalStyle as siteGlobalStyle, breakpoints } from "../../site/styles"
import { graphql } from "gatsby"

export const OutboundLink = props => (
  <AnalyticsOutboundLink target="_blank" rel="noreferrer noopener" {...props} />
)

export const MediaQuery = breakpoints.map(bp => `@media (min-width: ${bp})`)

export const globalStyle = css`
  ${normalize}
  html {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
    text-rendering: optimizeLegibility;

    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  p {
    margin-top: 0;
  }
  ${siteGlobalStyle && siteGlobalStyle}
`

export const AspectRatioBox = props => {
  const { ratio, children } = props
  return (
    <div
      css={css`
        width: 100%;
        padding-top: ${(ratio ? 1 / ratio : 1) * 100}%;
        overflow: scroll;
        position: relative;
        & > div {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}
      {...props}
    >
      <div>{children}</div>
    </div>
  )
}

export const AspectRatioImage = props => {
  const { image, cropfocus, ratio } = props
  const showImage =
    ratio > image.maxWidth.aspectRatio ? image.maxWidth : image.maxHeight

  return (
    <AspectRatioBox
      {...props}
      css={css`
        .gatsby-image-wrapper {
          width: 100%;
          height: 100%;
        }
      `}
    >
      <GatsbyImage
        fluid={showImage}
        objectPosition={`${cropfocus.left}% ${cropfocus.top}%`}
      />
    </AspectRatioBox>
  )
}

export const HeroImageFragment = graphql`
  fragment HeroImageFragment on wordpress__wp_media {
    smartcrop_image_focus {
      left
      top
    }
    localFile {
      childImageSharp {
        maxWidth: fluid(maxWidth: 1200) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
        maxHeight: fluid(maxHeight: 630) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
        original {
          height
          width
          src
        }
      }
    }
  }
`

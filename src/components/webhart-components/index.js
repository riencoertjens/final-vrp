import React from "react"
import { OutboundLink as AnalyticsOutboundLink } from "gatsby-plugin-google-analytics"
import GatsbyImage from "gatsby-image/withIEPolyfill"

import { css } from "@emotion/core"
// import styled from "@emotion/styled"

import normalize from "./normalize"

import {
  globalStyle as siteGlobalStyle,
  breakpoints,
  colors,
} from "../../site/styles"
import { getShowImage } from "./style-functions"

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
  body {
    background: ${colors.grey};
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
  const { ratio, children, component } = props
  const TheComponent = component || "div"
  return (
    <TheComponent
      css={css`
        display: block;
        width: 100%;
        &:before {
          padding-top: ${(ratio ? 1 / ratio : 1) * 100}%;
          content: "";
          display: block;
        }
        overflow: hidden;
        position: relative;
      `}
      {...props}
    >
      <div
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        `}
      >
        {children}
      </div>
    </TheComponent>
  )
}

export const AspectRatioImage = props => {
  const { image, cropfocus, ratio } = props
  const showImage = getShowImage(image, ratio)

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
      <GatsbyImage fluid={showImage} objectPosition={cropfocus} />
    </AspectRatioBox>
  )
}

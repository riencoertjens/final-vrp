import React from "react"
import { OutboundLink as AnalyticsOutboundLink } from "gatsby-plugin-google-analytics"

import { css } from "@emotion/core"
// import styled from "@emotion/styled"

import normalize from "./normalize"

import { globalStyle as siteGlobalStyle, breakpoints } from "../../site/styles"

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

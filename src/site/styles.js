import css from "@emotion/css"
// import styled from "@emotion/styled"
import config from "./config"

import "typeface-montserrat"
import { MqMin } from "../components/webhart-components/style-functions"

export const breakpoints = ["600px", "900px", "1200px", "1600px"]

export const colors = {
  primary: config.base.primaryColor,
  background: config.base.primaryBgColor,
  orange: config.base.primaryColor,
  grey: "#666666",
  lightGrey: "#dddddd",
}

export const globalStyle = css`
  html {
    font-family: Montserrat, sans-serif;
    font-size: 14px;
    ${MqMin("780px")} {
      font-size: 16px;
    }
  }

  *::selection {
    background: ${colors.primary};
    color: ${colors.background};
  }
`

// site style components

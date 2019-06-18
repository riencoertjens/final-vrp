import React from "react"
import css from "@emotion/css"
// import styled from "@emotion/styled"
import config from "./config"

import "typeface-montserrat"
import { MqMin } from "../components/webhart-components/style-functions"
import { FaAngleRight as ArrowIcon } from "react-icons/fa"
export const breakpoints = ["600px", "900px", "1200px", "1600px"]

export const colors = {
  primary: config.base.primaryColor,
  background: config.base.primaryBgColor,
  orange: config.base.primaryColor,
  blue: "#00809f",
  chocolate: "#693201",
  grey: "#666666",
  lightGrey: "#dddddd",
}

export const boxShadow = "0 0 0.5rem 0 rgba(0, 0, 0, 0.25)"

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
  section {
    padding: 1rem;
  }
  a {
    color: ${colors.orange};
  }
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
`

// site style components
export const Button = props => {
  const TheComponent = props.component || "button"

  return (
    <TheComponent
      css={css`
        color: white;
        flex: 0 0 auto;
        background: ${colors.orange};
        border: none;
        position: relative;
        padding: 0.25rem 0.5rem;
        padding-right: 1.5rem;
        border-radius: 50px;
        text-decoration: none;
        display: inline-block;
        svg {
          transition: 0.2s;
          position: absolute;
          color: white;
          bottom: 0.35rem;
        }
        &:hover {
          svg {
            transform: translateX(0.25rem);
          }
        }
      `}
      {...props}
    >
      {props.children}
      <ArrowIcon />
    </TheComponent>
  )
}

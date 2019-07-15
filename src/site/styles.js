import React from "react"
import css from "@emotion/css"
// import styled from "@emotion/styled"
import config from "./config"

import "typeface-montserrat"
import { MqMin } from "../components/webhart-components/style-functions"
import {
  FaAngleRight as ArrowRightIcon,
  FaAngleLeft as ArrowLeftIcon,
} from "react-icons/fa"
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
  p {
    line-height: ${22 / 16};
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
  h1 {
    font-size: 3rem;
    font-weight: 700;
    color: #444444;
    margin-bottom: 1rem;
  }
  h2 {
    font-weight: 300;
    font-size: 1.33rem;
    text-transform: uppercase;
    color: #666666;
    letter-spacing: 0.33rem;
    line-height: 2rem;
  }
  h3,
  p.lead {
    font-size: 1.33rem;
    color: ${colors.orange};
    font-weight: 500;
  }
`

// site style components
export const Button = props => {
  const { light, component, children, left, right, ...restProps } = props
  const TheComponent = component || "button"

  return (
    <TheComponent
      css={css`
        background: ${light ? "white" : colors.orange};
        flex: 0 0 auto;
        color: ${light ? colors.orange : "white"};
        border: none;
        position: relative;
        padding: 0.2rem 0.5rem 0.3rem;
        ${left && `padding-left: 1.5rem;`}
        ${right && `padding-right: 1.5rem;`}
        border-radius: 50px;
        text-decoration: none;
        display: inline-block;
        svg {
          transition: 0.2s;
          position: absolute;
          color: inherit;
          bottom: 0.35rem;
          ${left ? `left: .5rem;` : `right: .5rem;`}
        }
        &:hover {
          svg {
            transform: translateX(${left && `-0.25rem`} ${right && `0.25rem`});
          }
        }
      `}
      {...restProps}
    >
      {left && <ArrowLeftIcon />}
      {children}
      {right && <ArrowRightIcon />}
    </TheComponent>
  )
}

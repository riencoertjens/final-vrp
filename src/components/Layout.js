import React, { Component } from "react"
import PropTypes from "prop-types"

// import { StaticQuery, graphql } from "gatsby"

import { globalStyle, MediaQuery } from "./webhart-components"
import { Global, css } from "@emotion/core"
import styled from "@emotion/styled"

import { breakpoints } from "../site/styles"

import SEO from "./webhart-components/SEO"
import Header from "./Header"
import { graphql } from "gatsby"
// import GatsbyLink from "gatsby-link"
// import Obfuscate from "react-obfuscate"

const SiteWrapper = styled("div")`
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 30px 0px;
  position: relative;
  font-family: Montserrat, sans-serif;
  margin: 0 auto;
  ${MediaQuery[0]} {
    margin: 1rem auto;
  }
  ${MediaQuery[1]} {
    margin: 2rem auto;
    max-width: calc(${breakpoints[1]} - 2rem);
  }
  ${MediaQuery[2]} {
    max-width: calc(${breakpoints[2]} - 2rem);
  }
`

class Layout extends Component {
  render() {
    const { children } = this.props
    return (
      <React.Fragment>
        <Global styles={globalStyle} />
        <SEO />
        <SiteWrapper>
          <Header />
          <main
            css={css`
              z-index: 5;
            `}
          >
            {children}
          </main>
        </SiteWrapper>
      </React.Fragment>
    )
  }
}

export default Layout

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export const HeroImageFragment = graphql`
  fragment HeroImageFragment on wordpress__wp_media {
    smartcrop_image_focus {
      left
      top
    }
    localFile {
      image: childImageSharp {
        maxWidth: fluid(maxWidth: 1200) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
        maxHeight: fluid(maxHeight: 630) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`

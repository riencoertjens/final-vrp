import React, { Component } from "react"
import PropTypes from "prop-types"

import "../css/wp-blocks-revised.css"

import { globalStyle, MediaQuery } from "./webhart-components"
import { Global, css } from "@emotion/core"
import styled from "@emotion/styled"

import { breakpoints } from "../site/styles"

import SEO from "./webhart-components/SEO"
import Header from "./Header"
import { graphql } from "gatsby"
import Footer from "./Footer"
// import GatsbyLink from "gatsby-link"
// import Obfuscate from "react-obfuscate"

const SiteWrapper = styled("div")`
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.25);
  background: white;
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
          <Header showSearch={this.props.showSearch} />
          <main
            css={css`
              z-index: 5;
            `}
          >
            {children}
          </main>
          <Footer />
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
  fragment HeroImageFragment on CollectionsJsonFeatured_img {
    smartcrop_image_focus {
      top
      left
    }
    file {
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

import React, { Component } from "react"
import PropTypes from "prop-types"

import { globalStyle, MediaQuery } from "./webhart-components"
import { Global, css } from "@emotion/core"
import styled from "@emotion/styled"
import CookieBanner from "react-cookie-banner"

import { breakpoints, colors } from "../site/styles"

import SEO from "./webhart-components/SEO"
import Header from "./Header"
import { graphql } from "gatsby"
import Footer from "./Footer"
import GatsbyLink from "gatsby-link"
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
          <CookieBanner
            disableStyle
            css={css`
              background-color: ${colors.blue};
              font-size: 0.8rem;
              display: flex;
              align-items: center;

              span {
                margin: 0 auto;
                line-height: 1;
                padding: 0.5rem;
                font-weight: 500;
                color: white;
                a {
                  color: inherit;
                }
              }
              button {
                background-color: rgba(255, 255, 255, 0.6);
                border: none;
                margin: 0.25rem;
                border-radius: 3px;
                color: rgb(36, 36, 36);
                cursor: pointer;
              }
            `}
            link={
              <GatsbyLink to="/privacyverklaring">privacyverklaring</GatsbyLink>
            }
            dismissOnScroll={false}
            message="Deze website maakt gebruik van cookies, lees hier onze "
            onAccept={() => {}}
            cookie="user-has-accepted-cookies"
            buttonMessage="ok"
          />
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
        maxWidth: fluid(maxWidth: 1200, quality: 50) {
          ...GatsbyImageSharpFluid
        }
        maxHeight: fluid(maxHeight: 630, quality: 50) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
export const HeroImageFragment_term = graphql`
  fragment HeroImageFragment_term on TermsJsonFeatured_img {
    smartcrop_image_focus {
      top
      left
    }
    file {
      image: childImageSharp {
        maxWidth: fluid(maxWidth: 1200, quality: 50) {
          ...GatsbyImageSharpFluid
        }
        maxHeight: fluid(maxHeight: 630, quality: 50) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

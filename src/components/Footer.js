import React from "react"
import { colors } from "../site/styles"
import css from "@emotion/css"
import { ReactComponent as Logo } from "../images/svg/logo_landscape.svg"
import {
  FaTwitter as Twitter,
  FaFacebookF as Facebook,
  FaLinkedinIn as Linkedin,
} from "react-icons/fa"

import { OutboundLink } from "../components/webhart-components"
import { StaticQuery, graphql } from "gatsby"
import GatsbyLink from "gatsby-link"

const Footer = () => (
  <StaticQuery
    query={graphql`
      {
        themas: allWordpressWpThema(sort: { fields: name, order: ASC }) {
          edges {
            node {
              name
              slug
            }
          }
        }
        activiteiten: allWordpressCategory(
          filter: { parent_element: { slug: { eq: "activiteiten" } } }
          sort: { fields: name, order: ASC }
        ) {
          edges {
            node {
              name
              slug
            }
          }
        }
        prijzen: allWordpressCategory(
          filter: { parent_element: { slug: { eq: "prijzen" } } }
          sort: { fields: name, order: ASC }
        ) {
          edges {
            node {
              name
              slug
            }
          }
        }
      }
    `}
    render={({
      themas: { edges: themas },
      activiteiten: { edges: activiteiten },
      prijzen: { edges: prijzen },
    }) => (
      <footer
        css={css`
          background: ${colors.orange};
          color: white;
          a {
            color: white;
            :hover {
              color: ${colors.blue};
            }
          }
        `}
      >
        <div
          css={css`
            padding: 1rem;
            display: flex;
            flex-wrap: wrap;
            align-items: stretch;
            justify-content: space-between;
          `}
        >
          <Logo />
          <span
            css={css`
              display: flex;
              align-self: center;

              svg {
                margin: 0 0.25rem;
                height: 40px;
                width: auto;
              }
            `}
          >
            <OutboundLink href="https://twitter.com/VRPvzw">
              <Twitter />
            </OutboundLink>
            <OutboundLink href="https://facebook.com/VRPvzw">
              <Facebook />
            </OutboundLink>
            <OutboundLink href="https://linkedin.com/company/vlaamse-vereniging-voor-ruimte-en-planning-vrp-/">
              <Linkedin />
            </OutboundLink>
          </span>
        </div>
        <div
          css={css`
            padding: 0 1rem;
            display: flex;
            align-items: space-between;
            flex-wrap: wrap;
            div {
              ul {
                padding: 0;
                margin-right: 2rem;
                margin-bottom: 2rem;
                font-size: 0.833rem;
                list-style: none;
                li {
                  line-height: 1.1rem;

                  :first-child {
                    text-transform: uppercase;
                    font-weight: 700;
                  }
                }
                a {
                  text-decoration: none;
                }
              }
            }
          `}
        >
          <div>
            <ul>
              <li>
                <GatsbyLink to={`/themas`}>themas</GatsbyLink>
              </li>
              {themas.map(({ node: thema }, i) => (
                <li>
                  <GatsbyLink to={`/themas/${thema.slug}`}>
                    {thema.name}
                  </GatsbyLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul>
              <li>
                <GatsbyLink to={`/activiteiten`}>activiteiten</GatsbyLink>
              </li>
              {activiteiten.map(({ node: activiteit }, i) => (
                <li>
                  <GatsbyLink to={`/activiteiten/${activiteit.slug}`}>
                    {activiteit.name}
                  </GatsbyLink>
                </li>
              ))}
            </ul>
            <ul>
              <li>
                <GatsbyLink to={`/prijzen`}>prijzen</GatsbyLink>
              </li>
              {prijzen.map(({ node: prijs }, i) => (
                <li>
                  <GatsbyLink to={`/prijzen/${prijs.slug}`}>
                    {prijs.name}
                  </GatsbyLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          css={css`
            background: ${colors.blue};
          `}
        >
          <span
            css={css`
              display: block;
              padding: 1.5rem 0;
              margin: 0 auto;
              text-align: center;
              && a {
                color: ${colors.orange};
                text-decoration: none;
              }
            `}
          >
            &copy; {new Date().getFullYear()} VRP | site by{" "}
            <OutboundLink href="https://www.web-hart.com">
              WEB-hart
            </OutboundLink>
          </span>
        </div>
      </footer>
    )}
  />
)

export default Footer

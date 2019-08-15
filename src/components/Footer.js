import React from "react"
import { colors } from "../site/styles"
import css from "@emotion/css"
import { ReactComponent as Logo } from "../images/svg/vrp-logo-white.svg"
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
        themas: allTermsJson(
          filter: { taxonomy: { eq: "thema" } }
          sort: { fields: name, order: ASC }
        ) {
          edges {
            node {
              name
              slug
            }
          }
        }
        activiteiten: allTermsJson(
          filter: {
            taxonomy: { eq: "category" }
            parent_term: { eq: "activiteiten" }
          }
          sort: { fields: name, order: ASC }
        ) {
          edges {
            node {
              name
              slug
            }
          }
        }
        prijzen: allTermsJson(
          filter: {
            taxonomy: { eq: "category" }
            parent_term: { eq: "prijzen" }
          }
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
          background: ${colors.blue};
          a {
            color: white;
            :hover {
              color: ${colors.orange};
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
          <Logo
            css={css`
              height: 2rem;
              width: auto;
              fill: white;
              :hover {
                fill: ${colors.orange};
              }
            `}
          />
          <span
            css={css`
              display: flex;
              align-self: center;
              font-size: 1.5rem;
              svg {
                margin: 0 0.25rem;
              }
            `}
          >
            <OutboundLink
              href="https://twitter.com/VRPvzw"
              alt="vrp twitter profile"
            >
              <Twitter />
            </OutboundLink>
            <OutboundLink
              href="https://facebook.com/VRPvzw"
              alt="vrp facebook profile"
            >
              <Facebook />
            </OutboundLink>
            <OutboundLink
              href="https://linkedin.com/company/vlaamse-vereniging-voor-ruimte-en-planning-vrp-/"
              alt="vrp linkedin profile"
            >
              <Linkedin />
            </OutboundLink>
          </span>
        </div>
        <div
          css={css`
            padding: 0 1rem;
            display: flex;
            flex-wrap: wrap;
            div {
              ul {
                margin: 0;
                padding: 0;
                margin-right: 2rem;
                margin-bottom: 1rem;
                font-size: 0.833rem;
                list-style: none;
                li {
                  color: white;
                  line-height: 1.5rem;
                  :first-of-type {
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
                <li key={i}>
                  <GatsbyLink to={`/thema/${thema.slug}`}>
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
                <li key={i}>
                  <GatsbyLink to={`/activiteiten/${activiteit.slug}`}>
                    {activiteit.name}
                  </GatsbyLink>
                </li>
              ))}
              <li>
                <GatsbyLink to={`/participatie-studio`}>
                  Participatie Studio
                </GatsbyLink>
              </li>
            </ul>
            <ul>
              <li>prijzen</li>
              {prijzen.map(({ node: prijs }, i) => (
                <li key={i}>
                  <GatsbyLink to={`/prijzen/${prijs.slug}`}>
                    {prijs.name}
                  </GatsbyLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul>
              <li>
                <GatsbyLink to={`/ruimte`}>Ruimte</GatsbyLink>
              </li>
            </ul>

            <ul>
              <li>
                <GatsbyLink to={`/over-vrp`}>Over VRP</GatsbyLink>
              </li>
              <li>
                <GatsbyLink to={`/over-vrp/lid-worden`}>Lid Worden</GatsbyLink>
              </li>
              <li>
                <GatsbyLink to={`/over-vrp/sponsors`}>Sponsors</GatsbyLink>
              </li>
              <li>
                <GatsbyLink to={`/over-vrp/partners`}>Partners</GatsbyLink>
              </li>
              <li>
                <GatsbyLink to={`/blog`}>Blog</GatsbyLink>
              </li>
              <li>
                <GatsbyLink to={`/nieuws`}>Nieuws</GatsbyLink>
              </li>
              <li>
                <GatsbyLink to={`/contact`}>Contact</GatsbyLink>
              </li>
            </ul>
            <ul>
              <li>
                <GatsbyLink to={`/startvrp`}>start@vrp</GatsbyLink>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Links</li>
              <li>
                <OutboundLink href={`http://www.gecoro.info/`}>
                  Gecoro
                </OutboundLink>
              </li>
              <li>
                <OutboundLink href={`https://deruimtenaar.wordpress.com/`}>
                  Blog - De Ruimtenaar
                </OutboundLink>
              </li>
              <li>
                <OutboundLink href={`http://www.gecoro.info/`}>
                  Gecoro
                </OutboundLink>
              </li>
            </ul>
            <ul>
              <li>
                <GatsbyLink to={`/vacatures`}>Vacatures</GatsbyLink>
              </li>
              <li>
                <OutboundLink
                  href={`https://webhart.one/vacatures/post-a-job/`}
                >
                  Vacature plaatsen
                </OutboundLink>
              </li>
            </ul>
          </div>
        </div>
        <div
          css={css`
            background: ${colors.orange};
            color: white;
          `}
        >
          <span
            css={css`
              display: block;
              padding: 1.5rem 0;
              margin: 0 auto;
              text-align: center;
              && a {
                color: ${colors.blue};
                :hover {
                  color: white;
                }
                text-decoration: none;
              }
            `}
          >
            &copy; {new Date().getFullYear()} VRP -{" "}
            <GatsbyLink to={`/privacyverklaring`}>Privacyverklaring</GatsbyLink>{" "}
            | site by{" "}
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

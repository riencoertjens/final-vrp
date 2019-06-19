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

const Footer = () => {
  return (
    <footer
      css={css`
        background: ${colors.orange};
        color: white;
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
              color: white;
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
          background: ${colors.blue};
        `}
      >
        <span
          css={css`
            display: block;
            padding: 1.5rem 0;
            margin: 0 auto;
            text-align: center;
            a {
              color: black;//${colors.orange};
              text-decoration: none;
            }
          `}
        >
          &copy; {new Date().getFullYear()} VRP | site by{" "}
          <OutboundLink href="https://www.web-hart.com">WEB-hart</OutboundLink>
        </span>
      </div>
    </footer>
  )
}

export default Footer

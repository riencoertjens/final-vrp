import React from "react"
import { colors } from "../site/styles"
import css from "@emotion/css"

const Footer = () => {
  return (
    <footer
      css={css`
        background: ${colors.orange};
        color: white;
      `}
    >
      hello footer
    </footer>
  )
}

export default Footer

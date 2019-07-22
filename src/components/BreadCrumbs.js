import React from "react"
import GatsbyLink from "gatsby-link"
import { colors } from "../site/styles"
import css from "@emotion/css"

const BreadCrumbs = ({ crumbs, ...restProps }) => {
  return (
    <div
      {...restProps}
      css={css`
        font-size: 0.8rem;
        background: ${colors.blue};
        color: white;
        padding: 0.5rem 1rem;
        a,
        span {
          color: white;
          text-transform: capitalize;
        }
      `}
    >
      {crumbs.map((crumb, i) => (
        <React.Fragment key={i}>
          {crumb.link ? (
            <GatsbyLink to={crumb.link}>{crumb.label}</GatsbyLink>
          ) : (
            <span>{crumb.label}</span>
          )}
          {i !== crumbs.length - 1 && ` > `}
        </React.Fragment>
      ))}
    </div>
  )
}

export default BreadCrumbs

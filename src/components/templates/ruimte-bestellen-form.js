import React from "react"
import { colors, Button } from "../../site/styles"
import css from "@emotion/css"
import { StaticQuery, graphql } from "gatsby"

const RuimteBestellenForm = () => (
  <StaticQuery
    query={graphql`
      {
        ruimtes: allCollectionsJson(
          sort: { fields: acf___datum_publicatie }
          filter: { post_type: { eq: "ruimte" } }
        ) {
          edges {
            node {
              post_title
              post_name
            }
          }
        }
      }
    `}
    render={({ ruimtes }) => (
      <form
        name="ruimte-bestellen-form"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        action="/thanks"
        css={css`
          padding-bottom: 1rem;
          label {
            width: 100%;
            display: block;
            margin-bottom: 1rem;
            input:not([type="radio"]):not([type="checkbox"]),
            textarea {
              width: 100%;
              border: 1px solid ${colors.grey};
              border-radius: 5px;
              padding: 0.25rem;
              background: whitesmoke;
            }
            textarea {
              margin-top: 0.5rem;
              flex: 1 1 100%;
              resize: none;
            }
            input[type="checkbox"],
            input[type="radio"] {
              margin-right: 0.5rem;
            }
            select {
              margin-left: 0.5rem;
            }
          }
        `}
      >
        <input type="hidden" name="form-name" value="ruimte-bestellen-form" />
        <input type="hidden" name="bot-field" />
        <label>
          <span>Voornaam en familienaam:</span>
          <input type="text" name="name" required />
        </label>
        <label>
          <span>Postadres: Straat + nr | Postcode + gemeente</span>
          <input type="text" name="adres" required />
        </label>
        <label>
          <span>email</span>
          <input type="email" name="email" required />
        </label>
        <label>
          <span>ruimte nummer:</span>
          <select>
            {ruimtes.edges.map(({ node: ruimte }) => (
              <option value={ruimte.post_name}>{ruimte.post_title}</option>
            ))}
          </select>
        </label>
        <Button>bestellen</Button>
      </form>
    )}
  />
)

export default RuimteBestellenForm

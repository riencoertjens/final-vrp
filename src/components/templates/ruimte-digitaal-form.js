import React from "react"
import { colors, Button } from "../../site/styles"
import css from "@emotion/css"

const RuimteDigitaalForm = () => (
  <form
    name="ruimte-digitaal-form"
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
    <input type="hidden" name="form-name" value="ruimte-digitaal-form" />
    <input type="hidden" name="bot-field" />
    <label>
      <span>Voornaam en familienaam:</span>
      <input type="text" name="name" required />
    </label>
    <label>
      <span>email:</span>
      <input type="email" name="email" required />
    </label>
    <label>
      <span>ik wens:</span>
    </label>
    <label>
      <input type="radio" name="toegang" value="individueel" />
      <span>Als individueel lid toegang te krijgen tot archief € 30</span>
    </label>
    <label>
      <input type="radio" name="toegang" value="organisatie" />
      <span>
        Toegang tot het volledig archief voor heel mijn bedrijf/vereniging (€
        275)
      </span>
    </label>
    <Button>bestellen</Button>
  </form>
)

export default RuimteDigitaalForm

import React from "react"
import { colors, Button } from "../../site/styles"
import css from "@emotion/css"
import Obfuscate from "react-obfuscate"

const LidwordenForm = () => {
  return (
    <>
      <h2>registratieformulier</h2>
      <form
        name="lid-worden-form"
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
          }
        `}
      >
        <input type="hidden" name="form-name" value="lid-worden-form" />
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
          <span>Land</span>
          <input type="text" name="land" required />
        </label>
        <label>
          <span>Geboortedatum (DD/MM/YYYY)</span>
          <input type="date" name="birthday" required />
        </label>
        <label>
          <span>email</span>
          <input type="email" name="email" required />
        </label>
        <label>
          <span>telefoon</span>
          <input type="phone" name="telefoon" required />
        </label>
        <label>
          <span>promo code</span>
          <input type="text" name="promo-code" />
        </label>
        <label>
          <span>Facturatieadres (indien anders dan postadres)</span>
          <input type="text" name="facturatie-adres" />
        </label>
        <label>
          <span>Facturatie e-mail (optioneel)</span>
          <input type="text" name="facturatie-email" />
        </label>
        <label>
          <span>BTW-nummer (optioneel)</span>
          <input type="text" name="btw" />
        </label>
        <label>
          <span>PO-nummer (optioneel)</span>
          <input type="text" name="PO-nummer" />
        </label>
        <label>
          <input
            type="radio"
            value="lid-worden"
            name="lidmaatschap-type"
            required
          />
          <span>Ik wil lid worden (€ 125)</span>
        </label>
        <label>
          <input
            type="radio"
            value="lid-worden"
            name="lidmaatschap-type"
            required
          />
          <span>Ik wil lid worden - buitenland (€ 175)</span>
        </label>
        <label>
          <input
            type="radio"
            value="student"
            name="lidmaatschap-type"
            required
          />
          <span>
            Ik wil lid worden en ben student (€ 45) -&gt; scan studentenkaart
            naar{" "}
            <Obfuscate
              email="info@vrp.be"
              headers={{
                subject: `studentenkaart lidmaatschap`,
              }}
            />
          </span>
        </label>
        <label>
          <input
            type="radio"
            value="65plus"
            name="lidmaatschap-type"
            required
          />
          <span>
            Ik wil lid worden en ben 65-plusser (€ 75) -&gt; scan paspoort naar{" "}
            <Obfuscate
              email="info@vrp.be"
              headers={{
                subject: `65-plus lidmaatschap`,
              }}
            />
          </span>
        </label>
        <label>
          <input
            type="radio"
            value="gecoro"
            name="lidmaatschap-type"
            required
          />
          <span>Ik wil lid worden en ben lid van een Gecoro (€ 75)</span>
        </label>
        <label>
          <input
            type="radio"
            value="ruimte-binnenland"
            name="lidmaatschap-type"
            required
          />
          <span>Ik wil een binnenlands abonnement op Ruimte (€ 105)</span>
        </label>
        <label>
          <input
            type="radio"
            value="ruimte-buitenland"
            name="lidmaatschap-type"
            required
          />
          <span>Ik wil een buitenlands abonnement op Ruimte (€ 155)</span>
        </label>
        <Button>verzenden</Button>
      </form>
    </>
  )
}

export default LidwordenForm

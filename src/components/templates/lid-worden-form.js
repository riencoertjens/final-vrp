import React from "react"
import { colors, Button } from "../../site/styles"
import css from "@emotion/css"
import Obfuscate from "react-obfuscate"

const LidwordenForm = () => {
  return (
    <>
      <h2>registratieformulier</h2>
      <ul>
        <li>
          Prijs lidmaatschap (inclusief abonnement): € 115 (België) | € 155
          (buitenland) | € 65 (student)
        </li>
        <li>
          Prijs jaarabonnement (zonder lidmaatschap): € 95 (België) | € 135
          (buitenland).
        </li>
        <li>Een los nummer van Ruimte kunt u via deze link bestellen</li>
      </ul>
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
          <span>Facturatieadres (indien anders dan postadres)</span>
          <input type="text" name="facturatie-adres" required />
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
          <span>Ik wil lid worden (inclusief abonnement)</span>
        </label>
        <label>
          <input
            type="radio"
            value="student"
            name="lidmaatschap-type"
            required
          />
          <span>
            Ik wil lid worden als student. (Studentenkaart →{" "}
            <Obfuscate
              email="info@vrp.be"
              headers={{
                subject: `studentenkaart lidmaatschap`,
              }}
            />
            )
          </span>
        </label>
        <label>
          <input
            type="radio"
            value="abonnement-ruimte"
            name="lidmaatschap-type"
            required
          />
          <span>Ik wil enkel een abonnement op Ruimte.</span>
        </label>
        <Button>verzenden</Button>
      </form>
    </>
  )
}

export default LidwordenForm

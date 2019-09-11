// http://webhart.one/wp-json/vrp-api/v1/activity/submission-count/14830

import React, { Component } from "react"
import FormFields from "./FormFields"
import { colors, Button } from "../site/styles"
import css from "@emotion/css"

class ActivityForm extends Component {
  constructor(props) {
    super(props)
    this.state = { places: false }
  }

  fetchPlaces = id => {
    fetch(
      `https://webhart.one/wp-json/vrp-api/v1/activity/submission-count/${id}`
    )
      .then(response => response.json())
      .then(placesData => {
        this.setState({
          places: placesData,
        })
      })
      .catch(console.error.bind(console))
  }

  render() {
    const { activity } = this.props
    const close_date = activity.acf.close_date
      ? new Date(activity.acf.close_date)
      : false
    const now = new Date()

    const { places } = this.state

    let formStatus = false
    let formLoaded = false

    // console.log(close_date)

    if (!close_date || close_date > now) {
      if (places === false) {
        formStatus = "loading"
        setTimeout(() => {
          this.fetchPlaces(this.props.activity.wordpress_id)
        }, 5000)
      } else {
        if (
          parseInt(places.places) < 0 ||
          parseInt(places.count) < parseInt(places.places)
        ) {
          formStatus = "open"
        } else {
          formStatus = "full"
        }
      }
    } else {
      formStatus = "closed"
    }

    switch (formStatus) {
      case "closed":
        return (
          <section id="inschrijvingsformulier">
            <h3>inschrijven.</h3>
            <p>helaas, inschrijvingen voor deze activiteit zijn gesloten</p>
          </section>
        )

      case "full":
        return (
          <section id="inschrijvingsformulier">
            <h3>inschrijven.</h3>
            <p>helaas, alle plaatsen voor deze activiteit zijn volzet</p>
          </section>
        )

      case "open":
        formLoaded = true
      // break
      case "loading":
        return (
          <section id="inschrijvingsformulier">
            <h3>inschrijven:</h3>
            {!formLoaded && <p>formulier wordt geladen...</p>}
            <form
              name={activity.title}
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              action="/thanks"
              css={css`
                padding-bottom: 1rem;
                label {
                  display: flex;
                  flex-wrap: wrap;
                  width: 100%;
                  margin-bottom: 1rem;
                  input,
                  textarea {
                    border: 1px solid ${colors.grey};
                    border-radius: 5px;
                    padding: 0.25rem;
                    background: whitesmoke;
                  }
                  input {
                    flex: 1 0 250px;
                    margin-left: 1rem;
                  }
                  input[type="radio"],
                  input[type="checkbox"] {
                    flex: 0 0 auto;
                    margin-left: 0;
                    margin-right: 1rem;
                  }
                  textarea {
                    margin-top: 0.5rem;
                    height: 150px;
                    flex: 1 1 100%;
                    resize: none;
                  }
                }
              `}
            >
              <fieldset
                disabled={formLoaded ? false : true}
                css={css`
                  opacity: ${formLoaded ? 1 : 0.2};
                  border: none;
                  padding: 0;
                `}
              >
                <input type="hidden" name="form-name" value={activity.title} />
                <input type="hidden" name="bot-field" />
                <input
                  type="hidden"
                  name="activity_id"
                  value={activity.wordpress_id}
                />
                {activity.acf.register_form.map((form, i) => (
                  <FormFields
                    postContent={form.post_content}
                    key={i}
                    formId={form.id}
                  />
                ))}
                <Button right={1}>verzenden</Button>
              </fieldset>
            </form>
          </section>
        )

      default:
        break
    }
  }
}

export default ActivityForm

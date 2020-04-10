import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/webhart-components/SEO"
import WpBlocksContent from "../components/WpBlocksContent"
import GoogleMap from "../components/Map"

import css from "@emotion/css"
import { OutboundLink } from "../components/webhart-components"
import { colors, Button } from "../site/styles"

const ContactPage = () => (
  <StaticQuery
    query={graphql`
      {
        pageInfo: collectionsJson(
          post_name: { eq: "contact" }
          post_type: { eq: "page" }
        ) {
          post_title
          post_name
          post_content
        }
      }
    `}
    render={({ pageInfo }) => (
      <Layout>
        <SEO title="Contact" pathname="contact" />
        <section>
          <h1>contact</h1>
          <div
            css={css`
              display: flex;
              flex-wrap: wrap;
            `}
          >
            <WpBlocksContent
              content={pageInfo.post_content}
              css={css`
                flex: 1 1 660px;
              `}
            />
            <div
              css={css`
                flex: 0 1 350px;
              `}
            >
              <form
                name="contact-page-form"
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
                    justify-content: space-between;
                    margin-bottom: 1rem;
                    input,
                    textarea {
                      border: 1px solid ${colors.grey};
                      border-radius: 5px;
                      padding: 0.25rem;
                      background: whitesmoke;
                    }
                    input {
                      flex: 0 0 250px;
                    }
                    textarea {
                      margin-top: 0.5rem;
                      flex: 1 1 100%;
                      resize: none;
                    }
                  }
                `}
              >
                <input
                  type="hidden"
                  name="form-name"
                  value="contact-page-form"
                />
                <input type="hidden" name="bot-field" />
                <label>
                  <span>Naam:</span>
                  <input type="text" name="name" />
                </label>
                <label>
                  <span>Telefoon:</span>
                  <input type="phone" name="telefoon" />
                </label>
                <label>
                  <span>Email:</span>
                  <input type="email" required name="email" />
                </label>
                <label>
                  <span>Uw vraag of bericht:</span>
                  <textarea rows="5" name="bericht" required></textarea>
                </label>
                <Button>verzenden</Button>
              </form>
            </div>
          </div>
          <div
            css={css`
              height: 500px;
              margin: 0 -1rem -1rem;
            `}
          >
            <GoogleMap
              apiKey={process.env.GATSBY_MAPS_API}
              location={{
                lat: 51.231908,
                lng: 4.425731,
              }}
              // markerIcon={markerIcon}
              markerInfoComponent={
                <OutboundLink href="https://www.google.com/maps/dir//Vlaamse+Vereniging+voor+Ruimte+en+Planning,+Damplein+27,+2060+Antwerpen">
                  wegbeschrijving
                </OutboundLink>
              }
              options={{
                center: {
                  lat: 51.231908,
                  lng: 4.425731,
                }, //activity.acf.location.acf.address,
                zoom: 15,
                disableDefaultUI: true,
                styles: [],
              }}
            />
          </div>
        </section>
      </Layout>
    )}
  />
)
export default ContactPage

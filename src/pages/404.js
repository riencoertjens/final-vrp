import React, { Component } from "react"
import Layout from "../components/Layout"
import SEO from "../components/webhart-components/SEO"
import GatsbyLink from "gatsby-link"

class ErrorPage extends Component {
  render() {
    return (
      <Layout>
        <SEO title="error: 404 page not found"></SEO>
        <section>
          <h1>Error: 404 pagina niet gevonde</h1>
          <p>sorry, deze pagina werd niet gevonden.</p>
          <p>
            Probeer de <GatsbyLink to="/search">zoekfunctie</GatsbyLink> van
            deze site om de gewenste pagina terug te vinden.
          </p>
        </section>
      </Layout>
    )
  }
}

export default ErrorPage

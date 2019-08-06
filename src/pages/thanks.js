import React, { Component } from "react"
import Layout from "../components/Layout"
import SEO from "../components/webhart-components/SEO"

class ThanksPage extends Component {
  render() {
    return (
      <Layout>
        <SEO title="bericht verzonden"></SEO>
        <section>
          <h1>Verzonden</h1>
          <p>Bedankt, Uw bericht werd met succes verzonden.</p>
        </section>
      </Layout>
    )
  }
}

export default ThanksPage

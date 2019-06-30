import React, { Component } from "react"
import Layout from "../components/Layout"

class ErrorPage extends Component {
  render() {
    return (
      <Layout>
        <section>
          <h1>Error: 404 not found</h1>
          <p>oopsiedaisy</p>
        </section>
      </Layout>
    )
  }
}

export default ErrorPage

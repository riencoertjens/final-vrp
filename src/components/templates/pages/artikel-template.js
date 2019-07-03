import React from "react"
import Layout from "../../Layout"
import { graphql } from "gatsby"

const ArtikelPageTemplate = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <section>
        <h1>ruimte artikel</h1>
      </section>
    </Layout>
  )
}

export default ArtikelPageTemplate

export const query = graphql`
  query($slug: String!, $ruimteSlug: String!) {
    artikel: wordpressWpRuimteArtikel(slug: { eq: $slug }) {
      title
    }
    ruimte: wordpressWpRuimteArtikel(slug: { eq: $ruimteSlug }) {
      slug
    }
  }
`

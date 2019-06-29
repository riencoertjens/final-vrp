import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import PostList from "../components/PostList"
import SEO from "../components/webhart-components/SEO"

// const RuimteList = ({ruimtes}) => {
// }
const AllRuimtePage = () => (
  <StaticQuery
    query={graphql`
      {
        allRuimte: allWordpressWpRuimte(sort: {fields: acf___datum_publicatie, order: DESC}) {
          edges {
            node {
              slug
              content
              content_raw
              acf {
                datum_publicatie
                nummer
              }
              ...BlockListFragment_ruimte
            }
          }
        }
      }
    `}
    render={({ allRuimte }) => (
      <Layout>
        <SEO title="Ruimte" />
        <section>
          <h1>Ruimte</h1>
          <PostList posts={[allRuimte.edges]} />
        </section>
      </Layout>
    )}
  />
)
export default AllRuimtePage

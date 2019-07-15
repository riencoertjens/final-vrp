import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import PostList from "../components/PostList"
import SEO from "../components/webhart-components/SEO"

const ActivitiesPage = () => (
  <StaticQuery
    query={graphql`
      {
        activities: allWordpressWpActivities(
          sort: { fields: acf___date, order: DESC }
        ) {
          edges {
            node {
              ...BlockListFragment_activity
            }
          }
        }
        prijzen: allWordpressWpPrijs(sort: { fields: date, order: DESC }) {
          edges {
            node {
              ...BlockListFragment_price
            }
          }
        }
      }
    `}
    render={({ activities, prijzen }) => (
      <Layout>
        <SEO title="activiteiten" />
        <section>
          <h1>Activiteiten</h1>
          <PostList posts={[activities.edges, prijzen.edges]} />
        </section>
      </Layout>
    )}
  />
)
export default ActivitiesPage

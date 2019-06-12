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
          sort: { fields: date, order: DESC }
        ) {
          edges {
            node {
              ...BlockListFragment_activity
            }
          }
        }
      }
    `}
    render={({ activities }) => (
      <Layout>
        <SEO title="activiteiten" />
        <p>hello world</p>

        <PostList posts={[activities.edges]} />
      </Layout>
    )}
  />
)
export default ActivitiesPage

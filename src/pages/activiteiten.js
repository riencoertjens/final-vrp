import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import PostList from "../components/PostList"

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
        <PostList posts={[activities.edges]} />
        <p>hello world</p>
      </Layout>
    )}
  />
)
export default ActivitiesPage

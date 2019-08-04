import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import PostList from "../components/PostList"
import SEO from "../components/webhart-components/SEO"

const ActivitiesPage = () => (
  <StaticQuery
    query={graphql`
      {
        activities: allCollectionsJson(
          filter: { post_type: { in: ["activiteit"] } }
          sort: { fields: acf___date, order: DESC }
        ) {
          edges {
            node {
              ...PostListFragment
            }
          }
        }
      }
    `}
    render={({ activities }) => (
      <Layout>
        <SEO title="activiteiten" />
        <section>
          <h1>Activiteiten</h1>
          <PostList posts={activities} />
        </section>
      </Layout>
    )}
  />
)
export default ActivitiesPage

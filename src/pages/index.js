import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import PostList from "../components/PostList"

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      {
        posts: allWordpressPost(sort: { fields: date, order: DESC }) {
          edges {
            node {
              ...BlockListFragment_post
            }
          }
        }
        activities: allWordpressWpActivities(
          sort: { fields: date, order: DESC }
        ) {
          edges {
            node {
              ...BlockListFragment_activity
            }
          }
        }
        ruimte: allWordpressWpRuimte(sort: { fields: date, order: DESC }) {
          edges {
            node {
              ...BlockListFragment_ruimte
            }
          }
        }
        prices: allWordpressWpPrijs(sort: { fields: date, order: DESC }) {
          edges {
            node {
              ...BlockListFragment_price
            }
          }
        }
      }
    `}
    render={({ posts, activities, prices, ruimte }) => (
      <Layout>
        <PostList
          posts={[posts.edges, activities.edges, prices.edges, ruimte.edges]}
        />
        <p>hello world</p>
      </Layout>
    )}
  />
)
export default IndexPage

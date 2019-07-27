import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import PostList from "../components/PostList"

const NieuwsPage = () => {
  return (
    <StaticQuery
      query={graphql`
        {
          posts: allCollectionsJson(filter: { post_type: { eq: "post" } }) {
            edges {
              node {
                ...PostListFragment
              }
            }
          }
        }
      `}
      render={({ posts }) => (
        <Layout>
          <section>
            <h1>Nieuws</h1>
            <PostList posts={posts}></PostList>
          </section>
        </Layout>
      )}
    />
  )
}

export default NieuwsPage

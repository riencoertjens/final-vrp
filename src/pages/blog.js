import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import PostList from "../components/PostList"

const BlogPage = () => {
  return (
    <StaticQuery
      query={graphql`
        {
          posts: allCollectionsJson(filter: { post_type: { eq: "blog" } }) {
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
            <h1>Blog</h1>
            <PostList posts={posts}></PostList>
          </section>
        </Layout>
      )}
    />
  )
}

export default BlogPage

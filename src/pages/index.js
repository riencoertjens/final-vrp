import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import PostList from "../components/PostList"
import { AspectRatioBox } from "../components/webhart-components"
import css from "@emotion/css"

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
        <AspectRatioBox
          ratio={1200 / 630}
          css={css`
            transition: 0.2s;
            background: grey;
            .gatsby-image-wrapper {
              transition: 0.1s;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            }
            &:hover {
              & .gatsby-image-wrapper {
                transform: scale(1.05);
              }
              & > div > div {
                background: rgba(255, 255, 255, 0.85);
              }
            }
          `}
        />
        <PostList
          posts={[posts.edges, activities.edges, prices.edges, ruimte.edges]}
        />
      </Layout>
    )}
  />
)
export default IndexPage

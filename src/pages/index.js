import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import PostList from "../components/PostList"

import css from "@emotion/css"
import { colors } from "../site/styles"
import { MqMin } from "../components/webhart-components/style-functions"
import HeroSlider from "../components/HeroSlider"

const IndexPage = () => {
  return (
    <StaticQuery
      query={graphql`
        {
          pageInfo: wordpressPage(slug: { eq: "home" }) {
            title
            featured_posts {
              post_title
              post_name
              post_date
              post_type
              content_raw
              featured_media {
                ...HeroImageFragment
              }
            }
          }
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
      render={({ pageInfo, posts, activities, prices, ruimte }) => (
        <Layout>
          <HeroSlider posts={pageInfo.featured_posts} />
          <div
            css={css`
              ${MqMin("700px")} {
                display: grid;
                grid-template-columns: 1fr minmax(200px, 300px);
              }
            `}
          >
            <section>
              <PostList
                posts={[
                  posts.edges,
                  activities.edges,
                  prices.edges,
                  ruimte.edges,
                ]}
              />
            </section>
            <aside
              css={css`
                background: ${colors.orange};
                padding: 1rem;
                color: white;
              `}
            >
              <h2>activiteiten</h2>
              <p>
                Enim commodo adipisicing dolore dolore aute veniam est aliqua
                amet cupidatat anim enim nostrud labore. Tempor do magna sint
                esse et adipisicing. Nostrud irure ut in esse elit ad ad. Ea sit
                exercitation tempor sint incididunt enim consequat ullamco id
                amet nisi velit. Enim adipisicing deserunt nisi occaecat cillum
                est anim laboris Lorem sit exercitation. Quis nulla tempor anim
                non esse cillum laborum consequat est mollit minim. Aliquip sint
                pariatur magna Lorem officia velit velit dolore id cupidatat
                fugiat qui ipsum.
              </p>
            </aside>
          </div>
        </Layout>
      )}
    />
  )
}

export default IndexPage

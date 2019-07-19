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
          pageInfo: collectionsJson(
            post_type: { eq: "page" }
            post_name: { eq: "home" }
          ) {
            internal {
              type
            }
            post_title
            acf {
              featured_posts: in_de_kijker {
                ...HeroSliderFragment
              }
            }
          }
          posts: allCollectionsJson(
            filter: {
              post_type: { in: ["ruimte", "activity", "prijs", "post"] }
            }
            sort: { fields: [acf___datum_publicatie, post_date], order: DESC }
          ) {
            edges {
              node {
                ...PostListFragment
              }
            }
          }
        }
      `}
      render={({ pageInfo, posts }) => (
        <Layout>
          <HeroSlider posts={pageInfo.acf.featured_posts} />
          <div
            css={css`
              ${MqMin("700px")} {
                display: grid;
                grid-template-columns: 1fr minmax(200px, 300px);
              }
            `}
          >
            <section>
              <PostList posts={posts} multiTypes />
            </section>
            <aside
              css={css`
                background: ${colors.orange};
                padding: 1rem;
                color: white;
                h2 {
                  color: inherit;
                  margin-top: 0;
                }
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

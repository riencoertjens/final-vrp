import React from "react"
import { graphql } from "gatsby"
import Layout from "../../Layout"
import PostList from "../../PostList"

import css from "@emotion/css"
import { colors } from "../../../site/styles"
import { MqMin } from "../../webhart-components/style-functions"
import HeroSlider from "../../HeroSlider"
import GatsbyLink from "gatsby-link"
import ActivityList from "../../ActivityList"

const IndexPage = ({ data: { pageInfo, in_de_kijker, activities } }) => (
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
        <PostList posts={in_de_kijker} multiTypes />
      </section>
      <aside
        css={css`
          background: ${colors.orange};
          padding: 1rem;
          color: white;
          h2 {
            color: white;
            margin-top: 0;
          }
          a {
            color: white;
            text-decoration: none;
          }
        `}
      >
        <GatsbyLink to="/activiteiten">
          <h2>Activiteiten</h2>
        </GatsbyLink>
        <p>
          <ActivityList homePage activities={activities} />
        </p>
      </aside>
    </div>
  </Layout>
)

export default IndexPage

export const homepagequery = graphql`
  query($in_de_kijker: [Int]!) {
    pageInfo: collectionsJson(
      post_type: { eq: "page" }
      post_name: { eq: "home" }
    ) {
      internal {
        type
      }
      post_title
      acf {
        featured_posts: slider_posts {
          ...HeroSliderFragment
        }
      }
    }

    activities: allCollectionsJson(
      filter: { post_type: { in: ["activiteit"] } }
      sort: { fields: acf___date, order: ASC }
    ) {
      edges {
        node {
          title: post_title
          slug: post_name
          pathname
          acf {
            date
            is_vrp
            date_end
            date_formatted: date(formatString: "DD-MM-Y")
            end_date_formatted: date_end(formatString: "DD-MM-Y")
          }
        }
      }
    }

    in_de_kijker: allCollectionsJson(
      filter: { ID: { in: $in_de_kijker } }
      sort: { fields: post_date, order: DESC }
    ) {
      edges {
        node {
          ...PostListFragment
        }
      }
    }
  }
`

import React from "react"
import { graphql } from "gatsby"
import Layout from "../../Layout"
import PostList from "../../PostList"

import css from "@emotion/css"
import { colors, Button } from "../../../site/styles"
import { MqMin } from "../../webhart-components/style-functions"
import HeroSlider from "../../HeroSlider"
import GatsbyLink from "gatsby-link"
import ActivityList from "../../ActivityList"

import { FaAngleRight as ArrowRightIcon } from "react-icons/fa"
import { sortPosts } from "../../../site/utils"

const IndexPage = ({
  data: { pageInfo, slider_posts, in_de_kijker, activities },
  pageContext: { in_de_kijker: in_de_kijkerIDs, slider_posts: slider_postIDs },
}) => (
  <Layout>
    <HeroSlider
      posts={slider_posts.edges.sort(
        (postA, postB) =>
          slider_postIDs.indexOf(postA.node.ID) -
          slider_postIDs.indexOf(postB.node.ID)
      )}
    />
    <div
      css={css`
        ${MqMin("700px")} {
          display: grid;
          grid-template-columns: 1fr minmax(200px, 300px);
        }
      `}
    >
      <section>
        <PostList posts={sortPosts(in_de_kijker, in_de_kijkerIDs)} multiTypes />
      </section>
      <aside
        css={css`
          background: ${colors.orange};
          padding: 1rem;
          h2 {
            color: white;
            margin: 0;
            svg {
              transition: 0.2s;
              height: 1rem;
            }
          }
          li a {
            :hover h2 svg {
              transform: translateX(0.5rem);
            }
            color: inherit;
            text-decoration: none;
          }
        `}
      >
        <GatsbyLink to="/activiteiten">
          <h2>
            Activiteiten
            <ArrowRightIcon />
          </h2>
        </GatsbyLink>
        <ActivityList homePage activities={activities} />
        <Button component={GatsbyLink} light={1} to="/activiteiten" right={1}>
          toon alle
        </Button>
      </aside>
    </div>
  </Layout>
)

export default IndexPage

export const homepagequery = graphql`
  query(
    $in_de_kijker: [Int]!
    $featured_activities: [Int]!
    $slider_posts: [Int]!
  ) {
    pageInfo: collectionsJson(
      post_type: { eq: "page" }
      post_name: { eq: "home" }
    ) {
      internal {
        type
      }
      post_title
    }

    slider_posts: allCollectionsJson(
      filter: { ID: { in: $slider_posts } }
      sort: { fields: post_date, order: DESC }
    ) {
      edges {
        node {
          ID
          ...HeroSliderFragment
        }
      }
    }

    activities: allCollectionsJson(
      filter: {
        post_type: { in: ["activiteit"] }
        ID: { in: $featured_activities }
      }
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

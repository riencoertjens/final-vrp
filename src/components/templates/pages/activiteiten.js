import React from "react"
import { graphql } from "gatsby"
import Layout from "../../Layout"
import PostList from "../../PostList"
import ActivityList from "../../ActivityList"
import SEO from "../../webhart-components/SEO"
import css from "@emotion/css"
import { sortPosts } from "../../../site/utils"

const ActivitiesPage = ({
  data: { activities, in_de_kijker },
  pageContext: { in_de_kijker: in_de_kijkerIDs },
}) => {
  return (
    <Layout>
      <SEO title="activiteiten" pathname={`activiteiten`} />

      <section>
        <h1>Activiteiten</h1>
        <h2>in de kijker</h2>
        <PostList posts={sortPosts(in_de_kijker, in_de_kijkerIDs)} multiTypes />
      </section>
      <section>
        <h2>kalender</h2>
        <ActivityList
          activities={activities}
          css={css`
            li {
              &:nth-last-of-type(odd) {
                background-color: whitesmoke;
              }
            }
          `}
        />
      </section>
    </Layout>
  )
}
export default ActivitiesPage

export const query = graphql`
  query($in_de_kijker: [Int]!) {
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

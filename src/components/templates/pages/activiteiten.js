import React from "react"
import { graphql } from "gatsby"
import Layout from "../../Layout"
import PostList from "../../PostList"
import SEO from "../../webhart-components/SEO"
import GatsbyLink from "gatsby-link"
import css from "@emotion/css"
import { colors } from "../../../site/styles"
import _ from "underscore"

const ActivitiesPage = ({ data: { activities, in_de_kijker } }) => {
  const grouped_activities = _.groupBy(activities.edges, ({ node }) => {
    const date = new Date(node.acf.date)
    const date_end = new Date(node.acf.date_end)
    const now = new Date()
    return date - now > 1 || date_end - now > 1 ? "future" : "past"
  })

  return (
    <Layout>
      <SEO title="activiteiten" />
      <section>
        <h1>Activiteiten</h1>
        <h2>in de kijker</h2>
        <PostList posts={in_de_kijker} />
      </section>
      <section
        css={css`
          ul {
            list-style: none;
            padding: 0;
          }
        `}
      >
        <h2>en ook</h2>
        <ul>
          {grouped_activities.future.map(({ node: activity }, i) => (
            <ActivityLi activity={activity} key={i} />
          ))}
        </ul>
        <h3>voorbij activiteiten</h3>
        <ul>
          {_.sortBy(grouped_activities.past, ({ node }) => {
            return node.acf.date
          })
            .reverse()
            .map(({ node: activity }, i) => (
              <ActivityLi activity={activity} key={i} past={true} />
            ))}
        </ul>
      </section>
    </Layout>
  )
}
export default ActivitiesPage

const ActivityLi = ({ activity, past }) => (
  <li
    css={css`
      display: flex;
      justify-content: space-between;
      color: ${colors.grey};
      padding: 0.5rem 1rem;
      margin: 0 -1rem;
      &:nth-last-of-type(odd) {
        background-color: whitesmoke;
      }
      p {
        display: flex;
        margin: 0;
        flex-wrap: wrap;
        span {
          margin-right: 0.25rem;
        }
      }
      a {
        text-align: right;
      }
      ${past && `filter: grayscale(1);`}
    `}
  >
    <p>
      <span>
        {activity.acf.date_formatted}
        {activity.acf.date_end && ` - `}
      </span>
      <span>{activity.acf.date_end && activity.acf.end_date_formatted}</span>
    </p>
    <GatsbyLink to={activity.pathname}>{activity.title}</GatsbyLink>
  </li>
)

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

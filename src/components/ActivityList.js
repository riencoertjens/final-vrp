import React, { Component } from "react"
import _ from "underscore"
import css from "@emotion/css"
import GatsbyLink from "gatsby-link"
import { colors, Button } from "../site/styles"
import { ReactComponent as VRPLabelInvert } from "../images/svg/vrp-label-invert.svg"
import { ReactComponent as VRPLabel } from "../images/svg/vrp-label.svg"

class ActivityList extends Component {
  constructor(props) {
    super(props)
    this.state = { showAll: false }
  }
  render() {
    const { activities, homePage, ...restProps } = this.props
    const { showAll } = this.state

    const grouped_activities = _.groupBy(activities.edges, ({ node }) => {
      const date = new Date(node.acf.date)
      const date_end = new Date(node.acf.date_end)
      const now = new Date()
      return date - now > 1 || date_end - now > 1 ? "future" : "past"
    })

    return (
      <div
        {...restProps}
        css={css`
          ul {
            list-style: none;
            padding: 0;
          }
        `}
      >
        <ul>
          {grouped_activities.future.map(({ node: activity }, i) => (
            <ActivityLi activity={activity} key={i} homePage={homePage} />
          ))}
        </ul>
        {!homePage && (
          <>
            <h3>voorbije activiteiten</h3>

            <ul>
              {_.sortBy(grouped_activities.past, ({ node }) => {
                return node.acf.date
              })
                .reverse()
                .map(
                  ({ node: activity }, i) =>
                    (showAll || i < 5) && (
                      <ActivityLi activity={activity} key={i} past={true} />
                    )
                )}
            </ul>
            <Button onClick={() => this.setState({ showAll: !showAll })}>
              {showAll ? "verberg" : "toon alles"}
            </Button>
          </>
        )}
      </div>
    )
  }
}

export default ActivityList

const ActivityLi = ({ activity, past, homePage }) => (
  <li css={homePage ? ActivityLiStyleHome : ActivityLiStyle(past || false)}>
    <p>
      <span>
        {activity.acf.date_formatted}
        {activity.acf.date_end && ` - `}
      </span>
      <span>{activity.acf.date_end && activity.acf.end_date_formatted}</span>
    </p>

    <GatsbyLink to={activity.pathname}>
      {activity.acf.is_vrp && (homePage ? <VRPLabelInvert /> : <VRPLabel />)}
      {activity.title}
    </GatsbyLink>
  </li>
)

const ActivityLiStyle = past => {
  return css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    color: ${colors.grey};
    padding: 0.5rem 1rem;
    margin: 0 -1rem;

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
      svg {
        height: 1rem;
        margin-right: 0.5rem;
        vertical-align: bottom;
      }
    }
    ${past && `filter: grayscale(1);`}
  `
}

const ActivityLiStyleHome = () => css`
  color: white;
  padding: 0.5rem 1rem;
  margin: 0 -1rem;
  p {
    display: flex;
    margin: 0;
    font-size: 0.75rem;
    flex-wrap: wrap;
    span {
      margin-right: 0.25rem;
    }
  }
  a {
    font-weight: 600;
    text-decoration: none;
    svg {
      height: 1rem;
      margin-right: 0.25rem;
      vertical-align: middle;
    }
  }
`

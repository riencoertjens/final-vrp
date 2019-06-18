/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      activities: allWordpressWpActivities {
        edges {
          node {
            slug
          }
        }
      }
      themas: allWordpressWpThema {
        edges {
          node {
            slug
          }
        }
      }
    }
  `).then(result => {
    result.data.activities.edges.forEach(({ node }) => {
      createPage({
        path: `/activiteit/${node.slug}`,
        component: path.resolve(
          `./src/components/templates/pages/activity-template.js`
        ),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.slug,
        },
      })
    })

    result.data.themas.edges.forEach(({ node }) => {
      createPage({
        path: `/themas/${node.slug}`,
        component: path.resolve(
          `./src/components/templates/pages/thema-template.js`
        ),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.slug,
        },
      })
    })
  })
}

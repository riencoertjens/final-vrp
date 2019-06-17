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
      allWordpressWpActivities {
        edges {
          node {
            slug
          }
        }
      }
    }
  `).then(result => {
    result.data.allWordpressWpActivities.edges.forEach(({ node }) => {
      createPage({
        path: `/activiteiten/${node.slug}`,
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
  })
}

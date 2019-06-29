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
            wordpress_id
          }
        }
      }
      pages: allWordpressPage(
        filter: { parent_element: { slug: { eq: "home" } } }
      ) {
        edges {
          node {
            slug
          }
        }
      }
      categories: allWordpressCategory(
        filter: {
          parent_element: { slug: { in: ["activiteiten", "prijzen"] } }
        }
        sort: { fields: [parent_element___name, name], order: DESC }
      ) {
        edges {
          node {
            name
            slug
            parent_element {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.activities.edges.forEach(({ node }) => {
      createPage({
        path: `/activiteit/${node.slug}`,
        component: path.resolve(
          `./src/components/templates/pages/activiteit-template.js`
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
          id: node.wordpress_id,
        },
      })
    })

    result.data.pages.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.slug}`,
        component: path.resolve(
          `./src/components/templates/pages/wp-page-template.js`
        ),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.slug,
        },
      })
    })

    result.data.categories.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.parent_element.slug}/${node.slug}`,
        component: path.resolve(
          `./src/components/templates/pages/${
            node.parent_element.slug
          }-template.js`
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

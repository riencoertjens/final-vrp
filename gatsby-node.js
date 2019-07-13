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
      ruimte: allWordpressWpRuimte {
        edges {
          node {
            slug
          }
        }
      }
      artikels: allWordpressWpRuimteArtikel(
        sort: {
          fields: [acf___ruimte___acf___datum_publicatie, slug]
          order: [ASC, ASC]
        }
      ) {
        edges {
          node {
            slug
            title
            acf {
              ruimte {
                slug: post_name
              }
            }
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
    result.data.ruimte.edges.forEach(({ node }) => {
      createPage({
        path: `/ruimte/${node.slug}`,
        component: path.resolve(
          `./src/components/templates/pages/ruimte-template.js`
        ),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.slug,
        },
      })
    })
    const artikels = result.data.artikels.edges

    artikels.forEach(({ node }, i) => {
      createPage({
        path: `/ruimte/${node.acf.ruimte.slug}/${node.slug}`,
        component: path.resolve(
          `./src/components/templates/pages/artikel-template.js`
        ),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.slug,
          ruimteSlug: node.acf.ruimte.slug,
          prev: i === 0 ? null : artikels[i - 1],
          next: i === artikels.length - 1 ? null : artikels[i + 1],
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
          `./src/components/templates/pages/category-template.js`
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

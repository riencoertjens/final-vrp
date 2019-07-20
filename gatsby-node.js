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
      activities: allCollectionsJson(
        filter: { post_type: { eq: "activity" } }
      ) {
        edges {
          node {
            slug: post_name
          }
        }
      }

      themas: allTermsJson(filter: { taxonomy: { eq: "thema" } }) {
        edges {
          node {
            slug
          }
        }
      }

      ruimte: allCollectionsJson(filter: { post_type: { eq: "ruimte" } }) {
        edges {
          node {
            slug: post_name
          }
        }
      }

      artikels: allCollectionsJson(
        filter: { post_type: { eq: "ruimte_artikel" } }
        sort: { fields: [acf___ruimte___acf___datum_publicatie, post_name] }
      ) {
        edges {
          node {
            slug: post_name
            title: post_title
            acf {
              ruimte {
                ruimteSlug: post_name
              }
            }
          }
        }
      }

      pages: allCollectionsJson(
        filter: {
          post_type: { eq: "page" }
          post_parent: { post_name: { eq: "home" } }
        }
      ) {
        edges {
          node {
            slug: post_name
          }
        }
      }

      categories: allTermsJson(
        filter: {
          taxonomy: { eq: "category" }
          parent_term: { in: ["activiteiten", "prijzen"] }
        }
      ) {
        edges {
          node {
            name
            slug
            parent_term
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
          slug: node.slug,
          ruimteSlug: node.acf.ruimte.post_name,
          prev: i === 0 ? null : artikels[i - 1],
          next: i === artikels.length - 1 ? null : artikels[i + 1],
        },
      })
    })
    // result.data.themas.terms.forEach(({ node: { slug } }) => {
    //   createPage({
    //     path: `/themas/${slug}`,
    //     component: path.resolve(
    //       `./src/components/templates/pages/thema-template.js`
    //     ),
    //     context: {
    //       slug: slug,
    //     },
    //   })
    // })
    result.data.pages.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.slug}`,
        component: path.resolve(
          `./src/components/templates/pages/wp-page-template.js`
        ),
        context: {
          slug: node.slug,
        },
      })
    })
    // result.data.categories.edges.forEach(({ node }) => {
    //   createPage({
    //     path: `/${node.parent_term}/${node.slug}`,
    //     component: path.resolve(
    //       `./src/components/templates/pages/category-template.js`
    //     ),
    //     context: {
    //       slug: node.slug,
    //     },
    //   })
    // })
    // // create extra page for the start@vrp category
    // createPage({
    //   path: `/startvrp`,
    //   component: path.resolve(
    //     `./src/components/templates/pages/category-template.js`
    //   ),
    //   context: {
    //     slug: `/startvrp`,
    //   },
    // })
  })
}

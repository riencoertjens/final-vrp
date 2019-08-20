/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          activities: allCollectionsJson(
            filter: { post_type: { eq: "activiteit" } }
          ) {
            edges {
              node {
                suggestions: term_slugs
                slug: post_name
              }
            }
          }

          prijzen: allCollectionsJson(filter: { post_type: { eq: "prijs" } }) {
            edges {
              node {
                suggestions: term_slugs
                slug: post_name
              }
            }
          }

          vacatures: allCollectionsJson(
            filter: { post_type: { eq: "job_listing" } }
          ) {
            edges {
              node {
                slug: post_name
              }
            }
          }

          blogPosts: allCollectionsJson(
            filter: { post_type: { eq: "blog" } }
            sort: { fields: post_date, order: DESC }
          ) {
            edges {
              node {
                suggestions: term_slugs
                title: post_title
                slug: post_name
              }
            }
          }

          nieuws: allCollectionsJson(filter: { post_type: { eq: "post" } }) {
            edges {
              node {
                suggestions: term_slugs
                slug: post_name
                pathname
              }
            }
          }

          themas: allTermsJson(filter: { taxonomy: { eq: "thema" } }) {
            edges {
              node {
                slug
                acf {
                  in_de_kijker
                }
              }
            }
          }

          ruimte: allCollectionsJson(filter: { post_type: { eq: "ruimte" } }) {
            edges {
              node {
                suggestions: term_slugs
                slug: post_name
                acf {
                  featured_artikel
                }
              }
            }
          }

          artikels: allCollectionsJson(
            filter: { post_type: { eq: "ruimte_artikel" } }
            sort: { fields: [acf___ruimte___acf___datum_publicatie, post_name] }
          ) {
            edges {
              node {
                suggestions: term_slugs
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
              post_name: { nin: ["ruimte", "vacatures", "contact"] }
              post_parent: { post_name: { nin: "vacatures" } }
            }
          ) {
            edges {
              node {
                pathname
                slug: post_name
                acf {
                  in_de_kijker
                  featured_activities
                  slider_posts
                }
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
        if (result.errors) {
          reject(result.errors)
        }

        result.data.activities.edges.forEach(({ node }) => {
          createPage({
            path: `/activiteit/${node.slug}`,
            component: path.resolve(
              `./src/components/templates/pages/activiteit-template.js`
            ),
            context: {
              suggestions: node.suggestions || [],
              slug: node.slug,
            },
          })
        })

        result.data.prijzen.edges.forEach(({ node }) => {
          createPage({
            path: `/prijsuitreiking/${node.slug}`,
            component: path.resolve(
              `./src/components/templates/pages/prijs-template.js`
            ),
            context: {
              suggestions: node.suggestions || [],
              slug: node.slug,
            },
          })
        })

        result.data.vacatures.edges.forEach(({ node }) => {
          createPage({
            path: `/vacature/${node.slug}`,
            component: path.resolve(
              `./src/components/templates/pages/vacature-template.js`
            ),
            context: {
              slug: node.slug,
            },
          })
        })
        result.data.nieuws.edges.forEach(({ node }) => {
          createPage({
            path: `/nieuws${node.pathname}`,
            component: path.resolve(
              `./src/components/templates/pages/nieuws-template.js`
            ),
            context: {
              suggestions: node.suggestions || [],
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
              // suggestions:node.suggestions || [],
              slug: node.slug,
              featured_artikel: node.acf.featured_artikel || [],
            },
          })
        })
        const artikels = result.data.artikels.edges
        artikels.forEach(({ node }, i) => {
          createPage({
            path: `/ruimte/${node.acf.ruimte.ruimteSlug}/${node.slug}`,
            component: path.resolve(
              `./src/components/templates/pages/artikel-template.js`
            ),
            context: {
              // suggestions: node.suggestions || [],
              slug: node.slug,
              prev: i === 0 ? null : artikels[i - 1],
              next: i === artikels.length - 1 ? null : artikels[i + 1],
            },
          })
        })
        const blogPosts = result.data.blogPosts.edges
        blogPosts.forEach(({ node }, i) => {
          createPage({
            path: `/blog/${node.slug}`,
            component: path.resolve(
              `./src/components/templates/pages/blogPost-template.js`
            ),
            context: {
              suggestions: node.suggestions || [],
              slug: node.slug,
              prev: i === 0 ? null : blogPosts[i - 1],
              next: i === blogPosts.length - 1 ? null : blogPosts[i + 1],
            },
          })
        })

        result.data.themas.edges.forEach(({ node }) => {
          createPage({
            path: `/thema/${node.slug}`,
            component: path.resolve(
              `./src/components/templates/pages/thema-template.js`
            ),
            context: {
              slug: node.slug,
              in_de_kijker: node.acf.in_de_kijker || [],
            },
          })
        })
        result.data.pages.edges.forEach(({ node }) => {
          if (node.slug === "home") {
            createPage({
              path: `/`,
              component: path.resolve(
                `./src/components/templates/pages/index.js`
              ),
              context: {
                in_de_kijker: node.acf.in_de_kijker || [],
                slider_posts: node.acf.slider_posts || [],
                featured_activities: node.acf.featured_activities || [],
              },
            })
          } else if (node.slug === "activiteiten") {
            createPage({
              path: `/activiteiten`,
              component: path.resolve(
                `./src/components/templates/pages/activiteiten.js`
              ),
              context: {
                in_de_kijker: node.acf.in_de_kijker || [],
              },
            })
          } else {
            createPage({
              path: `${node.pathname}`,
              component: path.resolve(
                `./src/components/templates/pages/wp-page-template.js`
              ),
              context: {
                pathname: node.pathname,
                slug: node.slug,
                in_de_kijker: node.acf.in_de_kijker || [],
              },
            })
          }
        })
        result.data.categories.edges.forEach(({ node }) => {
          createPage({
            path: `/${node.parent_term}/${node.slug}`,
            component: path.resolve(
              `./src/components/templates/pages/category-template.js`
            ),
            context: {
              slug: node.slug,
            },
          })
        })
        // create extra page for the start@vrp category
        createPage({
          path: `/startvrp`,
          component: path.resolve(
            `./src/components/templates/pages/category-template.js`
          ),
          context: {
            slug: `startvrp`,
          },
        })
      })
    )
  })
}

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import GatsbyLink from "gatsby-link"
import css from "@emotion/css"
import { AspectRatioImage, MediaQuery } from "../components/webhart-components"
import { colors } from "../site/styles"

const BlogPage = () => {
  return (
    <StaticQuery
      query={graphql`
        {
          posts: allCollectionsJson(filter: { post_type: { eq: "blog" } }) {
            edges {
              node {
                title: post_title
                slug: post_name
                excerpt: post_excerpt
                post_date(formatString: "DD-MM-Y")
                featured_img {
                  ...BlockImageFragment
                }
              }
            }
          }
        }
      `}
      render={({ posts }) => (
        <Layout>
          <section>
            <h1>Blog</h1>
            <div
              css={css`
                margin: 0 -1rem -1rem;
              `}
            >
              {posts.edges.map(({ node: post }, i) => (
                <div
                  css={css`
                    display: flex;
                    flex-wrap: wrap;
                    border-top: 2px solid ${colors.blue};
                    :nth-child(odd) {
                      background: whitesmoke;
                    }
                    h3 {
                      margin-top: 0;
                    }
                    a {
                      text-decoration: none;
                    }
                  `}
                  key={i}
                >
                  <AspectRatioImage
                    css={css`
                      max-height: 150px;
                      ${MediaQuery[0]} {
                        max-height: 250px;
                        flex: 0 1 250px;
                      }
                    `}
                    image={post.featured_img}
                  ></AspectRatioImage>
                  <div
                    css={css`
                      padding: 1rem;
                      p {
                        margin: 0;
                      }
                      flex: 1 0 350px;
                    `}
                  >
                    <GatsbyLink to={`/blog/${post.slug}`}>
                      <h3>{post.title}</h3>
                    </GatsbyLink>
                    <p>
                      {post.excerpt.slice(0, 300)} [...]{" "}
                      <GatsbyLink to={`/blog/${post.slug}`}>
                        lees meer...
                      </GatsbyLink>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Layout>
      )}
    />
  )
}

export default BlogPage

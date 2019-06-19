import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/webhart-components/SEO"
import GatsbyLink from "gatsby-link"
import css from "@emotion/css"
import { colors, boxShadow } from "../site/styles"
import { getShowImage } from "../components/webhart-components/style-functions"
import GatsbyImage from "gatsby-image/withIEPolyfill"
import { AspectRatioBox } from "../components/webhart-components"

const ThemasPage = () => (
  <StaticQuery
    query={graphql`
      {
        pageInfo: wordpressPage(slug: { eq: "home" }) {
          title
        }
        themas: allWordpressWpThema {
          edges {
            node {
              title: name
              description
              slug
              acf {
                afbeelding {
                  ...BlockImageFragment
                }
              }
            }
          }
        }
      }
    `}
    render={({ themas }) => (
      <Layout>
        <SEO title="themas" />
        <section>
          <h1>thema's</h1>

          <div
            css={css`
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
              grid-gap: 1rem;

              a {
                text-decoration: none;
                color: black;
                box-shadow: ${boxShadow};
                transition: 0.2s;
                h3 {
                  color: ${colors.orange};
                  font-weight: 300;
                  margin: 0;
                }
                p {
                  margin: 0.75rem 0 0;
                  font-size: 0.9rem;
                }
              }
            `}
          >
            {themas.edges.map(({ node: thema }, i) => {
              const showImage =
                thema.acf &&
                thema.acf.afbeelding &&
                getShowImage(thema.acf.afbeelding, 1)
              return (
                <AspectRatioBox
                  component={GatsbyLink}
                  to={`/themas/${thema.slug}`}
                  css={css`
                    .gatsby-image-wrapper {
                      transition: 0.1s;
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                    }
                    &:hover {
                      & .gatsby-image-wrapper {
                        transform: scale(1.05);
                      }
                      & > div > div {
                        background: rgba(255, 255, 255, 0.85);
                        top: 0;
                      }
                    }
                  `}
                >
                  {showImage && (
                    <GatsbyImage
                      fluid={showImage}
                      objectPosition={`${
                        thema.acf.afbeelding.smartcrop_image_focus[0].left
                      }% ${thema.acf.afbeelding.smartcrop_image_focus[0].top}%`}
                    />
                  )}
                  <div
                    css={css`
                      transition: 0.2s;
                      position: absolute;
                      top: calc(100% - 2.5rem);
                      left: 0;
                      height: 100%;
                      width: 100%;
                      background: white;
                      padding: 0.5rem;
                      z-index: 100;
                      overflow: hidden;
                      /* background: red; */
                    `}
                  >
                    <h3>{thema.title}</h3>
                    <p
                      css={css`
                        overflow: hidden;
                        ::after {
                          content: ""
                          display: block;
                          position: absolute;
                          bottom: 0;
                          left: 0;
                          width: 100%;
                          height: 0.5rem;
                          background: white;
                          box-shadow: 0 0 0.5rem 0.5rem white;
                          z-index: 100;
                        }
                      `}
                    >
                      {thema.description}
                    </p>
                  </div>
                  {}
                </AspectRatioBox>
              )
            })}
          </div>
        </section>
      </Layout>
    )}
  />
)
export default ThemasPage

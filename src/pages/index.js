import React, { Component } from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import PostList from "../components/PostList"
import { AspectRatioBox } from "../components/webhart-components"
import GatsbyImage from "gatsby-image/withIEPolyfill"

import css from "@emotion/css"
import { colors, Button, breakpoints } from "../site/styles"
import { MqMin, MqMax } from "../components/webhart-components/style-functions"
import GatsbyLink from "gatsby-link"

const timeout = 5000

class IndexPage extends Component {
  constructor(props) {
    super(props)

    this.state = { currentSlide: 0 }
  }

  slideNext(key) {
    const slide =
      key === undefined
        ? this.state.currentSlide ===
          this.props.data.pageInfo.featured_posts.length - 1
          ? 0
          : this.state.currentSlide + 1
        : key

    clearTimeout(this.interval)
    this.interval = setTimeout(() => {
      this.slideNext()
    }, timeout)

    this.setState({ currentSlide: slide })
  }

  componentDidMount() {
    if (
      this.props.data.pageInfo.featured_posts &&
      this.props.data.pageInfo.featured_posts.length > 1
    ) {
      this.interval = setTimeout(() => {
        this.slideNext()
      }, timeout)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.interval)
  }

  render() {
    const { currentSlide } = this.state
    return (
      <StaticQuery
        query={graphql`
          {
            pageInfo: wordpressPage(slug: { eq: "home" }) {
              title
              featured_posts {
                post_title
                post_name
                post_date
                post_type
                content_raw
                featured_media {
                  post_title
                  post_name
                  guid {
                    ...HeroImageFragment
                  }
                }
              }
            }
            posts: allWordpressPost(sort: { fields: date, order: DESC }) {
              edges {
                node {
                  ...BlockListFragment_post
                }
              }
            }
            activities: allWordpressWpActivities(
              sort: { fields: date, order: DESC }
            ) {
              edges {
                node {
                  ...BlockListFragment_activity
                }
              }
            }
            ruimte: allWordpressWpRuimte(sort: { fields: date, order: DESC }) {
              edges {
                node {
                  ...BlockListFragment_ruimte
                }
              }
            }
            prices: allWordpressWpPrijs(sort: { fields: date, order: DESC }) {
              edges {
                node {
                  ...BlockListFragment_price
                }
              }
            }
          }
        `}
        render={({ pageInfo, posts, activities, prices, ruimte }) => (
          <Layout>
            <AspectRatioBox
              ratio={1200 / 630}
              css={css`
                background: grey;
                min-height: 320px;
                position: relative;
              `}
            >
              {pageInfo.featured_posts.map((post, i) => {
                const showImage =
                  post.featured_media.guid && post.featured_media.guid.localFile
                    ? post.featured_media.guid.localFile.image.maxWidth
                        .aspectRatio > 1
                      ? post.featured_media.guid.localFile.image.maxWidth
                      : post.featured_media.guid.localFile.image.maxHeight
                    : false

                return (
                  <div //slide
                    key={i}
                    css={css`
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      transition: 0.75s;
                      opacity: ${currentSlide === i ? 1 : 0};
                      .gatsby-image-wrapper {
                        transition: 0.1s;
                        z-index: 0;
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                      }
                    `}
                  >
                    <div
                      css={css`
                        position: absolute;
                        z-index: 10;
                        padding: 1.5rem;
                        ${MqMax("899px")} {
                          display: inline-block;
                          width: 400px;
                          left: 2rem;
                          bottom: 2rem;
                          max-width: calc(100% - 4rem);
                        }
                        ${MqMin(breakpoints[0])} {
                          background: white;
                          box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.25);
                        }
                        ${MqMin("900px")} {
                          width: 300px;
                          left: ${300 / 4}px;
                          bottom: ${300 / 4}px;
                        }
                      `}
                    >
                      <h2
                        css={css`
                          color: white;
                          font-size: 3rem;
                          text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.333),
                            -1px -1px 1px rgba(0, 0, 0, 0.333),
                            -1px 1px 1px rgba(0, 0, 0, 0.333),
                            1px -1px 1px rgba(0, 0, 0, 0.333);
                          ${MqMin(breakpoints[0])} {
                            font-size: 1.5rem;
                            color: black;
                            text-shadow: unset;
                          }
                        `}
                      >
                        {post.post_title}
                      </h2>
                      <p
                        css={css`
                          ${MqMax(breakpoints[0])} {
                            display: none;
                          }
                        `}
                      >
                        {post.content_raw.length > 200
                          ? post.content_raw.substr(0, 200) + "\u2026"
                          : post.content_raw}
                      </p>
                      <Button
                        to={`/activiteiten/${post.post_name}`}
                        component={GatsbyLink}
                      >
                        lees meer
                      </Button>
                    </div>
                    {showImage && (
                      <GatsbyImage
                        style={{ position: "absolute" }}
                        fluid={showImage}
                        objectPosition={`${
                          post.featured_media.guid.smartcrop_image_focus[0].left
                        }% ${
                          post.featured_media.guid.smartcrop_image_focus[0].top
                        }%`}
                      />
                    )}
                  </div>
                )
              })}
              <div
                css={css`
                  background: rgba(255, 255, 255, 0.5);
                  position: absolute;
                  height: 0.75rem;
                  width: 100%;
                  bottom: 0;
                  left: 0;
                  z-index: 1000;
                  display: flex;
                  justify-content: space-between;
                `}
              >
                {pageInfo.featured_posts.map((post, i) => (
                  <button
                    css={css`
                      height: 100%;
                      flex-grow: 1;
                      border: none;
                      display: inline-block;
                      cursor: pointer;
                      background: none;
                      &:hover {
                        background: rgba(255, 255, 255, 0.5);
                      }
                      ${currentSlide === i && `background: ${colors.orange};`}
                    `}
                    onClick={() => this.slideNext(i)}
                  />
                ))}
              </div>
            </AspectRatioBox>

            <PostList
              posts={[
                posts.edges,
                activities.edges,
                prices.edges,
                ruimte.edges,
              ]}
            />
          </Layout>
        )}
      />
    )
  }
}

export default IndexPage

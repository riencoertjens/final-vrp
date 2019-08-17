import React, { Component } from "react"
import { AspectRatioBox } from "./webhart-components"
import css from "@emotion/css"
import {
  MqMin,
  getAspectRatioImage,
} from "./webhart-components/style-functions"
import { boxShadow, breakpoints, Button, colors } from "../site/styles"
import GatsbyImage from "gatsby-image"
import GatsbyLink from "gatsby-link"
import { graphql } from "gatsby"
import { postTypes } from "./PostList"

const timeout = 5000

class HeroSlider extends Component {
  constructor(props) {
    super(props)

    this.state = { currentSlide: 0 }
    this.slideNext = this.slideNext.bind(this)
  }

  slideNext(key) {
    const slide =
      key === undefined
        ? this.state.currentSlide === this.props.posts.length - 1
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
    if (this.props.posts && this.props.posts.length > 1) {
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
    const { posts } = this.props
    return (
      <AspectRatioBox
        ratio={1200 / 630}
        css={css`
          background: grey;
          min-height: 320px;
          position: relative;
        `}
      >
        {posts.map(({ node: post }, i) => {
          const showImage = getAspectRatioImage(post.featured_img, 1200 / 630)

          const typeName = postTypes[post.post_type]
          let itemSlug = "/"
          if (post.post_type === "ruimte_artikel") {
            itemSlug += `ruimte/${post.acf.ruimte.post_name}/`
          } else if (post.post_type !== "page") {
            itemSlug += `${typeName}`
          }

          if (post.post_type === "page") {
            itemSlug = post.pathname
          } else if (post.post_type === "post") {
            itemSlug += post.pathname
          } else {
            itemSlug += `/${post.post_name}`
          }
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
                  padding: 1rem;
                  padding-bottom: 1.5rem;
                  background: rgba(255, 255, 255, 0.75);
                  box-shadow: ${boxShadow};
                  bottom: 0;
                  left: 0;
                  right: 0;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  ${MqMin(breakpoints[0])} {
                    padding: 1.5rem;
                    background: white;
                    display: inline-block;
                    width: 400px;
                    left: 2rem;
                    bottom: 2rem;
                    max-width: calc(100% - 4rem);
                  }
                  ${MqMin(breakpoints[1])} {
                    width: 600px;
                    left: ${300 / 4}px;
                    bottom: ${300 / 4}px;
                  }
                `}
              >
                <h3
                  css={css`
                    margin: 0;
                    flex: 0 1 auto;
                    color: black;

                    ${MqMin(breakpoints[0])} {
                      font-size: 1.5rem;
                      text-shadow: unset;
                    }
                  `}
                >
                  {post.post_title}
                </h3>
                <p
                  css={css`
                    display: none;
                    margin: 1rem 0;
                    ${MqMin(breakpoints[0])} {
                      display: inline-block;
                    }
                  `}
                >
                  {post.post_excerpt}
                </p>
                <Button right={1} to={itemSlug} component={GatsbyLink}>
                  lees meer
                </Button>
              </div>
              {showImage && (
                <GatsbyImage
                  style={{ position: "absolute" }}
                  fluid={showImage.image}
                  objectPosition={showImage.cropFocus}
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
          {posts.map((post, i) => (
            <button
              key={i}
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
    )
  }
}

export default HeroSlider

export const HeroSliderFragment = graphql`
  fragment HeroSliderFragment on CollectionsJson {
    post_title
    post_name
    post_type
    post_excerpt
    pathname
    featured_img {
      smartcrop_image_focus {
        top
        left
      }
      file {
        image: childImageSharp {
          maxWidth: fluid(maxWidth: 1200, quality: 50) {
            ...GatsbyImageSharpFluid
          }
          maxHeight: fluid(maxHeight: 630, quality: 50) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`

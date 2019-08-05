import React from "react"
import { graphql } from "gatsby"
import Layout from "../../Layout"

import { AspectRatioImage } from "../../webhart-components"
import WpBlocksContent from "../../WpBlocksContent"
import BreadCrumbs from "../../BreadCrumbs"
import css from "@emotion/css"
import GatsbyLink from "gatsby-link"
import {
  FaAngleRight as ArrowRightIcon,
  FaAngleLeft as ArrowLeftIcon,
} from "react-icons/fa"

const WpPageTemplate = ({
  data: {
    page: { title, content, featured_img },
  },
  pageContext: { next, prev },
}) => (
  <Layout>
    {featured_img && (
      <AspectRatioImage ratio={1200 / 630} image={featured_img} />
    )}
    <BreadCrumbs
      crumbs={[
        {
          link: "/blog",
          label: "blog",
        },
        {
          label: title,
        },
      ]}
    />
    <section>
      <h1>{title}</h1>
      <WpBlocksContent content={content} />
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          a {
          }
        `}
      >
        {prev && (
          <GatsbyLink
            css={css`
              margin-right: auto;
            `}
            to={`/blog/${prev.node.slug}/`}
          >
            <ArrowLeftIcon />
            {prev.node.title}
          </GatsbyLink>
        )}
        {next && (
          <GatsbyLink
            css={css`
              margin-left: auto;
            `}
            to={`/blog/${next.node.slug}/`}
          >
            {next.node.title}
            <ArrowRightIcon />
          </GatsbyLink>
        )}
      </div>
    </section>
  </Layout>
)

export default WpPageTemplate

export const query = graphql`
  query($slug: String!) {
    page: collectionsJson(post_type: { eq: "blog" }, post_name: { eq: $slug }) {
      title: post_title
      content: post_content
      featured_img {
        ...HeroImageFragment
        SEOImage: file {
          ...SEOImageFragment
        }
      }
    }
  }
`

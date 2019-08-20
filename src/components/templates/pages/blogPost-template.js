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
import SEO from "../../webhart-components/SEO"
import SuggestionsAsideWrapper from "../../Suggestions"

const WpPageTemplate = ({
  data: {
    page: { title, content, excerpt, featured_img },
    suggestions,
  },
  pageContext: { slug, next, prev },
}) => (
  <Layout>
    <SEO
      title={title}
      pathname={`blog/${slug}/`}
      description={excerpt}
      image={featured_img && featured_img.SEOImage.childImageSharp.SEO.src}
    />
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
    <SuggestionsAsideWrapper suggestions={suggestions}>
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
    </SuggestionsAsideWrapper>
  </Layout>
)

export default WpPageTemplate

export const query = graphql`
  query($slug: String!, $suggestions: [String]!) {
    suggestions: allCollectionsJson(
      filter: {
        term_slugs: { in: $suggestions }
        post_name: { ne: $slug }
        # acf: { featured: { eq: true } }
      }
      limit: 7
      sort: { fields: [acf___featured, post_date] }
    ) {
      edges {
        node {
          ...SuggestionsItemFragment
        }
      }
    }
    page: collectionsJson(post_type: { eq: "blog" }, post_name: { eq: $slug }) {
      title: post_title
      content: post_content
      excerpt: post_excerpt
      featured_img {
        ...HeroImageFragment
        SEOImage: file {
          ...SEOImageFragment
        }
      }
    }
  }
`

import React from "react"
import { graphql } from "gatsby"
import Layout from "../../Layout"

import LidwordenForm from "../lid-worden-form"
import RuimteBestellenForm from "../ruimte-bestellen-form"

import { AspectRatioImage } from "../../webhart-components"
import WpBlocksContent from "../../WpBlocksContent"
import PostList from "../../PostList"

const WpPageTemplate = ({
  data: {
    page: { title, content, featured_img },
    in_de_kijker,
  },
  pageContext: { slug: pageSlug },
}) => (
  <Layout>
    {featured_img && (
      <AspectRatioImage ratio={1200 / 630} image={featured_img} />
    )}
    <section>
      <h1>{title}</h1>
      <WpBlocksContent content={content} />
      {pageSlug === "lid-worden" && <LidwordenForm />}
      {pageSlug === "bestelling-ruimte" && <RuimteBestellenForm />}
    </section>
    {in_de_kijker.edges.length > 0 && (
      <section>
        <h2>lees meer</h2>
        <PostList posts={in_de_kijker} multiTypes />
      </section>
    )}
  </Layout>
)

export default WpPageTemplate

export const query = graphql`
  query($slug: String!, $in_de_kijker: [Int]!) {
    page: collectionsJson(post_type: { eq: "page" }, post_name: { eq: $slug }) {
      title: post_title
      content: post_content
      featured_img {
        ...HeroImageFragment
        SEOImage: file {
          ...SEOImageFragment
        }
      }
    }

    in_de_kijker: allCollectionsJson(
      filter: { ID: { in: $in_de_kijker } }
      sort: { fields: post_date, order: DESC }
    ) {
      edges {
        node {
          ...PostListFragment
        }
      }
    }
  }
`

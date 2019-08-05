import React from "react"
import { graphql } from "gatsby"
import Layout from "../../Layout"
import SEO from "../../webhart-components/SEO"
import css from "@emotion/css"
import { colors } from "../../../site/styles"
import { AspectRatioImage } from "../../webhart-components"
import PostList from "../../PostList"

const ThemaPageTemplate = ({
  data: { thema, posts, in_de_kijker },
  pageContext: { slug },
}) => {
  return (
    <Layout>
      <SEO
        pathname={`thema/${slug}`}
        title={thema.title}
        description={thema.description}
        image={
          thema.featured_img &&
          thema.featured_img.SEOImage &&
          thema.featured_img.SEOImage.childImageSharp.SEO.src
        }
      />
      {thema.featured_img && (
        <AspectRatioImage ratio={1200 / 630} image={thema.featured_img} />
      )}
      <section>
        <h1>{thema.title}</h1>
        {thema.description && (
          <p
            css={css`
              color: ${colors.orange};
              font-weight: 500;
              font-size: 1.25rem;
            `}
          >
            {thema.description}
          </p>
        )}
        {thema.acf && thema.acf.content && (
          <div dangerouslySetInnerHTML={{ __html: thema.acf.content }} />
        )}
      </section>
      {in_de_kijker.edges.length > 0 && (
        <section>
          <h2>in de kijker</h2>
          <PostList posts={in_de_kijker} multiTypes />
        </section>
      )}
      {posts.edges.length > 0 && (
        <section>
          <h2>en ook</h2>
          <PostList posts={posts} />
        </section>
      )}
    </Layout>
  )
}

export default ThemaPageTemplate

export const query = graphql`
  query($slug: String!, $in_de_kijker: [Int]!) {
    thema: termsJson(slug: { eq: $slug }) {
      title: name
      slug
      description
      featured_img {
        ...HeroImageFragment_term
        SEOImage: file {
          ...SEOImageFragment
        }
      }
      acf {
        content: inhoud
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

    posts: allCollectionsJson(
      filter: {
        term_slugs: { in: [$slug] }
        post_type: { in: ["prijs", "activiteit", "post", "page", "ruimte"] }
        acf: { featured: { eq: true } }
      }
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

import React from "react"
import { graphql } from "gatsby"
import Layout from "../../Layout"
import SEO from "../../webhart-components/SEO"
import css from "@emotion/css"
import { colors } from "../../../site/styles"
import { AspectRatioImage } from "../../webhart-components"
import PostList from "../../PostList"

const ThemaPageTemplate = ({
  data: { thema, posts },
  pageContext: { slug },
}) => {
  return (
    <Layout>
      <SEO
        pathname={`themas/${slug}`}
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
      <section>
        <h2>in de kijker</h2>
      </section>
      <section>
        <h2>en ook</h2>
        <PostList posts={posts} />
      </section>
    </Layout>
  )
}

export default ThemaPageTemplate

export const query = graphql`
  query($slug: String!) {
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

    posts: allCollectionsJson(
      filter: {
        term_slugs: { in: [$slug] }
        post_type: { in: ["prijs", "activiteit", "post", "page", "ruimte"] }
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

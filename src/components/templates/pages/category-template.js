import React from "react"
import { graphql } from "gatsby"
import Layout from "../../Layout"
import css from "@emotion/css"
import { colors } from "../../../site/styles"
import PostList from "../../PostList"
import BreadCrumbs from "../../BreadCrumbs"
import SEO from "../../webhart-components/SEO"
import { AspectRatioImage } from "../../webhart-components"
import { sortPosts } from "../../../site/utils"

const ActivityCategoryPageTemplate = ({
  data: { in_de_kijker, category, items },
  pageContext: { slug, in_de_kijker: in_de_kijkerIDs },
}) => {
  const crumbs = []

  if (category.parent_term === "activiteiten") {
    crumbs.push({
      link: "activiteiten",
      label: "Activiteiten",
    })
  }
  if (category.parent_term === "prijzen") {
    crumbs.push({
      label: "Prijzen",
    })
  }

  crumbs.push({
    label: category.title,
  })

  return (
    <Layout>
      <SEO
        pathname={`/${crumbs[0].link}/${slug}`}
        title={category.title}
        description={category.description}
        image={
          category.featured_img &&
          category.featured_img.SEOImage &&
          category.featured_img.SEOImage.childImageSharp &&
          category.featured_img.SEOImage.childImageSharp.SEO.src
        }
      />
      {category.featured_img && category.featured_img.SEOImage && (
        <AspectRatioImage ratio={1200 / 630} image={category.featured_img} />
      )}
      <BreadCrumbs crumbs={crumbs} />
      <section>
        <h1>{category.title}</h1>
        {category.description && (
          <p
            css={css`
              color: ${colors.orange};
              font-weight: 500;
              font-size: 1.25rem;
            `}
          >
            {category.description}
          </p>
        )}
        {category.acf && category.acf.content && (
          <div dangerouslySetInnerHTML={{ __html: category.acf.content }} />
        )}
      </section>
      {in_de_kijker && in_de_kijker.edges.length > 0 && (
        <section>
          <h2>in de kijker</h2>
          <PostList
            posts={sortPosts(in_de_kijker, in_de_kijkerIDs)}
            multiTypes
          />
        </section>
      )}
      {items.edges.length > 0 && (
        <section>
          {in_de_kijker && in_de_kijker.edges.length > 0 && <h2>en ook</h2>}
          <PostList posts={items} />
        </section>
      )}
    </Layout>
  )
}

export default ActivityCategoryPageTemplate

export const query = graphql`
  query($slug: String!, $in_de_kijker: [Int]) {
    items: allCollectionsJson(
      filter: { term_slugs: { in: [$slug] } }
      sort: { fields: post_date, order: DESC }
    ) {
      edges {
        node {
          ...PostListFragment
        }
      }
    }

    category: termsJson(slug: { eq: $slug }) {
      title: name
      slug
      description
      parent_term
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
  }
`

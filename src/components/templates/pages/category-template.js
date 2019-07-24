import React from "react"
import { graphql } from "gatsby"
import Layout from "../../Layout"
import css from "@emotion/css"
import { colors } from "../../../site/styles"
import PostList from "../../PostList"
import BreadCrumbs from "../../BreadCrumbs"
import SEO from "../../webhart-components/SEO"
import { AspectRatioImage } from "../../webhart-components"

const ActivityCategoryPageTemplate = ({
  data: { category, items },
  pageContext: { slug },
}) => {
  const crumbs = []

  if (category.parent_term) {
    crumbs.push({
      link: "activiteiten",
      label: category.parent_term,
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
      />
      {category.featured_img && (
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
      <section>
        <PostList posts={items} />
      </section>
    </Layout>
  )
}

export default ActivityCategoryPageTemplate

export const query = graphql`
  query($slug: String!) {
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
      }
      acf {
        content: inhoud
      }
    }
  }
`

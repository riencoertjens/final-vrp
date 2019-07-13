import React from "react"
import { graphql } from "gatsby"
import Layout from "../../Layout"
import css from "@emotion/css"
import { colors } from "../../../site/styles"
import PostList from "../../PostList"
import BreadCrumbs from "../../BreadCrumbs"
// import SEO from "../../webhart-components/SEO"
// import css from "@emotion/css"
// import { colors } from "../../../site/styles"
// import { AspectRatioImage, AspectRatioBox } from "../../webhart-components"

const ActivityCategoryPageTemplate = ({
  data: { activiteitenCategery, activiteiten, prijzen },
  pageContext: { slug },
}) => {
  const crumbs = []

  if (prijzen.edges.length > 0) {
    crumbs.push({
      link: "/activiteiten",
      label: "Prijzen",
    })
  } else {
    crumbs.push({
      link: "/activiteiten",
      label: "Activiteiten",
    })
  }

  crumbs.push({
    label: activiteitenCategery.title,
  })

  return (
    <Layout>
      {/* <SEO
        pathname={`prijzen/${slug}`}
        title={thema.title}
        description={thema.description}
        image={
          thema.acf &&
          thema.acf.afbeelding &&
          thema.acf.afbeelding.SEOImage.childImageSharp.SEO.src
        }
      />
      {thema.acf && thema.acf.afbeelding ? (
        <AspectRatioImage
          ratio={1200 / 630}
          image={thema.acf.afbeelding}
          cropfocus={thema.acf.afbeelding.smartcrop_image_focus[0]}
        />
      ) : (
        <AspectRatioBox
          ratio={1200 / 630}
          css={css`
            background: grey;
          `}
        />
      )} */}
      <BreadCrumbs crumbs={crumbs} />
      <section>
        <h1>{activiteitenCategery.title}</h1>
        {activiteitenCategery.description && (
          <p
            css={css`
              color: ${colors.orange};
              /* font-weight: 500;
              font-size: 1.25rem; */
            `}
          >
            {activiteitenCategery.description}
          </p>
        )}
        {/* {thema.acf && thema.acf.content && (
          <div dangerouslySetInnerHTML={{ __html: thema.acf.content }} />
        )} */}
      </section>
      <section>
        {activiteiten.edges.length > 0 && (
          <PostList posts={[activiteiten.edges]} />
        )}
        {prijzen.edges.length > 0 && <PostList posts={[prijzen.edges]} />}
      </section>
    </Layout>
  )
}

export default ActivityCategoryPageTemplate

export const query = graphql`
  query($slug: String!) {
    activiteitenCategery: wordpressCategory(slug: { eq: $slug }) {
      title: name
      slug
      description
      acf {
        inhoud
        read_more
      }
    }
    activiteiten: allWordpressWpActivities(
      filter: { categories: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      edges {
        node {
          ...BlockListFragment_activity
        }
      }
    }
    prijzen: allWordpressWpPrijs(
      filter: { categories: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      edges {
        node {
          ...BlockListFragment_price
        }
      }
    }
  }
`

import React from "react"
import { graphql } from "gatsby"
import Layout from "../../Layout"
import PostList from "../../PostList"

import css from "@emotion/css"
import { colors } from "../../../site/styles"
import { MqMin } from "../../webhart-components/style-functions"
import HeroSlider from "../../HeroSlider"

const IndexPage = ({ data: { pageInfo, in_de_kijker } }) => (
  <Layout>
    <HeroSlider posts={pageInfo.acf.featured_posts} />
    <div
      css={css`
        ${MqMin("700px")} {
          display: grid;
          grid-template-columns: 1fr minmax(200px, 300px);
        }
      `}
    >
      <section>
        <PostList posts={in_de_kijker} multiTypes />
      </section>
      <aside
        css={css`
          background: ${colors.orange};
          padding: 1rem;
          color: white;
          h2 {
            color: inherit;
            margin-top: 0;
          }
        `}
      >
        <h2>over vrp</h2>
        <p>
          De Vlaamse Vereniging voor Ruimte en Planning (VRP vzw) groepeert
          sinds 1997 ruimtelijk planners en stedenbouwkundigen uit Vlaanderen en
          Brussel. Onder de ca. 1.000 leden bevinden zich vaklui uit de
          academische wereld, de privésector en overheidsdiensten. Daarnaast
          zoekt de VRP ook aansluiting bij disciplines, organisaties en
          activiteiten op het raakvlak van stedenbouw en ruimtelijke planning
          (wonen, mobiliteit, open ruimte, economie, wetgeving, monumentenzorg,
          vastgoed, natuur, toerisme, gezondheid …).
        </p>
      </aside>
    </div>
  </Layout>
)

export default IndexPage

export const homepagequery = graphql`
  query($in_de_kijker: [Int]!) {
    pageInfo: collectionsJson(
      post_type: { eq: "page" }
      post_name: { eq: "home" }
    ) {
      internal {
        type
      }
      post_title
      acf {
        featured_posts: slider_posts {
          ...HeroSliderFragment
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

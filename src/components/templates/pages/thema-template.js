import React from "react"
import { graphql } from "gatsby"
import Layout from "../../Layout"
import SEO from "../../webhart-components/SEO"
import css from "@emotion/css"
import { colors } from "../../../site/styles"
import { AspectRatioImage, AspectRatioBox } from "../../webhart-components"
import PostList from "../../PostList"
import { getCropFocus } from "../../webhart-components/style-functions"

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
          thema.acf &&
          thema.acf.afbeelding &&
          thema.acf.afbeelding.SEOImage.childImageSharp.SEO.src
        }
      />
      {thema.acf && thema.acf.afbeelding ? (
        <AspectRatioImage
          ratio={1200 / 630}
          image={thema.acf.afbeelding}
          cropfocus={getCropFocus(thema.acf.afbeelding.smartcrop_image_focus)}
        />
      ) : (
        <AspectRatioBox
          ratio={1200 / 630}
          css={css`
            background: grey;
          `}
        />
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
      acf {
        content: inhoud
        # afbeelding {
        #   ...HeroImageFragment
        #   SEOImage: localFile {
        #     ...SEOImageFragment
        #   }
        # }
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

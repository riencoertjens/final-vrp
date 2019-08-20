import React from "react"
import { graphql } from "gatsby"
import Layout from "../../Layout"
import GoogleMap from "../../Map"
import {
  AspectRatioImage,
  AspectRatioBox,
  OutboundLink,
} from "../../webhart-components"
import { Button } from "../../../site/styles"
import SEO from "../../webhart-components/SEO"
import css from "@emotion/css"
import BreadCrumbs from "../../BreadCrumbs"
import WpBlocksContent from "../../WpBlocksContent"
import ActivityForm from "../../ActivityForm"
import SuggestionsAsideWrapper from "../../Suggestions"

const ActivityPageTemplate = ({
  data: { activity, suggestions },
  pageContext: { slug },
}) => {
  let parentCategory = false

  activity.taxonomies.category &&
    activity.taxonomies.category.terms.forEach(category => {
      if (category.parent === "activiteiten") {
        parentCategory = category
      }
    })

  const crumbs = [
    {
      link: "/activiteiten",
      label: "Activiteiten",
    },
  ]

  if (parentCategory) {
    crumbs.push({
      link: `/activiteiten/${parentCategory.slug}`,
      label: parentCategory.name,
    })
  }

  crumbs.push({
    label: activity.title,
  })

  return (
    <Layout>
      <SEO
        pathname={`activiteit/${slug}`}
        title={activity.title}
        description={activity.excerpt}
        image={
          activity.featured_img &&
          activity.featured_img.SEOImage.childImageSharp.SEO.src
        }
      />

      {activity.featured_img ? (
        <AspectRatioImage ratio={1200 / 630} image={activity.featured_img} />
      ) : (
        <AspectRatioBox
          ratio={1200 / 630}
          css={css`
            background: grey;
          `}
        />
      )}
      <BreadCrumbs crumbs={crumbs} />
      <SuggestionsAsideWrapper suggestions={suggestions}>
        <section>
          <h1>{activity.title}</h1>
          {activity.acf.hasform && (
            <Button
              right={1}
              css={css`
                margin-bottom: 1rem;
              `}
              component="a"
              href="#inschrijvingsformulier"
            >
              inschrijven
            </Button>
          )}
          <WpBlocksContent content={activity.content} />
          {activity.acf.hasform && (
            <Button component="a" href="#inschrijvingsformulier" right={1}>
              inschrijven
            </Button>
          )}
        </section>
        {activity.acf.has_location && (
          <section>
            <h3>locatie:</h3>
            <h2>{activity.acf.location.title}</h2>
            <p>{activity.acf.location.acf.address.address}</p>
            <div
              css={css`
                height: 500px;
                margin: 0 -1rem -1rem;
              `}
            >
              <GoogleMap
                apiKey={process.env.GATSBY_MAPS_API}
                location={{
                  lat: Number(activity.acf.location.acf.address.lat),
                  lng: Number(activity.acf.location.acf.address.lng),
                }} //{activity.acf.location.acf.address}
                markerInfoComponent={
                  <OutboundLink
                    href={`https://www.google.com/maps/dir/${
                      activity.acf.location.acf.address.address !== undefined
                        ? `/${activity.acf.location.acf.address.address}`
                        : `/'${activity.acf.location.acf.address.lat},${activity.acf.location.acf.address.lng}'`
                    }/@${activity.acf.location.acf.address.lat},${
                      activity.acf.location.acf.address.lng
                    },15z`}
                  >
                    wegbeschrijving
                  </OutboundLink>
                }
                options={{
                  center: {
                    lat: Number(activity.acf.location.acf.address.lat),
                    lng: Number(activity.acf.location.acf.address.lng),
                  }, //activity.acf.location.acf.address,
                  zoom: 15,
                  disableDefaultUI: true,
                  styles: [],
                }}
              />
            </div>
          </section>
        )}
        {activity.acf.hasform && <ActivityForm activity={activity} />}
      </SuggestionsAsideWrapper>
    </Layout>
  )
}

export default ActivityPageTemplate

export const query = graphql`
  query($slug: String!, $suggestions: [String]!) {
    activity: collectionsJson(post_name: { eq: $slug }) {
      title: post_title
      content: post_content
      excerpt: post_excerpt
      wordpress_id: ID
      taxonomies {
        category {
          terms {
            name
            slug
            parent
          }
        }
      }
      featured_img {
        ...HeroImageFragment
        SEOImage: file {
          ...SEOImageFragment
        }
      }
      acf {
        has_location
        location {
          title: post_title
          slug: post_name
          acf {
            address {
              address
              lat
              lng
            }
          }
        }
        hasform
        close_date
        register_form {
          post_content
        }
      }
    }
    suggestions: allCollectionsJson(
      filter: {
        term_slugs: { in: $suggestions }
        post_name: { ne: $slug }
        # acf: { featured: { eq: true } }
      }
      limit: 7
      sort: { fields: [acf___featured, post_date], order: [ASC, DESC] }
    ) {
      edges {
        node {
          ...SuggestionsItemFragment
        }
      }
    }
  }
`

import React from "react"
import { graphql } from "gatsby"
import Layout from "../../Layout"
import GoogleMap from "../../Map"
import markerIcon from "../../../images/gatsby-icon.png"
import FormFields from "../../FormFields"
import { AspectRatioImage, AspectRatioBox } from "../../webhart-components"
import SEO from "../../webhart-components/SEO"
import css from "@emotion/css"
import { getCropFocus } from "../../webhart-components/style-functions"
import BreadCrumbs from "../../BreadCrumbs"
import WpBlocksContent from "../../WpBlocksContent"

const ActivityPageTemplate = ({
  data: { activity },
  pageContext: { slug },
}) => {
  const close_date = new Date(activity.acf.close_date)
  const now = new Date()

  let parentCategory = false

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
        description={activity.content}
        image={
          activity.featured_img &&
          activity.featured_img.SEOImage.childImageSharp.SEO.src
        }
      />

      {activity.featured_img ? (
        <AspectRatioImage
          ratio={1200 / 630}
          image={activity.featured_img}
          cropfocus={getCropFocus(activity.featured_img.smartcrop_image_focus)}
        />
      ) : (
        <AspectRatioBox
          ratio={1200 / 630}
          css={css`
            background: grey;
          `}
        />
      )}
      <BreadCrumbs crumbs={crumbs} />
      <section>
        <h1>{activity.title}</h1>
        <WpBlocksContent content={activity.content} />
      </section>

      {activity.acf.has_location && (
        <section>
          <h3>locatie:</h3>
          <h2>{activity.acf.location.title}</h2>
          <p>{activity.acf.location.acf.address.address}</p>
          <div
            css={css`
              height: 500px;
              margin: 0 -1rem;
            `}
          >
            <GoogleMap
              apiKey={process.env.GATSBY_MAPS_API}
              location={{
                lat: Number(activity.acf.location.acf.address.lat),
                lng: Number(activity.acf.location.acf.address.lng),
              }} //{activity.acf.location.acf.address}
              markerIcon={markerIcon}
              markerInfoComponent={
                <a href="https://www.google.com/maps/dir//Stationsstraat+95,+9100+Sint-Niklaas,+Belgium">
                  directions
                </a>
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
      {activity.acf.hasform && (
        <section>
          {close_date < now ? (
            <p>inschrijvingen gesloten</p>
          ) : (
            <div>
              <h3>inschrijven:</h3>
              <form
                name={activity.title}
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                action="/thanks"
              >
                <input type="hidden" name="form-name" value={activity.title} />
                <input type="hidden" name="bot-field" />
                <input
                  type="hidden"
                  name="activity_id"
                  value={activity.wordpress_id}
                />
                {activity.acf.register_form.map((form, i) => (
                  <FormFields
                    postContent={form.post_content}
                    key={i}
                    formId={form.id}
                  />
                ))}
                <button>send</button>
              </form>
            </div>
          )}
        </section>
      )}
    </Layout>
  )
}

export default ActivityPageTemplate

export const query = graphql`
  query($slug: String!) {
    activity: collectionsJson(post_name: { eq: $slug }) {
      title: post_title
      content: post_content
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
  }
`

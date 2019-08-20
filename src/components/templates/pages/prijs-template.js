import React from "react"
import { graphql } from "gatsby"
import Layout from "../../Layout"
import BreadCrumbs from "../../BreadCrumbs"
import { AspectRatioImage, OutboundLink } from "../../webhart-components"
import WpBlocksContent from "../../WpBlocksContent"

import {
  FaTwitter as Twitter,
  FaFacebookF as Facebook,
  FaLinkedinIn as Linkedin,
  FaInstagram as Instagram,
} from "react-icons/fa"
import css from "@emotion/css"
import SEO from "../../webhart-components/SEO"
import SuggestionsAsideWrapper from "../../Suggestions"

const prijsLabels = {
  "vrp-planningsprijs": "VRP Planningsprijs",
  "vrp-afstudeerprijs": "VRP Afstudeerprijs",
  openruimtebeker: "Openruimtebeker",
}

const PrijsPageTemplate = ({
  data: {
    page: { title, content, excerpt, featured_img, acf },
    suggestions,
  },
  pageContext: { slug },
}) => (
  <Layout>
    <SEO
      title={title}
      pathname={`nieuws/${slug}/`}
      description={excerpt}
      image={featured_img && featured_img.SEOImage.childImageSharp.SEO.src}
    />
    {featured_img && (
      <AspectRatioImage ratio={1200 / 630} image={featured_img} />
    )}
    <BreadCrumbs
      crumbs={[
        {
          label: "Prijzen",
        },
        {
          label: prijsLabels[acf.prijs],
          link: `/prijzen/${acf.prijs}`,
        },
        {
          label: title,
        },
      ]}
    />
    <SuggestionsAsideWrapper suggestions={suggestions}>
      <section>
        <h1>{title}</h1>
        <p
          css={css`
            a,
            span {
              margin-right: 0.5rem;
              text-decoration: none;
              vertical-align: top;
              svg {
                font-size: 1.2rem;
              }
            }
          `}
        >
          {acf.naam_laureaat && acf.website_laureaat && (
            <OutboundLink href={acf.website_laureaat}>
              {acf.naam_laureaat}
            </OutboundLink>
          )}
          {acf.naam_laureaat && !acf.website_laureaat && (
            <span>{acf.naam_laureaat}</span>
          )}
          {acf.website_laureaat && !acf.naam_laureaat && (
            <OutboundLink href={acf.website_laureaat}>website</OutboundLink>
          )}
          {acf.social_laureaat && (
            <OutboundLink href={acf.social_laureaat}>
              {acf.social_laureaat.includes("instagram.com") && <Instagram />}
              {acf.social_laureaat.includes("facebook.com") && <Facebook />}
              {acf.social_laureaat.includes("linkedin.com") && <Linkedin />}
              {acf.social_laureaat.includes("twitter.com") && <Twitter />}
              {!acf.social_laureaat.match(
                /instagram|facebook|linkedin|twitter/
              ) && `social`}
            </OutboundLink>
          )}
          {acf.meer_info && (
            <>
              <br />
              <OutboundLink href={acf.meer_info}>meer info</OutboundLink>
            </>
          )}
        </p>
        <WpBlocksContent content={content} />
      </section>
    </SuggestionsAsideWrapper>
  </Layout>
)

export default PrijsPageTemplate

export const query = graphql`
  query($slug: String!, $suggestions: [String]!) {
    suggestions: allCollectionsJson(
      filter: {
        term_slugs: { in: $suggestions }
        post_name: { ne: $slug }
        # acf: { featured: { eq: true } }
      }
      limit: 7
      sort: { fields: [acf___featured, post_date] }
    ) {
      edges {
        node {
          ...SuggestionsItemFragment
        }
      }
    }
    page: collectionsJson(
      post_type: { eq: "prijs" }
      post_name: { eq: $slug }
    ) {
      title: post_title
      content: post_content
      excerpt: post_excerpt
      featured_img {
        ...HeroImageFragment
        SEOImage: file {
          ...SEOImageFragment
        }
      }
      acf {
        prijs
        naam_laureaat
        website_laureaat
        social_laureaat
        meer_info
      }
    }
  }
`

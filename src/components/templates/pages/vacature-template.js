import React from "react"
import { graphql } from "gatsby"
import Layout from "../../Layout"

import { AspectRatioImage, OutboundLink } from "../../webhart-components"
import WpBlocksContent from "../../WpBlocksContent"
import { Button, colors } from "../../../site/styles"
import BreadCrumbs from "../../BreadCrumbs"

import {
  FaTwitter as TwitterIcon,
  FaGlobe as WebsiteIcon,
} from "react-icons/fa"

import Obfuscate from "react-obfuscate"
import css from "@emotion/css"
import SEO from "../../webhart-components/SEO"

const validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const WpPageTemplate = ({
  data: {
    page: { title, content, excerpt, featured_img, job_info },
  },
  pageContext: { slug },
}) => {
  const isEmail = validateEmail(job_info.application)
  const applyBtnProps = isEmail
    ? {
        component: Obfuscate,
        email: job_info.application,
        headers: {
          subject: `vacature ${title}`,
        },
      }
    : {
        component: OutboundLink,
        href: job_info.application,
      }

  return (
    <Layout>
      <SEO
        title={title}
        pathname={`vacature/${slug}/`}
        description={excerpt}
        image={
          featured_img &&
          featured_img.SEOImage &&
          featured_img.SEOImage.childImageSharp.SEO.src
        }
      />
      {featured_img && featured_img.file && (
        <AspectRatioImage ratio={1200 / 630} image={featured_img} />
      )}
      <BreadCrumbs
        crumbs={[
          {
            link: "/vacatures",
            label: "Vacatures",
          },
          {
            label: title,
          },
        ]}
      />
      <section>
        <h1>{title}</h1>
        <p
          css={css`
            background: whitesmoke;
            padding: 0.5rem 1rem;
            margin-left: -1rem;
            margin-right: -1rem;
            a {
              padding: 0 0.25rem;
              :hover {
                color: ${colors.blue};
              }
            }
          `}
        >
          <strong>{job_info.company_name}</strong>
          {job_info.company_website && (
            <OutboundLink href={job_info.company_website}>
              <WebsiteIcon />
            </OutboundLink>
          )}
          {job_info.company_twitter && (
            <OutboundLink href={job_info.company_twitter}>
              <TwitterIcon />
            </OutboundLink>
          )}
          <br />
          {job_info.company_tagline} {job_info.job_location}
        </p>
        <WpBlocksContent content={content} />
        <Button
          css={css`
            direction: ltr !important;
          `}
          right={1}
          {...applyBtnProps}
        >
          solliciteer nu
        </Button>
      </section>
    </Layout>
  )
}

export default WpPageTemplate

export const query = graphql`
  query($slug: String!) {
    page: collectionsJson(
      post_type: { eq: "job_listing" }
      post_name: { eq: $slug }
    ) {
      title: post_title
      content: post_content
      excerpt: post_excerpt
      job_info {
        filled
        application
        company_name
        company_tagline
        company_video
        company_website
        featured
        job_location
      }
      featured_img {
        ...HeroImageFragment
        SEOImage: file {
          ...SEOImageFragment
        }
      }
    }
  }
`

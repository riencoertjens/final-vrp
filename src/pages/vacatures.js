import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import GatsbyLink from "gatsby-link"
import css from "@emotion/css"
import { colors } from "../site/styles"

const VacaturesPage = () => {
  return (
    <StaticQuery
      query={graphql`
        {
          vacatures: allCollectionsJson(
            filter: { post_type: { eq: "job_listing" } }
          ) {
            edges {
              node {
                post_name
                post_title
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
              }
            }
          }
        }
      `}
      render={({ vacatures }) => (
        <Layout>
          <section>
            <h1>Vacatures</h1>
            <ul
              css={css`
                margin: 1rem -1rem -1rem;
                padding: 0;
                list-style: none;
              `}
            >
              {vacatures.edges.map(
                (
                  { node: { post_name: slug, post_title: title, job_info } },
                  i
                ) => (
                  <li
                    key={i}
                    css={css`
                      padding: 1rem;
                      :nth-child(odd) {
                        background: whitesmoke;
                      }
                      display: flex;
                      justify-content: space-between;
                      ${job_info.filled === 1 && `filter: grayscale(1);`}
                      p {
                        color: ${colors.grey};
                        margin: 0;
                      }
                    `}
                  >
                    <p>
                      <GatsbyLink to={`/vacature/${slug}`}>{title}</GatsbyLink>
                      <br />
                      <strong>{job_info.company_name}</strong>{" "}
                      {job_info.company_tagline}
                    </p>
                    <span
                      css={css`
                        margin-left: 1rem;
                        text-align: right;
                      `}
                    >
                      {job_info.job_location}
                    </span>
                  </li>
                )
              )}
            </ul>
          </section>
        </Layout>
      )}
    />
  )
}

export default VacaturesPage

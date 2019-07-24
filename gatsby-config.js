require("dotenv").config()
const config = require(`./src/site/config.js`)

module.exports = {
  siteMetadata: config.siteMetadata,
  plugins: [
    // source
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "wordsby-uploads",
        path: `${__dirname}/wordsby/uploads/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "wordsby-data",
        path: `${__dirname}/wordsby/data/`,
      },
    },
    // build & transform
    `gatsby-transformer-json`,
    // {
    //   resolve: "gatsby-plugin-nprogress",
    //   options: {
    //     color: config.base.primaryColor,
    //   },
    // },
    `gatsby-plugin-catch-links`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-svgr",
      // options: {
      //   include: `src/images/svg`,
      // },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-sharp`,

    // seo trickery and analytics
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `${process.env.GA_CODE}`,
        head: true, // Puts tracking script in the head instead of the body
        anonymize: true, // Setting this parameter is optional
        respectDNT: true, // Setting this parameter is also optional
        exclude: [], // Avoids sending pageview hits from custom paths
      },
    },
    {
      resolve: `gatsby-plugin-advanced-sitemap`,
      options: {
        exclude: ["/404"],
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `${config.siteMetadata.siteUrl}`,
        sitemap: `${config.siteMetadata.siteUrl}/sitemap.xml`,
        policy: [
          {
            userAgent: "*",
            disallow: ["/404"],
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: config.manifest,
    },
    "gatsby-plugin-offline",

    // hosting
    "gatsby-plugin-netlify-cache",
    {
      resolve: "gatsby-plugin-netlify", //keep last
      options: {
        headers: {
          "/sw.js": ["Cache-Control: no-cache"], //dont cache the service worker!
        },
        // mergeSecurityHeaders: false,
      },
    },
  ],
}

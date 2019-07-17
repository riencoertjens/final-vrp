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

    // https://public-api.wordpress.com/wp/v2/sites/gatsbyjsexamplewordpress.wordpress.com/pages/
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        /*
         * The base URL of the Wordpress site without the trailingslash and the protocol. This is required.
         * Example : 'gatsbyjswpexample.wordpress.com' or 'www.example-site.com'
         */
        baseUrl: `${process.env.WP_URL}`,
        // baseUrl: `www.vrp.be`,
        // The protocol. This can be http or https.
        protocol: `${process.env.WP_PROTOCOL}`,
        // Set how many simultaneous requests are sent at once.
        concurrentRequests: 10,
        // protocol: `https`,
        // Indicates whether the site is hosted on wordpress.com.
        // If false, then the asumption is made that the site is self hosted.
        // If true, then the plugin will source its content on wordpress.com using the JSON REST API V2.
        // If your site is hosted on wordpress.org, then set this to false.
        hostingWPCOM: false,
        // If useACF is true, then the source plugin will try to import the Wordpress ACF Plugin contents.
        // This feature is untested for sites hosted on Wordpress.com
        useACF: true,
        auth: {
          htaccess_user: `${process.env.WP_USER}`,
          htaccess_pass: `${process.env.WP_PASS}`,
          htaccess_sendImmediately: false,
        },
        plugins: [
          {
            resolve: `gatsby-wordpress-inline-images`,
            options: {
              baseUrl: `${process.env.WP_URL}`,
              protocol: `${process.env.WP_PROTOCOL}`,
            },
          },
        ],
        // searchAndReplaceContentUrls: {
        //   sourceUrl: "webhart.one",
        //   replacementUrl: "vrp-final.netlify.com",
        // },
      },
    },

    // build & transform
    `gatsby-transformer-json`,
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: "rebeccapurple",
      },
    },
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

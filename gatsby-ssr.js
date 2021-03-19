/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require("react")

export const onRenderBody = (
  { setHeadComponents },
  pluginOptions
) => {

  setHeadComponents([
    <script async defer dataDomain="vrp.be" src="https://plausible.io/js/plausible.js"></script>
  ])
}

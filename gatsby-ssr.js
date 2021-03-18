/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents()
  const newHeadComponents = [
    '<script async defer data-domain="vrp.be" src="https://plausible.io/js/plausible.js"></script>',
    ...headComponents
  ]
  replaceHeadComponents(newHeadComponents)
}

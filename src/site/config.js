const base = {
  owner: `VRP vzw`,
  name: `VRP`,
  shortName: `VRP`,
  tagline: `Vlaamse vereniging voor Ruimte en Planning`,
  twitter: `VRPvzw`,
  instagram: `VRPvzw`,
  email: `info@vrp.be`,
  phone: `(+32) 03/201 59 00`,
  facebookAppID: ``,
  facebookPage: `1382034548696817`,
  // url: `localhost:8000`, // no trailing slash!
  // url: `https://vrp-final.netlify.com`, // no trailing slash!
  url: `https://www.vrp.be`, // no trailing slash!
  titleTemplateSeperator: ` | `,
  icon: `src/images/seo/site-icon.png`, // 1500x1500 This path is relative to the root of the site.
  image: `src/images/seo/social-image.png`, // 1200x630 This path is relative to the root of the site.
  language: `nl`,
  description: `De Vlaamse Vereniging voor Ruimte en Planning (VRP vzw) groepeert sinds 1997 ruimtelijk planners en stedenbouwkundigen uit Vlaanderen en Brussel en is de ontmoetingsplaats, het platform en het aanspreekpunt voor iedereen die (professioneel) betrokken is bij ruimtelijke planning in Vlaanderen.`,
  primaryColor: `#F28C00`,
  primaryBgColor: `white`,
}

const config = {
  base: base,
  siteMetadata: {
    owner: base.owner,
    email: base.email,
    phone: base.phone,
    siteTitle: base.tagline,
    siteDescription: base.description,
    siteTagline: base.tagline,
    siteImage: base.image,
    siteIcon: base.icon,
    siteUrl: base.url,
    titleTemplate: `%s${base.titleTemplateSeperator}${base.name}`,
    twitterUsername: base.twitter,
    instagramUsername: base.instagram,
    facebookPage: base.facebookPage,
    facebookAppID: base.facebookAppID,
    siteLanguage: base.language,
    organization: {
      name: base.owner,
      url: base.url,
      logo: `${base.url}/icons/icon-512x512.png`,
    },
  },
  manifest: {
    name: base.name,
    short_name: base.shortName,
    start_url: `/`,
    background_color: base.primaryBgColor,
    theme_color: base.primaryColor,
    display: `minimal-ui`,
    icon: base.icon, // This path is relative to the root of the site.
  },
}

module.exports = config

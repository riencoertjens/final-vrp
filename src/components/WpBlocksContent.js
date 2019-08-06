import React from "react"
import css from "@emotion/css"

export const WpBlockStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  * {
    flex: 0 0 100%;
  }
  a.logo_block {
    text-align: center;
    transition: 0.2s;
    :hover {
      transform: scale(1.1);
    }
    margin: 1rem;
    display: block;
    max-width: 195px;
    overflow: hidden;
    img {
      max-width: 100%;
      max-height: 200px;
      object-fit: contain;
    }
    flex: 0 1 195px;
    span {
      display: none;
    }
  }

  .wp-block-button {
    color: #fff;
    margin-bottom: 1.5rem;
  }
  .wp-block-button.aligncenter {
    text-align: center;
  }
  .wp-block-button.alignright {
    /*rtl:ignore*/
    text-align: right;
  }

  .wp-block-button__link {
    background-color: #f28c00;
    border: none;
    border-radius: 28px;
    box-shadow: none;
    color: inherit;
    cursor: pointer;
    display: inline-block;
    font-size: 18px;
    margin: 0;
    padding: 12px 24px;
    text-align: center;
    text-decoration: none;
    overflow-wrap: break-word;
  }
  .wp-block-button__link:hover,
  .wp-block-button__link:focus,
  .wp-block-button__link:active,
  .wp-block-button__link:visited {
    color: inherit;
  }

  .is-style-squared .wp-block-button__link {
    border-radius: 0;
  }

  .is-style-outline {
    color: #32373c;
  }
  .is-style-outline .wp-block-button__link {
    background-color: transparent;
    border: 2px solid currentcolor;
  }

  .wp-block-columns {
    display: flex;
    flex-wrap: wrap;
  }
  @media (min-width: 782px) {
    .wp-block-columns {
      flex-wrap: nowrap;
    }
  }

  .wp-block-column {
    flex-grow: 1;
    margin-bottom: 1rem;
    flex-basis: 100%;
    min-width: 0;
    word-break: break-word;
    overflow-wrap: break-word;
  }
  @media (min-width: 600px) {
    .wp-block-column {
      flex-basis: calc(50% - 16px);
      flex-grow: 0;
    }
    .wp-block-column:nth-of-type(even) {
      margin-left: 32px;
    }
  }
  @media (min-width: 782px) {
    .wp-block-column:not(:first-of-type) {
      margin-left: 32px;
    }
  }

  .wp-block-image {
    max-width: 100%;
    margin-bottom: 1rem;
    margin-left: 0;
    margin-right: 0;
  }
  .wp-block-image img {
    max-width: 100%;
  }
  .wp-block-image.aligncenter {
    text-align: center;
  }
  .wp-block-image.alignfull img,
  .wp-block-image.alignwide img {
    width: 100%;
  }
  .wp-block-image .alignleft,
  .wp-block-image .alignright,
  .wp-block-image .aligncenter,
  .wp-block-image.is-resized {
    /* display: table; */
    margin-left: 0;
    margin-right: 0;
  }
  .wp-block-image .alignleft > figcaption,
  .wp-block-image .alignright > figcaption,
  .wp-block-image .aligncenter > figcaption,
  .wp-block-image.is-resized > figcaption {
    /* display: table-caption; */
    caption-side: bottom;
  }
  .wp-block-image .alignleft {
    /*rtl:ignore*/
    float: left;
    /*rtl:ignore*/
    margin-right: 1rem;
  }
  .wp-block-image .alignright {
    /*rtl:ignore*/
    float: right;
    /*rtl:ignore*/
    margin-left: 1rem;
  }
  .wp-block-image .aligncenter {
    margin-left: auto;
    margin-right: auto;
  }
  .wp-block-image figcaption {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    color: #555d66;
    text-align: center;
    font-size: 13px;
  }

  .is-small-text {
    font-size: 14px;
  }

  .is-regular-text {
    font-size: 16px;
  }

  .is-large-text {
    font-size: 36px;
  }

  .is-larger-text {
    font-size: 48px;
  }

  p.has-background {
    padding: 20px 30px;
  }

  p.has-text-color a {
    color: inherit;
  }

  .wp-block-table.has-fixed-layout {
    table-layout: fixed;
    width: 100%;
  }

  .wp-block-table.alignleft,
  .wp-block-table.aligncenter,
  .wp-block-table.alignright {
    display: table;
    width: auto;
  }

  .wp-block-table.has-subtle-light-gray-background-color {
    background-color: #f3f4f5;
  }

  .wp-block-table.has-subtle-pale-green-background-color {
    background-color: #e9fbe5;
  }

  .wp-block-table.has-subtle-pale-blue-background-color {
    background-color: #e7f5fe;
  }

  .wp-block-table.has-subtle-pale-pink-background-color {
    background-color: #fcf0ef;
  }

  .wp-block-table.is-style-stripes {
    border-spacing: 0;
    border-collapse: inherit;
    background-color: transparent;
    border-bottom: 1px solid #f3f4f5;
  }
  .wp-block-table.is-style-stripes tr:nth-of-type(odd) {
    background-color: #f3f4f5;
  }
  .wp-block-table.is-style-stripes.has-subtle-light-gray-background-color
    tr:nth-of-type(odd) {
    background-color: #f3f4f5;
  }
  .wp-block-table.is-style-stripes.has-subtle-pale-green-background-color
    tr:nth-of-type(odd) {
    background-color: #e9fbe5;
  }
  .wp-block-table.is-style-stripes.has-subtle-pale-blue-background-color
    tr:nth-of-type(odd) {
    background-color: #e7f5fe;
  }
  .wp-block-table.is-style-stripes.has-subtle-pale-pink-background-color
    tr:nth-of-type(odd) {
    background-color: #fcf0ef;
  }
  .wp-block-table.is-style-stripes td {
    border-color: transparent;
  }
`

const WpBlocksContent = ({ content, ...restProps }) => (
  <div
    css={WpBlockStyle}
    dangerouslySetInnerHTML={{ __html: content }}
    {...restProps}
  />
)

export default WpBlocksContent

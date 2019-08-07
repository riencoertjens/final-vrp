import React, { Component } from "react"
import css from "@emotion/css"
import { colors } from "../site/styles"

import { FaSearch as SearchIcon } from "react-icons/fa"
import { navigate } from "gatsby"

class SearchComponent extends Component {
  render() {
    return (
      <>
        <div
          css={css`
            background: whitesmoke;
          `}
          {...this.props}
        >
          <form
            css={css`
              padding: 1rem;
              position: relative;
              background: whitesmoke;
              input {
                color: ${colors.blue};
                border: 1px solid ${colors.blue};
                padding: 1rem;
                width: 100%;
                border-radius: 1rem;
              }
              button {
                color: ${colors.blue};
                position: absolute;
                background: transparent;
                border: none;
                right: calc(1rem + 1px);
                top: calc(1rem + 1px);
                padding: 1.1rem 1.25rem 0.9rem;
                border-radius: 1rem;
              }
            `}
            onSubmit={event => {
              event.preventDefault()
              navigate(`/zoeken?q=${encodeURI(event.target.query.value)}`)
            }}
          >
            <input type="text" name="query" />
            <button>
              <SearchIcon />
            </button>
          </form>
        </div>
      </>
    )
  }
}

export default SearchComponent

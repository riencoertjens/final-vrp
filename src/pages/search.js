import React, { Component } from "react"
import Layout from "../components/Layout"
import GatsbyLink from "gatsby-link"
import css from "@emotion/css"
import { Button } from "../site/styles"

const url = `https://www.googleapis.com/customsearch/v1?key=${
  process.env.GATSBY_GOOGLE_SEARCH_API
}&cx=${process.env.GATSBY_GOOGLE_SEARCH_CSE}`

class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.state = { searchResult: false, searching: true, searchQuery: null }
  }

  getSearchQuery() {
    const urlParams = this.props.location.search
    let url = ""
    const urlObj =
      (urlParams &&
        JSON.parse(
          '{"' +
            urlParams
              .substring(1)
              .replace(/&/g, '","')
              .replace(/=/g, '":"') +
            '"}',
          function(key, value) {
            return key === "" ? value : decodeURIComponent(value)
          }
        )) ||
      null

    if (urlObj) {
      if (urlObj.q) {
        url = `${url}&q=${urlObj.q}`
        if (urlObj.start) {
          url = `${url}&start=${urlObj.start}`
        }
      }
      return {
        url: url,
        params: urlObj,
      }
    } else {
      return false
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.setState({ searching: true })
    }
  }

  render() {
    const searchQuery = this.getSearchQuery()
    const { searchResult, searching } = this.state

    if (searching && searchQuery) {
      fetch(`${url}${searchQuery.url}`)
        .then(response => response.json())
        .then(searchResult => {
          this.setState({
            searchResult: searchResult,
            searching: false,
          })
        })
        .catch(console.error.bind(console))
    }

    const { queries, searchInformation } = searchResult

    const currentPage =
      searchResult &&
      searchInformation &&
      searchInformation.totalResults > 0 &&
      Math.ceil(queries.request[0].startIndex / 10)
    const totalPages =
      searchResult &&
      searchInformation &&
      searchInformation.totalResults > 0 &&
      Math.ceil(searchInformation.totalResults / 10)

    return (
      <Layout showSearch={true}>
        <section>
          <h1>Zoeken</h1>
          {searchQuery ? (
            <>
              {searching ? (
                <p>zoeken...</p>
              ) : (
                <>
                  {searchResult &&
                  searchInformation &&
                  searchInformation.totalResults > 0 ? (
                    <>
                      <p>
                        {searchInformation.totalResults} zoekresultaten voor:{" "}
                        <strong>{searchQuery.params.q}</strong>
                        <br />
                        pagina {currentPage}/{totalPages}
                      </p>
                      <ul
                        css={css`
                          list-style: none;
                          padding: 0;
                          a {
                            text-decoration: none;
                          }
                          li {
                            border-bottom: 1px solid;
                            margin: 1rem 0;
                          }
                          h3 {
                            margin: 0;
                          }
                          p {
                            margin: 0;
                            margin-bottom: 1rem;
                            color: black;
                          }
                        `}
                      >
                        {searchResult.items.map((result, i) => (
                          <li key={i}>
                            <GatsbyLink to="/">
                              <h3>{result.title}</h3>
                              <p>{result.snippet}</p>
                            </GatsbyLink>
                          </li>
                        ))}
                      </ul>

                      <div
                        css={css`
                          display: flex;
                          justify-content: center;
                          & > div {
                            padding: 0.2rem 1rem 0.3rem;
                            a,
                            span {
                              margin: 0 0.5rem;
                            }
                          }
                        `}
                      >
                        {queries.previousPage && (
                          <Button
                            left
                            component={GatsbyLink}
                            to={`/search?q=${searchQuery.params.q}&start=${
                              queries.previousPage[0].startIndex
                            }`}
                          >
                            vorige
                          </Button>
                        )}
                        <div>
                          {Array(Math.ceil(searchInformation.totalResults / 10))
                            .fill()
                            .map((a, i) =>
                              i + 1 === currentPage ? (
                                <span>{i + 1}</span>
                              ) : (
                                <GatsbyLink
                                  to={`/search?q=${
                                    searchQuery.params.q
                                  }&start=${i * 10 + 1}`}
                                >
                                  {i + 1}
                                </GatsbyLink>
                              )
                            )}
                        </div>
                        {queries.nextPage && (
                          <Button
                            right
                            component={GatsbyLink}
                            to={`/search?q=${searchQuery.params.q}&start=${
                              queries.nextPage[0].startIndex
                            }`}
                          >
                            volgende
                          </Button>
                        )}
                      </div>
                    </>
                  ) : (
                    <p>geen zoekresultaten</p>
                  )}
                </>
              )}
            </>
          ) : (
            <p>voer zoekterm in</p>
          )}
        </section>
      </Layout>
    )
  }
}

export default SearchPage

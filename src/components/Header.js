import React from "react"
import styled from "@emotion/styled"
import GatsbyLink from "gatsby-link"
import { StaticQuery, graphql } from "gatsby"
import { colors, breakpoints } from "../site/styles"

import {
  FaAngleDown as ArrowIcon,
  FaSearch as SearchIcon,
} from "react-icons/fa"

import { Spin as Hamburger } from "react-burgers"

import { ReactComponent as LogoIcon } from "../images/svg/vrp-logo2018.svg"
import css from "@emotion/css"
import { MqMin, MqMax } from "./webhart-components/style-functions"
import SearchComponent from "./SearchComponent"

const Logo = () => (
  <GatsbyLink
    to="/"
    css={css`
      && {
        flex: 0 0 10rem;
        width: 10rem;
        height: auto;
        padding: 1rem 0 0;
        display: block;
      }
    `}
  >
    <LogoIcon />
  </GatsbyLink>
)

const Nav = styled.nav`
  position: relative;
  width: 100%;
  font-size: 1rem;
  z-index: 100;
  ul {
    list-style: none;
  }
  ${props => (props.menuActive ? "display: block;" : "display:none;")}
  background: ${colors.orange};
  ${MqMin("700px")} {
    background: whitesmoke;
    display: flex;
    flex-wrap: wrap-reverse;
    justify-content: flex-end;
    align-items: flex-start;
    margin-left: auto;
  }
`
const NavGroup = styled.ul`
  padding: 0;
  padding-left: 1rem;
  ${MqMin("700px")} {
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
  }
`

const NavItemWrapper = styled.li`
  position: relative;
  & > a {
    font-size: 1.25rem;
    padding: 0.5rem 0.5rem;
    ${props => props.dropdown && `padding-right: 0rem;`}
  }
  a {
    text-transform: capitalize;
    text-decoration: none;
    font-weight: 300;
    color: white;
    box-sizing: border-box;
    ${MqMin("700px")} {
      color: inherit;
    }
    display: inline-block;
  }
  svg {
    padding: 0.33rem;
    height: 1.75rem;
    width: 1.75rem;
    transition: 0.2s;
    position: absolute;
    /* color: ${colors.blue}; */
    color: white;
    top: 0.5rem;
    ${MqMin("700px")} {
      color: inherit;
      right: 0.25rem;
    }
  }
  
  ${MqMin("700px")} {
    color: ${props => (props.alt ? colors.orange : colors.grey)};
    position: relative;
    svg {
      position: relative;
      margin: 0;
      transform: rotate(-90deg);
    }
    :hover,
    &:focus-within {
      ${props =>
        props.alt
          ? `
      background: ${colors.orange};
      color: white;
      `
          : `
      color: ${colors.orange};
      `};
      svg {
        transform: rotate(0);
      }
    }

    &:hover ul,
    &:focus-within ul {
      display: grid;
    }
  }
`

const NavDropdown = styled.ul`
  padding-left: 1rem;
  li {
    min-width: 10rem;
    a {
      padding: 0.75rem 1rem;
    }
  }
  ${MqMin("700px")} {
    ${MqMax(breakpoints[2])} {
      right: 0;
    }
    font-size: 0.833rem;
    display: none;
    z-index: 10;
    grid-auto-flow: column;
    background: ${colors.orange};
    padding: 0;
    position: absolute;
    top: 100%;
  }
`

const NavItem = ({ children, dropdown, to, alt, linkPrefix }) => (
  <NavItemWrapper alt={alt} dropdown={dropdown}>
    <GatsbyLink to={to}>{children}</GatsbyLink>
    {dropdown && (
      <>
        <ArrowIcon />
        <NavDropdown
          css={css`
            grid-template-rows: repeat(
              ${Math.round(dropdown.length / 3 + 0.5)},
              auto
            );
          `}
        >
          {dropdown.map(({ node: item }, i) => (
            <li key={i}>
              <GatsbyLink
                to={`/${linkPrefix ? `${linkPrefix}/` : ""}${
                  item.parent_term ? `${item.parent_term}/` : ""
                }${item.slug}`}
              >
                {item.name}
              </GatsbyLink>
            </li>
          ))}
        </NavDropdown>
      </>
    )}
  </NavItemWrapper>
)

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = { menuActive: false, searchActive: props.showSearch }
  }
  render() {
    const { menuActive } = this.state
    const searchActive = this.props.showSearch || this.state.searchActive
    return (
      <StaticQuery
        query={graphql`
          query {
            themas: allTermsJson(
              filter: { taxonomy: { eq: "thema" } }
              sort: { fields: name, order: ASC }
            ) {
              edges {
                node {
                  name
                  slug
                }
              }
            }

            activiteiten: allTermsJson(
              filter: {
                taxonomy: { eq: "category" }
                parent_term: { in: ["activiteiten", "prijzen"] }
              }
              sort: { fields: [parent_term, name], order: DESC }
            ) {
              edges {
                node {
                  name
                  slug
                  parent_term
                }
              }
            }
          }
        `}
        render={({ themas: { edges: themas }, activiteiten }) => {
          const activiteitenCategories = activiteiten.edges.slice(0)
          activiteitenCategories.push({
            node: {
              name: "Start@vrp",
              slug: "startvrp",
            },
          })

          return (
            <>
              <header
                css={css`
                  display: flex;
                  position: relative;
                  flex-wrap: wrap;
                  z-index: 10;
                  background: whitesmoke;
                  justify-content: space-between;
                  ${MqMin("700px")} {
                    flex-wrap: unset;
                    padding: 0;
                    align-items: center;
                  }
                `}
              >
                <Logo />
                <button
                  css={css`
                    border: none;
                    padding: 7px 10px 0;
                    margin-right: 1rem;
                    margin-left: auto;
                    background: none;
                    color: ${colors.grey};

                    :hover {
                      color: ${colors.orange};
                    }

                    ${searchActive && `color: ${colors.orange};`}

                    ${MqMin("700px")} {
                      order: 3;
                      position: relative;
                    }
                  `}
                  onClick={() =>
                    this.setState({
                      searchActive: !searchActive,
                      menuActive: false,
                    })
                  }
                >
                  <SearchIcon />
                </button>
                <Hamburger
                  width={30}
                  lineHeight={3}
                  lineSpacing={5}
                  color={colors.grey}
                  borderRadius={2}
                  padding={"15px 15px 10px 0"}
                  active={menuActive}
                  onClick={() =>
                    this.setState({
                      menuActive: !menuActive,
                      searchActive: false,
                    })
                  }
                  customProps={{
                    "aria-label": "menu toggle",
                    "aria-expanded": menuActive,
                  }}
                  css={css`
                    ${MqMin("700px")} {
                      && {
                        display: none;
                      }
                    }
                    &&:hover {
                      div div {
                        &,
                        ::before,
                        ::after {
                          background: ${colors.orange};
                        }
                      }
                    }
                  `}
                />
                <Nav menuActive={menuActive}>
                  <NavGroup role="menu">
                    <NavItem
                      to="/themas"
                      dropdown={themas}
                      alt={1}
                      linkPrefix="themas"
                    >
                      Thema's
                    </NavItem>
                    <NavItem
                      to="/activiteiten"
                      dropdown={activiteitenCategories}
                      alt="true"
                    >
                      Activiteiten
                    </NavItem>
                    <NavItem to="/ruimte" alt={1}>
                      Ruimte
                    </NavItem>
                  </NavGroup>
                  <NavGroup>
                    <NavItem to="/over-vrp">Over VRP</NavItem>
                    <NavItem to="/lid-worden">Lid worden</NavItem>
                    <NavItem to="/nieuws">nieuws</NavItem>
                    <NavItem to="/blog">blog</NavItem>
                    <NavItem to="/nieuwsbrief">nieuwsbrief</NavItem>
                  </NavGroup>
                </Nav>
              </header>
              <SearchComponent
                css={css`
                  display: ${searchActive ? "block" : "none"};
                `}
              />
            </>
          )
        }}
      />
    )
  }
}

export default Header

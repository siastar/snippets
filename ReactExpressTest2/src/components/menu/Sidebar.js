import React from "react";
import axios from "axios";
import _ from "lodash";
import { Link } from "react-browser-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthConsumer } from "../../AuthContext";
export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: null,
      language: "en"
    };

    

  }

  componentDidMount() {
    if (!this.state.menuItems) {
      this.getMenuItems();
    }
  }
  switchLang = () => {
    if (this.context._globalLang === "en") {
      this.context._setLang("it");
    } else {
      this.context._setLang("en");
    }
  };
  getMenuItems = async () => {
    const res = await axios.get("/api/menu");
    const menuItems = await _.sortBy(res.data, "sortId", "asc");
    console.log("TCL: Sidebar -> getMenuItems -> menuItems", menuItems);
    this.setState({
      menuItems
    });
  };

  render() {
    return (
      <aside className="left-sidebar bg-sidebar">
        <div id="sidebar" className="sidebar sidebar-with-footer">
          {
            //<!-- Aplication Brand -->
          }
          <div className="app-brand">
            <a href="/index.html">
              <svg
                className="brand-icon"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
                width="30"
                height="33"
                viewBox="0 0 30 33"
              >
                <g fill="none" fill-rule="evenodd">
                  <path
                    className="logo-fill-blue"
                    fill="#7DBCFF"
                    d="M0 4v25l8 4V0zM22 4v25l8 4V0z"
                  />
                  <path
                    className="logo-fill-white"
                    fill="#FFF"
                    d="M11 4v25l8 4V0z"
                  />
                </g>
              </svg>
              <span className="brand-name">ESTH DASHBOARD</span>
            </a>
          </div>
          {
            //<!-- begin sidebar scrollbar -->
          }
          <div className="sidebar-scrollbar">
            {
              //<!-- sidebar menu -->
            }
            <ul className="nav sidebar-inner" id="sidebar-menu">
              <li className="has-sub active expand">
                <a
                  className="sidenav-item-link"
                  href="javascript:void(0)"
                  data-toggle="collapse"
                  data-target="#dashboard"
                  aria-expanded="false"
                  aria-controls="dashboard"
                >
                  <i className="mdi mdi-view-dashboard-outline" />
                  <span className="nav-text">Dashboard</span>{" "}
                  <b className="caret" />
                </a>
                <ul
                  className="collapse show"
                  id="dashboard"
                  data-parent="#sidebar-menu"
                >
                  <div className="sub-menu">
                    {this.state.menuItems === null
                      ? "Loading..."
                      : this.state.menuItems.map(items => {
                          return (
                            <li className="active">
                              <Link
                                to={items.url}
                                className="sidenav-item-link"
                                href="index.html"
                              >
                                <span className="nav-text">
                                  <span className="fa-layers fa-fw">
                                    <FontAwesomeIcon icon={items.icon} />
                                  </span>{" "}
                                  {
                                    items.title_lang[0][
                                      this.context._globalLang
                                    ]
                                  }
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                  </div>
                </ul>
              </li>
            </ul>
          </div>

          <hr className="separator" />

          <div className="sidebar-footer">
            <div className="sidebar-footer-content">
              <div class="row vertical-align">
                <div class="col-xs-4">
                  <a href="#" title="English">
                    <img
                      src="/assets/img/elements/ukf.png"
                      className="img-responsive w-25 p-1"
                      onClick={this.switchLang}
                    />
                  </a>
                  <a href="#" title="Italian">
                    <img
                      src="/assets/img/elements/itf.png"
                      className="img-responsive w-25 p-1"
                      onClick={this.switchLang}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    );
  }
}

Sidebar.contextType = AuthConsumer;

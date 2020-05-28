import React from "react";
import Main from "../Main";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SimpleReactValidator from "simple-react-validator";
import { AuthConsumer } from "../../AuthContext";
import MessageAlert from "../commons/MessageAlert";
import ObjectID from "bson-objectid";
import _ from "lodash";

export default class MenuEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: undefined,
      url: undefined,
      title: undefined,
      active: undefined,
      auth: undefined,
      icon: undefined,
      sortid: undefined,
      status: undefined
    };
    this.validator = new SimpleReactValidator();
  }

  componentWillMount() {
    const id = this.props.match.params.id || null;
    if (id !== null) {
      this.getItem(id);
    }
  }

  onChange = e => {
    if (e.currentTarget.name === "title") {
      this.setState({ title: e.currentTarget.value });
    } else if (e.currentTarget.name === "active") {
      this.setState({ active: e.currentTarget.value });
    } else if (e.currentTarget.name === "auth") {
      this.setState({ auth: e.currentTarget.value });
    } else if (e.currentTarget.name === "icon") {
      this.setState({ icon: e.currentTarget.value });
    } else if (e.currentTarget.name === "sortid") {
      this.setState({ sortid: e.currentTarget.value });
    }
  };

  getItem = async id => {
    const res = await axios.get("/api/menu/" + id);
    const menuItems = await res.data;

    //Always gets one Item at a time

    if (!_.isEmpty(menuItems)) {
      this.setState({
        _id: menuItems._id,
        url: menuItems.url,
        title: menuItems.title_lang[0][this.context._globalLang],
        _innerId: menuItems.title_lang[0]._id,
        active: menuItems.active,
        auth: menuItems.auth,
        icon: menuItems.icon,
        sortid: menuItems.sortId
      });
    }
  };

  onFormSubmit = e => {
    if (this.validator.allValid()) {
      const langPrefix = this.context._globalLang;
      //prepare data to post
      const where = {
        _id: ObjectID(this.state._id),
        "title_lang._id": ObjectID(this.state._innerId)
      }; //{_id:ObjectID(this.state._id)}
      const set = {
        ["title_lang.$." + langPrefix]: this.state.title,
        active: this.state.active,
        auth: this.state.auth,
        icon: this.state.icon,
        sortId: this.state.sortid
      };

      axios
        .post("/menu/update", {
          data: { where, set }
        })
        .then(res => {
          if (res.status === 204) {
            this.setState({
              status: 204
            });

            setTimeout(() => {
              this.setState({
                status: ""
              });
            }, 2000);
          }
        })
        .catch(err => {
          this.setState({
            status: 500
          });
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
    e.preventDefault();
  };

  render() {
    if (!_.isEmpty(this.state._id)) {
      return (
        <Main>
          <div className="card card-default">
            <div className="card-header card-header-border-bottom">
              <h2>
                <span className="fa-layers fa-fw">
                  <FontAwesomeIcon icon="pencil-alt" />
                </span>{" "}
                Edit Menu
              </h2>
            </div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label for="id">ID</label>
                      <input
                        name="id"
                        type="text"
                        className="form-control"
                        value={this.state._id}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label for="title">Title Language</label>
                      <input
                        name="title"
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        autoComplete="off"
                        value={this.state.title}
                        onChange={e => this.onChange(e)}
                      />
                      {this.validator.message(
                        "title",
                        this.state.title,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label for="url">URL</label>
                      <input
                        name="url"
                        type="text"
                        className="form-control"
                        placeholder="URL"
                        disabled
                        value={this.state.url}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <label for="active">Active</label>
                          <select
                            className="form-control"
                            name="active"
                            id="active"
                            value={this.state.active}
                            onChange={e => this.onChange(e)}
                          >
                            <option value="true">True</option>
                            <option value="false">False</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label for="active">Authentication</label>
                          <select
                            className="form-control"
                            name="auth"
                            id="auth"
                            onChange={e => this.onChange(e)}
                            value={this.state.auth}
                          >
                            <option value="true">True</option>
                            <option value="false">False</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label for="icon">Icon</label>
                      <input
                        name="icon"
                        type="text"
                        className="form-control"
                        placeholder="FontAwesome Icon"
                        autoComplete="off"
                        value={this.state.icon}
                        onChange={e => this.onChange(e)}
                      />
                      {this.validator.message(
                        "icon",
                        this.state.icon,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label for="sortid">SortID</label>
                      <input
                        name="sortid"
                        type="text"
                        className="form-control"
                        placeholder="SortID"
                        value={this.state.sortid}
                        onChange={e => this.onChange(e)}
                      />
                      {this.validator.message(
                        "sortid",
                        this.state.sortid,
                        "required|numeric"
                      )}
                    </div>
                  </div>
                </div>
                <MessageAlert
                  status={this.state.status}
                  successMessage="Record has been updated."
                  errorMessage="An error occured while performing operation."
                />
                <div className="form-footer pt-5 border-top">
                  <button
                    type="submit"
                    className="btn btn-primary btn-default"
                    onClick={this.onFormSubmit}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Main>
      );
    } else return(<Main><p className="centerauto">NO DATA</p></Main>)
  }
}

MenuEditor.contextType = AuthConsumer;

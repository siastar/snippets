import React from "react";
import Main from "../Main";
import axios from "axios";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SimpleReactValidator from "simple-react-validator";
import { AuthConsumer } from "../../AuthContext";
import MessageAlert from "../commons/MessageAlert";

export default class CatEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "", //this.data._id,
      cat_lang: "" //this.data.url,
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
    if (e.currentTarget.name === "category") {
      this.setState({ cat_lang: e.currentTarget.value });
    }
  };

  getItem = async id => {
    const res = await axios.get("/api/sideservicescat/" + id);
    const catItems = await res.data;
    this.setState({
      _id: catItems.cat_lang[0]._id,
      cat_lang: catItems.cat_lang[0][this.context._globalLang]
    });
  };

  onFormSubmit = e => {
    e.preventDefault();

    if (this.validator.allValid()) {
      const url = !_.isEmpty(this.state._id)
        ? "/api/sideservicecat/u"
        : "/api/sideservicecat/c";
      let data = null;
      if (!_.isEmpty(this.state._id)) {
        //data ready for update
        const skey = "cat_lang.$." + this.context._globalLang;
        data = { "cat_lang._id": this.state._id, [skey]: this.state.cat_lang };
      } else {
        //data ready for create
        //data = {'cat_lang':[{_id:ObjectID(),[this.context._globalLang]:this.state.cat_lang}]};
        data = { [this.context._globalLang]: this.state.cat_lang };
      }

      axios
        .post(url, data)
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
          console.log(err);
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    return (
      <Main>
        <div className="card card-default">
          <div className="card-header card-header-border-bottom">
            <h2>
              <span className="fa-layers fa-fw">
                <FontAwesomeIcon icon="pencil-alt" />
              </span>{" "}
              Category Editor
            </h2>
          </div>
          <div className="card-body">
            <form>
              <div className="row">
                <div
                  className={_.isEmpty(this.state._id) ? "d-none" : "col-sm-6"}
                >
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
                    <label for="category">Category</label>
                    <input
                      name="category"
                      type="text"
                      className="form-control"
                      placeholder="Category"
                      autoComplete="off"
                      value={this.state.cat_lang}
                      onChange={e => this.onChange(e)}
                    />
                    {this.validator.message(
                      "Category",
                      this.state.cat_lang,
                      "required"
                    )}
                  </div>
                </div>
              </div>
              <MessageAlert
                status={this.state.status}
                successMessage={
                  !_.isEmpty(this.state._id)
                    ? "Record has been updated."
                    : "Record has been created."
                }
                errorMessage="An error occured while performing operation."
              />
              <div className="form-footer pt-5 border-top">
                <button
                  type="submit"
                  className="btn btn-primary btn-default"
                  onClick={this.onFormSubmit}
                >
                  {!_.isEmpty(this.state._id) ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Main>
    );
  }
}

CatEditor.contextType = AuthConsumer;

import React from "react";
import Main from "../Main";
import axios from "axios";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SimpleReactValidator from "simple-react-validator";
import { AuthConsumer } from "../../AuthContext";
import MessageAlert from "../commons/MessageAlert";

export default class SServiceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: "",
      cid: "", //this.data._id,
      url: "", //this.data.url,
      provider: "", //this.data.provider_lang,
      imageurl: "", //this.data.imageurl,
      desc_lang: "", //this.data.desc_lang
      status: "",
      sortId: "",
      category: [],
      categoryId:""
    };
    this.validator = new SimpleReactValidator();
  }

  componentWillMount() {
    const pid = this.props.match.params.pid || null;
    const cid = this.props.match.params.cid || null;

    if (pid !== null && cid !== null) {
      this.getItem(pid, cid);
    } else {
      this.getCategory();
    }
  }

  onChange = e => {

    

    if (e.currentTarget.name === "provider") {
      this.setState({
        provider: e.currentTarget.value
      });
    } else if (e.currentTarget.name === "url") {
      this.setState({
        url: e.currentTarget.value
      });
    } else if (e.currentTarget.name === "sortId") {
      this.setState({
        sortId: e.currentTarget.value
      });
    } else if (e.currentTarget.name === "slug") {
      this.setState({
        slug: e.currentTarget.value
      });
    } else if (e.currentTarget.name === "imageurl") {
      this.setState({
        imageurl: e.currentTarget.value
      });
    } else if (e.currentTarget.name === "desc_lang") {
      this.setState({
        desc_lang: e.currentTarget.value
      });
    }
    else if (e.currentTarget.name === "category") {
        this.setState({
             categoryId: e.currentTarget.value
        });
        console.log(this.state.categoryId);
      }
  };

  getCategory = async () => {
    const lang = this.context._globalLang;
    const res = await axios.get("/api/sideservicesgetcat/" + lang);
    const catItems = []
    res.data.map(({_id,cat_lang})=>{
        catItems.push({_id,value:cat_lang[0][this.context._globalLang]});
    })
    this.setState({
        category: [...catItems] 
    });
    //console.log('TCL: SServiceEditor -> getCategory -> this.state.category', this.state.category)
  };
  getItem = async (pid, cid) => {
    const res = await axios.get("/api/sideservices/" + pid + "/" + cid);
    const sItems = await res.data;
    
    sItems.map(({_id,provider_name,url,imageurl,slug,sortId,desc_lang}) => {
        console.log(_id,provider_name,url,imageurl,slug,sortId,desc_lang);
    });
    
    this.setState({
      pid: this.props.match.params.pid || null,
      cid: sItems[0].providers[0]._id,
      provider: sItems[0].providers[0].provider_name,
      url: sItems[0].providers[0].url,
      imageurl: sItems[0].providers[0].imageurl,
      slug: sItems[0].providers[0].slug,
      sortId: sItems[0].providers[0].sortId,
      //cat_lang:sItems[0].cat_lang[0][this.context._globalLang],
      desc_lang: sItems[0].providers[0].desc_lang[this.context._globalLang]
    });
  };
  onFormSubmit = e => {
    if (this.validator.allValid()) {
      const langPrefix = this.context._globalLang;
      const where = {
        _id: this.state.pid,
        "providers._id": this.state.cid
      };
      const url = !_.isEmpty(this.state.cid)
        ? "/api/sideservice/u"
        : "/api/sideservice/c";
      const set = {
        'providers.$.provider_name': this.state.provider,
        'providers.$.url':this.state.url,
        'providers.$.imageurl':this.state.imageurl,
        ['providers.$.desc_lang.'+this.context._globalLang]:this.state.desc_lang,
        'providers.$.slug':this.state.slug,
        'providers.$.sortId':this.state.sortId,
        }

      const data = {
        _id:this.state.categoryId,
        provider_name: this.state.provider,
        url: this.state.url,
        imageurl: this.state.imageurl,
        desc_lang: {[this.context._globalLang]:this.state.desc_lang},
        slug: this.state.slug,
        sortId: this.state.sortId
      };

      axios.post(url, {
          data: !_.isEmpty(this.state.cid) ? {where,set} : data
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
    return (
      <Main>
        <div className="card card-default">
          <div className="card-header card-header-border-bottom">
            <h2>
              <span className="fa-layers fa-fw">
                <FontAwesomeIcon icon="pencil-alt" />
              </span>
              Editor
            </h2>
          </div>
          <div className="card-body">
            <form>
              <div className="row">
                <div
                  className={!_.isEmpty(this.state.cid) ? "d-none" : "col-sm-6"}
                >
                  <div className="form-group">
                    <label for="id"> Category </label>
                    <select class="form-control" id="category" name="category" onChange={e => this.onChange(e)}>
                      <option value=""> Select Category </option>
                      {this.state.category.map(({_id,value}) => {
                        return <option value={_id}> {value} </option>;
                      })}
                    </select>
                    {this.validator.message(
                      "category",
                      this.state.category,
                      "required"
                    )}
                  </div>
                </div>
                <div
                  className={_.isEmpty(this.state.cid) ? "d-none" : "col-sm-6"}
                >
                  <div className="form-group">
                    <label for="id"> ID </label>
                    <input
                      name="id"
                      type="text"
                      className="form-control"
                      value={this.state.cid}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label for="provider"> Provider Name </label>
                    <input
                      name="provider"
                      type="text"
                      className="form-control"
                      placeholder="Provider Name"
                      autoComplete="off"
                      value={this.state.provider}
                      onChange={e => this.onChange(e)}
                    />
                    {this.validator.message(
                      "provider",
                      this.state.provider,
                      "required"
                    )}
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label for="url"> URL </label>
                    <input
                      name="url"
                      type="text"
                      className="form-control"
                      placeholder="URL"
                      value={this.state.url}
                      onChange={e => this.onChange(e)}
                    />
                    {this.validator.message("url", this.state.url, "required")}
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label for="imageurl"> ImageUrl </label>
                    <input
                      name="imageurl"
                      type="text"
                      className="form-control"
                      placeholder="Image Url"
                      autoComplete="off"
                      value={this.state.imageurl}
                      onChange={e => this.onChange(e)}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label for="desc_lang"> Description </label>
                    <input
                      name="desc_lang"
                      type="text"
                      className="form-control"
                      placeholder="Description"
                      value={this.state.desc_lang}
                      onChange={e => this.onChange(e)}
                    />
                    {this.validator.message(
                      "desc_lang",
                      this.state.desc_lang,
                      "required"
                    )}
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label for="slug"> Slug </label>
                    <input
                      name="slug"
                      type="text"
                      className="form-control"
                      placeholder="Slug"
                      value={this.state.slug}
                      onChange={e => this.onChange(e)}
                    />
                    {this.validator.message(
                      "slug",
                      this.state.slug,
                      "required"
                    )}
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label for="sortId"> SortId </label>
                    <input
                      name="sortId"
                      type="text"
                      className="form-control"
                      placeholder="SortId"
                      value={this.state.sortId}
                      onChange={e => this.onChange(e)}
                    />
                    {this.validator.message(
                      "sortId",
                      this.state.sortId,
                      "required"
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
                  {_.isEmpty(this.state.cid) ? "Create" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Main>
    );
  }
}

SServiceEditor.contextType = AuthConsumer;

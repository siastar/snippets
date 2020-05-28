import React from "react";
import Main from "../Main";
import axios from "axios";
import _ from "lodash";
import { Link } from "react-browser-router";
import ReactDataGrid from "react-data-grid";
import { AuthConsumer } from "../../AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Confirmation from "../commons/Confirmation";
import MessageAlert from "../commons/MessageAlert";
import ColumnVisibility from '../grid/ColumnVisibility';

export default class SServices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: null,
      status: undefined,
      openModal: false,
      parentId: null,
      deleteRecordId: null,
      rows: [],
      columns:[]
    };
  }

  componentDidMount() {
    if (!this.state.menuItems) {
      this.getColumns();
      this.getMenuItems();
    }
  }

  onCloseModal = () => {
    this.setState({
      openModal: false,
      deleteRecordId: null
    });
  };

  openModalConfirmation = data => {
    this.setState({
      openModal: true,
      deleteRecordId: data._id,
      parentId: data.parentid
    });
  };

  handleEditRow = data => {
    this.props.history.push({
      pathname: "/sserviceeditor/" + data.parentid + "/" + data._id
    });
  };

  handleDeleteRow = () => {
    this.setState({ openModal: false });
    const _id = this.state.deleteRecordId;
    const parentid = this.state.parentId;
    const data = { _id, parentid };

    axios
      .post("/api/sideservice/d/", data)
      .then(res => {
        if (res.status === 204) {
          let rows = this.state.rows.slice();
          rows = rows.filter(row => row._id !== _id);
          this.setState({
            rows,
            status: 204
          });
	    /*
          setTimeout(() => {
            this.setState({
              status: ""
            });
          }, 2000);
	     */
        }
      })
      .catch(err => {
        this.setState({
          status: 500
        });
        console.log(err);
      });
  };

  getColumns = () => {
    const columns = [
      { key: "parentid",  visible: false },
      { key: "_id",  visible: false },
      { key: "cat_lang", name: "Category", visible: true },
      { key: "provider_name", name: "Provider", visible: true },
      { key: "url", name: "URL", visible: true },
      { key: "imageurl", name: "ImageURL", visible: false },
      { key: "desc_lang", name: "Description" , visible: false},
      { key: "slug", name: "Slug", visible: false },
      //{key:"class",name:"Class"},
      /*{key:"price",name:"Price"},
            {key:"units",name:"Units"},*/
      { key: "sortId", name: "SortId", visible: false },
      {
        key: "edit",
        getRowMetaData: row => row,
        formatter: ({ dependentValues }) => (
          <a
            href="javascript:;"
            onClick={() => this.handleEditRow(dependentValues)}
          >
            <FontAwesomeIcon icon={"pencil-alt"} />
          </a>
        ),
        width: 35, visible: true
      },
      {
        key: "delete",
        getRowMetaData: row => row,
        formatter: ({ dependentValues }) => (
          <a
            href="javascript:;"
            onClick={() => this.openModalConfirmation(dependentValues)}
          >
            <FontAwesomeIcon icon={"trash"} className="text-danger" />
          </a>
        ),
        width: 35,
        visible: true
      }
    ];


    this.setState({columns})

  };


  setColumnVisibility = index => {
    const columns = [...this.state.columns];
    const toggleValue = columns[index].visible;
    columns[index].visible = !toggleValue;
    this.setState({ columns });
  };


  getMenuItems = async () => {
    const res = await axios.get("/api/sideservices");
    const menuItems = await _.sortBy(res.data, "sortId", "asc");
    const rows = [];
    menuItems.map(items => {
      if (!_.isEmpty(items.cat_lang) && !_.isEmpty(items.providers)) {
        items.providers.map(
          (
            { _id, provider_name, url, desc_lang, imageurl, slug, sortId },
            index
          ) => {
            rows.push({
              parentid: items._id || null,
              _id: _id || null,
              cat_lang: !_.isEmpty(items.cat_lang[0])
                ? items.cat_lang[0][this.context._globalLang]
                : null,
              provider_name: provider_name || null,
              url: url || null,
              imageurl: imageurl || null,
              desc_lang: !_.isEmpty(desc_lang[this.context._globalLang])
                ? desc_lang[this.context._globalLang]
                : null,
              slug: slug || null,
              //class:items.providers[0].class || null,
              /*price:items.providers[0].price.$numberDecimal,
          units:items.providers[0].units || null,*/
              sortId: sortId || null
            });
          }
        );
      }
    });

    this.setState({ rows });
  };

  render() {
    const { rows, status, openModal } = this.state;
   const columns = this.state.columns.filter(
      column => column.visible === true
    );
    return (
      <Main>
        <div className="content-wrapper">
          <div className="content">
            <div className="row">
              <div className="col-lg-12">
                <div className="card card-table-border-none">
                  <div className="card-header card-header-border-bottom">
                    <h2>
                      <span className="fa-layers fa-fw">
                        <FontAwesomeIcon icon="wrench" />
                      </span>
                      Service Categories
                    </h2>
                  </div>
                  <div className="card-body pt-0 pb-5">
                    <div className="table card-table table-responsive table-responsive-large">
                      <p className="mb-5">
                        Use <code>.Menu Settings</code> to edit menu items.
                      </p>
                      <Link
                        className="btn btn-primary mb-3 float-right"
                        to="/sserviceeditor/"
                      >
                        Create +
                      </Link>
                      <MessageAlert
                        status={status}
                        successMessage="Record has been deleted."
                        errorMessage="An error occured while performing operation."
                      />
                      <Confirmation
                        openModal={openModal}
                        onCloseModal={this.onCloseModal}
                        handleDeleteRow={this.handleDeleteRow}
                      />
                      <ColumnVisibility
                        columns={this.state.columns}
                        setColumnVisibility={this.setColumnVisibility}
                      />
                      <ReactDataGrid
                        className="table card-table table-responsive table-responsive-large"
                        enableSingleRowSelect={true}
                        enableCellSelect={true}
                        columns={columns}
                        rowGetter={i => rows[i]}
                        rowsCount={rows.length}
                        enableCellSelect={true}
                        minHeight={500}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Main>
    );
  }
}

SServices.contextType = AuthConsumer;

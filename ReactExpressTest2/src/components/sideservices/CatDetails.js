import React from "react";
import Main from "../Main";
import axios from "axios";
import _ from "lodash";
import ReactDataGrid from "react-data-grid";
import { AuthConsumer } from "../../AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MessageAlert from "../commons/MessageAlert";
import Confirmation from "../commons/Confirmation";
import ColumnVisibility from '../grid/ColumnVisibility';

import { Link } from "react-browser-router";

export default class CatDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: null,
      status: "",
      openModal: false,
      deleteRecordId: null,
      rows: [],
      columns: []
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
    this.setState({ openModal: true, deleteRecordId: data._id });
  };

  handleEditRow = data => {
    this.props.history.push({
      pathname: "/cateditor/" + data._id
    });
  };

  handleDeleteRow = () => {
    this.setState({ openModal: false });
    const _id = this.state.deleteRecordId;
    axios
      .post("/api/sideservicecat/d/" + _id)
      .then(res => {
        if (res.status === 204) {
          let rows = this.state.rows.slice();
          rows = rows.filter(row => row._id !== _id);
          this.setState({
            rows,
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
  };

  getColumns = () => {
    const columns = [
      { key: "_id",visible:false },
      { key: "cat_lang", name: "Category",visible:true },
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
        width: 35,
        visible:true
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
        visible:true
      }
    ];

    this.setState({ columns });
  };

  setColumnVisibility = index => {
    const columns = [...this.state.columns];
    const toggleValue = columns[index].visible;
    columns[index].visible = !toggleValue;
    this.setState({ columns });
  };

  getMenuItems = async () => {
    const res = await axios.get("api/sideservices");
    const menuItems = await _.sortBy(res.data, "sortId", "asc");
    const rows = [];

    menuItems.map(items => {
      rows.push({
        _id: items._id,
        cat_lang: items.cat_lang[0][this.context._globalLang]
      });
    });

    this.setState({ rows });
  };

  render() {
    const { openModal,  rows, status } = this.state;
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
                        to="/cateditor/"
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

CatDetails.contextType = AuthConsumer;

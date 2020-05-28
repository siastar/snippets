import React from "react";
import Main from "../Main";
import axios from "axios";
import _ from "lodash";
import ReactDataGrid from "react-data-grid";
import { AuthConsumer } from "../../AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ColumnVisibility from "../grid/ColumnVisibility";


export default class MenuDetail extends React.Component {
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

  //not using these functions just kept
  //for reference of use for confirmation modal

  onCloseModal = () => {
    this.setState({
      openModal: false,
      deleteRecordId: null
    });
  };

  openModalConfirmation = data => {
    this.setState({ openModal: true, deleteRecordId: data._id });
  };

  //reference use of confirmation ends

  handleEditRow = data => {
    this.props.history.push({
      pathname: "/menueditor/" + data._id
    });
  };

  getColumns = () => {
    const columns = [
      { key: "_id", visible: false },
      { key: "title_lang", name: "Title", visible: true },
      { key: "url", name: "URL", visible: true },
      { key: "active", name: "Active", visible: false },
      { key: "auth", name: "IsAuth", visible: false },
      { key: "icon", name: "Icon", visible: true },
      { key: "sortId", name: "SortID", visible: false },
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
        visible: true
      } 
    ];

    this.setState({ columns });
  };

  getMenuItems = async () => {
    const res = await axios.get("api/menu");
    const menuItems = await _.sortBy(res.data, "sortId", "asc");
    const rows = [];

    menuItems.map(items => {
      rows.push({
        _id: items._id,
        title_lang: items.title_lang[0][this.context._globalLang],
        url: items.url,
        active: items.active.toString(),
        auth: items.auth.toString(),
        icon: items.icon,
        sortId: items.sortId
      });
    });

    this.setState({ rows });
  };

  setColumnVisibility = index => {
    const columns = [...this.state.columns];
    const toggleValue = columns[index].visible;
    columns[index].visible = !toggleValue;
    this.setState({ columns });
  };

  render() {

    //!important function for hiding and displaying columns 
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
                      Menu Settings
                    </h2>
                  </div>
                  <div className="card-body pt-0 pb-5">
                    <div className="table card-table table-responsive table-responsive-large">
                      <p className="mb-5">
                        Use <code>.Menu Settings</code> to edit menu items.
                      </p>
                      
                      <ColumnVisibility
                        columns={this.state.columns}
                        setColumnVisibility={this.setColumnVisibility}
                      />

                      <ReactDataGrid
                        className="table card-table table-responsive table-responsive-large"
                        enableSingleRowSelect={true}
                        enableCellSelect={true}
                        columns={columns}
                        rowGetter={i => this.state.rows[i]}
                        rowsCount={this.state.rows.length}
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

//
MenuDetail.contextType = AuthConsumer;

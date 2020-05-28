import React from "react";
import Main from "../Main";
import axios from "axios";
import _ from "lodash";
import ReactDataGrid from "react-data-grid";
import { AuthConsumer } from "../../AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MessageAlert from "../commons/MessageAlert";
import ColumnVisibility from "../grid/ColumnVisibility";
import ContentModal from "./ContentModal";

// ESTH maintenance services
export default class ContentEditor extends React.Component {
  // main constructor
  constructor(props) {
    super(props);
    this.state = {
      menuItems: null,
      status: undefined,
      openModal: false,
      rows: [],
      columns: [],
      rowData:undefined
    };
  }

  // react after mounting
  componentDidMount() {
    this.getColumns();  
    this.getData();
      
  }

  

  getData = async () => {
    const { data } = await axios.get("/api/infopages");
    const rows = [...this.state.rows];
    const ln = this.context._globalLang || 'en';
    console.log("TCL: ContentEditor -> getData -> ln", ln)
    const ids = [],
      keys = [];

    Object.keys(data).forEach(outerIndex =>
      Object.keys(data[outerIndex]).forEach(key => {
        if (key === "_id") ids.push(data[outerIndex][key]);
        else keys.push(key);
      })
    );

    for (let i in data) {
      const { title, content, createdDate, updatedDate } = data[i][keys[i]];
      rows.push({
        _id: ids[i],
        title: title[ln],
        content: content[ln],
        createdDate,
        updatedDate
      });
    }

    this.setState({rows})
    
  };

  //on content modal open

  openContentModal = (data) => {
    this.setState({
      openModal: true,
      rowData:data
    });
    
  };

  //on close modal
  onCloseModal = () => {
    this.setState({
      openModal: false
    });
  };

  // handle row editing
  handleEditRow = data => {
    this.openContentModal(data);
  };

  // get maintenance services columns
  getColumns() {
    const columns = [
      { key: "id", visible: false },
      { key: "title", name: "Title Page", visible: true },
      { key: "content", name: "Content", visible: true },
      { key: "createdDate", name: "Created Date", visible: true },
      { key: "updatedDate", name: "Updated Date", visible: true },
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
    // set columns in state
    this.setState({ columns });
  }

  // set column visibility
  setColumnVisibility = index => {
    const columns = [...this.state.columns];
    const toggleValue = columns[index].visible;
    columns[index].visible = !toggleValue;
    this.setState({ columns });
  };

 

  // react rendering
  render() {
    const { rows, status, openModal,rowData } = this.state;
    console.log("TCL: ContentEditor -> render -> rowData", rowData)
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
                        <FontAwesomeIcon icon="pencil-alt" />
                      </span>
                      App Content Editor
                    </h2>
                  </div>
                  <div class="card card-default">
                    <div class="card-body">
                      <ul
                        class="nav nav-pills mb-3"
                        id="pills-tab"
                        role="tablist"
                      >
                        <li class="nav-item">
                          <a
                            class="nav-link active show"
                            id="ipills-home-tab"
                            data-toggle="pill"
                            href="#ipills-home"
                            role="tab"
                            aria-controls="ipills-home"
                            aria-selected="false"
                          >
                            <i class="mdi mdi-star mr-1" /> Info Pages
                          </a>
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            id="ipills-profile-tab"
                            data-toggle="pill"
                            href="#ipills-profile"
                            role="tab"
                            aria-controls="ipills-profile"
                            aria-selected="true"
                          >
                            <i class="mdi mdi-account mr-1" /> App Screens
                          </a>
                        </li>
                      </ul>
                      <div class="tab-content" id="pills-tabContent">
                        <div
                          class="tab-pane fade active show"
                          id="ipills-home"
                          role="tabpanel"
                          aria-labelledby="ipills-home-tab"
                        >
                          <div className="table card-table table-responsive table-responsive-large">
                            <ContentModal
                              openModal={openModal}
                              onCloseModal={this.onCloseModal}
                              rowData = {rowData}
                            />
                            <MessageAlert
                              status={status}
                              successMessage="Record has been deleted."
                              errorMessage="An error occured while performing operation."
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
                        <div
                          class="tab-pane fade"
                          id="ipills-profile"
                          role="tabpanel"
                          aria-labelledby="ipills-profile-tab"
                        >
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur.
                        </div>
                      </div>
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

ContentEditor.contextType = AuthConsumer;

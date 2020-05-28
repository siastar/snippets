import React, { useState } from "react";
import Main from "../Main";
import axios from "axios";
import _ from "lodash";
import Modal from "react-responsive-modal";
import ReactDataGrid from "react-data-grid";
import { AuthConsumer } from "../../AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MessageAlert from "../commons/MessageAlert";
import ColumnVisibility from "../grid/ColumnVisibility";
import moment from 'moment';
import StatusComputer from "../commons/StatusComputer";

let statusGetter = new StatusComputer();

export default class RentalRequests extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    openModal: false,
	    deleteRecordId: null,
	    category:null,
	    reqid:null,
	    status: undefined,
	    columns: [],
	    rows: []
	};
    }

    // get global language
    getLang = () => {
	return this.context._globalLang;
    };
    
    componentDidMount() {
	if (_.isEmpty(this.state.rows)) {
	    this.getRentalData();
	}
	if (_.isEmpty(this.state.columns)) {
	    this.getColumns();
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
	    deleteRecordId: data._id , 
	    category:data.category,
	    reqid:data.reqid });
    };

    handleEditRow = data => {
	localStorage.removeItem("rentaData");
	localStorage.setItem("rentalData", JSON.stringify(data));
	this.props.history.push({
	    pathname: "/rentaleditor/"
	});
	
    };

    // get status icon
    getStatusIcon = statusCode => {
	const thisStatus = statusGetter.getStatus( statusCode ),
	      statusStep = thisStatus.status,
	      statusIcon = thisStatus.icon,
	      iconData = {
		  title: statusStep.title[ this.getLang() ],
		  description: statusStep.description[ this.getLang() ],
		  icon: statusIcon.type, class: statusIcon.class
	      };
	return this.printStatusIconEl( iconData );
    };

    // get jsx icon
    printStatusIconEl = ( iconArgs ) => {
	/*
	   iconArgs = {
	   icon: FA icon name string
	   class: icon internal css class string 
	   description: description string
	   title: title value string
	 }
	 */
	return [
		<a title={ iconArgs.description }>
		<FontAwesomeIcon icon={ iconArgs.icon } className={ iconArgs.class } /> {' '} { iconArgs.title } { ' - ' } { iconArgs.description }
	    </a>
	];
    }

    resizeableColumns = column => {
	console.log("TCL: RentalRequests -> column", column.key);
	const defaultColumnProperties = {
	    resizable: true,
	    sortable: true
	    //width: 120
	};

	return !_.isEmpty(column.name) ? defaultColumnProperties : null;
    };

    handleDeleteRow = () => {
	this.setState({ openModal: false });
	const _id = this.state.deleteRecordId;
	const category = this.state.category;
	const reqid = this.state.reqid;
	const data = {_id,category,reqid};
	
	axios
	    .post("/api/rentalservices/d/", data)
	    .then(res => {

		if (res.status === 204) {
		    let rows = this.state.rows.slice();
		    rows = rows.filter(row => row.reqid !== reqid);
		    
		    this.setState({
			rows,
			status: 204
		    });
		}
	    })
	    .catch(err => {
		this.setState({
		    status: 500
		});
		console.log(err);
	    });
    };
    

    //sort rows 

    sortRows = (initialRows, sortColumn, sortDirection) => {
	const comparer = (a, b) => {
	    if (sortDirection === "ASC") {
		return a[sortColumn] > b[sortColumn] ? 1 : -1;
	    } else if (sortDirection === "DESC") {
		return a[sortColumn] < b[sortColumn] ? 1 : -1;
	    }
	};
	const rows =
		  sortDirection === "NONE" ? initialRows : this.state.rows.sort(comparer);
	this.setState({rows});
    };

    setColumnVisibility = index => {
	const columns = [...this.state.columns];
	const toggleValue = columns[index].visible;
	columns[index].visible = !toggleValue;
	this.setState({ columns });
    };

    getColumns = () => {
	const columns = [
	    { key: "_id", visible: false, sortDescendingFirst: true },
	    { key: "reqid", visible: false },
	    { key: "category", name: "Service Name", visible: true },
	    { key: "username", name: "Username", visible: true },
	    { key: "size", name: "Option", visible: true },
	    { key: "status", name: "Status", visible: true },
	    { key: "pickUpPlace", name: "Pick-up Place", visible: false },
	    { key: "returnPlace", name: "Return Place", visible: false },
	    { key: "pickUpDate", name: "Pick-up Date", visible: true },
	    { key: "returnDate", name: "Return Date", visible: true },
	    { key: "totalPieces", name: "Total Pieces", visible: false },
	    { key: "createdDate", name: "Creation Date", visible: true },
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
	].map(c => ({ ...c, ...this.resizeableColumns(c) }));

	//const cols = columns.filter(column => column.visible === true);
	this.setState({ columns });
    };

    getRentalData = async () => {
	const res = await axios.get("/api/rentalservices");
	const rentalData = res.data;
	const rows = [];
	console.log("rentalDAta", res.data);
	rentalData.map(category => {
	    category.map((items, index) => {
		const keys = Object.keys(items)[1];
		const pid = items[Object.keys(items)[0]];
		if (items.Autos) {
		    items[keys].map(
			({
			    _id,
			    userinfo,
			    Size,
			    Status,
			    DataOraRitiro,
			    DataOraRiconsegna,
			    PostoRitiro,
			    PostoRiconsegna,
			    createdDate,
			    UpdatedDate
			}) => {
			    rows.push({
				_id: pid,
				reqid: _id,
				username: userinfo.Username,
				category: keys,
				size: Size,
				status: this.getStatusIcon( Status ),
				pickUpDate: DataOraRitiro,
				returnDate: DataOraRiconsegna,
				pickUpPlace: PostoRitiro,
				returnPlace: PostoRiconsegna,
				createdDate:moment(createdDate).format('YYYY-MM-DD HH:mm:ss'),
				updatedDate: UpdatedDate
			    });
			}
		    );

		} else {
		    const keys = Object.keys(items)[1];
		    const pid = items[Object.keys(items)[0]];

		    //Ironing.map(item => {console.log('itemsXX',item);});

		    items[keys].map(
			({
			    _id,
			    userinfo,
			    Status,
			    NumeroCapi,
			    DataOraRitiro,
			    DataOraRiconsegna,
			    createdDate,
			    UpdatedDate
			}) => {
			    rows.push({
				_id: pid,
				reqid: _id,
				username: userinfo.Username,
				status: this.getStatusIcon( Status ),
				category: keys,
				totalPieces: NumeroCapi,
				pickUpDate: DataOraRitiro,
				returnDate: DataOraRiconsegna,
				createdDate:moment(createdDate).format('YYYY-MM-DD HH:mm:ss'),
				updatedDate: UpdatedDate || ""
			    });
			}
		    );
		}
	    });
	});

	this.setState({ rows });
	this.sortRows(rows,'createdDate','DESC');

    };

    render() {
	const { status, rows } = this.state;

	//const [rows, setRows] = this.state.rows;

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
                Service Requests
            </h2>
                </div>
                <div className="card-body pt-0 pb-5">
                <div className="table card-table table-responsive table-responsive-large">
                <p className="mb-5">
                Use <code>.Menu Settings</code> to edit menu items.
                </p>

                <MessageAlert
            status={status}
            successMessage="Record has been deleted."
            errorMessage="An error occured while performing operation."
                />
                <Modal
            open={this.state.openModal}
            onClose={this.onCloseModal}
            center
                >
                <div className="modal-header">Delete Record</div>
                <div className="modal-body">
                Do you really want to delete this Record?
                </div>
                <div className="modal-footer">
                <button
            type="button"
            className="btn btn-primary"
            data-dismiss="modal"
            onClick={this.onCloseModal}
                >
                Close
            </button>
                <button
            type="button"
            className="btn btn-danger"
            onClick={this.handleDeleteRow}
                >
                Delete
            </button>
                </div>
                </Modal>
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
            onGridSort={(sortColumn, sortDirection) => {
		console.log('TCL: RentalRequests -> render -> sortDirection', sortDirection)
		console.log('TCL: RentalRequests -> render -> sortColumn', sortColumn)
                this.sortRows(rows,sortColumn,sortDirection)
            }
                       }
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

RentalRequests.contextType = AuthConsumer;

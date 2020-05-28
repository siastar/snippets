import React from "react";
import Main from "../Main";
import _ from "lodash";
import { Link } from "react-browser-router";
import { AuthConsumer } from "../../AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/*
import { Link } from "react-browser-router";
import ReactDataGrid from "react-data-grid";
import Confirmation from "../commons/Confirmation";
import MessageAlert from "../commons/MessageAlert";
import ColumnVisibility from '../grid/ColumnVisibility';
*/

// ESTH maintenance services
export default class Test extends React.component {

    constructor( props ){
	super( props );
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

    render(){
	return(
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
			    Maintenance Services
			  </h2>
			</div>
			<div className="card-body pt-0 pb-5">
			  <div className="table card-table table-responsive table-responsive-large">
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

Test.contextType = AuthConsumer;

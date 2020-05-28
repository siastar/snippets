import React from 'react';
import Main from '../Main';
import axios from "axios";
import _ from 'lodash';
import { Link } from 'react-browser-router';
import ReactDataGrid from 'react-data-grid';
import { AuthConsumer } from '../../AuthContext';
import getStatusIcon from '../commons/IconsSelector';
import PG7Translator from '../commons/PG7Translator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Confirmation from '../commons/Confirmation';
import MessageAlert from '../commons/MessageAlert';
import ColumnVisibility from '../grid/ColumnVisibility';

// ESTH maintenance services
export default class MServices extends React.Component {

    // main constructor
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

    // react after mounting
    componentDidMount(){
	if ( ! this.state.menuItems ) {
	    this.getColumns();
	    this.getMenuItems();
	}
    }

    // on modal close
    onCloseModal = () => {
	this.setState( {
	    openModal: false,
	    deleteRecordId: null
	} );
    };

    // open modal confirmation
    openModalConfirmation = ( data ) => {
	this.setState( {
	    openModal: true,
	    deleteRecordId: data._id,
	    parentId: data.parentid
	} );
    };

    // handle row editing
    handleEditRow = data => {
	this.props.history.push( {
	    pathname: '/mserviceeditor/' + data.parentid + '/' + data._id
	} );
    };

    // handle row deletion
    handleDeleteRow = () => {
	this.setState( { openModal: false } );
	const _id = this.state.deleteRecordId;
	const parentid = this.state.parentId;
	const data = { _id, parentid };

	axios
	    .post( '/api/maintenanceservice/d/', data )
	    .then( res => {
		if ( res.status === 204 ){
		    let rows = this.state.rows.slice();
		    rows = rows.filter( row => row._id !== _id );
		    this.setState( {
			rows,
			status: 204
		    } );
		    setTimeout( () => {
			this.setState({
			    status: ''
			} );
		    }, 2000 );
		}
	    })
	    .catch( err => {
		this.setState( {
		    status: 500
		} );
		console.log( err );
	    });
    };
    
    // get maintenance services columns
    getColumns(){
	const columns = [
	    { key: '_id',  visible: false },
	    { key: 'category', name: 'Category', visible: true },
	    { key: 'subject', name: 'Subject', visible: true },
	    { key: 'status', name: 'Status', visible: true },
	    { key: 'damagedGood', name: 'Damage', visible: true },
	    {
		key: 'edit',
		getRowMetaData: ( row ) => row,
		formatter: ( { dependentValues } ) => (
		    <a
		       href='javascript:;'
		       onClick={ () => this.handleEditRow( dependentValues ) }
		      >
		      <FontAwesomeIcon icon={ 'pencil-alt' } />
		    </a>
		),
		width: 35, visible: true
	    },
	    {
		key: 'delete',
		getRowMetaData: ( row ) => row,
		formatter: ( { dependentValues } ) => (
		    <a
		       href='javascript:;'
		       onClick={ () => this.openModalConfirmation( dependentValues ) }
		      >
		      <FontAwesomeIcon icon={ 'trash' } className='text-danger' />
		    </a>
		),
		width: 35,
		visible: true
	    }
	];
	// set columns in state
	this.setState( { columns } );
    }

    // set column visibility
    setColumnVisibility = index => {
	const columns = [ ...this.state.columns ];
	const toggleValue = columns[ index ].visible;
	columns[ index ].visible = ! toggleValue;
	this.setState( { columns } );
    };

    // get menu items
    getMenuItems = async () => {
	const res = await axios.get( '/api/maintenanceservices' ),
	      menuItems = await _.sortBy( res.data, 'sortId', 'asc' ),
	      rows = [];
	console.log( '\nReached maintenance items!\nItems:\n', menuItems );
	// map each menu items
	menuItems.map( items => {
	    if ( !_.isEmpty( items.cat_lang ) && ! _.isEmpty( items.Requests ) ) {
		items.Requests.map(
		    (
			{
			    _id,
			    userID,
			    subject,
			    category,
			    description,
			    imagePath,
			    createdDate,
			    availibilityDate,
			    updateDate,
			    status,
			    damagedGood
			},
			thisRequestIndex
		    ) => {
			const thisRequest = items.Requests[ thisRequestIndex ];
			rows.push(
			    {
				_id: _id || null,
				cat_lang: ! _.isEmpty( items.cat_lang[ 0 ] )
				    ? items.cat_lang[ 0 ][ this.context._globalLang ]
				    : null,
				imagePath: thisRequest.imagePath || null,
				subject: thisRequest.subject || null,
				category: items.cat_lang[ 0 ].title[ this.context._globalLang ] || null,
				status: thisRequest.status || null,
				description: thisRequest.description || null,
				damagedGood: thisRequest.damagedGood || null,
				sortId: thisRequest.createdDate || null
			    }
			);
			console.log( '\nThis request:\n', thisRequest );
		    }
		);
	    }
	});
	// set rows
	this.setState({ rows });
    }

    // react rendering
    render(){
	const translationTEST = new PG7Translator( { lang: 'en' } ),
	      { rows, status, openModal } = this.state,
	      columns = this.state.columns.filter(
		  column => column.visible === true
	      );
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

MServices.contextType = AuthConsumer;

import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MessageAlert from "../commons/MessageAlert";
import _ from "lodash";
import SimpleReactValidator from "simple-react-validator";
import Flatpickr from 'react-flatpickr'
import moment from 'moment';



export default class CommonView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        update:false,
        status:undefined,
        pickUpDate: undefined,
        returnDate: undefined,
        totalPieces:undefined

    }

    this.validator = new SimpleReactValidator();
  }

  componentWillMount(){
    const {rentalData} = this.props;
    this.setStatus(rentalData);
  }

  setStatus = rentalData => {

    const {
      status,
      totalPieces,
      pickUpDate,
      returnDate
    } = rentalData;


    

		status[0].props.children.map(item => {
      if (!_.isObject(item) && !_.isEmpty(item)) {
        this.setState({ status: item,totalPieces,
        pickUpDate:moment(pickUpDate,'DD/MM/YYYY HH:mm'),
        returnDate:moment(returnDate,'DD/MM/YYYY HH:mm') });
      }
   });
 };

 handleSubmit = (e) =>
 {
  
  if (this.validator.allValid()) {

   const {
     category,
     reqid,
     _id
   } = this.props.rentalData;
  
  
    const { 
      status,
      pickUpDate,
      returnDate,
      totalPieces
    } = this.state;
     


    const data = {
      _id,
      reqid,
      category,
      status,
      pickUpDate,
      returnDate,
      totalPieces
    }

    axios
      .post("/api/rentalservices/u", data)
      .then(res => {
        if (res.status === 204) {
          this.setState({messageStatus:204})
        }
      })
      .catch(err => {
        console.log("TCL: AutoView -> handleSubmit -> err", err);
      });
     
     this.setState({update:204})
    }
    else {
      this.validator.showMessages();
      this.forceUpdate();
    }
     e.preventDefault();

 }

  render() {

    const {rentalData} = this.props;

    
    return (
      <div className="card card-default">
        <div className="card-header card-header-border-bottom">
          <h2>
            <span className="fa-layers fa-fw">
              <FontAwesomeIcon icon="pencil-alt" />
            </span>
            Edit Request
          </h2>
        </div>
        <div className="card-body">
          <form>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label for="ID">ID</label>
                  <input
                    name="ID"
                    type="text"
                    className="form-control"
                    value={rentalData._id}
                    disabled
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label for="UserID">Username</label>
                  <input
                    name="UserID"
                    type="text"
                    className="form-control"
                    autoComplete="off"
                    value={rentalData.username}
                    disabled
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label for="url">Service Name</label>
                  <input
                    name="ServiceName"
                    type="text"
                    className="form-control"
                    value={rentalData.category}
                    disabled
                  />
                </div>
              </div>
              
              <div className="col-sm-6">
                <div className="form-group">
                  <label for="status">Status</label>
                  <select
                    class="form-control"
                    onChange={e => {
                      this.setState({ status: e.currentTarget.value });
                    }}
                  >
                    <option value="New">New</option>
                    <option value="Open">Open</option>
                    <option value="InProgress">InProgress</option>
                    <option value="Closed">Closed</option>
                    <option value="Refused">Refused</option>
                  </select>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label for="sortid">Total Pieces</label>
                  <input
                    name="totalPieces"
                    type="text"
                    className="form-control"
                    placeholder="Total Pieces"
                    value={this.state.totalPieces}
                    onChange={e => {
                      this.setState({ totalPieces: e.currentTarget.value });
                    }}
                  />
                  {this.validator.message("total pieces",this.state.totalPieces,"required|numeric")}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label for="PickUpDate">Pick-up Date</label>
                  <Flatpickr data-enable-time
                    options= {{dateFormat:"d/m/Y H:i",time_24hr:true}}
                    onChange = {e => {this.setState({ pickUpDate: moment(e[0])})}}
                    value={moment(this.state.pickUpDate,'DD/MM/YYYY HH:mm').format('DD/MM/YYYY HH:mm')}
                    className = "form-control"
                  />
                  {this.validator.message("pickUpDate",this.state.pickUpDate,"required|date")}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label for="PickUpDate">Return Date</label>
                  <Flatpickr data-enable-time
                    options= {{dateFormat:"d/m/Y H:i",time_24hr:true,minDate:moment(this.state.pickUpDate,'DD/MM/YYYY HH:mm').format('DD/MM/YYYY HH:mm')}}
                    onChange = {e => {this.setState({ returnDate: moment(e[0])})}}
                    value={moment(this.state.returnDate,'DD/MM/YYYY HH:mm').format('DD/MM/YYYY HH:mm')}
                    className = "form-control"
                  />
                  {this.validator.message("Return Date",this.state.pickUpDate,"required|date")}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label for="updatedDate">Updated Date</label>
                  <input
                    name="updatedDate"
                    type="text"
                    className="form-control"
                    value={rentalData.updatedDate}
                    disabled
                  />
                </div>
              </div>
            </div>

            <MessageAlert status={this.state.update} successMessage={"Record has been updated"} errorMessage="An error occured while performing operation."/> 

            <div className="form-footer pt-5 border-top">
              <button
                type="submit"
                className="btn btn-primary btn-default"
                onClick={this.handleSubmit}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

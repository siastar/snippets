import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MessageAlert from "../commons/MessageAlert";
import SimpleReactValidator from "simple-react-validator";
import _ from "lodash";
import 'flatpickr/dist/themes/material_green.css'
import Flatpickr from 'react-flatpickr'
import moment from 'moment';

//const rentalData = JSON.parse(localStorage.getItem("rentalData")) || {};

export default class AutoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: undefined,
      status: undefined,
      pickUpPlace: undefined,
      returnPlace: undefined,
      pickUpDate: undefined,
      returnDate: undefined,
      messageStatus:undefined,
    };
    this.validator = new SimpleReactValidator();

  }

  componentWillMount() {
    const {rentalData} = this.props;
    this.setStatus(rentalData);
  }

  setStatus = rentalData => {
		rentalData.status[0].props.children.map(item => {
      if (!_.isObject(item) && !_.isEmpty(item)) {
        this.setState({ status: item });
      }
      const {
        size,
        pickUpPlace,
        returnPlace,
        pickUpDate,
        returnDate
      } = rentalData;

      this.setState({
        size,
        pickUpPlace,
        returnPlace,
        pickUpDate:moment(pickUpDate,'DD/MM/YYYY HH:mm'),
        returnDate:moment(returnDate,'DD/MM/YYYY HH:mm')
      });

    });

    

  };

  handleSubmit = e => {

    if (this.validator.allValid()) {

    const {rentalData} = this.props;

    const {
      size,
      status,
      pickUpPlace,
      returnPlace,
      pickUpDate,
      returnDate
    } = this.state;

    console.log(status);

    const data = {
      _id: rentalData._id,
      reqid: rentalData.reqid,
      category:rentalData.category,
      size,
      status,
      pickUpPlace,
      returnPlace,
      pickUpDate,
      returnDate
    };
    
    

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
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
    e.preventDefault();
  };

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
                  <label for="icon">Option</label>
                  <select
                    class="form-control"
                    id="status"
                    defaultValue={this.state.size}
                    onChange={e => {
                      this.setState({ size: e.currentTarget.value });
                    }}
                  >
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Station Wagon">Station Wagon</option>
                  </select>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label for="status">Status</label>
                  <select
                    class="form-control"
                    defaultValue={this.state.status}
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
                  <label for="sortid">Pick-up Place</label>
                  <input
                    name="PickupPlace"
                    type="text"
                    className="form-control"
                    placeholder="Pick Up Place"
                    value={this.state.pickUpPlace}
                    onChange={e => {
                      this.setState({ pickUpPlace: e.currentTarget.value });
                    }}
                  />
                  {this.validator.message("Pick up Place",this.state.pickUpPlace,"required")}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label for="sortid">Return Place</label>
                  <input
                    id="ReturnPlace"
                    name="ReturnPlace"
                    type="text"
                    className="form-control"
                    placeholder="Return Place"
                    value={this.state.returnPlace}
                    onChange={e => {
                      this.setState({ returnPlace: e.currentTarget.value });
                    }}
                  />
                   {this.validator.message("ReturnPlace",this.state.returnPlace,"required")}
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
                  <label for="PickUpDate">Updated Date</label>
                  <input
                    id="updatedDate"
                    name="updateDate"
                    type="text"
                    className="form-control"
                    value={rentalData.updatedDate}
                    disabled
                  />
                </div>
              </div>
            </div>
            
            <MessageAlert status={this.state.messageStatus} successMessage={"Record has been updated"} errorMessage="An error occured while performing operation."/> 

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





{/*
                    selected={this.state.returnDate}
                    onChange={e => {
                      this.setState({ pickUpDate: moment(e.currentTarget.value).format('DD/MM/YYYY HH:mm')});
                    }}*/}
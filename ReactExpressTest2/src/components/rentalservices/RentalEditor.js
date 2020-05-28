import React from "react";
import Main from "../Main";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SimpleReactValidator from "simple-react-validator";
import { AuthConsumer } from "../../AuthContext";
import AutoView from './AutosView';
import CommonView from './CommonView';
import _ from 'lodash';


export default class RentalEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rentalData : undefined
    }
    this.validator = new SimpleReactValidator();

  }

componentDidMount(){
  const rentalData = JSON.parse(localStorage.getItem('rentalData'));
  this.setState({rentalData});
}
 
  onFormSubmit = e => {};

  render() {


    const {rentalData} = this.state;

    if (_.isEmpty(rentalData))
      return (
        <Main>
          <div className="card card-default">
            <div className="card-header card-header-border-bottom" />
            <p>No data to show</p>
          </div>
        </Main>
      );
    else if(rentalData.category === "Autos"){
      return (
        <Main>
            <AutoView rentalData={rentalData}/>
        </Main>
      );
    }
    else {
      return(
        <Main>
            <CommonView rentalData={rentalData}/>
        </Main>
      )
    }
  }
}

RentalEditor.contextType = AuthConsumer;

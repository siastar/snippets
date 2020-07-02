console.log('...opening');

// about passing data back to parents:
// https://dev.to/spukas/moving-arguments-from-child-to-parent-component-in-react-25lp
// https://github.com/siastar/proptesting

import React, {  Component} from 'react';

import axios from 'axios';
import ProdPopUpForm from './ProdPopUpForm.js';
const postRoute = 'http://localhost:3000/products/createdata/';
const putRoute = 'http://localhost:3000/products/updatedata/';
//TODO hardcoded links are no good !!!
const currentRoute = '';

class EditProd extends Component {

  constructor(props) {
    super(props);

    //binding
    this.onChangeArtist = this.onChangeArtist.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeFrontCover = this.onChangeFrontCover.bind(this);
    this.onChangeBackCover = this.onChangeBackCover.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    // this.componentDidMount = this.componentDidMount.bind(this);

    //state  
    this.state = {
      compName: 'EditProd.js',
      testmessage: '',
      //
      ////////////// product properties, TODO: wrap them in a separate object
      //prod_id:'',
      //artist: '',
      //title: '',
      //year: '',
      //price: '',
      //frontcover: '',
      //backcover: '',
      //////////////
      person:{},
      product:{}
    };
  };

    componentDidMount() {
        
        //console.log('1st check: ', this.state.person);
        console.log('checkstate 1: ' , this.state);
                
        this.setState(prevState => ({
            person: {
                ...prevState.person,
                firstName: "Tom",
                secondName: "Jerry"
            }
        }));
        //for state update with object refer to
        //https://www.rockyourcode.com/react-set-state-with-prev-state-and-object-spread-operator/

        this.setState(
            function (prevState) {
            return {
                product: {
                    ...prevState.product,
                    artist: 'test',
                    title: 'test',
                    year:'test',
                    price:'test',
                    frontcover:'test',
                    backcover:'test'
                }
            };
        });

        console.log('checkstate 2: ' , this.state);
      // this.setState({
      // // copy the product to edit in the state
      //     artist: this.props.productToEdit.artist,
      //     title: this.props.productToEdit.title,
      //     year: this.props.productToEdit.year,
      //     price: this.props.productToEdit.price,
      //     frontcover: this.props.productToEdit.frontcover,
      //     backcover: this.props.productToEdit.backcover,
      // });
        
          
  };

  componentWillUnmount() {
    console.log(this.state.compName, ' unmounted');
  };


  //TO HANDLE SETSTATE IN NESTED OBJECT WE NEED DIFFERENT APPROACH   
  onChangeArtist(e) {
    this.setState({
      artist: e.target.value
    });
  };

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  };

  onChangeYear(e) {
    this.setState({
      year: e.target.value
    });
  };

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  };

  onChangeFrontCover(e) {
    this.setState({
      frontcover: e.target.value
    });
  };

  onChangeBackCover(e) {
    this.setState({
      backcover: e.target.value
    });
  };

  onFormSubmit(event) {
    event.preventDefault();
    console.log('event.target: ', event.target);
      
      const editedProduct = {
      artist: this.state.artist,
      title: this.state.title,
      year: this.state.year,
      price: this.state.price,
      frontcover: this.state.frontcover,
      backcover: this.state.backcover
    };
    //notice that this is not going to modify the component state itself but only
    //creates a copy of the object product to POST or PUT to DB
      let crudAction = 'CRUD_update';
      let crudArgs = {
          editedProduct,
          crudAction
      }
      
      console.log('ready to delivery object: ', crudArgs);
     
      this.props.handleCRUDType(crudArgs);

  };

  render() {
    console.log('this...', this);
    return (
        <div>
          {/* <p> */}
          {/*   rendering EditProd.js */}
          {/* </p> */}
          <div>
        <ProdPopUpForm
          product=''
          buttonlabel = 'Edit Product'
          onChangeArtist = {this.onChangeArtist}
          onChangeTitle = {this.onChangeTitle}
          onChangeYear = {this.onChangeYear}
          onChangePrice = {this.onChangePrice}
          onChangeFrontCover = {this.onChangeFrontCover}
          onChangeBackCover = {this.onChangeBackCover}
          onFormSubmit = {this.onFormSubmit}
        >
        </ProdPopUpForm>
          </div>

        </div>
    );
  };
};

export default EditProd;

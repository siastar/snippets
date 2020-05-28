//export default FormContainer;

import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input.jsx";

class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      seo_title: "",
      seo_description: ""
    };

      //binding  
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render() {
    const {
        seo_title,
        seo_text,
    } = this.state;

    return (
      <form id="article-form">

        <Input
          label="seo_title"
          text="SEO title"
          type="text"
          id="seo_title"
          value={seo_title}
          handleChange={this.handleChange}
        />

        <Input
          label="seo_text"
          text="SEO text"
          type="text"
          id="seo_text"
          value={seo_text}
          handleChange={this.handleChange}
        />
        
      </form>
    );
  }
}

export default FormContainer;

const wrapper = document.getElementById("article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;

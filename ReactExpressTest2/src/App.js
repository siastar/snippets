import React, { Component } from 'react';
import {AuthProvider} from './AuthContext';
import Routes from './routes';

//statics 
import './fontawesome'



class App extends Component {

  render() {
    return (
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    );
  }
}

export default App;

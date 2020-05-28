import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './menu/Sidebar'
import axios from 'axios'
import _ from 'lodash';
import Routes from '../routes';
export default class Main extends React.Component
{
  static isPrivate = true
  
  render(){
      return(  
        <React.Fragment>
            <Header/>
              <Sidebar/>              
              {this.props.children}
            <Footer/>
        </React.Fragment>      
    )
  }
}
//<a name="logout" onClick={handleLogout(history)}>Logout</a>
const handleLogout = history => () => {
  localStorage.removeItem('loggedIn');
  history.push('/login');
};





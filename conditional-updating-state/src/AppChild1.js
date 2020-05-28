import React from 'react';
import AppChild2 from './AppChild2.js'
//import CardButton from './CardButton.js';

class AppChild1 extends React.Component {
    
    render(){
        console.log('AppChild1 this is: ', this);
     
        return (
            <div className = 'child1'>

              <AppChild2
                getButtonType = {this.props.getButtonType}
                buttonType='next'
              />

              <br/>
              
              <AppChild2
                buttonType='prev'
                getButtonType = {this.props.getButtonType}
              />
            </div>            
        );
    }
}

export default AppChild1;

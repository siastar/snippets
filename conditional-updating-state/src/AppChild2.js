import React from 'react';

class AppChild2 extends React.Component {

     sendButtonType = () =>{
         this.props.getButtonType(this.props.buttonType)
     }
    
    render(){
        console.log('AppChild2 this is: ', this);
     
        return (
            <div className = 'child2'>
              <button
                onClick={this.sendButtonType}
              >                  
                {this.props.buttonType}                  
              </button>                              
            </div>            
        );
    }
}

export default AppChild2;

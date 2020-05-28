import React from 'react';
//import AppChild1 from './AppChild1.js'
import './styles.css';

class App extends React.Component {
    constructor() {
        super()
        this.state={
            status: 'default state',
            stateProp1: 'test property 1',
            stateProp2: 'test property 2',
            stateProp3: 'test property 3',
            stateProp4: 'test property 4',
            text1: '...waiting (1)',
            text2: '...waiting (2)',
            text3: '...waiting (3)',
            text4: '...waiting (4)',
            buttonType: 'not defined'
        }

        this.pressButton = this.pressButton.bind(this)        

    }

     pressButton = () => {         
         console.log('button clicked');

         
         let x = ''

         x === 'A' ? 
         
         this.setState({status: 'status changed: case A',
                        stateProp1: 'state prop1 changed: case A',
                        text1: 'text 1 changed: case A' })
         :
         
         this.setState({status: 'status changed: case B',
                        stateProp1: 'state prop1 changed: case B',
                        text1: 'text 1 changed: case B' })
         
    }

    render(){
        console.log('this.state is: ', this.state);
        return (
            <div className = 'parent'>
              <p>hello folks !!!</p>
              <p>the state status is: "{this.state.status}"</p>
              <p>the state prop 1 is: "{this.state.stateProp1}"</p>
              <p>the state text 1 is: "{this.state.text1}"</p>
              
              <button
                onClick={this.pressButton}>
                press button 
              </button>
              
            </div>            
             
        );
    }
}
export default App;

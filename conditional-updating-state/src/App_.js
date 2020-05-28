import React from 'react';
import AppChild1 from './AppChild1.js'
import AppChild2 from './AppChild2.js'
import AppChild3 from './AppChild3.js'
import './styles.css';

class App extends React.Component {
    constructor() {
        super()
        this.state={
            stateProp1: 'test property 1',
            stateProp2: 'test property 2',
            stateProp3: 'test property 3',
            stateProp4: 'test property 4',
            text1: '...waiting (1)',
            text2: '...waiting (2)',
            text3: '...waiting (3)',
            text4: '...waiting (4)'
        }
    }

    method1(){
        console.log('this is method1');
        return(<p> ...method1 has been fired</p>)
    }

    onReset = () => {
        console.log('onReset fired');
     
        this.setState({
            text1: '...waiting (1)',
            text2: '...waiting (2)',
            text3: '...waiting (3)',
            text4: '...waiting (4)'            
        });
     
        console.log('now state is:' , this.state);
    }
    
    onClickButton1 = () => {
        this.setState({
            text1: 'clicked 1'
        });
        console.log('now state is:' , this.state);
        console.log('onClickbutton1 fired');
    }

    onClickButton2 = () => {
        this.setState({
            text1: 'clicked 2'
        });
        console.log('now state is:' , this.state);
        console.log('onClickbutton2 fired');
    }

    onClickButton3 = () => {
        this.setState({
            text2: 'clicked 3'
        });
        console.log('onClickbutton3 fired');
        console.log('now state is:' , this.state);
    }
    
    onClickButton4 = () => {
        this.setState({
            text2: 'clicked 4'
        });
        console.log('onClickbutton4 fired');
        console.log('now state is:' , this.state);
    }

    onClickButton5 = () => {
        this.setState({
            text3: 'clicked 5'
        });
        console.log('onClickbutton5 fired');
        console.log('now state is:' , this.state);
    }

     onClickButton6 = () => {
        this.setState({
            text4: 'clicked 6'
        });
        console.log('onClickbutton6 fired'); 
        console.log('now state is:' , this.state);
    }
        
    render(){
        console.log('App this is: ', this);
        return (
            <div className = 'parent'>
              <p>...hello! this is App.js</p>
              <p>-------------------------</p>
              <div>                
                <AppChild1
                  prop1 = {this.state.stateProp1}
                  prop2 = {this.state.stateProp2}
                  method1 = {this.method1}                
                  /*  notes: */
                  /*  the property name (method1) is fully arbitrary, it could be "donaldDuck = {this.method1}" */
                  /*  for convention method name is used as property name.  */
                  /*  The parent component passes the method to the children components as a whole function among the props  */
                  /*  the children components, in order  to fire the method  must call it like  */
                  /*  this.props.method1();  */
                />                
              </div>
                           
              <p>-------------------------</p>

              <div>                
                <button
                  className = 'buttons'
                  onClick={this.onClickButton1}>                  
                  Button 1                  
                </button>                

                <button
                  className = 'buttons'
                  onClick={this.onClickButton2}>
                  Button 2
                </button>
                <p>state handled by App</p>
                <h1>{this.state.text1}</h1>
              </div>
              <p>-------------------------</p>
              <div>                
                <AppChild2
                  className = 'parentcallschild'
                  prop3 = {this.state.stateProp3}
                  prop4 = {this.state.stateProp4}
                  textToDisplay = {this.state.text2}
                  click3 = {this.onClickButton3}
                  click4 = {this.onClickButton4}
                  
                />                
              </div>
              <p>-------------------------</p>
              <div>
                <AppChild3
                  stateData = {this.state}                  
                  click5 = {this.onClickButton5}
                  click6 = {this.onClickButton6}
                  textToDisplay = {this.state.text3}
                />
              </div>

               <div>                
                 <br/>                           
                 <p>summary of clicks</p>
                 <h3>{this.state.text1}</h3>
                 <h3>{this.state.text2}</h3>
                 <h3>{this.state.text3}</h3>
                 <h3>{this.state.text4}</h3>
              </div>            
              
               <div>                
                 <br/>
                 <button
                  className = 'buttons'
                  onClick={this.onReset}>                  
                  Reset                  
                </button>                              
                <p>state handled by App</p>
              </div>
            </div>            
             
        );
    }
}
export default App;

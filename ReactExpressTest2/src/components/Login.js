import React from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { AuthConsumer } from '../AuthContext';


export default class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username:"admin@abc.com",
            password:"admin",
            isAuth: false
        }

        this.validator = new SimpleReactValidator();
     }

    
    onUsernameChange = (e) => {
        this.setState({
            username: e.target.value,
        });
    }

    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value,
        });
    }

    logIn = (e) => {
        if (this.validator.allValid()) {
            if(this.state.username === 'admin@abc.com' && this.state.password === 'admin'){
                //this.setState({isAuth:true});
                this.context._setAuth(true);
                this.props.history.push('/dashboard')
            }
          }  else  {
            this.setState({IsloggedIn:false});
            this.context._setAuth(true);
            this.validator.showMessages();
            this.forceUpdate();
          }

          e.preventDefault();
        
    }
 
    render() {
        
        return(
            
              <div className="content">						
                        <div className="row">
                        <div className="col-lg-7">
                            <div className="card card-default">
                                <div className="card-header card-header-border-bottom">
                                    <h1>Dashboard Login</h1>
                                </div>
                                <div className="card-body">
                                    <form>
                               
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="username" placeholder="Your Email *" onChange={this.onUsernameChange} value={this.state.username}/>
                                            {this.validator.message('username',this.state.username,'required|email')}
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" name="password" maxLength="16" placeholder="Your Password *" onChange={this.onPasswordChange} value={this.state.password}/>
                                            {this.validator.message('password',this.state.password,'required|password|max:16')}
                                        </div>
                                        <div className="form-group">
                                           <input type="input" className="btn btn-primary btn-default" value="Login" onClick={this.logIn}/>
                                        </div>
                                        <div className="form-group">
                                            <a href="#" className="ForgetPwd">Forget Password?</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>  
                 
           
        )
    }
}

Login.contextType = AuthConsumer;
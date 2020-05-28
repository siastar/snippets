import React from 'react'

const AuthContext = React.createContext()

class AuthProvider extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      _isAuth :false,
      _globalLang: 'en'
    }  
  }

  _setLang = (lang) => {
    this.setState({
      _globalLang:lang
    });
  }
  _setAuth = (auth) => {
    this.setState({
      _isAuth:auth
    });
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          _isAuth: this.state._isAuth,
          _globalLang: this.state._globalLang,
          _setAuth:this._setAuth,
          _setLang:this._setLang
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }


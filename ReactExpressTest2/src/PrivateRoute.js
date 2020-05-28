import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthConsumer } from './AuthContext'


const PrivateRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
      {({ _isAuth }) => (
      <Route
        render={props =>
          _isAuth ? <Component {...props} /> : <Redirect to="/" />
        }
        {...rest}
      />
    )}
  </AuthConsumer>
)

export default PrivateRoute

/*
({isAuth}) => (
  <Route {...rest} render={(props) => (
      isAuth === true ? <Component {...props} /> : <Redirect to='/login' />
  )} />
) */   
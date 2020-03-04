import React, { Component, useContext } from 'react';
import {  Route, Redirect } from 'react-router-dom'
import { AuthContext, AuthProvider, currentUser } from "./authTest";


  const Privateroute = ({ component: Component, ...rest }) => {

    const { currentUser } = useContext(AuthContext); 

    return(
    <Route
      {...rest}
      render={props =>
     !!currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/Login"}} />
        )
      }
    />
    )
    };

  
export default Privateroute;
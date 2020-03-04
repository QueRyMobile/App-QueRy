import React, { Component, useContext } from 'react';
import { BrowserRouter, Router, Route, Link, Switch, Redirect } from 'react-router-dom'
// import {BottomNavigation, Tab} from 'react-router-navigation'
import { AuthContext, AuthProvider, currentUser } from "./authTest";
import Privateroute from './PrivateRoute'
import Fire from '../Fire'
import firebase from 'firebase'

import LoginScreen from '../screens/WebLoginScreen';
import RegisterScreen from '../screens/WebRegisterScreen';
import NotFoundComponent from '../screens/NotFound';
import ProfileScreen from '../screens/ProfileScreenGama';
import NotificationScreen from '../screens/NotificationScreen';
import TabNavigator from './MainTabNavigator';
import AppNavigatorWeb from './ScreenContainer';
import HomeScreen from '../screens/NewOldHomeScreen';
// import AppNavigatorWeb from './ScreenContainer';
// import AppNavigator2 from './AppNavigator.web';

  // const PrivateRoutesTest = ({ component: Component, ...rest }) => (
  //   <Route
  //     {...rest}
  //     render={props =>
  //    isAuthenticated() ? (
  //         <Component {...props} />
  //       ) : (
  //         <Redirect to={{ pathname: "/", state: { from: props.location } }} />
  //       )
  //     }
  //   />
  //   );

  
  const Routes = () => (
    <AuthProvider>
      <BrowserRouter>
        <Switch>  
            <Route exact path="/Login" component={LoginScreen}/>
            <Route exact path="/Register" component={RegisterScreen} />
            <Privateroute exact path="/" component={ProfileScreen} />
            <Privateroute exact path="/Notification" component={NotificationScreen}/>
            <Route path="/" component={() => (<div>404</div>)}/> 
          </Switch>  
      </BrowserRouter>
   </AuthProvider>
  );
  
  export default Routes;
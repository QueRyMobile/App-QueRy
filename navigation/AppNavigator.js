import React from 'react';
import { createAppContainer, createSwitchNavigator, } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainTabNavigator from './MainTabNavigator';

import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
},
);

export default createAppContainer(
  createSwitchNavigator({
    Loading: LoadingScreen,
    App: MainTabNavigator,
    Auth: AuthStack,
  })
);

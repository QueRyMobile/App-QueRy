import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
// import ScreenOne from './ScreenOne';
// import ScreenTwo from './ScreenTwo';
import LoginScreenWeb from '../screens/WebLoginScreen';
import RegisterScreenWeb from '../screens/WebRegisterScreen';

import NotificationScreen from '../screens/NotificationScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreenGama';
import IDScreenScanner from '../screens/IDScreenDelta2';
import { Redirect } from 'react-router-dom';

import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/WebLoginScreen';
import RegisterScreen from '../screens/WebRegisterScreen';



// const NavStack = createStackNavigator(
//     {
//    default: createBottomTabNavigator({
//     Home:{
//         screen: HomeScreen,
//         // navigationOptions: {
//         //     tabBarLabel: 'Home',
//         //     tabBarIcon: ({ focused }) => (
//         //       <TabBarIcon
//         //         focused={focused}
//         //         name={
//         //           Platform.OS === 'ios'
//         //             ? `ios-information-circle${focused ? '' : '-outline'}`
//         //             : 'md-information-circle'
//         //         }
//         //       />
//         //     ),
//         //   }
//     },

//     Profile:{
//         screen: ProfileScreen,
//         // navigationOptions: {
//         //     tabBarLabel: 'Profile',
//         //     tabBarIcon: ({ focused }) => (
//         //       <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-female' : 'md-female'} />
//         //       ),
//         //   }
//     },

//     Scanner:{
//         screen: IDScreenScanner,
//         // navigationOptions: {
//         //     tabBarLabel: 'Scanner',
//         //     tabBarIcon: ({ focused }) => (
//         //       <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
//         //     ),
//         //   }
//     },

//     Notification:{
//         screen: NotificationScreen,
//         // navigationOptions: {
//         //     tabBarLabel: 'Notification',
//         //     tabBarIcon: ({ focused }) => (
//         //       <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-notifications' : 'md-notifications'} />
//         //     ),
//         //   }
//     }
    
//    })
// });

const HomeStack = createStackNavigator(
    {
      Home: HomeScreen,
    },
    
  );

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-information-circle${focused ? '' : '-outline'}`
            : 'md-information-circle'
        }
      />
    ),
  };
  
  HomeStack.path = '';
  
  const ProfileStack = createStackNavigator(
    {
      Profile: ProfileScreen,
    },
    
  );
  
  ProfileStack.navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-female' : 'md-female'} />
    ),
  };
  
  ProfileStack.path = '';
  
  const ScannerStack = createStackNavigator(
    {
      Scanner: IDScreenScanner,
    },
    
  );
  ScannerStack.navigationOptions = {
    tabBarLabel: 'Scanner',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
    ),
  };
  
  ScannerStack.path = '';
  
  const NotificationStack = createStackNavigator(
    {
      Notification: NotificationScreen,
    },
    
  );
  NotificationStack.navigationOptions = {
    tabBarLabel: 'Notification',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-notifications' : 'md-notifications'} />
    ),
  };
  
const tabNavigatorWeb = createBottomTabNavigator({
    HomeStack,
    ProfileStack,
    ScannerStack,
    NotificationStack
})

const AuthStack = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen
  },
  );

const AppNavigatorWeb = createAppContainer(tabNavigatorWeb);

export default AppNavigatorWeb;
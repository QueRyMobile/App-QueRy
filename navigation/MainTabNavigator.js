import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';


import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import HomeScreenWallet from '../screens/HomeScreenWallet';
import HomeScreenWalletSecond from '../screens/HomeScreenWalletSecond';
import HomeScreenWalletCorrect from '../screens/HomeScreenWalletThird(Correct)';
import HomeScreenWalletThird from '../screens/HomeScreenWallet3.1';
import HomeScreenWallet4 from '../screens/HomeScreenWallet4.0';
import LoginScreenWeb from '../screens/WebLoginScreen';
import RegisterScreenWeb from '../screens/WebRegisterScreen';
import NotificationScreen from '../screens/NotificationScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreenGama';
import BaseScreen from '../screens/BaseScreen'
import IDScreenScanner from '../screens/IDScreenDelta2';
import IDScreenScannerWeb from '../screens/IDScreenDeltaWeb';
import IDScreenScannerGallery from '../screens/IDScreenDeltaGallery';
import EditProfile from '../screens/EditProfile';
import BetaProfile from '../screens/BetaScreen';
import MessageScreen from '../screens/MessageScreen';
// import IDScreenScannerRN from '../screens/RNCamera';



const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {headerMode: 'screen'},
});


const HomeStack = createStackNavigator(
  {
    Home: HomeScreenWallet4,
  },
  config
);

HomeStack.navigationOptions = ({
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-wallet' : 'md-wallet' } />
  ),
});

HomeStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
    Test: EditProfile,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
};

ProfileStack.path = '';

const BaseScreenStack = createStackNavigator(
  {
    Base: BaseScreen,
    Scanner: IDScreenScanner,
    ScannerWeb: IDScreenScannerWeb,
    ScannerGallery: IDScreenScannerGallery,
    // ScannerRN: IDScreenScannerRN,
    Beta: BetaProfile,
  },
  config
);

BaseScreenStack.navigationOptions = {
  tabBarLabel: 'Add',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-qr-scanner':'md-qr-scanner' } />
  ),
};

BaseScreen.path = '';

// const ScannerStack = createStackNavigator(
//   {
//     Chat: MessageScreen,
//   },
//   config
// );
// ScannerStack.navigationOptions = {
//   tabBarLabel: 'Chat',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-chatboxes' : 'md-chatboxes'} />
//   ),
// };

// ScannerStack.path = '';

// const NotificationStack = createStackNavigator(
//   {
//     Notification: NotificationScreen,
//   },
//   config
// );
// NotificationStack.navigationOptions = {
//   tabBarLabel: 'Notification',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-notifications' : 'md-notifications'} />
//   ),
// };

// NotificationStack.path = '';

// const TestingStack = createStackNavigator(
//   {
//     Test: EditProfile,
//   },
// );
// TestingStack.navigationOptions = {
//   tabBarLabel: 'Test',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-notifications' : 'md-notifications'} />
//   ),
// };

// TestingStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  // ScannerStack,
  BaseScreenStack,
  // NotificationStack,
  ProfileStack,
  // TestingStack,
});

tabNavigator.path = '';

export default tabNavigator;

import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainTabNavigator from './MainTabNavigator';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Routes from './routes';

const AuthNavigator = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
},
);

export default createBrowserApp(
  createSwitchNavigator({
    Loading: LoadingScreen,
    Auth: AuthNavigator,
    App: MainTabNavigator,
  },
  )
);
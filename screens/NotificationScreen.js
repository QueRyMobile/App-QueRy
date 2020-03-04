import * as WebBrowser from 'expo-web-browser';
import React , { useCallback, useContext }from 'react'
import {View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native'
import Fire from '../Fire'
import config from '../config'
import { AuthContext } from "../navigation/authTest";
import {Header} from 'react-navigation-stack'
import HeaderComponent from '../navigation/HeaderComponent'

class LogoTitle extends React.Component {
    render() {
      return (
        <Image
          source={require('../assets/logoBeta3squared.png')}
          style={{ width: 30, height: 30}}
        />
      );
    }
  }
  
  class RightButton extends React.Component {
    render() {
      return (
        <TouchableOpacity onPress={() => alert('This is a button!')} >
                    <Text style={{fontSize: 18, paddingRight: 10, paddingLeft: 10}}>Null</Text>
                  </TouchableOpacity>
      );
    }
  }

export default class NotificationScreen extends React.Component{

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>A Aba de Notificações está desatividada durante o Closed Beta.</Text>
                <TouchableOpacity onClick={() => config.auth().signOut()}>
                  <Text>Sign Out</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

NotificationScreen.navigationOptions = ({
    headerLeft: () => (<RightButton/>),
  headerTitle: <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><LogoTitle/></View>,
  headerRight: () => (<RightButton/>)
// headerTitle: <HeaderComponent/>
  });

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text:{
        padding: 10,
        fontWeight: "500",
        textAlign: "center",
        fontSize: 18,
    }
})
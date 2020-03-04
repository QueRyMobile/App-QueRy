import React from 'react'
import {View, Text, StyleSheet, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, Image, Button, TouchableOpacity,} from 'react-native'
import {GiftedChat} from 'react-native-gifted-chat'
import * as Permissions from 'expo-permissions'
// import { navigation } from 'react-navigation'
// import {Notifications} from 'expo'
// import Home from './HomeScreen'
import Fire from '../Fire'

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


export default class MessageScreen extends React.Component{
    state = {
        messages: []
    }

    componentDidMount(){
        const user = this.props.uid || Fire.shared.uid;
        
        this.unsubscribe = Fire.shared.firestore
        .collection("users")
        .doc(user)
        .onSnapshot(doc => {
            this.setState({ user: doc.data() })
        });  

        Fire.shared.get(message => this.setState(previous => ({ messages: GiftedChat.append(previous.messages, message)})))
    }

    componentWillUnmount(){
        Fire.shared.off()
    }

    render() {
      // const data = this.state.user;
    const chat =<GiftedChat messages={this.state.messages} onSend={Fire.shared.send} user={this.state.user}/>

    return (
        
    <KeyboardAvoidingView style={styles.container} enabled>
      {/* <View style={styles.test}> */}
        {chat}
        {/* </View> */}
        </KeyboardAvoidingView>
        
    )
    }
}

MessageScreen.navigationOptions = ({
    headerLeft: () => (<RightButton/>),
    headerTitle: <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><LogoTitle/></View>,
    // headerTitle: <LogoTitle/>,
    headerRight: () => (<RightButton/>)
  });

  const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "flex-end",
        // padding: 24,
    },
  
  })


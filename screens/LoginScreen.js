import * as WebBrowser from 'expo-web-browser';
import React from "react";
import { Redirect } from 'react-router-dom'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, LayoutAnimation, SafeAreaView } from "react-native";
import * as firebase from 'firebase' 
import { isAuthenticated } from "../navigation/authTest";
import * as GoogleSignIn from 'expo-google-sign-in';
// import * as Expo from 'expo'
// import LoginGoogle from '../utilities/testLoginGoogle'

import Fire from '../Fire';


export default class LoginScreen extends React.Component{

    static navigationOptions = {
        header: null
    };

    state={
        email: "",
        password: "",
        errorMessage: null
    };
    
    // componentDidMount() {
    //     this.initAsync();
    //   }
    
    //   initAsync = async () => {
    //     await GoogleSignIn.initAsync({
    //       clientId: '54239387189-8cmhkgjl7je6vv2d3938t3acr0g6ilbu.apps.googleusercontent.com',
    //     });
    //     this._syncUserWithStateAsync();
    //   };
    
    //   _syncUserWithStateAsync = async () => {
    //     const user = await GoogleSignIn.signInSilentlyAsync();
    //     this.setState({ user });
    //   };
    
    //   signOutAsync = async () => {
    //     await GoogleSignIn.signOutAsync();
    //     this.setState({ user: null });
    //   };
    
    //   signInAsync = async () => {
    //     try {
    //       await GoogleSignIn.askForPlayServicesAsync();
    //       const { type, user } = await GoogleSignIn.signInAsync();
    //       if (type === 'success') {
    //         this._syncUserWithStateAsync();
    //       }
    //     } catch ({ message }) {
    //       alert('login: Error:' + message);
    //     }
    //   };
    
    //   onPress = () => {
    //     if (this.state.user) {
    //       this.signOutAsync();
    //     } else {
    //       this.signInAsync();
    //     }
    //   };

    handleLogin = () => {
        const { email, password } = this.state;

        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => this.setState({errorMessage: error.message }));
    };



    render(){
        LayoutAnimation.easeInEaseOut();
        return(
            <View style={styles.container}>
                    <Image source={require("../assets/logoBeta3squared.png")} style={styles.logo}></Image>
                <Text style={styles.greeting}>{`Hello Again.\nWelcome Back!`}</Text> 
            <View style={styles.errorMessage}>
               {this.state.errorMessage && <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>}
            </View>

             <View style={styles.form}>
                <View>
                    <Text style={styles.inputTitle}>Email Address</Text>
                    <TextInput 
                    style={styles.input} 
                    autoCapitalize="none"
                    onChangeText={email => this.setState({email})}
                    value={this.state.email}
                    ></TextInput>
                </View>

                <View >
                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput 
                    style={styles.input} 
                    secureTextEntry 
                    autoCapitalize="none"
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                    ></TextInput>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={{color:"#FFF", fontWeight: "500"}}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={this.onPress}>
                    <Text style={{color:"#FFF", fontWeight: "500"}}>Sign In With Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignSelf:"center", marginTop: 32}} onPress={()=> this.props.navigation.navigate("Register")}>
                    <Text>
                        Don't have an ID yet? <Text style={{fontWeight:"500", color:"grey"}}>Register Now</Text>
                    </Text>
                </TouchableOpacity>
             </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    logo:{
        justifyContent:"center",
        alignItems: "center",
        alignSelf: "center",
        height: 100,
        width: 100,
        marginTop: 42,
    },
    container:{
        flex:1
    },
    form:{
        width: "100%",
        padding: 20
    },
    greeting:{
        paddingTop: 20,
        marginBottom: 20,
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
        color: "black"
    },
    error:{
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    errorMessage:{
        height:72,
        alignItems:"center",
        justifyContent:"center",
        marginHorizontal: 30
    },
    form:{
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle:{
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input:{
        marginBottom: 15,
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button:{
        margin: 30,
        backgroundColor: "black",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },

}); 
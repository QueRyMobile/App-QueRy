import * as WebBrowser from 'expo-web-browser';
import React from "react";
import {AppRegistry, View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, LayoutAnimation, Alert  } from "react-native";
import { ScrollView } from 'react-native-gesture-handler'
import {Ionicons} from "@expo/vector-icons"
import * as navigate from 'react-navigation'
import * as firebase from 'firebase' 
import Fire from '../Fire'
import UserPermissions from '../utilities/UserPermissions'
import * as ImagePicker from 'expo-image-picker'


// var FBLoginButton = require('../navigation/FBLoginButton');



export default class RegisterScreen extends React.Component{

    static navigationOptions = {
        header: null
    };

    state={
        user:{
            name:"",
            email: "",
            password: "",
            avatar: null,
            
        },
        errorMessage: null
    };


    handlePickAvatar = async () => {
        UserPermissions.getCameraPermission()

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3]
        });

        if(!result.cancelled){
            this.setState({user: {...this.state.user, avatar: result.uri}})
        }
    };

    componentDidMount() {
        const user = this.props.uid || Fire.shared.uid;
    }

    handleSignUp = () => {
        Fire.shared.createUser(this.state.user)
    }

    render(){
        return(
                <ScrollView>
            <View >
                {/* <StatusBar barStyle="light-content"></StatusBar> */}
                {/* <Image source={require('../assets/authHeader.png')} style={styles.imageTop}></Image> */}
                
                {/* <Image source={require('../assets/authFooter.png')}></Image> */}

                {/* <TouchableOpacity style={styles.back} onPress={()=> this.props.navigation.navigate("Login")}>
                    <Ionicons name="ios-arrow-round-back" size={32} color="#FFF"></Ionicons>
                </TouchableOpacity> */}

                <View style={styles.container2}>

                    <Text style={styles.greeting}>{`Welcome to QueRy!\nRegister Now.`}</Text> 

                    <TouchableOpacity style={styles.avatarPlaceHolder} onPress={this.handlePickAvatar}>
                        <Image source={{uri: this.state.user.avatar}} style={styles.avatar}/>
                    <Ionicons name="ios-add" size={40} color="#FFF" ></Ionicons>
                    </TouchableOpacity>

                

            <View style={styles.errorMessage}>
               {this.state.errorMessage && <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>}
            </View>

             <View style={{width:"100%", padding: 20}}>
                <View>
                    <Text style={styles.inputTitle}>Full Name</Text>
                    <TextInput 
                    style={styles.input} 
                    autoCapitalize="none"
                    onChangeText={name => this.setState({user: {...this.state.user, name}})}
                    value={this.state.user.name}
                    ></TextInput>
                </View>

                <View >
                    <Text style={styles.inputTitle}>Email Address</Text>
                    <TextInput 
                    style={styles.input} 
                    autoCapitalize="none"
                    onChangeText={email => this.setState({user: {...this.state.user, email}})}
                    value={this.state.user.email}
                    ></TextInput>
                </View>

                <View >
                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput 
                    style={styles.input} 
                    secureTextEntry 
                    autoCapitalize="none"
                    onChangeText={password => this.setState({user: {...this.state.user, password}})}
                    value={this.state.user.password}
                    ></TextInput>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={{color:"#FFF", fontWeight: "500"}}>Sign Up</Text>
                </TouchableOpacity>

                    <Text style={{fontWeight:"500", color:"grey", marginBottom: 26, textAlign: "center"}}>Login Sociais estão desativados durante o Closed Beta</Text>
               
                {/* <TouchableOpacity style={styles.button} onPress={Fire.shared.logInFaceRedirect}> */}
                {/* <TouchableOpacity style={styles.button} > 
                    <Text style={{color:"#FFF", fontWeight: "500"}}>Teste Face</Text>
                    {/* <FBLoginButton /> */}
                {/* </TouchableOpacity>  */}



                <TouchableOpacity style={{alignSelf:"center"}} onPress={()=> this.props.navigation.navigate("Login")}>
                    <Text>
                        Already have an ID yet? <Text style={{fontWeight:"500", color:"grey"}}>Sign In</Text>
                    </Text>
                </TouchableOpacity>
                </View>
             </View>
        </View>
             </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    container2:{
        alignItems: "center"
    },
    form:{
        width: "100%",
        padding: 20
    },
    greeting:{
        paddingTop: 20,
        marginTop: 32,
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
    back:{
        // position:"absolute",
        top:48,
        left:32,
        width: 32,
        height:32,
        borderRadius: 16,
        backgroundColor: "rgba(21,22,48, 0.1)",
        alignItems: "center",
        justifyContent:"center"
    },
    avatarPlaceHolder:{
        width: 150,
        height: 150,
        borderRadius: 75,
        marginTop: 48,
        backgroundColor: "#E1E2E6",
        justifyContent:"center",
        alignItems: "center"
    },
    avatar:{
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50,
    }

}); 

import React from 'react'
import * as WebBrowser from 'expo-web-browser';
import {AppRegistry,View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, Dimensions, ScrollView } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import Fire from '../Fire'
import * as ImagePicker from 'expo-image-picker'
import { firestore } from 'firebase'
import UserPermissions from '../utilities/UserPermissions'
import * as navigate from 'react-navigation'
import { QRCode } from 'react-native-custom-qr-codes';
 


import {
    BarCodeScanner
  } from 'expo-barcode-scanner';

const firebase = require('firebase')
require('firebase/firestore')

export default class PostScreen extends React.Component{
    state={
        user:{},
        text: "",
        image: null,
        hasCameraPermission: null,
        scanned: false,
    }

    getPermissionsAsync = async() => {
        const {
          status
        } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
          hasCameraPermission: status === 'granted'
        }); 
    }

    componentDidMount(){
        this.getPermissionsAsync()
        
        UserPermissions.getCameraPermission()

        const user = this.props.uid || Fire.shared.uid;
        
        this.unsubscribe = Fire.shared.firestore
        .collection("users")
        .doc(user)
        .onSnapshot(doc => {
            this.setState({ user: doc.data() })
        });
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3]
        });

        if(!result.cancelled){
            this.setState({image:result.uri});
        }
    }

    handlePost = () => {
        Fire.shared.addPost({text: this.state.text.trim(), localUri: this.state.image}).then(ref => {
            this.setState({text: "", image: null})
            this.props.navigation.goBack()
        }).catch(error => {
            alert(error);
        })
    }

    render(){
        
        const {
            hasCameraPermission,
            scanned
          } = this.state;
          
          if (hasCameraPermission === null) {
            return <Text> Requesting for camera permission </Text>;
          }
          if (hasCameraPermission === false) {
            return <Text> No access to camera </Text>;
          }

    const user = firebase.auth().currentUser;
    // const local = this.props.navigate.navigation("people/");
    const uniqueurl =  "https://querymobile.co/" + user.uid+".html";

        return(
            <SafeAreaView style={styles.container}>
                <ScrollView>
                <View style={styles.header}>
                </View>
                <View style={{ marginTop: 20, alignItems: "center"}}>
                <View styles={styles.avatarContainer}>
                    <Image source={ this.state.user.avatar
                                ? { uri: this.state.user.avatar } 
                                : require("../assets/tempAvatar.jpg")} 
                                style={styles.avatar}>
                  </Image>
                   
                <Text style={styles.name}>
                        {this.state.user.name}
                        </Text>
                    </View>
                </View>
                            <View style={styles.qrid}>
                        <QRCode content={uniqueurl} logo={require("../assets/logoBeta3squared.png")} ecl="H"/>
                               </View>

                {/* <View style={styles.qrid}>
                        <Image source={require("../assets/qr.png")}></Image>
                </View> */}

                        <TouchableOpacity style={styles.buttondnv} onPress={()=> this.props.navigation.navigate("Scanner")}>
                            <Text style={styles.text}>Scan ID (APP) !</Text>
                            </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>
        )
    }

    handleBarCodeScanned = ({
        type,
        data
      }) => {
        this.setState({
          scanned: true
        });
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      };
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    header:{
        flexDirection: "row",
        justifyContent:"space-between",
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#D8D9D8"
    },
    avatarContainer:{
        shadowColor: "#151734",
        shadowRadius: 15,
        shadowOpacity: 0.4
    },
    avatar:{
        width: 300,
        height: 300,
        borderRadius: 76
    },
    name: {
        marginTop: 10,
        fontWeight: "700",
        fontSize: 40,
        marginBottom: 10
    },
    // photo: {
    //     alignItems: "flex-end",
    //     marginHorizontal: 32
    // },
    qrid: {
        padding: 30,
        alignItems: "center",
    },
    buttondnv: {
        backgroundColor: "black",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
  },
  text: {
    color: "white"
  }

})
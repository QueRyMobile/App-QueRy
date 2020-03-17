import * as WebBrowser from 'expo-web-browser';
import React from 'react'
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, Dimensions, ScrollView,Linking, } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import Fire from '../Fire'
import * as ImagePicker from 'expo-image-picker'
import { firestore } from 'firebase'
import UserPermissions from '../utilities/UserPermissions'
// import jsQR from "jsqr";

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
        // dataScan: "",
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
        
        return(
        <View style = {{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>

        {/* <TouchableOpacity style={styles.back} onPress={()=> this.props.navigation.navigate("ID")}>  
           <Ionicons name="ios-arrow-round-back" size={32} color="#FFF"></Ionicons>
         </TouchableOpacity> */}
        <Text>Gallery</Text>
      <BarCodeScanner onBarCodeScanned = { scanned ? undefined : this.handleBarCodeScanned}
      style = { styles.test }/>
      {scanned && ( <TouchableOpacity style={styles.buttondnv}  
          onPress = {() => this.setState({
              scanned: false})}><Text style={styles.text}>Tap to Scan Again</Text></TouchableOpacity>)
              } 
      </View>

        )
    }

    // handleBarCodeScanned = ({ type, data }) => {
    //   // setScanned(true);
    //   alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // };
  

                            handleBarCodeScanned = ({
                                type,
                                data
                              }) => {
                                this.setState({
                                  scanned: true,
                                });
                              // var type = "org.iso.QRCode";
                                if(type === "org.iso.QRCode"){
                              Linking.canOpenURL(data)
                                .then((supported) =>
                                    Linking.openURL(
                                        supported ? data : data))
                                    .catch((err) => console.error('An error occurred', err));
                                } else { this.props.navigation.navigate("Beta", {data: data}) }
                              };

        // alert(  type );
      
        //Pro futuro: Prestando atenção, da pra fazer uma checagem de data antes de ele fazer algo, fazendo com que o scanner funcione pra tudo e nao só pra perfis da query

        // fazer o teste com o if pra nao perder os QRs antigos

        // if(type === "link") 

        // Linking.canOpenURL(data)
        // .then((supported) =>
        //     Linking.openURL(
        //         supported ? data : data))
        //     .catch((err) => console.error('An error occurred', err));
      };


const styles = StyleSheet.create({
  test: {
    flex: 1,
    // marginTop: 86,
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
  },
  back:{
    position:"absolute",
    top:48,
    left:32,
    width: 32,
    height:32,
    borderRadius: 16,
    backgroundColor: "rgba(21,22,48, 0.1)",
    alignItems: "center",
    justifyContent:"center"
},
})

import * as WebBrowser from 'expo-web-browser';
import React from 'react'
import {AppRegistry,View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, Dimensions, ScrollView } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import Fire from '../Fire'
import * as ImagePicker from 'expo-image-picker'
import { firestore } from 'firebase'
import UserPermissions from '../utilities/UserPermissions'
import * as navigate from 'react-navigation'
// import { QRCode } from 'react-native-custom-qr-codes'; // Dispositivos
// import { QRCode } from 'react-qrcode-logo'; // Web
import QRCode from 'react-native-qrcode-svg';
import {  BarCodeScanner } from 'expo-barcode-scanner';
// import HeaderComponent from '../navigation/HeaderComponent'

const firebase = require('firebase')
require('firebase/firestore')


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
        
    const user = firebase.auth().currentUser;
    const uniqueurl =  "https://querymobile.co/" + user.uid + ".html";
    const testurl = user.uid;

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
                
                    <View style={styles.qrid}>
                    <QRCode value={testurl} logo={require("../assets/logoBeta3squared.png")} logoBackgroundColor={"white"} logoSize={60} size={250} ecl={'H'} logoMargin={2}/>
                    </View>
                    
                {/* Essa aqui funciona na Web */}
                            {/* <View>
                                <QRCode value={uniqueurl}></QRCode>
                            </View> */}

                        {/* Essa Aqui funciona nos dispositivos */}
                {/* <View style={styles.qrid}>
                        <Image source={require("../assets/qr.png")}></Image>
                </View> */}
                {/* <Text style={styles.Idis}>ID is not here yet...</Text> */}

                </View>
                        <TouchableOpacity style={styles.buttondnv} onPress={()=> this.props.navigation.navigate("Scanner")}>
                            <Text style={{color:"#FFF", fontWeight: "700", fontSize: 20}}>Scan ID (Para IDs do App) !</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttondnv} onPress={()=> this.props.navigation.navigate("ScannerWeb")}>
                            <Text style={{color:"#FFF", fontWeight: "700", fontSize: 20}}>Scan ID (Para Adesivos)!</Text>
                            </TouchableOpacity>

                            {/* <TouchableOpacity style={styles.buttondnv} onPress={()=> this.props.navigation.navigate("ScannerGallery")}>
                            <Text style={{color:"#FFF", fontWeight: "700", fontSize: 20}}>Scan De Galeria</Text>
                            </TouchableOpacity> */}


                            {/* <TouchableOpacity style={styles.buttondnv} onPress={()=> this.props.navigation.navigate("Beta")}>
                            <Text style={{color:"#FFF", fontWeight: "700", fontSize: 20}}>Go to Beta</Text>
                            </TouchableOpacity> */}

                </ScrollView>
            </SafeAreaView>
        )
    }
}

PostScreen.navigationOptions = ({
    headerLeft: () => (<RightButton/>),
  headerTitle: <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><LogoTitle/></View>,
  headerRight: () => (<RightButton/>)
// headerTitle: <HeaderComponent/>
  });
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    // header:{
    //     flexDirection: "row",
    //     justifyContent:"space-between",
    //     paddingHorizontal: 32,
    //     paddingVertical: 12,
    //     borderBottomWidth: 1,
    //     borderBottomColor: "#D8D9D8"
    // },
    avatarContainer:{
        shadowColor: "#151734",
        shadowRadius: 15,
        shadowOpacity: 0.4
    },
    avatar:{
        width: 300,
        height: 300,
        borderRadius: 150
    },
    name: {
        marginTop: 10,
        fontWeight: "700",
        fontSize: 40,
        marginBottom: 5,
        justifyContent: "center",
        alignSelf: "center"
    },
    Idis: {
      marginTop: 30,
      fontWeight: "500",
      fontSize: 30,
      marginBottom: 10
  },
    // photo: {
    //     alignItems: "flex-end",
    //     marginHorizontal: 32
    // },
    qrid: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: "center",
    },
    buttondnv: {
      width: "80%",
        alignSelf: "center",
        marginBottom: 10,
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
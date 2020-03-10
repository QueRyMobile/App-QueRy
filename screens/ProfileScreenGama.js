import * as WebBrowser from 'expo-web-browser';
import React from 'react'
import {View, Text, StyleSheet, Button, Image, Linking, Platform } from 'react-native'
import firebase from '../config'
import Fire from '../Fire'
import { TouchableOpacity, FlatList, TextInput, ScrollView } from 'react-native-gesture-handler'
import UserPermissions from '../utilities/UserPermissions'
import * as ImagePicker from 'expo-image-picker'

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
export default class ProfileScreen extends React.Component{
    state = {
        user: {
            instagram: "",
            twitter: "",
            whatsapp: "",
            bio: "",
        }
    };
    
    unsubscribe = null;
    
    componentDidMount() {
        const user = this.props.uid || Fire.shared.uid;
        
        this.unsubscribe = Fire.shared.firestore
        .collection("users")
        .doc(user)
        .onSnapshot(doc => {
            this.setState({ user: doc.data() })
        });   

        console.log(user)
    }

    handlePickAvatar = async () => {
        UserPermissions.getCameraPermission()

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3]
        });

        if(!result.cancelled){
            this.setState({user: {...this.state.user, avatar: result.uri}})
            // this.forceUpdate({user: {...this.state.user, avatar: result.uri}})
        }
    };

    handleUpdate = () => {
        Fire.shared.updateUserStuff(this.state.user)
    }


    render(){
        return(
            <View style={styles.container}>
                <ScrollView>
                <View style={{ marginTop: 64, alignItems: "center"}}>
                    <View styles={styles.avatarContainer}>
                    <TouchableOpacity onPress={this.handlePickAvatar}>
                      <Image 
                        source={
                            this.state.user.avatar
                                ? { uri: this.state.user.avatar } :
                             require("../assets/images/robot-dev.png")
                        }
                        style={styles.avatar}
                        />
                    </TouchableOpacity>
                    </View>
                    
                    <Text style={styles.name}>
                        {this.state.user.name}
                        </Text>
                        <Text style={styles.bio}>
                        {this.state.user.bio}
                        </Text>
            </View>
            <View style={styles.statsContainer}>
            <View style={styles.stat}>
                <Text style={styles.statAmount}>?</Text>
                <Text style={styles.statTitle}>Posts</Text>
            </View>
            <View style={styles.stat}>
                <Text style={styles.statAmount}>?</Text>
                <Text style={styles.statTitle}>Followers</Text>
            </View>
            <View style={styles.stat}>
                <Text style={styles.statAmount}>?</Text>
                <Text style={styles.statTitle}>Following</Text>
            </View>
         </View>

         <TouchableOpacity style={styles.buttonEdit} title="Edit" onPress={()=> this.props.navigation.navigate("Test")}>
             <Text style={{color:"#FFF", fontWeight: "700", fontSize: 20, textAlign: "center"}}>Edit Profile</Text>
         </TouchableOpacity>

         {/* <View style={{marginTop:32, marginLeft: 10, marginRight: 10}}>
                    <Text style={styles.inputTitle}>Instagram</Text>
                    <TextInput 
                    style={styles.input} 
                    autoCapitalize="none"
                    onChangeText={instagram => this.setState({user: { ...this.state.user, instagram}})}
                    value={this.state.user.instagram}
                    ></TextInput>
                </View>

                <View style={{marginTop:32, marginLeft: 10, marginRight: 10}}>
                    <Text style={styles.inputTitle}>twitter</Text>
                    <TextInput 
                    style={styles.input} 
                    autoCapitalize="none"
                    onChangeText={twitter => this.setState({user: { ...this.state.user, twitter}})}
                    value={this.state.user.twitter}
                    ></TextInput>
                </View>

                <View style={{marginTop:32, marginLeft: 10, marginRight: 10}}>
                    <Text style={styles.inputTitle}>whatsapp</Text>
                    <TextInput 
                    style={styles.input} 
                    autoCapitalize="none"
                    onChangeText={whatsapp => this.setState({user: { ...this.state.user, whatsapp}})}
                    value={this.state.user.whatsapp}
                    ></TextInput>
                </View>

                <View style={{marginTop:32, marginLeft: 10, marginRight: 10}}>
                    <Text style={styles.inputTitle}>One Line Bio</Text>
                    <TextInput 
                    style={styles.input} 
                    autoCapitalize="none"
                    onChangeText={bio => this.setState({user: { ...this.state.user, bio}})}
                    value={this.state.user.bio}
                    ></TextInput>
                </View>

         <TouchableOpacity style={styles.buttonUpdate} title="Update" onPress={this.handleUpdate}><Text style={{color:"#FFF", fontWeight: "700", fontSize: 20}}>Update</Text>
            </TouchableOpacity> */}
        <View >
            
         <TouchableOpacity style={styles.button} onPress={() => {
                         let user = firebase.auth().currentUser;
                         let instagramUsername = this.state.user.insta;
                         
                         
                         const instagramUrlScheme = `instagram://user?username=${instagramUsername}`;
                 
                         Linking.canOpenURL(instagramUrlScheme)
                             .then((supported) =>
                                 Linking.openURL(
                                     supported
                                         ? instagramUrlScheme
                                         : `https://www.instagram.com/${instagramUsername}`
                                     )
                                 )
                                 .catch((err) => console.error('An error occurred', err));
                     }}
                    
                ><Text style={{color:"#FFF", fontWeight: "700", fontSize: 20, textAlign: "center"}}>Instagram</Text>
                </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => {
                    let user = firebase.auth().currentUser;
                    let twitterUsername = this.state.user.twitter;
                    
                    const twitterUrlScheme = `twitter://user?screen_name=${twitterUsername}`;
            
                    Linking.canOpenURL(twitterUrlScheme)
                        .then((supported) =>
                            Linking.openURL(
                                supported
                                    ? twitterUrlScheme
                                    : `https://www.twitter.com/${twitterUsername}`
                                )
                            )
                            .catch((err) => console.error('An error occurred', err));
                }}     
                ><Text style={{color:"#FFF", fontWeight: "700", fontSize: 20, textAlign: "center"}}>Twitter</Text>
            </TouchableOpacity>

            
            <TouchableOpacity style={styles.button} onPress={() => {
                    let user = firebase.auth().currentUser;
                    let whatsappUsername = this.state.user.whatsapp;
                    
                    
                    const whatsappUrlScheme = `https://wa.me/55${whatsappUsername}`;
            
                    Linking.canOpenURL(whatsappUrlScheme)
                        .then((supported) =>
                            Linking.openURL(
                                supported
                                    ? whatsappUrlScheme
                                    : `https://wa.me/55${whatsappUsername}`
                                )
                            )
                            .catch((err) => console.error('An error occurred', err));
                    
                }}     
                ><Text style={{color:"#FFF", fontWeight: "700", fontSize: 20, textAlign: "center"}}>WhatsApp</Text>
            </TouchableOpacity>


        <TouchableOpacity style={styles.button} onPress={() => {
                         Linking.openURL('https://m.facebook.com/')
                    }}>
                    <Text style={{color:"#FFF", fontWeight: "700", fontSize: 20, textAlign: "center"}}>Facebook</Text>
            </TouchableOpacity>

            <Button onPress={() => {Fire.shared.signOut();}} title="Log out"/>
            </View>

        </ScrollView>
     </View>
        )
    }
}

ProfileScreen.navigationOptions = ({
    headerLeft: () => (<RightButton/>),
    headerTitle: <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><LogoTitle/></View>,
    // headerTitle: <LogoTitle/>,
    headerRight: () => (<RightButton/>)
  });

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    buttons:{
        justifyContent: "center",
        // alignContent: "center",
        alignItems: "center"
    },
    avatarContainer:{
        shadowColor: "#151734",
        shadowRadius: 15,
        shadowOpacity: 0.4
    },
    avatar:{
        width: 150,
        height: 150,
        borderRadius: 76
    },
    name: {
        marginTop: 32,
        fontWeight: "700",
        fontSize: 40,
    },
    bio: {
        marginTop: 10,
        // fontWeight: "700",
        fontSize: 26,
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 32
    },
    stat: {
        alignItems: "center",
        flex: 1
    },
    statAmount: {
        color: "#4F566D",
        fontSize: 18,
        fontWeight: "300"
    },
    statTitle: {
        color: "#C3C5CD",
        fontSize: 12,
        fontWeight: "500",
        marginTop: 4
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
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button:{  
        width: "80%",
        margin: 5,
        backgroundColor: "black",
        borderRadius: 10,
        height: 52,
        alignSelf: "center",
        justifyContent: "center"
    },
    buttonEdit:{  
        // maxWidth: deviceW,
        width: "90%",
        margin: 5,
        marginBottom: 20,
        backgroundColor: "#3b5998",
        borderRadius: 10,
        height: 52,
        alignSelf: "center",
        justifyContent: "center",
    },
    
})
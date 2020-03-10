import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, Image, Linking, Platform } from 'react-native'
import firebase from '../config'
import Fire from '../Fire'
import { TouchableOpacity, FlatList, TextInput, ScrollView } from 'react-native-gesture-handler'
import UserPermissions from '../utilities/UserPermissions'
import * as IDScreenDelta2 from './IDScreenDelta2'
require ('firebase/firestore')

// const {data} = props.data;


class RightButton extends React.Component {
    render() {
      return (
        // <Button title=""
        //   onPress={() => alert('This is a button!')} > 
        // <Text 
        // color="Black">Info</Text></Button> 
        <TouchableOpacity onPress={() => Fire.shared.saveContact()} >
                    <Text style={{fontSize: 18, paddingRight: 10, paddingLeft: 10, color: "blue"}}>Save</Text>
                  </TouchableOpacity>
      );
    }
  }

export default class BetaScreen extends Component {
    state = {
        user: {
            insta: "",
            twitter: "",
            whatsapp: "",
            bio: "",
        },
    };
    
    unsubscribe = null;

    componentDidMount(props) {
        const user = this.props.navigation.state.params.data;
         
        this.unsubscribe = Fire.shared.firestore
        .collection("users")
        .doc(user)
        .onSnapshot(doc => {
            this.setState({ user: doc.data() })
        });   

        console.log(user)
    }

    saveContact = () => {
        
        const localuid = firebase.auth().currentUser.uid;

        const local = firebase.database().ref(localuid);
 
        local.push({
            data: this.props.navigation.state.params.data,
        })
    }

    render() {
        return (
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

         <TouchableOpacity style={styles.button} onPress={() => this.saveContact()} >
                    <Text style={{fontSize: 18, paddingRight: 10, paddingLeft: 10, color: "white"}}>Connect (Mudar)</Text>
                  </TouchableOpacity>

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
                    
                ><Text style={{color:"#FFF", fontWeight: "700", fontSize: 20}}>Instagram</Text>
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
                ><Text style={{color:"#FFF", fontWeight: "700", fontSize: 20}}>Twitter</Text>
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
                ><Text style={{color:"#FFF", fontWeight: "700", fontSize: 20}}>WhatsApp</Text>
            </TouchableOpacity>

                {/* //Facebook ta errado Arrumar!! */}
                
        <TouchableOpacity style={styles.button} onPress={() => {
                         Linking.openURL('https://m.facebook.com/')
                    }}>
                    <Text style={{color:"#FFF", fontWeight: "700", fontSize: 20}}>Facebook</Text>
            </TouchableOpacity>

            <Button onPress={() => {Fire.shared.signOut();}} title="Log out"/>
        </ScrollView>
     </View>
        )
    }
}

BetaScreen.navigationOptions = ({
    // headerLeft: () => (<RightButton/>),
    // headerTitle: <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><LogoTitle/></View>,
    // // headerTitle: <LogoTitle/>,
    headerRight: () => (<RightButton/>)
  });

const styles = StyleSheet.create({
    container:{
        flex: 1,
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
        margin: 5,
        backgroundColor: "black",
        borderRadius: 6,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonEdit:{  
        margin: 5,
        marginBottom: 20,
        backgroundColor: "#3b5998",
        borderRadius: 10,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
    },
    
})

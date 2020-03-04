import * as WebBrowser from 'expo-web-browser';
import React from 'react'
import {View, Text, StyleSheet, Button, Image, Linking, Platform } from 'react-native'
import firebase from '../config'
import Fire from '../Fire'
import { TouchableOpacity, FlatList, TextInput, ScrollView } from 'react-native-gesture-handler'
import UserPermissions from '../utilities/UserPermissions'
import * as ImagePicker from 'expo-image-picker'


export default class ProfileScreen extends React.Component{
    state = {
        user: {
            insta: "",
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
        }
    };

    handleUpdate = () => {
        Fire.shared.updateUserStuff(this.state.user)
    }


    render(){
        return(
            <View style={styles.container}>
                <ScrollView>

         <View style={{marginTop:32, marginLeft: 10, marginRight: 10}}>
                    <Text style={styles.inputTitle}>Instagram</Text>
                    <TextInput 
                    style={styles.input} 
                    autoCapitalize="none"
                    onChangeText={insta => this.setState({user: { ...this.state.user, insta}})}
                    value={this.state.user.insta}
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

         <TouchableOpacity style={styles.buttonUpdate} title="Update" onPress={this.handleUpdate}>
             <Text style={{color:"#FFF", fontWeight: "700", fontSize: 20}}>Update</Text>
            </TouchableOpacity>

            <Button onPress={() => {Fire.shared.signOut();}} title="Log out"/>
        </ScrollView>
     </View>
        )
    }
}

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
    buttonUpdate:{  
        margin: 5,
        backgroundColor: "#3b5998",
        borderRadius: 10,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
    },
    
})
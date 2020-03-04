import * as WebBrowser from 'expo-web-browser';
import React from 'react'
import {View, Text, StyleSheet } from 'react-native'

export default class NotificationScreen extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>That's embarassing...</Text>
                <Text>But we didn't found what U looking for</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})
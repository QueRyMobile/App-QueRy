// O jeito por enquanto vai ser fazer a mao um por já que usando o component fica bugado
// Uma gambiarra q da pra fazer é usar imagens pra nao parecer torto
import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'

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
          <Text style={{fontSize: 18}}>Righ</Text>
        </TouchableOpacity>
      );
    }
  }

  class LeftButton extends React.Component {
    render() {
      return (
        <TouchableOpacity onPress={() => alert('This is a button!')} >
          <Text style={{fontSize: 18}}>Left</Text>
        </TouchableOpacity>
      );
    }
  }

export default class HeaderComponent extends Component {
    render() {
        return (
          <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                <LeftButton/>
            <View >  
                <LogoTitle/>
            </View>
                <RightButton/>
                </View>
        )
    }
}

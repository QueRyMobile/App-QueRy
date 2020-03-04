import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {Image,Platform,ScrollView,StyleSheet,Text,TouchableOpacity,View,FlatList, Button} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import moment from 'moment'
import Fire from '../Fire'

import { MonoText } from '../components/StyledText';

let posts = [
  {
      id: "1",
      name: "Guilherme Zago",
      text:
          "Essa é a Home do App da QueRy, Bem-vindo Beta Tester!",
      timestamp: 1569109273726,
      avatar: require("../assets/eu.jpg"),
      image: require("../assets/tempImage1.jpg")
  },
  {
      id: "2",
      name: "Guilherme Zago",
      text:
          "Aqui é onde eu, como lead developer, vou atualizar as infos a cada versão até o lançamento oficial",
      timestamp: 1569109273726,
      avatar: require("../assets/eu.jpg"),
      image: require("../assets/tempImage2.jpg")
  },
  {
      id: "3",
      name: "Guilherme Zago",
      text:
          "Vcs como queridos usuários precisam me relatar a experiencia que recebem aqui, por isso, vou deixar uma forma de contato pronta pra eu receber os feedbacks rapidamente",
      timestamp: 1569109273726,
      avatar: require("../assets/eu.jpg"),
      image: require("../assets/tempImage3.jpg")
  },
  {
      id: "4",
      name: "Guilherme Zago",
      text:
          "E futuramente aqui na Home é onde ficaram seus contatos, locais conectados e umas surpresinhas que vem mais pra frente ;D",
      timestamp: 1569109273726,
      avatar: require("../assets/eu.jpg"),
      image: require("../assets/tempImage4.jpg")
  }
];

let contacts = [
  {
    id: "0",
    name: "Guilherme Zago",
    text:
        "Teste",
    timestamp: 1569109273726,
    avatar: require("../assets/eu.jpg"),
    image: require("../assets/qr.png")
}
];


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
      <TouchableOpacity>
                  <Text style={{fontSize: 18, paddingRight: 10, paddingLeft: 10}}>Null</Text>
                </TouchableOpacity>
    );
  }
}

class LeftButton extends React.Component {
  render() {
    return (
      <TouchableOpacity>
                  <Text style={{fontSize: 18, paddingRight: 10, paddingLeft: 10}} onPress={this.props.navigate.navigation("Profile")}>Test</Text>
                </TouchableOpacity>
    );
  }
}

export default class HomeScreen extends React.Component {


  componentDidMount(){
    const contato = [
      Fire.shared.getConnections()
    ]
  }
  
  renderPost = post => {
    return(
        <View style={styles.feedItem}>
            <Image source={post.avatar} style={styles.avatar}/>
            <View style={{flex:1}}>
                 <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <View>
    <Text style={styles.name}>{post.name}</Text>
    <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
                    </View>
    <Ionicons name="ios-flag"size={24} color="#a3260a"/>
                 </View>
    <Text style={styles.post}>{post.text}</Text>

    <Image source={post.image} style={styles.postImage} resizeMode="cover"/>

                <View style={{flexDirection: "row"}}>
                    <Ionicons name="ios-heart-empty" size={24} color="#73788B" style={{marginRight: 16}}/>
                    <Ionicons name="ios-chatboxes" size={24} color="#73788B" />
                </View>
            </View>
        </View>
    )
}

  renderContact = contacts =>{
    return(<View style={styles.feedItem}>
      <Image source={contacts.avatar} style={styles.avatar}/>
      <View style={{flex:1}}>
           <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
              <View>
<Text style={styles.name}>{contacts.name}</Text>
<Text style={styles.timestamp}>{moment(contacts.timestamp).fromNow()}</Text>
              </View>
<Ionicons name="ios-flag"size={24} color="#a3260a"/>
           </View>
<Text style={styles.post}>{contacts.text}</Text>

<Image source={contacts.image} style={styles.postImage} resizeMode="cover"/>

          <View style={{flexDirection: "row"}}>
              <Ionicons name="ios-heart-empty" size={24} color="#73788B" style={{marginRight: 16}}/>
              <Ionicons name="ios-chatboxes" size={24} color="#73788B" />
          </View>
      </View>
  </View>)
  }

render(){
    return(
        <View style={styles.container}>
          
          
            <FlatList style={styles.feed} data={posts.concat(contacts)} renderItem={({item})=> this.renderPost(item)} keyExtractor={item => item.id} showsVerticalScrollIndicator={false}/>
          
            {/* <FlatList style={styles.feed} data={contacts} renderItem={({item})=> this.renderContact(item)} keyExtractor={item => item.id} showsVerticalScrollIndicator={false}/> */}
{/* <FlatList style={styles.feed} data={} renderItem={({item})=> this.renderData(item)} keyExtractor={item => item.id} showsVerticalScrollIndicator={false}/> */}
        </View>

    );
}
}

HomeScreen.navigationOptions = ({
  headerLeft: () => (<RightButton/>),
  headerTitle: <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><LogoTitle/></View>,
  headerRight: <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")}><RightButton /></TouchableOpacity>
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  header:{
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: {height: 5},
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10
},
headerTitle: {
    fontSize: 20,
    fontWeight: "500"
},
feed:{
    marginHorizontal: 16,

},
feedItem:{
    backgroundColor:"#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8
},
avatar:{
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16
},
name:{
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65"
},
timestamp:{
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4
},
post:{
    marginTop: 16,
    fontSize: 14,
    color:"#838899"
},
postImage:{
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16
}
});

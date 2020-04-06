import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList
} from "react-native";
import firebase from '../config'
import Fire from '../Fire'
import UserPermissions from '../utilities/UserPermissions'
require ('firebase/firestore')


const cardHeight = 250;

const { height } = Dimensions.get("window");

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
                    <Text style={{fontSize: 18, paddingRight: 10, paddingLeft: 10}}>Soon</Text>
                  </TouchableOpacity>
      );
    }
  }

export default class HomeScreenWallet extends React.Component {

    
  constructor(props){
    super(props)
      this.state={
        user: {
          connections: [],
          name: "",
          insta: "",
          twitter: "",
          whatsapp: "",
          bio: "",
        },
        items: [],
    } 
  }
  
  componentDidMount(){
    
    this.getStuffFirebase();
    this.testArrayFirebase();
    this.getUserInfo();
    this.NewGetUserInfo();
  }

   testArray() {
    return  {
      data:{
       test:[
        {name: "Zago",
        insta: "@zagoguic",
        twitter: "@zagoguic",
        whatsapp: "ta",
        bio: "@zagoguic",},

        {name: "Renan",
        insta: "@renan",
        twitter: "@renan",
        whatsapp: "ta",
        bio: "@renan",},
       ]
      },
      status: "live"
    }
  }

  getStuffFirebase = () => {
    var userId = firebase.auth().currentUser.uid;

   firebase.database().ref(userId).on('value', snapshot => {
    snapshot.forEach(childSnapshot => {
        childSnapshot.forEach(colorSnapshot => {
            // console.log(childSnapshot.key+" - "+colorSnapshot.key+": "+colorSnapshot.val());
            this.setState({items: colorSnapshot.val()})
            // console.log(this.state.items)
            console.log(colorSnapshot.val())
            });
            
        });
        
    });
  }

  testArrayFirebase(){
    
    const userArray = this.state.items;
    // console.log(this.state.items);
    const BigDeal = userArray.slice.call(userArray);
    console.log("Array de users: "+ BigDeal)

    console.log(this.state.user);
  }

  getUserInfo = async() => {
    const user = "85WrgXkLa7dF5IUh6SKBMjr2JK62";

    Fire.shared.firestore.collection("users").doc(user).onSnapshot(doc =>{this.setState({user: doc.data()})})
  }

  NewGetUserInfo = async() => {
    const connections = this.state.user.connections;

    console.log("Connections: "+ connections)


  }

  _renderUser = () => {
    let {cardName, card, cardBio, cardImage} = styles;
    // const {data:{test:[item1]}} = this.testArray();
   
    return(
     
      <TouchableOpacity style={card} onPress={()=> this.props.navigation.navigate("Beta", {data: this.state.items})}>
      <Image style={cardImage}
            source={ this.state.user.avatar
                    ? { uri: this.state.user.avatar } :
                  require("../assets/images/robot-dev.png")} style={styles.cardImage}/>
        <Text style={cardName}>{this.state.user.name}</Text>
        <Text style={cardBio}>{this.state.user.bio}</Text>
        <Text style={cardBio}>{this.state.user.connections}</Text>
      </TouchableOpacity>

    )
  }

  render() {
  // console.log("This is state: " + this.state.items)
  // console.log("This is user: " + this.state.user.name)
    let {cardName, card, cardBio, cardImage} = styles;
    let {container,loader} = styles;
    const {items} = this.state;
    // const {data:{test: []}} = this.testArray();
    const alo = this.testArray();
    const testArr = this.testArrayFirebase();
    // console.log(testArr)
    if(items.length === 0){
      return(
        <View style={loader}>
          <ActivityIndicator size="large"></ActivityIndicator>
          <Text>Você não possui contatos!</Text>
        </View>
      )
    }
    return (
      <ScrollView>
        {alo.data.test.map((item,key)=>{
         return( <TouchableOpacity key={key} style={card} onPress={()=> this.props.navigation.navigate("Beta", {data: this.state.items})}>
          {/* <Image style={cardImage}
                source={ this.state.user.avatar
                        ? { uri: this.state.user.avatar } :
                      require("../assets/images/robot-dev.png")} style={styles.cardImage}/> */}
            <Text style={cardName}>{item.name}</Text>
            <Text style={cardBio}>{item.bio}</Text>
          </TouchableOpacity>)
        })}
      <FlatList
          style={container}
          data={items}
          keyExtractor={(item,index)=>index.toString()}
          renderItem={this._renderUser}
        />
  </ScrollView>
    );
  }
}

HomeScreenWallet.navigationOptions = ({
    headerLeft: () => (<RightButton/>),
    headerTitle: <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><LogoTitle/></View>,
    headerRight: <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")}><RightButton /></TouchableOpacity>
  });

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 16,
  },
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#FFF"
  },
  content: {
    height: height * 2
  },
  card: {
    paddingTop: 20,
    height: cardHeight,
    borderRadius: 10
  },
  viewtest:{
    flexDirection: "row", justifyContent: "space-between", alignItems: "center"
  },
  name:{
      paddingLeft: 12,
      paddingTop: 20,
      fontSize: 22,
      fontWeight: "600",
  },
  price:{
    paddingRight: 12,
    paddingTop: 20,
    fontSize: 22,
    fontWeight: "600",
  },
  text:{
    padding: 10,
    fontSize: 16,
    fontWeight: "300",
    textAlign: "left"
  },

  loader:{
    flex:1,
    alignItems: "center",
    justifyContent: "center"
  },

  card:{
    backgroundColor: "#000",
    marginBottom: 10,
    borderRadius: 20,
    marginLeft: "2%",
    width: "96%",
    shadowColor: '#808080',
    shadowOpacity: 1,
    shadowOffset:{
      width:3,
      height: 3
    }
  },
  cardName:{
    fontSize: 40,
    fontWeight: "600",
    color:"#FFF",
    textAlign: "center"
  },
  cardBio:{
    fontSize: 20,
    fontWeight: "300",
    color: "#FFF",
    textAlign: "center"
  },

  cardImage:{
    // paddingTop: 10,
    borderRadius: 20,
    alignSelf:"center",
    width: "100%",
    // marginLeft: "2%",
    height: 300,
    resizeMode: "cover"
  }
});
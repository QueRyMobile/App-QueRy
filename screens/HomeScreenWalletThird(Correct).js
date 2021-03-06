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
          name: "",
          insta: "",
          twitter: "",
          whatsapp: "",
          bio: "",
        },
      items: [],
    } 
  }
  
  componentDidMount(props){
    
    
    this.getStuffFirebase();
    this.getUserInfo();

    // console.log("\nThis is: " + this.state.user.toString())
  }

  getStuffFirebase = () => {
    var userId = firebase.auth().currentUser.uid;
    console.log("Esse aqui é: " + userId);

   firebase.database().ref(userId).once('value', snapshot => {
    snapshot.forEach(childSnapshot => {
        childSnapshot.forEach(colorSnapshot => {
            // console.log(childSnapshot.key+" - "+colorSnapshot.key+": "+colorSnapshot.val());
            this.setState({items: colorSnapshot.val()})
            // this.setState({user: this.state.items})

            console.log("Items: " + this.state.items)
            // console.log("User: " + this.state.user)
            // console.log(this.state.items);
            });
            
        });
        
    });

  }

  

  getUserInfo = async() => {
    const user = "ysTT7dpbaTTUStbuNsoRvCnA2ao1";

    // const user = this.state.items;


    // this.state.user = this.state.items;
    // console.log(Ruser)
    // 
    Fire.shared.firestore.collection("users").doc(user).onSnapshot(doc =>{this.setState({user: doc.data()})} )
    // .onSnapshot(doc => this.setState({user: doc.data()}));
    
    // console.log("Test2:" + Ruser);
  }
  

//   _renderItem = ({item, index, user}) => {
//     let {cardText, card, cardImage} = styles;
//     return(
//       <TouchableOpacity style={card} onPress={()=> this.props.navigation.navigate("Profile")}>
//         <Image style={cardImage} source={{uri: item.url}}></Image>
//         <Text style={cardText}>{item.title}</Text>
//       </TouchableOpacity>
//     )
//   }

  // _renderItem = ({items, user}) => {
  //   let {cardText, card, cardImage} = styles;
  //   return(
  //     <TouchableOpacity style={card} onPress={()=> this.props.navigation.navigate("Beta", {data: this.state.items})}>
  //       {/* <Image style={cardImage} source={{uri: item.url}}></Image> */}
  //       {/* <Text style={cardText}>{item.name}</Text> */}
  //       {/* <Text style={cardText}>{console.log(item)}</Text> */}
  //       {/* <Text style={cardText}>{this.state.items}</Text> */}
  //       {/* <Text style={cardText}>{this.state.items}</Text> */}
  //       <Text style={cardText}>{this.state.items}</Text>
  //       {/* <Text style={cardText}>{this.state.items.data}</Text> */}
  //     </TouchableOpacity>
  //   )
  // }

  _renderUser = () => {
    let {cardName, card, cardBio, cardImage} = styles;
    return(
      <TouchableOpacity style={card} onPress={()=> this.props.navigation.navigate("Beta", {data: this.state.items})}>
      {/* <Text style={BigText}>A + {console.log("This is the user u r looking 4: " + this.state.toString())}</Text> */}
      <Image style={cardImage}
            source={
                this.state.user.avatar
                    ? { uri: this.state.user.avatar } :
                  require("../assets/images/robot-dev.png")
            }
            style={styles.cardImage}
            />
        {/* <Image style={cardImage} source={{uri: item.url}}></Image> */}
        {/* <Text style={cardText}>{item.name}</Text> */}
        {/* <Text style={cardText}>{console.log(item)}</Text> */}
        {/* <Text style={cardText}>{this.state.items}</Text> */}


        {/* <Text style={cardText}>A + {this.state.items}</Text> */}
        
        <Text style={cardName}>{this.state.user.name}</Text>
        <Text style={cardBio}>{this.state.user.bio}</Text>
        
        {/* <Text style={cardText}>{this.state.items}</Text> */}
        

        {/* <Text style={cardText}>A + {this.state.user.bio}</Text> */}
        {/* <Text style={cardText}>{this.state.user.name}</Text> */}
        {/* <Text>{this.state.user.name}</Text> */}
        {/* <Text style={cardText}>{this.state.items.data}</Text> */}
      </TouchableOpacity>
    )
  }

  render() {
    // const { y } = this.state;
    const user = this.state.items;
    let { container,loader} = styles;
    let {items} = this.state;
    if(items.length === 0){
      return(
        <View style={loader}>
          <ActivityIndicator size="large"></ActivityIndicator>
          <Text>Você não possui contatos!</Text>
        </View>
      )
    }
    return (
      <FlatList
          style={container}
          data={items}
          keyExtractor={(item,index)=>index.toString()}
          renderItem={this._renderUser}
        />
   
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
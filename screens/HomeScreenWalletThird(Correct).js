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
      this.state={items: []}
  }
  
  getStuffFirebase = () => {
    var userId = firebase.auth().currentUser.uid;
    console.log("Esse aqui é: " + userId);

   firebase.database().ref(userId).once('value').then(snapshot => {
    snapshot.forEach(childSnapshot => {
        childSnapshot.forEach(colorSnapshot => {
            console.log(childSnapshot.key+" - "+colorSnapshot.key+": "+colorSnapshot.val());
            this.setState({items: colorSnapshot.val()})
            console.log(this.state.items);
            });
            
        });
        
    });

  }

  // getStuffFromFirestore = () => {
  //   Fire.shared.firestore.collection("users").doc(this.state.items).onSnapshot(doc => {
  //           this.setState({ user: doc.data() })
  //         })
  // }

  
  componentDidMount(){
    // this.getDataFromFirebase();
    this.getStuffFirebase();
  }

//   getDataFromFirebase = async () => {
//     const endpoint = "https://jsonplaceholder.typicode.com/photos?_limit=20";
//     const res = await fetch(endpoint);
//     const data = await res.json();
//     this.setState({items: data})
//   }

//   _renderItem = ({item, index, user}) => {
//     let {cardText, card, cardImage} = styles;
//     return(
//       <TouchableOpacity style={card} onPress={()=> this.props.navigation.navigate("Profile")}>
//         <Image style={cardImage} source={{uri: item.url}}></Image>
//         <Text style={cardText}>{item.title}</Text>
//       </TouchableOpacity>
//     )
//   }

  _renderItem = (items) => {
    let {cardText, card, cardImage} = styles;
    return(
      <TouchableOpacity style={card} onPress={()=> this.props.navigation.navigate("Beta", {data: this.state.items})}>
        {/* <Image style={cardImage} source={{uri: item.url}}></Image> */}
        {/* <Text style={cardText}>{item.name}</Text> */}
        {/* <Text style={cardText}>{console.log(item)}</Text> */}
        <Text style={cardText}>{this.state.items}</Text>
        <Text style={cardText}>{this.state.items.data}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    // const { y } = this.state;
    let { container,loader} = styles;
    let {items} = this.state;
    if(items.length === 0){
      return(
        <View style={loader}>
          <ActivityIndicator size="large"></ActivityIndicator>
          <Text>Você não possuí contatos!</Text>
        </View>
      )
    }
    return (
      <FlatList
        style={container}
        data={items}
        keyExtractor={(item,index)=>index.toString()}
        renderItem={this._renderItem}
      />

      // <View style={container}>
      //   <ScrollView>
      //   <TouchableOpacity style={card} onPress={()=> this.props.navigation.navigate("Profile")}>
      //     <Image style={cardImage} source={{uri: "https://catracalivre.com.br/wp-content/thumbnails/9XyXYcezS4VsNWYRPM3orKbck6M=/wp-content/uploads/2019/12/kanye-west-aniversario-de-sp-450x225.jpg"}}></Image>
      //     <Text style={cardText}>Kanye West</Text>
      //   </TouchableOpacity>
      //   </ScrollView>
      // </View>







      // <SafeAreaView style={styles.root}>
      //   <View style={styles.container}>
      //     <View style={StyleSheet.absoluteFill}>
      //       {cards.map((card, i) => {
      //         const inputRange = [-cardHeight, 0];
      //         const outputRange = [
      //           cardHeight * i,
      //           (cardHeight - cardTitle) * -i
      //         ];
      //         if (i > 0) {
      //           inputRange.push(cardPadding * i);
      //           outputRange.push((cardHeight - cardPadding) * -i);
      //         }
      //         const translateY = y.interpolate({
      //           inputRange,
      //           outputRange,
      //           extrapolateRight: "clamp"
      //         });
      //         return (
      //           <Animated.View
      //             key={card.name}
      //             style={{ transform: [{ translateY }] }}
      //           >
      //             <View style={[styles.card, { backgroundColor: card.color }]}>
      //                 <View style={styles.viewtest}>
      //                   <Text style={styles.name}>{card.name}</Text>
      //                   <Text style={styles.price}>{card.price}</Text>
      //               </View>
      //                   <Text style={styles.text}>{card.text}</Text>
      //             </View>
                  
      //           </Animated.View>
      //         );
      //       })}
      //     </View>
      //     <Animated.ScrollView
      //       scrollEventThrottle={16}
      //       contentContainerStyle={styles.content}
      //       showsVerticalScrollIndicator={false}
      //       onScroll={Animated.event(
      //         [
      //           {
      //             nativeEvent: {
      //               contentOffset: { y }
      //             }
      //           }
      //         ],
      //         { useNativeDriver: true }
      //       )}
      //     />
      //   </View>
      // </SafeAreaView>
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
  cardText:{
    fontSize: 30,
    color:"#FFF",
    textAlign: "center"
  },
  cardImage:{
    // paddingTop: 10,
    borderRadius: 20,
    alignSelf:"center",
    width: "100%",
    // marginLeft: "2%",
    height: 200,
    resizeMode: "cover"
  }
});
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
  Image
} from "react-native";

const cardHeight = 250;
const cardTitle = 45;
const cardPadding = 10;

const { height } = Dimensions.get("window");
const cards = [
  {
    name: "Test",
    color: "#a9d0b6",
    price: "30 R$",
    text: "Lorem Ipsum"
  },
  {
    name: "Juice",
    color: "#e9bbd1",
    price: "64 R$",
    text: "Lorem Ipsum"
  },
  {
    name: "Mighty Juice",
    color: "#eba65c",
    price: "80 R$",
    text: "Lorem Ipsum"
  },
  {
    name: "Sandwich",
    color: "#95c3e4",
    price: "85 R$",
    text: "Lorem Ipsum"
  },
  {
    name: "Guilherme Zago",
    color: "#1c1c1c",
    price: "145 R$",
    text: "Lorem Ipsum"
  },
  {
    name: "Signature",
    color: "#a390bc",
    price: "92 R$",
    text: "Lorem Ipsum"
  },
  {
    name: "Coffee",
    color: "#fef2a0",
    price: "47 R$",
    text: "Lorem Ipsum"
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

     // *************************************** \\
//  ||                                           ||
 // ||           Página fora de uso!             ||
 // ||                                           ||
 //  \\ *************************************** //
export default class HomeScreenWallet extends React.Component {
  state = {
    y: new Animated.Value(0)
  };

  render() {
    const { y } = this.state;
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.container}>
          <View style={StyleSheet.absoluteFill}>
            {cards.map((card, i) => {
              const inputRange = [-cardHeight, 0];
              const outputRange = [
                cardHeight * i,
                (cardHeight - cardTitle) * -i
              ];
              if (i > 0) {
                inputRange.push(cardPadding * i);
                outputRange.push((cardHeight - cardPadding) * -i);
              }
              const translateY = y.interpolate({
                inputRange,
                outputRange,
                extrapolateRight: "clamp"
              });
              return (
                <Animated.View
                  key={card.name}
                  style={{ transform: [{ translateY }] }}
                >
                  <View style={[styles.card, { backgroundColor: card.color }]}>
                      <View style={styles.viewtest}>
                        <Text style={styles.name}>{card.name}</Text>
                        <Text style={styles.price}>{card.price}</Text>
                    </View>
                        <Text style={styles.text}>{card.text}</Text>
                  </View>
                  
                </Animated.View>
              );
            })}
          </View>
          <Animated.ScrollView
            scrollEventThrottle={16}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { y }
                  }
                }
              ],
              { useNativeDriver: true }
            )}
          />
        </View>
      </SafeAreaView>
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
    margin: 16
  },
  container: {
    flex: 1
  },
  content: {
    height: height * 2
  },
  card: {
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
  }
});
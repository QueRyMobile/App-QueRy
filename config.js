import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyCSN5LLYy85L1WpePKAFfkvb4DXOYjNJcU",
    authDomain: "teste-6b232.firebaseapp.com",
    databaseURL: "https://teste-6b232.firebaseio.com",
    projectId: "teste-6b232",
    storageBucket: "teste-6b232.appspot.com",
    messagingSenderId: "54239387189",
    appId: "1:54239387189:web:d387e201b2ae7378"
    };
// firebase.initializeApp(config);

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
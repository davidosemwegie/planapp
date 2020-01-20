import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from "react-native";
import * as Font from 'expo-font';

import * as firebase from 'firebase'
// var firebaseConfig = {
//   apiKey: "AIzaSyCSfXKTEItas5KVvYr64VOIf7FpvB2kFrY",
//   authDomain: "plan-cf664.firebaseapp.com",
//   databaseURL: "https://plan-cf664.firebaseio.com",
//   projectId: "plan-cf664",
//   storageBucket: "plan-cf664.appspot.com",
//   messagingSenderId: "806944978757",
//   appId: "1:806944978757:web:9a7ef8b388d4e4b50c302c"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);


class LoadingScreen extends Component {

    

    componentDidMount() {

        // firebase.auth().signInAnonymously()
        // .then(function (user) {
        //     this.props.navigation.navigate('App')
        // })
        // .catch(function(error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // ...
        //   });

        //alert("LOL Loading screen")

        Font.loadAsync({
            'sf-rounded-semibold': require('../../assets/fonts/SF_Font_Rounded.ttf'),
            'sf-rounded-heavy': require('../../assets/fonts/SF-Pro-Rounded-Heavy.ttf'),
        });


        firebase.auth().onAuthStateChanged(user => {
            console.log("State has changed")
            this.props.navigation.navigate(user ? "App" : "Auth")
        })
        
        //this.props.navigation.navigate("App")
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Please wait while we get everything ready for you</Text>
                <ActivityIndicator size="large" color="lightgrey" />
            </View>
        );
    }
}
export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
    },
    loadingText: {
        //marginTop: 32,
        fontSize: 35,
        textAlign: "center",
        //fontFamily: "sf-rounded-heavy",
        marginVertical: 20
    }
});
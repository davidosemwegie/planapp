import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Image,
    Dimensions
} from "react-native";
import * as Font from 'expo-font';

import * as firebase from 'firebase'



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
                <Image
                    style={{
                        flex: 2,
                        alignSelf: 'center',
                        //height: 150,
                        resizeMode: 'contain',
                        width: Dimensions.get('screen').width / 1.5,
                        // borderWidth: 1,
                        // borderRadius: 75
                    }}
                    source={require('../../assets/minisplash.png')} />
                <View style={{flex: 1}}>
                    {/* <Text style={styles.loadingText}>Please wait while we get everything ready for you</Text> */}
                    <ActivityIndicator size="large" color="lightgrey" />
                </View>
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
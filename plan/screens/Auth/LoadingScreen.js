import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from "react-native";
import * as Font from 'expo-font';

import firebase from 'firebase';

class LoadingScreen extends Component {

    componentDidMount() {
        Font.loadAsync({
            'sf-rounded-semibold': require('../../assets/fonts/SF_Font_Rounded.ttf'),
            'sf-rounded-heavy': require('../../assets/fonts/SF-Pro-Rounded-Heavy.ttf'),
        });

        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "App" : "Auth")
        })
        
        //this.props.navigation.navigate("App")
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Please wait while we get everything ready for you</Text>
                <ActivityIndicator size="large" color="#0000ff" />
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
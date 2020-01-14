import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Button,
    TextInput
} from "react-native";
//import * as Google from 'expo-google-app-auth';
import * as firebase from 'firebase'
import * as common from '../common/index'

import AuthField from './AuthField'

class LoginScreen extends Component {

    state = {
        email: "",
        password: "",
        errorMessage: null
    }

    handleLogin = () => {
        const {email, password} = this.state
        
        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(error => this.setState({errorMessage: error.message}))
    
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "App" : "Auth")
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.greeting}>Previ</Text>

                <View style={styles.error}>
                    <Text style={{color: "red"}}>{this.state.errorMessage}</Text>
                </View>

                <View style={styles.form}>
                    <AuthField title="Email Address" onChangeText = {email => this.setState({email})} autoCapitalize="none"/>
                    <AuthField title="Password" secureTextEntry autoCapitalize="none" onChangeText = {password => this.setState({password})}/>
                    <Button title="Forgot Password?" onPress={() => alert("Forgot passwor button")}/>
                </View>

                <common.Button title="Log In" buttonColor="#3BC09E" onPress={()=> this.handleLogin()} />

                <common.Button title="Sign Up" buttonColor="#A29BFE" onPress={()=> this.props.navigation.navigate("Register")}/>

                {/* <Button title="Log in" onPress={()=> this.handleLogin()}/> */}


                {/* <Button title="Sign up" onPress={()=> this.props.navigation.navigate("Register")}/> */}
            </View>
        );
    }
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: "white",
        //alignItems: 'center',
        justifyContent: 'center'
    },
    greeting: {
        marginTop: 32,
        fontSize: 50,
        textAlign: "center",
        fontFamily: "sf-rounded-heavy",
    },
    error: {
        height: 72,
        alignItems: "center",
        justifyContent: "center"
    },
    form: {
        marginBottom: 50,
        marginHorizontal:40
    },
    inputTitle: {
        marginTop: 20,
        color: "#8A8F9E",
        fontSize: 15,
        textTransform: "uppercase" 
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "black"
    }
});
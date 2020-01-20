import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Button,
    TextInput,
    Alert
} from "react-native";
//import * as Google from 'expo-google-app-auth';
import * as firebase from 'firebase'
import * as common from '../common/index'
import * as Facebook from 'expo-facebook';;

import AuthField from './AuthField'


import Loader from './Loader'




class LoginScreen extends Component {

    constructor(props) {
        super(props);

        //paddingInput = new Animated.Value(0);

        this.state = {
            email: "",
            password: "",
            errorMessage: null,
            loading: false
        }

        this.handleLogin = this.handleLogin.bind(this)
        //this.loginWithFacebook = this.loginWithFacebook.bind(this)

        firebase.auth()
    }



    handleLogin = () => {

        // firebase.auth().signInAnonymously().catch(function(error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // ...
        //   });

        // console.log('login button pressed')

        const { email, password } = this.state


        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (user) {
                console.log(user)
            })
            .catch(error => this.setState({ errorMessage: error.message }))


    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "App" : "Auth")
        })
    }

    async loginWithFacebook() {

        try {
            await Facebook.initializeAsync('775894259560005');
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);

                //console.log((await response.json()))

                const credential = firebase.auth.FacebookAuthProvider.credential(token)
                firebase.auth().signInWithCredential(credential)

                this.setState({ loading: true })

                //this.props.navigation.navigate( "App")


                firebase.auth().onAuthStateChanged(user => {
                    //this.setState({loading: false})
                    this.props.navigation.navigate("Loading")
                })

                //this.props.navigation.n


                Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`, [
                    {
                        text: 'Continue',
                        onPress: () => this.props.navigation.navigate("Loading"),
                        //style: 'cancel',
                    }
                ]);
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <Loader loading={this.state.loading} />

                <Text style={styles.greeting}>Plan</Text>

                <View style={styles.error}>
                    <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
                </View>

                {/* <View style={styles.form}>
                <AuthField title="Email Address" onChangeText={email => this.setState({ email })} autoCapitalize="none" />
                <AuthField title="Password" secureTextEntry autoCapitalize="none" onChangeText={password => this.setState({ password })} />
                <Button title="Forgot Password?" onPress={() => alert("Forgot passwor button")} />
            </View> */}

                {/* <common.Button title="Log In" buttonColor="#3BC09E" onPress={() => this.handleLogin()} />

            <common.Button title="Sign Up" buttonColor="#A29BFE" onPress={() => this.props.navigation.navigate("Register")} /> */}

                <common.Button title="Facebook In" buttonColor="#3b5998" onPress={() => this.loginWithFacebook()} />

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
        marginHorizontal: 40
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
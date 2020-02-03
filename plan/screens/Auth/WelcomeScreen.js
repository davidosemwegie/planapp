import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Button,
    TextInput,
    Alert,
    Image,
    Dimensions
} from "react-native";
//import * as Google from 'expo-google-app-auth';
import * as firebase from 'firebase'
import * as common from '../common/index'
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import * as AppleAuthentication from 'expo-apple-authentication';

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

    anonLogin () {
         firebase.auth().signInAnonymously().catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            this.setState({errorMessage})
            
            // ...
          });
    }

    async loginWithGoogle() {
        const { type, accessToken, user } = await Google.logInAsync(config);

        if (type === 'success') {
            // Then you can use the Google REST API
            let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
        }
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

                {/* <Text style={styles.greeting}>Plan</Text> */}
                {/* <View
                    style={{
                        flex: 1,
                        margin: 20,
                        backgroundColor: 'pink'
                    }}
                >
                    <Image
                        style={{
                            flex: 1,
                            alignSelf: 'center',
                            //height: 150,
                            resizeMode: 'contain',
                            width: Dimensions.get('screen').width - 40,
                            // borderWidth: 1,
                            // borderRadius: 75
                        }}
                        source={require('../../assets/logowi.png')} />
                </View> */}

                <View
                    style={{
                        flex: 1,
                        marginBottom: 100
                        //backgroundColor: 'salmon'
                    }}
                >
                    <Image
                        style={{
                            flex: 3,
                            alignSelf: 'center',
                            marginTop: 80,
                            resizeMode: 'contain',
                            width: Dimensions.get('screen').width,
                            //backgroundColor: 'pink'
                            // borderWidth: 1,
                            // borderRadius: 75
                        }}
                        source={require('../../assets/howtowlogo.png')} />
                    <View style={styles.error}>
                        <Text style={{ color: "red", flex: 1 }}>{this.state.errorMessage}</Text>
                    </View>
                    {/* <View style={styles.form}>
                        <AuthField title="Email Address" onChangeText={email => this.setState({ email })} autoCapitalize="none" />
                        <AuthField title="Password" secureTextEntry autoCapitalize="none" onChangeText={password => this.setState({ password })} />
                        <Button title="Forgot Password?" onPress={() => alert("Forgot passwor button")} />
                    </View> */}
                    <View style={{ flex: 1 }}>
                        {/* <common.Button title="Continue" buttonColor="red" onPress={() => this.anonLogin()}/> */}
                        <common.Button title="Log In With Email" buttonColor="#3BC09E" onPress={() => this.props.navigation.navigate("Login")} />

                        <common.Button title="Create An Account" buttonColor="#A29BFE" onPress={() => this.props.navigation.navigate("Register")} />
                        {/* <common.Button title="Login with Facebook" buttonColor="#3b5998" onPress={() => this.loginWithFacebook()} /> */}
                        {/* <AppleAuthentication.AppleAuthenticationButton
                            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                            cornerRadius={5}
                            style={{ width: 200, height: 44 }}
                            onPress={async () => {
                                try {
                                    const credential = await AppleAuthentication.signInAsync({
                                        requestedScopes: [
                                            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                                            AppleAuthentication.AppleAuthenticationScope.EMAIL,
                                        ],


                                    });
                                    // signed in
                                } catch (e) {
                                    if (e.code === 'ERR_CANCELED') {
                                        // handle that the user canceled the sign-in flow
                                    } else {
                                        // handle other errors
                                    }
                                }
                            }}
                        /> */}
                    </View>


                    {/* <common.Button title="Google Login" buttonColor="#de5246" onPress={() => this.loginWithGoogle()} /> */}
                </View>


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
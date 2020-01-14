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


class RegisterScreen extends Component {

    state = {
        name: "",
        email: "",
        password: "",
        errorMessage: null
    }

    handleSignUp = () => {
        const { name, email, password } = this.state

        const db = firebase.database().ref('/users')

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(userCredientials => {
                userCredientials.user.updateProfile({
                    displayName: name
                })
                this.props.navigation.navigate('App')
            })
            .catch(error => this.setState({ errorMessage: error.message }))

        //this.sendVerification()
    }

    sendVerification = () => {
        var user = firebase.auth().currentUser;

        user.sendEmailVerification().then(function () {
            alert("You have been sent a verification email")
        }).catch(function (error) {
            alert(error.message)
        });
    }

    render() {
        return (
            <common.Screen title="Register" headerIcon="md-arrow-back" headerIconPress={() => this.props.navigation.goBack()} >
                <View style={styles.form}>
                    <AuthField title="First Name" onChangeText={name => this.setState({ name })} />
                    <AuthField title="Email Address" onChangeText={email => this.setState({ email })} autoCapitalize="none" />
                    <AuthField title="Password" secureTextEntry autoCapitalize="none" onChangeText={password => this.setState({ password })} />
                </View>
                
                <common.Button title="Complete Registration" buttonColor="#A29BFE" onPress={() => this.handleSignUp()} />
            </common.Screen>
            // <View style={styles.container}>
            //     <Text style={styles.greeting}>RegisterScreen</Text>

            //     <View style={styles.error}>
            //         <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
            //     </View>

            //     <View style={styles.form}>
            //         <AuthField title="Name" onChangeText={name => this.setState({ name })}/>
            //         <AuthField title="Email Address" onChangeText={email => this.setState({ email })} autoCapitalize="none" />
            //         <AuthField title="Password" secureTextEntry autoCapitalize="none" onChangeText={password => this.setState({ password })} />

            //         {/* <View>
            //             <Text style={styles.inputTitle}>Name</Text>
            //             <TextInput style={styles.input} onChangeText={name => this.setState({ name })}></TextInput>
            //         </View>

            //         <View>
            //             <Text style={styles.inputTitle}>Email Address</Text>
            //             <TextInput style={styles.input} onChangeText={email => this.setState({ email })} autoCapitalize="none"></TextInput>
            //         </View>

            //         <View>
            //             <Text style={styles.inputTitle}>Password</Text>
            //             <TextInput style={styles.input} secureTextEntry autoCapitalize="none" onChangeText={password => this.setState({ password })}></TextInput>
            //         </View> */}
            //     </View>

            //     <Button title="Sign Up" onPress={() => this.handleSignUp()} />

            //     <Button title="Log in" onPress={() => this.props.navigation.navigate("Login")} />
            // </View>
        );
    }
}
export default RegisterScreen;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        marginHorizontal: 40,
        //height: '80%',
        // flexDirection: "column",
        // justifyContent: "space-around"
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        textAlign: "center"
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
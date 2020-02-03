import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
// import { fromBottom, fromTop } from 'react-navigation-transitions';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';


import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyCSfXKTEItas5KVvYr64VOIf7FpvB2kFrY",
  authDomain: "plan-cf664.firebaseapp.com",
  databaseURL: "https://plan-cf664.firebaseio.com",
  projectId: "plan-cf664",
  storageBucket: "plan-cf664.appspot.com",
  messagingSenderId: "806944978757",
  appId: "1:806944978757:web:9a7ef8b388d4e4b50c302c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//firebase.auth()

import * as screens from './screens/index'



/* DISBALE YELLOW BOX WARNING */
console.disableYellowBox = true


const AppStack = createStackNavigator({
  // Loader: screens.Loader,
  Home: screens.HomeScreen,
  Settings: screens.SettingsScreen,
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: true,
    }
  })

const AuthStack = createStackNavigator({
  Welcome: screens.WelcomeScreen,
  Login: screens.LoginScreen,
  Register: screens.RegisterScreen
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: true,
    }
  })

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: screens.LoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
)

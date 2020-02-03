import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Platform,
    Button, 
    StatusBar
} from "react-native";

import * as common from '../common'
import * as comp from './components'
import * as firebase from 'firebase'

import { Constants, Notifications } from 'expo';

import {Permissions} from 'expo-permissions'

class HomeScreen extends Component {

    state = {
        date: "",
        eventTitle: "",
        isModalVisible: false
    }

    constructor(props) {
        super(props);

        //paddingInput = new Animated.Value(0);

        this.state = {
            date: "",
            eventTitle: "",
            isModalVisible: false,
            listTitle: "To-do",
            id: null
        }

        this.addEvent = this.addEvent.bind(this)
    }

    componentDidMount() {

        const today = new Date();

        const todayString = today.toDateString();

        this.setState({ date: todayString })

    }

    addEvent() {

        const today = new Date();
        const year = today.getFullYear();      // 1980
        const month = today.getMonth() + 1;        // 6
        const date = today.getDate();          // 31
        const dateToAdd = `${month}/${date}/${year}`

        const { uid } = firebase.auth().currentUser;

        const eventTitle = this.state.eventTitle

        const db = firebase.database().ref(`/${uid}/active/`);

        if (eventTitle !== "") {
            const key = db.push().key
            db.child(key).set({
                eventTitle: eventTitle,
                date: dateToAdd,
                status: 0,
            })
        }

        this.setState({ isModalVisible: false })
    }

    logout () {
        Alert.alert(
            'Are you sure you want to sign out?',
            'Please confirm below',
            [
                //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => firebase.auth().signOut() },
            ],
            { cancelable: false },
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <common.Screen subText={this.state.date} headerIcon='md-log-out' 
                //headerIconPress={() => this.props.navigation.navigate("Settings")}
                headerIconPress={() => this.logout()}
                    // title={this.state.listTitle}
                    // title="Hi David"
                // onTitlePress={() => alert("Title Pressed")}
                >
                    <View style={{ marginBottom: 80 }}>
                        <comp.NewItemModal
                            isVisible={this.state.isModalVisible}
                            onChangeText={eventTitle => this.setState({ eventTitle })}
                            onSubmitEditing={this.addEvent}
                            onEndEditing={() => this.setState({ isModalVisible: false })} />
                        <comp.ActiveList />
                    </View>
                </common.Screen>
                {/* <common.Header
                subText={this.state.date} headerIcon='md-log-out' 
                headerIconPress={() => this.logout()}/>
                <View style={{ marginBottom: 80 }}>
                        <comp.NewItemModal
                            isVisible={this.state.isModalVisible}
                            onChangeText={eventTitle => this.setState({ eventTitle })}
                            onSubmitEditing={this.addEvent}
                            onEndEditing={() => this.setState({ isModalVisible: false })} />
                        <comp.ActiveList />
                    </View> */}
                <comp.BottomTab
                    addButton={() => this.setState({ isModalVisible: true })}
                />
            </View>
        );
    }
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
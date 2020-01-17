import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";

import * as common from '../common'
import * as comp from './components'
import * as firebase from 'firebase'

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
            isModalVisible: false
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

    render() {
        return (
            <View style={styles.container}>
                <common.Screen subText={this.state.date} headerIcon='md-settings'>
                    <View style={{marginBottom: 80}}>
                        <comp.NewItemModal
                            isVisible={this.state.isModalVisible}
                            onChangeText={eventTitle => this.setState({ eventTitle })}
                            onSubmitEditing={this.addEvent}
                            onEndEditing={() => this.setState({ isModalVisible: false })} />
                        <comp.ActiveList />
                    </View>
                </common.Screen>
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
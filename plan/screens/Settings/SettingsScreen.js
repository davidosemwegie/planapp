import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";
import * as common from '../common'
import * as comp from './components'
import * as firebase from 'firebase'
import * as con from '../constants'

class SettingsScreen extends Component {
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

        this.logout = this.logout.bind(this)
    }

    logout () {
        firebase.auth().signOut();
    }

    render() {
        return (
            <View style={styles.container}>
                <common.Screen subText="Settings" headerIcon='md-arrow-back'  headerIconPress = {() => this.props.navigation.goBack()}>
                    <View style={{ marginBottom: 80 }}>
                        {/* <Button title="Log out" onPress={() => this.logout()} /> */}
                        <common.Button title="Sign Out" buttonColor={con.colors.red} onPress={() => this.logout()} />
                    </View>
                </common.Screen>
            </View>
        );
    }
}
export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    Keyboard,
    Animated
} from "react-native";

import Modal from "react-native-modal";

import * as con from '../../constants'

class NewItemModal extends Component {

    constructor(props) {
        super(props);
        this.

            paddingInput = new Animated.Value(0);

        this.state = {
            eventTitle: "",
            isModalVisible: true
        }

        this.addEvent = this.addEvent.bind(this)
    }

    // state={
    //     eventTitle: ""
    // }


    componentWillMount() {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    keyboardWillShow = (event) => {
        Animated.timing(this.paddingInput, {
            duration: event.duration,
            toValue: 60,
        }).start();
    };

    keyboardWillHide = (event) => {
        Animated.timing(this.paddingInput, {
            duration: event.duration,
            toValue: 0,
        }).start();
    };

    addEvent() {

        const { uid } = firebase.auth().currentUser;

        const eventTitle = this.state.eventTitle

        const db = firebase.database().ref(`/${uid}/active/`);

        if (eventTitle !== "") {
            const key = db.push().key
            db.child(key).set({
                eventTitle: eventTitle,
                status: 0,
            })
        }
    }

    render() {

        return (
            <Modal isVisible={this.props.isVisible} backdropOpacity={0}>
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <Animated.View style={{ marginBottom: this.paddingInput }}>
                        <View>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Type new activity here"
                                autoCapitalize="none"
                                maxLength={30}
                                autoFocus
                                onChangeText={this.props.onChangeText}
                                onSubmitEditing={this.props.onSubmitEditing}
                                onEndEditing={this.props.onEndEditing}
                            />
                        </View>
                    </Animated.View>
                </KeyboardAvoidingView>
            </Modal>
        )
    }
}

export default NewItemModal;

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        width: Dimensions.get('screen').width,
        backgroundColor: con.colors.grey,
        //backgroundColor: "blue",
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    TextInput: {
        height: 50,
        //backgroundColor: "salmon",
        fontFamily: con.text.base,
        color: con.colors.light.text,
        fontSize: 25,
        marginTop: 10,
        padding: 10
    }
});
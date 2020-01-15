import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert
} from "react-native";
import Swipeable from 'react-native-swipeable-row';
import * as firebase from 'firebase'
import * as con from '../../constants'
import { Feather, AntDesign, FontAwesome } from '@expo/vector-icons';

/* HAD TO PUT THIS STYLE BLOCK ON TOP FOR SOME REASON */
const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
        backgroundColor: 'pink'
    },
    activeText: {
        marginHorizontal: 20,
        marginVertical: 10,
        fontFamily: con.text.base,
        fontSize: 30
    },
    doneText: {
        marginHorizontal: 20,
        marginVertical: 10,
        fontFamily: con.text.base,
        fontSize: 30,
        color: con.colors.grey,
        textDecorationLine: 'line-through',
        textDecorationColor: con.colors.grey,
    },
    differentDateText: {
        marginHorizontal: 20,
        marginVertical: 10,
        fontFamily: con.text.base,
        fontSize: 30,
        color: con.colors.red
    },
    doneSwipe: {
        backgroundColor: con.colors.green,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 40
    },
    undoSwipe: {
        backgroundColor: con.colors.blue,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 40
    },
    editButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: con.colors.blue,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: con.colors.red,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


const SwipeIcon = (props) => {
    return (
        <Feather name={props.name} size={30} color={con.colors.white} />
    )
}

// const LeftSwipe = (props) => {
//     if (props.status == 0) {
//         return (
//             <View style={styles.doneSwipe}><SwipeIcon name="check" /></View>
//         )
//     } else if (props.stutus == 1) {
//         return (
//             <View style={styles.doneSwipe}><FontAwesome name="undo" size={30} color={con.colors.blue} /></View>
//         )
//     }
// }

const leftContent0 = <View style={styles.doneSwipe}><SwipeIcon name="check" /></View>
const leftContent1 = <View style={styles.undoSwipe}><FontAwesome name="undo" size={30} color={con.colors.white} /></View>

// const rightButtons = (props) [
//     <TouchableOpacity style={styles.editButton} onPress={props.editButton}><Feather name="edit" size={30} color={con.colors.white} /></TouchableOpacity>,
//     <TouchableOpacity style={styles.deleteButton} onPress={props.deleteButton}><AntDesign name="delete" size={30} color={con.colors.white} /></TouchableOpacity>
// ]


class Row extends Component {
    state = {
        uid: ""
    }

    componentDidMount() {

        const { email, displayName, uid } = firebase.auth().currentUser;

        this.setState({ uid })
    }

    done = id => {
        const db = firebase.database().ref(`/${this.state.uid}/active/${id}`)

        db.update({ status: 1 })
    }

    undo = id => {
        const db = firebase.database().ref(`/${this.state.uid}/active/${id}`)

        db.update({ status: 0 })
    }


    edit = id => {
        alert(`edit button pressed with ${id}`)
    }

    delete = id => {
        const db = firebase.database().ref(`/${this.state.uid}/active/${id}`)

        Alert.alert(
            'DELETE THIS ACTIVITY?',
            'Please confirm below',
            [
                //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => db.remove() },
            ],
            { cancelable: false },
        );
    }

    render() {


        const rightButtons = [
            <TouchableOpacity style={styles.editButton} onPress={() => this.edit(this.props.id)}><Feather name="edit" size={30} color={con.colors.white} /></TouchableOpacity>,
            <TouchableOpacity style={styles.deleteButton} onPress={() => this.delete(this.props.id)}><AntDesign name="delete" size={30} color={con.colors.white} /></TouchableOpacity>
        ]

        if (this.props.status == 0) {
            return (
                <Swipeable
                    leftContent={leftContent0}
                    onLeftActionRelease={() => this.done(this.props.id)}
                    rightButtons={rightButtons}>
                    {this.props.children}
                </Swipeable>
            )
        } else if (this.props.status == 1) {
            return (
                <Swipeable
                    leftContent={leftContent1}
                    onLeftActionRelease={() => this.undo(this.props.id)}
                    rightButtons={rightButtons}>
                    {this.props.children}
                </Swipeable>
            )
        }

    }
}


class ActiveListItem extends Component {

    render() {


        if (this.props.status == 0) {

            const today = new Date(this.props.today)
            const date = new Date(this.props.date)

            // const today = new Date();
            const date1 = date;
            const date2 = today;
            const diffTime = Math.abs(date2 - date1);
            const diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


            if (diff != 0) {
                return (
                    <Row id={this.props.id} status={this.props.status}>
                        <Text style={styles.differentDateText} allowFontScaling={false}>{this.props.title}</Text>
                    </Row>
                )

            } else if (date !== today) {
                return (
                    <Row id={this.props.id} status={this.props.status}>
                        <Text style={styles.activeText} allowFontScaling={false}>{this.props.title}</Text>
                    </Row>
                )
            }
        } else if (this.props.status == 1) {
            return (
                <Row id={this.props.id} status={this.props.status}>
                    <Text style={styles.doneText} allowFontScaling={false}>{this.props.title}</Text>
                </Row>
            )
        }

    }
}
export default ActiveListItem;


import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import Swipeable from 'react-native-swipeable-row';
import * as firebase from 'firebase'
import * as con from '../../constants'
import { Feather } from '@expo/vector-icons';

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
    }
});


const SwipeIcon = (props) => {
    return (
        <Feather name={props.name} size={30} color={con.colors.white} />
    )
}

const leftContent = <View style={styles.doneSwipe}><SwipeIcon name="check" /></View>

const rightButtons = [
    <TouchableOpacity><Text>Button 1</Text></TouchableOpacity>,
    <TouchableOpacity><Text>Button 2</Text></TouchableOpacity>
];

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
        alert(id)
    }


    edit = id => {
        alert(id)
    }

    delete = id => {
        alert(id)
    }

    render() {
        return (
            <Swipeable
                leftContent={leftContent}
                onLeftActionRelease={() => this.done(this.props.id)}
                rightButtons={rightButtons}>
                {this.props.children}
            </Swipeable>
        )
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
                    <Row id={this.props.id}>
                        <Text style={styles.differentDateText} allowFontScaling={false}>{this.props.title}</Text>
                    </Row>
                )

            } else if (date !== today) {
                return (
                    <Row id={this.props.id}>
                        <Text style={styles.activeText} allowFontScaling={false}>{this.props.title}</Text>
                    </Row>
                )
            }
        } else if (this.props.status == 1) {
            return (
                <Row id={this.props.id}>
                    <Text style={styles.doneText} allowFontScaling={false}>{this.props.title}</Text>
                </Row>
            )
        }

    }
}
export default ActiveListItem;


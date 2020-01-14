import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from "react-native";
import * as firebase from 'firebase'
import PTRView from 'react-native-pull-to-refresh';

import ActiveListItem from './ActiveListItem'

import * as con from '../../constants'


class ActiveList extends Component {

    constructor(props) {
        super(props);

        //let ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 != r2})

        const today = new Date();
        const year = today.getFullYear();      // 1980
        const month = today.getMonth() + 1;        // 6
        const date = today.getDate();          // 31
        const todayDate = `${month}/${date}/${year}`


        this.state = {
            //dataSource: ds,
            data: [],
            date: todayDate
        }

        this.getList = this.getList.bind(this)

        //this.componentDidMount = this.componentDidMount.bind(this)
    }


    // state = {
    //     data: []
    // }

    getList = () => {

        const today = new Date();
        const year = today.getFullYear();      // 1980
        const month = today.getMonth() + 1;        // 6
        const date = today.getDate();          // 31
        const todayDate = `${month}/${date}/${year}`


        const that = this
        const { email, displayName, uid } = firebase.auth().currentUser;
        var activeList = []

        const db = firebase.database().ref(`/${uid}/active`).orderByChild('status')

        db.once('value')
            .then(function (snapshots) {
                snapshots.forEach(function (data) {

                    const eventId = data.key
                    const eventTitle = data.val().eventTitle
                    const status = data.val().status
                    const addDate = data.val().date

                    const record = {
                        eventId,
                        status,
                        addDate,
                        eventTitle
                    }
                    activeList.push(record)
                    //console.log(activeList)
                })

                that.setState({ data: activeList })
            })

    }


    componentDidMount() {

        console.log(this.state.date)

        this.getList()

        var that = this
        const today = new Date();
        const year = today.getFullYear();      // 1980
        const month = today.getMonth() + 1;        // 6
        const date = today.getDate();          // 31
        const todayDate = `${month}/${date}/${year}`

        const { email, displayName, uid } = firebase.auth().currentUser;
        const db = firebase.database().ref(`/${uid}/active`).orderByChild('status')

        db.on('child_added', function (data) {

            var newlist = that.state.data

            const eventId = data.key
            const eventTitle = data.val().eventTitle
            const status = data.val().status
            const addDate = data.val().date

            const record = {
                eventId,
                status,
                addDate,
                eventTitle
            }

            newlist.push(record)

            that.setState({ data: newlist })

        })

        db.on('child_changed', function (data) {
            var oldlist = that.state.data

            var newlist = oldlist.filter(el => el.eventId !== data.key);

            const eventId = data.key
            const eventTitle = data.val().eventTitle
            const status = data.val().status
            const addDate = data.val().date

            const record = {
                eventId,
                status,
                addDate,
                eventTitle
            }

            newlist.push(record)

            that.setState({ data: newlist })

        })

        db.on('child_removed', function (data) {
            var oldlist = that.state.data

            var newlist = oldlist.filter(el => el.eventId !== data.key);

            that.setState({ data: newlist })
        })



    }

    items = [
        { eventId: 1, eventTitle: "THIS" },
        { eventId: 2, eventTitle: "IS" },
        { eventId: 3, eventTitle: "A" },
        { eventId: 4, eventTitle: "TEST" },
    ]


    render() {
        if (this.state.data.length == 0) {
            return (
                <View>
                    <Text style={styles.emptyListText}>Click the ‘+’ button at the bottom of the screen to add a new activity</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <FlatList
                        data={this.state.data}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <ActiveListItem
                                title={item.eventTitle}
                                status={item.status}
                                id={item.eventId}
                                date={item.addDate}
                                today={this.state.date}
                            />
                        }
                        keyExtractor={(item) => item.eventId}
                    />
                </View>
            );
        }
    }
}
export default ActiveList;

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        //backgroundColor: 'salmon',
        //alignItems: 'center',
        //justifyContent: 'center'
    },
    emptyListText: {
        marginHorizontal: 20,
        fontFamily: con.text.alt,
        fontSize: 20,
        color: con.colors.grey
    }
});
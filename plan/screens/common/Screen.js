import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from "react-native";

import Header from './Header'
import * as con from '../constants'

const Screen = (props) => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Header {... props} />
            <View style={styles.contentView}>
                {props.children}
            </View>
        </ScrollView>
    )
}

export default Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: con.colors.light.background,
    },
    contentView: {
        //backgroundColor: 'salmon',
        paddingTop: 25,
        height: '100%',
        marginBottom: 20
    }
});
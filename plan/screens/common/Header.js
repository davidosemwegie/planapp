import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform,
    StatusBar,
    TouchableOpacity
} from "react-native";

// import PageTitle from './PageTitle'
// import HedaerIcon from './HeaderIcon'
import * as con from '../constants'
import HeaderIcon from "./HeaderIcon";

const Header = (props) => {

    componentDidMount = () => {
        this.headerHeight = 100

        if (Platform.OS == 'android') {
            this.headerHeight = 100 + StatusBar.currentHeight
        }
    };

    const { container, subTitle, headerMain, title,
        iconContainer } = styles
    return (
        <View style={container}>
            <View style={headerMain}>
                <Text style={title}>{props.title}</Text>
                <Text style={subTitle}>{props.subText}</Text>
            </View>
            <View style={iconContainer}>
                <HeaderIcon  {...props} />
            </View>
        </View>
    )
}
export default Header;

const styles = StyleSheet.create({
    container: {
        height: 120,
        backgroundColor: con.colors.light.background,
        flexDirection: 'row',
        marginHorizontal: 20
    },
    headerMain: {
        flex: 5,
        flexDirection: "column",
        justifyContent: 'flex-end',
        //marginHorizontal: 20,
        //backgroundColor: "salmon"
    },
    iconContainer: {
        flex: 1,
        //backgroundColor: "pink",
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        marginTop: 65,
        fontSize: 40,
        fontFamily: con.text.base,
        fontWeight: '100',
        color: con.colors.light.tex
    },
    subTitle: {
        fontFamily: con.text.alt,
        fontSize: 25,
        color: con.colors.grey,
        marginTop: 10,
        //marginLeft: 20
    }
})
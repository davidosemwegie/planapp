import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput
} from "react-native";

import * as con from '../constants'

const AuthField = (props) => {

    const { container, title, textInputContainer } = styles

    return (
        <View style={container}>
            <Text allowFontScaling={false} style={title}>{props.title}</Text>
            <View style={textInputContainer}>
                <TextInput style={{flex: 1}}
                    // onChangeText={}
                    autoCapitalize="none"
                    maxLength={30}
                    fontSize={15}
                    {...props} />
            </View>
        </View>
    )
}
export default AuthField;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
        //marginVertical: 7.5,
        //backgroundColor: "salmon"
    },
    title: {
        fontFamily: 'sf-rounded-semibold',
        color: con.colors.Text,
        fontSize: 19,
        marginBottom: 5,
        marginTop: 20
    },
    textInputContainer: {
        marginTop: 15,
        backgroundColor: con.colors.grey,
        height: 50,
        borderRadius: 20,
        flexDirection: "row",
        paddingHorizontal: 10,
        fontFamily: "sf-rounded-semibold",
        fontSize: 18
    },
});
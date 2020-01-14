import React from "react";
import {
    View,
    Text,
    StyleSheet, 
    TouchableOpacity
} from "react-native";

import * as con from '../constants'

const Button = (props) => {
    return (
        <TouchableOpacity
            style={{
                height: 45,
                //width: 120,
                paddingHorizontal: 10,
                alignSelf: "center",
                backgroundColor: `${props.buttonColor}`,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: 'center',
                marginVertical: 20
            }}
            onPress={props.onPress}>
            <Text
                allowFontScaling={false}
                style={{
                    fontFamily: "sf-rounded-heavy",
                    fontSize: 20,
                    fontWeight: '900',
                    color: con.colors.light.text
                }}
            >{props.title}</Text>
        </TouchableOpacity>
    )
}
export default Button;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    }
});
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { Ionicons, Feather } from '@expo/vector-icons';
import * as con from '../constants'

const HeaderIcon = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.headerIconPress}>
                <Ionicons name={props.headerIcon} size={35} color={con.colors.grey} />
            </TouchableOpacity>
        </View>
    )
}
export default HeaderIcon;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        bottom: 0,
        position: 'absolute'
    }
});
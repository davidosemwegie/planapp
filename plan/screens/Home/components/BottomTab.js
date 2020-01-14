import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from "react-native";
import { Feather } from '@expo/vector-icons';
import * as con from '../../constants'

const BottomTab = (props) => {
    return(
    <View style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer} onPress={props.addButton}>
            <Feather name="plus" size={40} color={con.colors.grey} />
        </TouchableOpacity>
    </View>
    )
    }
export default BottomTab;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        //backgroundColor: 'pink',
        width: Dimensions.get('screen').width,
        backgroundColor: con.colors.light.background,
        //backgroundColor: 'pink',
        height: 80
    },
    buttonContainer: {
        backgroundColor: con.colors.light.backgroundColor,
        alignSelf: "center",
        paddingTop: 5,
        justifyContent: "center",
        alignItems: "center", 
    }
});
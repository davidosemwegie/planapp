import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

const ContentView = (props) => {
    return(
    <View style={styles.container}>
        <Text>{props.children}</Text>
    </View>
    )
    }
export default ContentView;

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        //backgroundColor: "pink",
        paddingTop: 15,
        //marginHorizontal: 20
        //backgroundColor: 'salmon',
        // alignItems: 'center',
        // justifyContent: 'center'
    }
});
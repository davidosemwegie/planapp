import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    ActivityIndicator
} from "react-native";

class Loader extends Component {

    // componentDidMount() {
    //     this.props.navigation.navigate("Home")
    // }

    render() {
        const {
            loading,
            ...attributes
        } = this.props;

        return (
            <Modal
                transparent={true}
                animationType={'none'}
                visible={loading}
                onRequestClose={() => { console.log('close modal') }}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator
                            animating={loading}
                            size="large" />
                    </View>
                </View>
            </Modal>
        )
    }
}



// const Loader = (props) => {
//     const {
//         loading,
//         ...attributes
//     } = props;

//     return (
//         <Modal
//             transparent={true}
//             animationType={'none'}
//             visible={loading}
//             onRequestClose={() => { console.log('close modal') }}>
//             <View style={styles.modalBackground}>
//                 <View style={styles.activityIndicatorWrapper}>
//                     <ActivityIndicator
//                         animating={loading}
//                         size="large" />
//                 </View>
//             </View>
//         </Modal>
//     )
// }
export default Loader;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});
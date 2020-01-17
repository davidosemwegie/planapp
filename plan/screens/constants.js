/* FILE THAT DETERMINES THE COLORS OF THE PAGE */
//import { AppThemeState } from 'react-native'
// import {AsyncStorage} from 'react-native';

// var isDarkMode = AppThemeState.currentTheme ;

// console.log(isDarkMode);

// if (isDarkMode) {
//     module.exports = {
//         colors: {
//             grey: '#DBDBDB',
//             background: '#ffffff',
//             text: '#000000'
//         },
//         text: {
//             base: 'sf-rounded-heavy',
//             alt: 'sf-rounded-semibold'
//         }
//     }
// } else {
//     module.exports = {
//         colors: {
//             grey: '#DBDBDB',
//             background: '#ffffff',
//             text: '#000000'
//         },
//         text: {
//             base: 'sf-rounded-heavy',
//             alt: 'sf-rounded-semibold'
//         }
//     }
// }

module.exports = {
    colors: {
        light : {
            background: "#ffffff",
            text: "#000000"
        },
        dark: {
            text: "#ffffff",
            background: "#000000"
        },
        grey: '#DBDBDB',
        red: "#D33632",
        green: '#59C8A7',
        white: '#ffffff',
        blue: '#318FEB'
    },
    text: {
        base: 'sf-rounded-heavy',
        alt: 'sf-rounded-semibold'
    }
}
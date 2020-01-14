/* FILE THAT DETERMINES THE COLORS OF THE PAGE */

/* DARK MODE TOGGLE */

import {AsyncStorage} from 'react-native';

darkmode = 0

function light () {

    darkmode = 0 

    console.log("Lightmode function has been called ")
}

function dark () {

    darkmode = 1;

    console.log("Darkmode function has been called ")
}

if (darkmode == 0) {
    module.exports = {
        background : "#FFFFFF",
        text : "#000000",
        darkmode : 0,
        TOGGLE: dark
    }
} else if (darkmode == 1) {
    module.exports = {
        background : "#000000",
        text : "#FFFFFF",
        darkmode : 1,
        TOGGLE: light
    }
}

module.exports = {
    background : "#F4F4F4",
    mainText: "#000000",
    lightgrey: "#E8E8E8",
    darkgrey: "#989494",
    icons: "#FFFFFF",
    status: {
        good: "#2ecc71",
        warning: '#f1c40f',
        bad: '#c0392b',
        incomplete: '#ffffff'
    },
    text: {
        light: "#ffffff",
        dark: "#3E3E3E",
        black: "#000000"
    },
    addbutton: "#000000",
    red: '#D13D33'
}
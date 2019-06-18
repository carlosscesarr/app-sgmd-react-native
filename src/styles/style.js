const React = require("react-native");

const { StyleSheet } = React;

export default {

    loginScreenContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifycontent: 'center',
        alignitems: 'center'
    },
    imageLogo: {

    },
    logoText: {
        fontFamily: 'karla',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 0,
        color: '#008C31',
        textAlign: 'center',
    },
    textDescriptionApp: {
        fontSize: 12, fontFamily: 'karla',
        color: '#1D1A2F', opacity: 0.8,
        fontWeight: 'normal', textAlign: 'justify', 
        lineHeight: 17, marginTop: 9,
    },
    loginFormView: {
        flex: 1,
    },
    loginFormTextInput: {
        height: 45,
        fontSize: 14,
        paddingHorizontal: 13,
        borderRadius: 8,
        borderWidth: 1,
        marginTop: 10,
        borderColor: 'rgba(0,0,0,0.4)',
        /*
        shadowColor: '#000',
        borderColor: '#76AB88', 
        borderBottomWidth: 0,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,  
        shadowOpacity: 0.3,*/
    },
    loginButton: {
        backgroundColor: '#183785',
        borderRadius: 5,
        height: 45,
        marginTop: 15,
    },
    registerButton: {
        backgroundColor: '#219A4B',
        borderRadius: 5,
        height: 45,
        marginTop: 15,
    },

};
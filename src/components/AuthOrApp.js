import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthOrApp extends Component {

    componentDidMount = async () => {
        const json = await AsyncStorage.getItem('@userLogged');
        const userInfo = JSON.parse(json) || {};
 
        if (userInfo) {
            this.props.navigation.navigate('Courses',userInfo );
        } else {
            this.props.navigation.navigate('Login');
        }
    }
    render() { 
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' />
            </View>
        )    
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
        }
    }
)


import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native'; 
import {Icon, Container, Body, Header, Content, Left, Title, Right } from 'native-base';

export default class Resources extends Component {
    static navigationOptions = {
          title: 'Recursos',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
      };

    render() {
        return (
            <Container> 
                <Header style={{backgroundColor: '#00a54e',flexDirection: 'row', justifyContent: 'flex-start', padding: 0,}}>
                    <Left>
                        <Icon style={{color: 'white'}} name="menu"
                            onPress={() => this.props.navigation.openDrawer()} />                            
                    </Left>
                    <Body>
                        <Title>Recursos</Title>
                    </Body>
                    <Right />
                </Header> 
                <Content contentContainerStyle={{
                    flex: 1, alignItems: 'center',
                    justifyContent: 'center'}}
                    >
                    <View>
                        <StatusBar backgroundColor="#006400" barStyle="light-content" />
                    </View>
                    <Text>Recursos screen</Text>        

                </Content>
            </Container>
        ); 
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

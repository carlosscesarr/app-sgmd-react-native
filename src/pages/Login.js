import React, { Component } from "react";
import styles from "../styles/style";
import { Text, View, ScrollView, StatusBar, StyleSheet, Alert } from 'react-native';
import { Button, Image } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Content } from 'native-base';
import TextInputMask from 'react-native-text-input-mask';
import moment from 'moment'
import api from '../services/api';

export default class Login extends Component {

    state = {
        textCpf: '05622978394', textBirthDate: '04/08/1995', disableLogin: true,  
    }

    userInfo = { id: 1, name: 'Carlos César', idade: 23, profissao: 'Programador' }

    captureCpf = (textWithMask, textWithoutMask ) => {
        this.setState({ textCpf: textWithoutMask }, this.checkForm)
    }
    captureBirthDate = (textWithMask, textWithoutMask )=> {
        this.setState({ textBirthDate: textWithMask }, this.checkForm)
    }
    componentDidMount = async () => {
        await this.checkForm(); 
        
    }

    onLoginPress = async () => {
        /**let params = new URLSearchParams();
        params.append('email', this.email );
        params.append('url', userInfo.url ); */
        try {
            const {data} = await api.post('/users/login', {
                cpf: this.state.textCpf,
                birthDate: this.state.textBirthDate
            });
            console.log(data);
            
        } catch (error) {
            
        }
    }

    checkForm = () => { 
        if (this.state.textBirthDate.length == 10 && this.state.textCpf.length == 11) {
            let countErrors = 0;
            if (!moment(this.state.textBirthDate, 'DD/MM/YYYY').isValid()) {
                countErrors++;
            }
            this.setState({disableLogin: (countErrors > 0) ? true : false});           
        }
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={stylesLogin.content}>
                    <View> 
                        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
                    </View>
                    <View style={{ flex: 1, marginTop: 15 }}>
                        <ScrollView>
                            <Image source={require('../assets/images/ufpi.jpg')}
                                style={stylesLogin.logoImage} />
                            <View>
                                <View>
                                    <Text style={styles.logoText}>Bem vindo ao SGMD</Text>
                                    <Text style={styles.textDescriptionApp}>
                                        Uma ferramenta acadêmica para o compartilhamento de materiais
                                        didáticos de professor para aluno.
                                    </Text>
                                </View>
                                <View style={styles.loginFormView}>
                                    <View>
                                        <TextInputMask
                                            placeholder='CPF' keyboardType='numeric' placeholderColor="#c4c3cb"
                                            refInput={ref => { this.cpf = ref }} style={styles.loginFormTextInput}
                                            onChangeText={this.captureCpf} value={this.state.textCpf}
                                            mask={'[000].[000].[000]-[00]'} />

                                        <TextInputMask
                                            placeholder='Data de nascimento' keyboardType='numeric' placeholderColor="#c4c3cb"
                                            refInput={ref => { this.birthDate = ref }} style={styles.loginFormTextInput}
                                            onChangeText={this.captureBirthDate} value={this.state.textBirthDate}
                                            mask={'[00]/[00]/[0000]'} />
                                    </View>
                                    <Button
                                        disabled={this.state.disableLogin}
                                        buttonStyle={styles.loginButton}
                                        onPress={this.onLoginPress}
                                        title="Entrar"/>
                                    <Button
                                        buttonStyle={styles.registerButton}
                                        onPress={() => this.props.navigation.navigate('Register')}
                                        title="Cadastrar" />
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <View styles={stylesLogin.containerPoweredText}>
                        <Text style={stylesLogin.poweredText}>Powered by César Lima</Text>
                    </View>
                </Content>
            </Container >
        );
    }
}

const stylesLogin = StyleSheet.create(
    {
        header: {
            elevation: 0,
            borderWidth: 0,
            borderBottomWidth: 0,
            backgroundColor: '#ffffff',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            padding: 0,
        },
        content: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 23
        },
        logoImage: {
            marginTop: 0, width: 180, height: 180, alignSelf: 'center'
        },
        containerPoweredText: {
            flex: 1,
            justifyContent: 'flex-end',
        },
        poweredText: {
            fontSize: 10,
            alignSelf: 'center',
            marginBottom: 2,
        }
    })
/* Template for header page
<Header style={stylesLogin.header}>
    <Left>
        <Icon style={{ color: 'black' }} name="arrow-left"
            onPress={() => this.props.navigation.openDrawer()} />
    </Left>
    <Body>
        <Title>Cursos</Title>
    </Body>
    <Right />
</Header>*/
import React, { Component} from 'react';
import { StatusBar, View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Container, Content, Body, Header, Left, Right } from 'native-base';
import { Button, Icon } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/FontAwesome';
import TextInputMask from 'react-native-text-input-mask';  

export default class Register extends Component {
    state = {
        form: {completeName: '', cpf: '', birthDate: '', 
        email: '', phone:'', sex: '', numberRegistration: ''},
        disabledButton: true,
    }

    captureCompleteName = text => {
        const formState = this.state.form;
        this.setState({form: {...formState, completeName: text}}, this.validateForm);
    }
    captureCpf = text => {
        const formState = this.state.form;
        this.setState({form: {...formState, cpf: text}}, this.validateForm);
    }
    captureBirthDate = text => {
        const formState = this.state.form;
        this.setState({form: {...formState, birthDate: text}}, this.validateForm);
    }
    captureEmail = text => {
        const formState = this.state.form;
        this.setState({form: {...formState, email: text}}, this.validateForm);
    }
    captureNumberRegistration = text => {
        const formState = this.state.form;
        this.setState({form: {...formState, numberRegistration: text}}, this.validateForm);
    }
    capturePhone = text => {
        const formState = this.state.form;
        this.setState({form: {...formState, phone: text}}, this.validateForm);
    }

    validateForm = () => {
        const form  = this.state.form;   
        var formValid = false;
       
        this.setState({disabledButton: formValid});
    } 

    componentDidMount = () => {

    }

    render() {
        return ( 
            <Container> 
                <Header style={styles.header}>
                    <Left>
                        <Icon name="arrow-back" size={27} onPress={() => this.props.navigation.navigate('Login')} />
                    </Left>
                    <Right />
                </Header>
                <Content style={styles.content}>
                    <View>
                        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
                    </View>
                    <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.titleTop}>Cadastre-se e fique por dentro de todo conteúdo 
                            utilizado em sala de aula.
                        </Text>
                    </View>
                    <View style={styles.form}>
                        <TextInputMask  
                            placeholder='Nome completo'
                            refInput={ref => { this.input = ref }} style={styles.textInput} 
                            onChangeText={this.captureCompleteName} value={this.state.form.completeName}/>

                        <TextInputMask  
                            placeholder='CPF' mask={'[000].[000].[000]-[00]'} keyboardType='numeric'
                            refInput={ref => { this.cpf = ref }} style={styles.textInput} 
                            onChangeText={this.captureCpf} value={this.state.form.cpf}/>

                        <TextInputMask  
                            placeholder='Data de nascimento' keyboardType='numeric'
                            refInput={ref => { this.input = ref }} style={styles.textInput} 
                            onChangeText={this.captureBirthDate} value={this.state.form.birthDate}
                            mask={'[00]/[00]/[0000]'} />

                        <TextInputMask  
                            type={'email'}
                            placeholder='Email' keyboardType='email-address'
                            refInput={ref => { this.input = ref }} style={styles.textInput} 
                            onChangeText={this.captureEmail} value={this.state.form.email} />

                        <TextInputMask  
                            type={'numeric'}
                            placeholder='Matrícula' keyboardType='numeric'
                            refInput={ref => { this.numberRegistration = ref }} style={styles.textInput} 
                            onChangeText={this.captureNumberRegistration} value={this.state.form.numberRegistration} />

                        <TextInputMask   
                            type={'numeric'} mask={'([00]) [0].[9999]-[0000]}'}
                            placeholder='Celular' keyboardType='numeric'
                            refInput={ref => { this.phone = ref }} style={styles.textInput} 
                            onChangeText={this.capturePhone} value={this.state.form.phone} />

                    </View>  
                    
                    <View style={{marginTop: 15}}>
                        <Button style={{borderRadius: 5, width: 40}} disabled={this.state.disabledButton} title='Cadastrar'
                            onPress={() => {}} />
                    </View>
                </Content>
                    <View styles={styles.containerPoweredText}>
                        <Text style={styles.poweredText}>Powered by César Lima</Text>
                    </View>
            </Container >
        );
    }    
}

const styles = StyleSheet.create(
    {
    content: {
        flex: 1, 
        paddingHorizontal: 23
    },
    header: {
        elevation: 0,
        borderWidth: 0,
        borderBottomWidth: 0,
        backgroundColor: 'transparent', 
        padding: 0,
    },
    poweredText: {
        fontSize: 10,
        alignSelf: 'center',
        marginBottom: 0,
    },
    containerIconBack: {

    },
    titleTop: {
        fontFamily: 'Karla',
        fontSize: 25,
        color: '#1E8235',
    },
    form: {
        marginTop: 14,
    },
    textInput: {
        height: 45,
        fontSize: 14,
        paddingHorizontal: 13,
        borderRadius: 8,
        borderBottomWidth: 0,
        borderColor: '#76AB88', 
        marginTop: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,  
        elevation: 1
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
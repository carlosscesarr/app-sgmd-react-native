
import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList, ScrollView } from 'react-native'; 
import { Container, Content } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/api';

export default class Resources extends Component {
    static navigationOptions = ({ navigations }) => {
        return {
            title: 'Recursos',
            headerStyle: {
                backgroundColor: '#00a54e',
            },
            headerTitle: (
                <View>
                    <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 17 }}>Recursos</Text>
                    <Text style={{ color: '#fff', fontSize: 10 }}>Módulo IV</Text>
                </View>
            ),
            headerRight: <Icon name='home' size={23} style={{color: '#fff', marginRight: 15}}/>,
            headerTintColor: '#fff',
        };
    }

    state = {
        disciplineId: this.props.navigation.getParam('disciplineId'),
        resources: []
    }

    renderResources = ({item}) => (
        <TouchableOpacity style={styles.resourcesContainer} >
            <Text style={styles.textList}>{item.nome}</Text>
            <Icon name='chevron-right' size={23}/>
        </TouchableOpacity>
    )

    loggerUser = async () => {
        const userInfo = await AsyncStorage.getItem('@userLogged');
        if (userInfo) {
            const userLogged = JSON.parse(userInfo);
            this.setState({userLogged});
        }
    }
    getAllResourcesByDiscipline = async () => {
        let disciplineId = this.state.disciplineId;
        try {
            const response = await api.get(`/resources/discipline/${disciplineId}`);
            if (response.data.success) {
                if (response.data.rows > 0 ) {
                    const resources = response.data.data.resources;
                    console.log(resources);
                    this.setState({resources});
                } else {
                    alert('Esta disciplina não possui recursos disponíveis');
                    this.props.navigation.goBack();
                }
            } else {
                alert('Erro ao buscar os recursos dessa disciplina');
                this.props.navigation.goBack();
            }
        } catch (error) {
            console.log(error);
        }
    }
    componentDidMount = async () => {
        this.loggerUser();
        this.getAllResourcesByDiscipline();
    }

    render() {
        return (
            <Container> 
                <Content contentContainerStyle={{flex: 1}}>
                    <View>
                        <StatusBar backgroundColor="#006400" barStyle="light-content" />
                    </View>
                    <ScrollView style={styles.containerList}>
                        <FlatList data={this.state.resources} keyExtractor={(item, index) =>  `${item.id}`}
                        renderItem={this.renderResources}/>
                    </ScrollView>
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
    resourcesContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
        padding: 15,
        borderWidth: 1,
        borderColor: "#DDD", 
        marginBottom: 10,
    },
    containerList: {
        padding: 20,
    },
    textList: {
        fontFamily: 'karla',
        fontSize: 15,
        flex: 1,  
    }
});

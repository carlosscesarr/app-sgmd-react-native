import React, { Component } from 'react';
import { View, ScrollView, FlatList, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Content } from 'native-base';
import api from '../services/api';
import { ScrollView } from 'react-native-gesture-handler';


export default class DownloadHistory extends Component
{
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: (
                <View>
                    <Text>Histórico de downloads</Text>
                </View>
            ),
            headerStyle: {
                backgroundColor: '#00a54e',
            },
            headerRight: (
                <Icon name='home' size={23} onPress={() => {}} />
            ),
            headerTintColor: '#fff',
            headerTitleStle: {
                fontWeight: 'bold',
            },
        }
    };

    state = {
        downloadHistory = [],
        userLogged: null,
        loading: false,
    }

    getDownloads = async () => {
        const userId = 2;

        try {
            const response = await api.get(`/users/downloads/${userId}`);
            console.log(response);
            if (response.data.success) {
                const downloadHistory = response.data.data.downloads;
                console.log('Histórico de downloas');
                console.log(downloadHistory);
                this.setState({downloadHistory});
            }
        } catch (error) {
            console.log('Erro na requisição de busca de downloads' + error);
        }
    }
    renderDownloadHistory = ({item}) => {
        <TouchableOpacity onPress={() => {}}>
            <Text>{item.nome_recurso}</Text>
            <Text>{item.disciplina}</Text>
            <Text>{item.str_data_down}</Text>
        </TouchableOpacity>
    }

    componentDidMount = async () => {
        this.getDownloads();
    }

    render() {
        return (
            <Container>
                <Content>
                    <View>
                        <StatusBar backgroundColor='#006400' barStyle='light-content'/>
                    </View>
                    <ScrollView>
                        <FlatList 
                            data={this.state.downloadHistory}
                            keyExtractor={(item, index) => `${item.id}`}
                            renderItem={this.renderDownloadHistory}
                        />
                    </ScrollView>
                </Content>
            </Container>
        )
    }
}
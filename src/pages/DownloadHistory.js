import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Body, Header, Content, Left, Title, Right } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

export default class DownloadHistory extends Component
{
    static navigationOptions = {
        title: 'Histórico de downloads',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    state = { 
        downloadHistory: [], 
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
                this.setState({downloadHistory});
                console.log('state');
                console.log(this.state.downloadHistory);
            }
        } catch (error) {
            console.log('Erro na requisição de busca de downloads' + error);
        }
    }
    renderDownloadHistory = ({item}) => (
        <TouchableOpacity style={styles.downloadsHistorysContainer} onPress={() => {}}>
            <Text style={styles.textList}>{item.nome_recurso}</Text>
            <Text style={styles.textList}>{item.disciplina}</Text>
            <Text style={styles.textList}>{item.str_data_down}</Text>
        </TouchableOpacity>
    )

    componentDidMount = async () => {
        this.getDownloads();
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: '#00a54e', flexDirection: 'row', justifyContent: 'flex-start', padding: 0, }}>
                    <Left>
                        <Icon style={{ color: 'white' }} name="menu" size={23}
                            onPress={() => this.props.navigation.openDrawer()} />
                    </Left>
                    <Body>
                        <Title>Histórico de downloads</Title>
                    </Body>
                    <Right />
                </Header>
                <Content contentContainerStyle={{flex: 1 }}>
                    <View>
                        <StatusBar backgroundColor="#006400" barStyle="light-content" />
                    </View>
                    <ScrollView style={styles.containerFlat}>
                        <FlatList 
                            contentContainerStyle={styles.listDownloadHistory}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    containerFlat: {
        flex: 1,
        backgroundColor: "#fafafa",
    },
    listDownloadHistory: {
        padding: 20,
    },
    downloadHistoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#DDD", 
        borderRadius: 5,
        padding: 15,
        marginBottom: 10,
    },
    textList: {
        fontFamily: 'karla',
        fontSize: 15,
        flex: 1,  
    }
});

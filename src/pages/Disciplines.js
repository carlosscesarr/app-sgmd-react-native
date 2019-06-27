
import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import { Container, Content } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';

export default class Disciplines extends Component {
    static navigationOptions = ({ navigations }) => {
        return {
            title: 'Disciplinas',
            headerStyle: {
                backgroundColor: '#00a54e',
            },
            headerTitle: (
                <View>
                    <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 17 }}>Disciplinas</Text>
                    <Text style={{ color: '#fff', fontSize: 10 }}>Módulo IV</Text>
                </View>
            ),
            headerRight: <Icon name='home' size={23} style={{color: '#fff', marginRight: 15}}/>,
            headerTintColor: '#fff',
        };
    }
    state = {
        userLogged: [],
        moduleId: this.props.navigation.getParam('moduleId'),
        disciplines: [],
    }
    
    loggerUser = async () => {
        try {
            const userloggedStorage = await AsyncStorage.getItem('@userLogged');
            const userLogged = JSON.parse(userloggedStorage);
            this.setState({userLogged});
        } catch (error) {
            console.log(error);
        }
    }

    getDisciplinesByModule = async () => {
        const moduleId = this.state.moduleId;
        try {
            const response = await api.get(`/disciplines/module/${moduleId}`);
            if (response.data.success) {
                const disciplines = response.data.data.disciplines;
                if (disciplines) {
                    this.setState({disciplines});
                }
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount = async () => {
        this.loggerUser();
        this.getDisciplinesByModule();
    }

    renderDisciplines = ({item}) => (
        <TouchableOpacity style={styles.disciplinesContainer} 
            onPress={() => this.props.navigation.navigate('Resources', {disciplineId: item.id})}>
            <Text>{item.nome}</Text>
            <Icon name='chevron-right' size={23}/>
        </TouchableOpacity>
    )

    render() {
        return (
            <Container >
                <Content contentContainerStyle={{ flex: 1 }}>
                    <View>
                        <StatusBar backgroundColor="#006400" barStyle="light-content" />
                    </View>
                    <View style={styles.containerList}>
                        <FlatList 
                            data={this.state.disciplines}
                            keyExtractor={(item, index) => `${item.id}`}
                            renderItem={this.renderDisciplines}
                        />
                    </View>
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
    disciplinesContainer: {
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
        padding: 20
    }
});

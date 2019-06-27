
import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Content} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/api';

export default class Modules extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (
                <View>
                  <Text style={{fontSize: 17, color: 'white',fontWeight: 'bold'}}>Módulos</Text> 
                  <Text style={{fontSize: 10, color: 'white', }}>Tec. Informática</Text>
                </View>
              ),
            headerStyle: {
                backgroundColor: '#00a54e',
            },
            headerRight: (
                <Icon name='home' size={23} onPress={() => navigation.navigate('Courses') } 
                style={{color: '#fff', marginRight: 15}}/>
            ),
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    };

    state = {
        modules: [],
        courseId: this.props.navigation.getParam('courseId'),
        userLogged: null
    }

    loggerUser = async () => {
        const userInfo = await AsyncStorage.getItem('@userLogged');
        if (userInfo) {
            const userLogged = JSON.parse(userInfo);
            this.setState({userLogged});
        }
    }

    getAllModules = async () => {
        const courseId = this.state.courseId;
         
        try {
            const response = await api.get(`/modules/course/${courseId}`);
            console.log(response);
            if (response.data.success) {
                const modules = response.data.data.modules;
                console.log('Módulos');
                console.log(modules);
                this.setState({modules});
            }
        } catch (error) {
            console.log('Erro na requisição de busca aos cursos' + error);
        }
        
    }

    renderModules = ({item}) => ( 
        <TouchableOpacity style={styles.modulesContainer} 
            onPress={() => this.props.navigation.navigate('Disciplines', {moduleId: item.id})}>
            <Text style={styles.textList}>{item.nome}</Text>
            <Icon name='chevron-right' size={23}/> 
        </TouchableOpacity>
    )

    componentDidMount = async () => {
        this.loggerUser();
        this.getAllModules();
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1}}>
                    <View>
                        <StatusBar backgroundColor="#006400" barStyle="light-content" />
                    </View>
                    <ScrollView style={styles.containerList}>
                        <FlatList 
                            data={this.state.modules}
                            keyExtractor={(item, index) => `${item.id}`}
                            renderItem={this.renderModules}
                            />
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
    modulesContainer: {
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
    },
    textList: {
        fontFamily: 'karla',
        fontSize: 15,
        flex: 1,  
    }
});

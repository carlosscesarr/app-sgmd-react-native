
import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { Container, Body, Header, Content, Left, Title, Right } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/api';

export default class Courses extends Component {
    static navigationOptions = {
        title: 'Cursos',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    state = {
        courses: [],
    }

    loggerUser = async () => {
        try {
            const userInfo = await AsyncStorage.getItem('@userLogged');
            const user = JSON.parse(userInfo);
            //console.log(user);
        } catch (error) {
            console.log(error);
        }
    }

    renderCourses = ({item}) => (
        <TouchableOpacity style={styles.coursesContainer} 
            onPress={() => this.props.navigation.navigate('Modules', {courseId: item.id})}>
            <Text style={styles.textList}>{item.nome}</Text>
            <Icon name='chevron-right' size={23}/> 
        </TouchableOpacity>
    )

    getAllCourses = async () => {
        try {
            const response = await api.get('/courses/getAll');
            console.log(response);
            if (response.data.success) {
                const courses = response.data.data.courses;
                this.setState({courses});
            }
        } catch (error) {
            console.log('Erro na requisição de busca aos cursos' + error);
        }
        
    }

    componentDidMount = async () => {
        this.loggerUser();
        this.getAllCourses();
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
                        <Title>Cursos</Title>
                    </Body>
                    <Right />
                </Header>
                <Content contentContainerStyle={{flex: 1 }}>
                    <View>
                        <StatusBar backgroundColor="#006400" barStyle="light-content" />
                    </View>
                    <View style={styles.containerFlat}>
                        <FlatList 
                            contentContainerStyle={styles.listCourses}
                            data={this.state.courses}
                            keyExtractor={item => `${item.id}`}
                            renderItem={this.renderCourses}/>
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
    containerFlat: {
        flex: 1,
        backgroundColor: "#fafafa",
    },
    listCourses: {
        padding: 20,
    },
    coursesContainer: {
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
        fontSize: 15  
    }
});

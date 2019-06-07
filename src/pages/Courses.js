
import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { Container, Body, Header, Content, Left, Title, Right } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons'

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
        courses: [
            {id: 1, nome: 'Tec. Informática'}, {id: 2, nome: 'Tec. Agropecuária'},
            {id: 3, nome: 'Tec. Enfermagem'}, {id: 4, nome: 'Tec. Informática Picos'},
            {id: 5, nome: 'Pronatec Tec. Nutrição Picos'},
        ],
    }

    loggerUser = async () => {
        const userInfo = await AsyncStorage.getItem('@userLogged');
        const user = JSON.parse(userInfo);
        console.log(user);
    }

    renderCourses = ({item}) => (
        <TouchableOpacity style={styles.coursesContainer} 
            onPress={() => this.props.navigation.navigate('Modules', {courseId: item.id})}>
            <Text style={styles.textList}>{item.nome}</Text>
            <Icon name='chevron-right' size={23}/> 
        </TouchableOpacity>
    )

    componentDidMount = async () => {
        this.loggerUser();
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

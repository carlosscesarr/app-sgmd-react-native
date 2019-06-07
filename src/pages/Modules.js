
import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { Container, Content} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons'

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
        modules: [
            {id: 1, nome: 'Módulo I', curso_id: 1}, {id: 2, nome: 'Módulo II', curso_id: 2},
            {id: 3, nome: 'Módulo III', curso_id: 3}, {id: 4, nome: 'Módulo IV', curso_id: 4},
        ],
    }
    loggerUser = async () => {
        const userInfo = await AsyncStorage.getItem('@userLogged');
        const user = JSON.parse(userInfo);
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
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1}}>
                    <View>
                        <StatusBar backgroundColor="#006400" barStyle="light-content" />
                    </View>
                    <View style={styles.containerList}>
                        <FlatList 
                            data={this.state.modules}
                            keyExtractor={(item, index) => `${item.id}`}
                            renderItem={this.renderModules}/>
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
        fontFamily: 'Karla'
    }
});

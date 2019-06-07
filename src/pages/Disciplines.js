
import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import { Container, Content } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
            headerTintColor: '#fff'
        };
    }
    state = {
        disciplines: [
            {id: 1, nome: 'Lógica de Programação', modulo_id: 1}, {id: 2, nome: 'Análise de Sistemas', modulo_id: 2},
            {id: 3, nome: 'Rede de Computadores', modulo_id: 3}, {id: 4, nome: 'Empreendedorismo', modulo_id: 4},
        ],
    }

    renderDisciplines = ({item}) => (
        <TouchableOpacity style={styles.disciplinesContainer}>
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

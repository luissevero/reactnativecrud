import React, { useState, useContext } from 'react'
import {Text, TextInput, View, StyleSheet, ScrollView, Button} from 'react-native'
import UsersContext from '../context/UsersContext';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12
    },
    form: {
        padding: 12
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10
    }
})


export default ({route, navigation}) => {
    //console.warn(Object.keys(props.route.params))
    const[user, setUser] = useState(route.params ? route.params : {})
    const {dispatch} = useContext(UsersContext)
    return (
        
        <ScrollView style={styles.container}>
            <Text>{user.id}</Text>
            <Text>Nome</Text>
            <TextInput
                style={styles.input}
                onChangeText={name => setUser({...user, name})}
                placeholder="Informe o nome"
                value={user.name}
            />
            
            <Text>Email</Text>
            <TextInput
                style={styles.input}
                onChangeText={email => setUser({...user, email})}
                placeholder="Informe o email"
                value={user.email}
            />

            <Text>URL do Avatar</Text>
            <TextInput
                style={styles.input}
                onChangeText={avatarUrl => setUser({...user, avatarUrl})}
                placeholder="Informe a URL do avatar"
                value={user.avatarUrl}
            />
            <Button
                title="Salvar"
                onPress={() => {
                    dispatch({
                        type: user.id ? 'updateUser' : 'createUser',
                        payload: user
                    })
                    navigation.goBack()
                }}
            />
            
        </ScrollView>
    )
}
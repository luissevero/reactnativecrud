import React, {useContext} from 'react'
import {View, FlatList, Alert} from 'react-native'
import { ListItem, Icon, Button, Avatar } from 'react-native-elements'
import UsersContext from '../context/UsersContext';

export default props => {
    //console.warn(Object.keys(props))

    const {state, dispatch} = useContext(UsersContext)
    //console.warn(Object.keys(ctx.state))

    function confirmUserDeletion(user){
        Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
            {
                text: 'Sim',
                onPress(){
                    dispatch({
                        type: 'deleteUser',
                        payload: user
                    })
                }
            },
            {
                text: 'Não'
            }
        ])
    }
    function getActions(user) {
        return (
            <View style={{flexDirection: 'row'}}>
                <Button
                    onPress={() => props.navigation.navigate("UserForm", user)}
                    type="clear"
                    icon={<Icon name="edit" size={25} color='orange' />}
                />
                <Button
                    onPress={() => confirmUserDeletion(user)}
                    type="clear"
                    icon={<Icon name="delete" size={25} color='red' />}
                />
            </View>
        )
    }
    function getUserItem({item: user}) {
        return (
           <ListItem
                rightElement={getActions(user)}
                key={user.id}
                title={user.name}
                subtitle={user.email}
                bottomDivider
                onPress={() => props.navigation.navigate("UserForm", user)}
           >
                <Avatar title={user.name} source={{uri: user.avatarUrl}} />
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content right>{getActions(user)}</ListItem.Content>
           </ListItem>
        )
    }

    return (
        <View>
            <FlatList 
                data={state.users}
                keyExtractor={user => user.id.toString()}
                renderItem={getUserItem}
            />
        </View>
    )
}

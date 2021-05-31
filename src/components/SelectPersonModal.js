// Node Modules
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native'

// Local Modules
import { useUser } from '../Contexts'
import { getUsersByName } from '../api/userApi'
import { BoldText } from '../generic-styles'

const userImageBucketAdress = 'https://ieq-app-image-storage.s3-sa-east-1.amazonaws.com/users-profile-image/'

const SelectPersonModal = ({
    visible,
    onButtonClose,
    onPersonPress,
}) => {

    // Context
    const [user] = useUser()

    // States
    const [usersList, setUsersList] = useState([])

    // Funções......................................
    const searchUsers = async (text) => {
        // Verificar se o campo está vazio
        if (text == '') {
            return
        }
        // Fazer a requisição
        const usersSearchRequestResult = await getUsersByName(text, user.loggedToken)
        // Verificar se veio alguma coisa
        if (!usersSearchRequestResult) {
            alert('Não foi possível processar a requisição.')
            return
        }
        // Colocar resultado da requisição no usersList
        setUsersList(usersSearchRequestResult)
    }

    const handleCloseButtonPress = async () => {
        setUsersList([])
        onButtonClose()
    }

    const handlePersonPress = (item) => {
        setUsersList([])
        onPersonPress(item)
    }

    return (
        <AddPersonModalComponent
            visible={visible}
        >
            <AddPersonViewContainer>
                <AddPersonCard>

                    <BoldText>Buscar Usuários</BoldText>

                    <CloseModalButton onPress={handleCloseButtonPress}>
                        <Icon name='cancel' size={30} color='#000' />
                    </CloseModalButton>

                    {usersList && (
                        <>
                            <SearchPersonContainer>
                                <SearchPersonInput
                                    onChangeText={(t) => searchUsers(t)}
                                />
                                <Icon name='search' size={30} color='#000' />
                            </SearchPersonContainer>

                            <UsersListContainer
                                data={usersList}
                                keyExtractor={(user, index) => user.identificator}
                                renderItem={({ item }) =>
                                    <AddUserButton
                                        onPress={() => handlePersonPress(item)}
                                    >
                                        <UserPreviewContainer>
                                            <ImageUser
                                                source={{ uri: userImageBucketAdress + item.image }} />
                                            <NameUser>{item.name}</NameUser>
                                        </UserPreviewContainer>
                                    </AddUserButton>
                                }
                            />
                        </>
                    )}

                </AddPersonCard>
            </AddPersonViewContainer>
        </AddPersonModalComponent>
    )
}

const AddPersonModalComponent = styled.Modal.attrs({
    animationType: 'slide',
    transparent: true
})``;

const AddPersonViewContainer = styled.View`
    width: 100%;
    flex: 1;
    background-color: rgba(0,0,0, 0);
    justify-content: center;
    align-items: center;
`;

const AddPersonCard = styled.View`
    background-color: rgba(244, 240, 240, 0.98);
    width: 97%;
    height: 97%;
    border-radius: 10px;
    padding: 8px 5px;
`;

const CloseModalButton = styled.TouchableOpacity`
    align-items: flex-start;
    padding-bottom: 5px;
    position: absolute;
    right: 10px;
    top: 10px;
`;

const SearchPersonContainer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom-color: #000;
    border-bottom-width: 2px;
`;

const SearchPersonInput = styled.TextInput`
    font-size: 20px;
    padding-left: 10px;
    width: 92%;
`;

const UsersListContainer = styled.FlatList``;

const UserPreviewContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
`;

const ImageUser = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 5px;
`;

const NameUser = styled.Text`
    font-size: 18px;
    padding-left: 10px;
    flex: 1;
`;

const AddUserButton = styled.TouchableOpacity``;

export default SelectPersonModal;
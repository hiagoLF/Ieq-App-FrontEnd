// Node Modules
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

// Local Modules
import {
    eventRequest,
    confirmUserRequest
} from '../api/eventApi'
import { useUser } from '../Contexts'

const imageProfileAdres = 'https://ieq-app-image-storage.s3-sa-east-1.amazonaws.com/users-profile-image/'

const SubscriptionList = ({ eventId }) => {

    // Context...............................................................
    const [user, setUser] = useUser()

    // States.................................................................
    const [confirmedSubscribersList, setConfirmedSubscribers] = useState()
    const [unconfirmedSubscribersList, setUnconfirmedSubscribers] = useState()

    // Effects...................................................
    useEffect(() => {
        getSubscribers()
    }, [])

    // Function...................................................
    // Buscar Inscritos do evento.................................
    const getSubscribers = async () => {
        // Requisição para Buscar informações do evento
        const eventRequestResult = await eventRequest(eventId)
        // Verificar se recebeu
        if (!eventRequestResult) {
            alert('Não foi possível Buscar a lista de inscritos no evento')
            return
        }
        // Atualizar confirmedSubscribersList e unconfirmedSubscribersList
        setConfirmedSubscribers(eventRequestResult.confirmedSubscribers)
        setUnconfirmedSubscribers(eventRequestResult.unconfirmedSubscribers)
    }

    // Confirmar Usuário em um evento
    const handleConfirmUserOnEventButtonClick = async (userIdentificator) => {
        // Confirmar Inscrição do Usuário
        const confirmUserRequestResult = await confirmUserRequest(eventId, userIdentificator, user.loggedToken)
        // Verificar se Confirmou
        if(!confirmUserRequestResult){
            alert('Não foi possível confirmar este usuário no evento')
            return
        }
        // Atualizar Inscritos na página (getSubscribers)
        getSubscribers()
    }

    return (
        <SubscriptionListContainer>
            <TitleHeader>Inscrições</TitleHeader>

            <SubscribersContainer>
                <HeaderSubscribers>Confirmadas</HeaderSubscribers>
                <SubscribersFlatList
                    horizontal={true}
                    data={confirmedSubscribersList}
                    keyExtractor={(item) => item.identificator}
                    renderItem={({ item }) => (
                        <PersonSquare>
                            <PersonImage source={{ uri: imageProfileAdres + item.image }} />
                            <PersonName>{item.name}</PersonName>
                        </PersonSquare>
                    )}
                />
            </SubscribersContainer>

            <SubscribersContainer>
                <HeaderSubscribers>Não Confirmadas</HeaderSubscribers>
                <SubscribersFlatList
                    horizontal={true}
                    data={unconfirmedSubscribersList}
                    keyExtractor={(item) => item.identificator}
                    renderItem={({ item }) => (
                        <PersonSquare>
                            <PersonImage source={{ uri: imageProfileAdres + item.image }} />
                            <PersonName>{item.name}</PersonName>
                            <UserAuthorizationContainer>
                                <AuthorizationButton
                                    onPress={() => handleConfirmUserOnEventButtonClick(
                                        item.identificator
                                    )}
                                >
                                    <Icon name='check-circle' size={30} color='#18A900' />
                                </AuthorizationButton>
                                <AuthorizationButton
                                    onPress={null}
                                >
                                    <Icon name='cancel' size={30} color='#BE2626' />
                                </AuthorizationButton>
                            </UserAuthorizationContainer>
                        </PersonSquare>
                    )}
                />
            </SubscribersContainer>
        </SubscriptionListContainer>
    )
}

const SubscriptionListContainer = styled.View`
    width: 100%;
`;

const TitleHeader = styled.Text`
    font-size: 20px;
    font-weight: bold;
    width: 100%;
    text-align: center;
    border-bottom-color: #000;
    border-bottom-width: 1px;
    padding-bottom: 3px;
    margin-bottom: 5px;
`;

const SubscribersContainer = styled.View`
    width: 100%;
`;

const HeaderSubscribers = styled.Text`
    font-size: 18px;
    margin-bottom: 5px;
    margin-left: 10px;
`;

const SubscribersFlatList = styled.FlatList`
    margin: 10px 0 20px;
    padding-left: 10px;
`;

const PersonSquare = styled.View`
    width: 120px;
    border-radius: 5px;
    background-color: #C9DBB7;
    align-items: center;
    padding-bottom: 10px;
    margin-right: 5px;
`;

const PersonImage = styled.Image`
    width: 100%;
    height: 100px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;

const PersonName = styled.Text`
    font-size: 13px;
    text-align: center;
    padding: 5px;
`;

const UserAuthorizationContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 60%;
`;

const AuthorizationButton = styled.TouchableOpacity``;



export default SubscriptionList;
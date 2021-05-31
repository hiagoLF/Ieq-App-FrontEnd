import React from 'react';
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const SelectPrivilegeModal = ({
    onCloseButton = null,
    onPrivilegePress = null,
    visible = null
}) => {
    return (
        <PrivilegeModal
            visible={visible}
        >
            <ModalContainer>
                <ModalCard>

                    <CloseModalButton
                        onPress={onCloseButton}
                    >
                        <Icon name='cancel' size={25} color='#000' />
                    </CloseModalButton>

                    <TitleModal>Selecionar Privilégio</TitleModal>

                    <PrivilegesContainer>
                        <PrivilegeButton
                            onPress={() => onPrivilegePress(0)}
                        >
                            <PrivilegeText>Administrador</PrivilegeText>
                        </PrivilegeButton>

                        <PrivilegeButton
                            onPress={() => onPrivilegePress(1)}
                        >
                            <PrivilegeText>Líder</PrivilegeText>
                        </PrivilegeButton>

                        <PrivilegeButton
                            onPress={() => onPrivilegePress(2)}
                        >
                            <PrivilegeText>Membro</PrivilegeText>
                        </PrivilegeButton>

                        <PrivilegeButton
                            onPress={() => onPrivilegePress(3)}
                        >
                            <PrivilegeText>Não Autorizado</PrivilegeText>
                        </PrivilegeButton>
                    </PrivilegesContainer>

                </ModalCard>
            </ModalContainer>
        </PrivilegeModal>
    )
}

const PrivilegeModal = styled.Modal.attrs({
    transparent: true,
    animationType: 'slide'
})`
`;

const ModalContainer = styled.View`
    background-color: rgba(226, 240, 215, 0.65);
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const ModalCard = styled.View`
    justify-content: space-between;
    align-items: center;
    width: 80%;
    height: 312px;
    border-radius: 5px;
    background-color: #FFE9E9;
`;

const CloseModalButton = styled.TouchableOpacity`
    position: absolute;
    right: 10px;
    top: 10px;
`;

const TitleModal = styled.Text`
    font-weight: bold;
    font-size: 24px;
    margin-top: 10px;
`;

const PrivilegesContainer = styled.View`
    width: 90%;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`;

const PrivilegeButton = styled.TouchableOpacity`
    width: 90%;
    justify-content: center;
    align-items: center;
    background-color: #000;
    margin: 5px 0;
    padding: 10px;
    border-radius: 5px;
`;

const PrivilegeText = styled.Text`
    font-size: 24px;
    color: #fff;
`;


export default SelectPrivilegeModal;
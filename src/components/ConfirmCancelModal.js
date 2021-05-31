import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components/native'

const ConfirmCancelModal = ({
    text = 'Title',
    confirmButtonText = 'yes',
    cancelButtonText = 'cancel',
    onButtonConfirm = null,
    onButtonCancel = null,
    modalOpen,
    image = null
}) => {
    console.log(image)

    return (
        <ModalComponent
            visible={modalOpen}
            transparent={true}
            animationType='slide'
        >
            <ModalContainer>
                <ModalCard>
                    <CloseModalButton
                        onPress={onButtonCancel}
                    >
                        <Icon name='cancel' color='#000' size={30} />
                    </CloseModalButton>

                    <TitleModal>{text}</TitleModal>

                    {image && (
                        <ImagePreview
                            source={{ uri: image }}
                        />
                    )}

                    <ButtonsContainer>
                        <AgreeButton
                            onPress={onButtonConfirm}
                        >
                            <ButtonText>{confirmButtonText}</ButtonText>
                        </AgreeButton>
                        <CancelButton
                            onPress={onButtonCancel}
                        >
                            <ButtonText>{cancelButtonText}</ButtonText>
                        </CancelButton>
                    </ButtonsContainer>
                </ModalCard>
            </ModalContainer>
        </ModalComponent>
    )
}

const ModalComponent = styled.Modal``;

const ModalContainer = styled.View`
    justify-content: center;
    align-items: center;
	background-color: rgba(196,196,196,0.73);
    flex: 1;
`;

const ModalCard = styled.View`
    width: 90%;
    justify-content: center;
    align-items: center;
    background-color: #FFE9E9;
    border-radius: 5px;
    border: 1px solid #000;
`;

const CloseModalButton = styled.TouchableOpacity`
    right: 2px;
    top: 2px;
    width: 100%;
    align-items: flex-end;
`;

const TitleModal = styled.Text`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
    padding: 5px 10px;
`;

const ButtonsContainer = styled.View`
    width: 70%;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 15px 0;
`;

const AgreeButton = styled.TouchableOpacity`
    background-color: #44BE42;
    height: 36px;
    width: 120px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding: 30px 5px;
`;

const CancelButton = styled.TouchableOpacity`
    background-color: #A90C0C;
    height: 36px;
    width: 105px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding: 30px 5px;
`;

const ButtonText = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #FFF;
`;

export const ImagePreview = styled.Image`
    width: 150px;
    height: 150px;
    border-radius: 5px;
`;


export default ConfirmCancelModal;
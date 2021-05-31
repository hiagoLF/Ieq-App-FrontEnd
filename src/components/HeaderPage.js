import React from 'react';
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'


const HeaderPage = ({ text, onButtonBack }) => {
    return (
        <HeaderContainer>
            <ButtonBack
                onPress={onButtonBack}
            >
                <Icon name='arrow-back' size={35} color='#FFF' />
            </ButtonBack>
            <HeaderText>{text}</HeaderText>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.View`
    width: 100%;
    height: 58px;
    justify-content: center;
    align-items: center;
    background-color: #140F2F;
`;

const ButtonBack = styled.TouchableOpacity`
    position: absolute;
    left: 10px;
`;

const HeaderText = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #FFF;
`;


export default HeaderPage;
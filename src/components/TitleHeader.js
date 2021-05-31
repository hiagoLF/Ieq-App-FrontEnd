import React from 'react';
import { Touchable } from 'react-native';
import styled from 'styled-components'

// import { Container } from './styles';

const TitleHeader = ({
    text = 'Teste',
    onLongPress = null
}) => {
    return (
        <TouchableButton
            onLongPress={onLongPress}
        >
            <HeaderContainer>
                <TextHeader>{text}</TextHeader>
            </HeaderContainer>
        </TouchableButton>
    )
}

const TouchableButton = styled.TouchableWithoutFeedback``;

const HeaderContainer = styled.View`
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 45px;
    background-color: #8DBA60;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
`;

const TextHeader = styled.Text`
    font-size: 24px;
    font-weight: bold;
`;

export default TitleHeader;
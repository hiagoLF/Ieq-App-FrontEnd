import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components/native'
import { Linking } from 'react-native'

const LinkTo = ({ text, link, icon }) => {

    const handleLinkPress = async () => {
        await Linking.openURL(link)
    }

    return (
        <ButtonLinkTo onPress={handleLinkPress}>
            <LinkText>{text}</LinkText>
            <Icon name={icon} size={35} fill='#000' />
        </ButtonLinkTo>
    )
}

const ButtonLinkTo = styled.TouchableOpacity`
    width: 90%;
    height: 38px;
    border-radius: 50px;
    background-color: #DA89A4;
    justify-content: space-between;
    align-items: center;
    padding: 0 3%;
    flex-direction: row;
    border: 2px solid #000;
    margin: 5px 0;
`;

const LinkText = styled.Text`
    font-size: 20px;
`;

export default LinkTo;
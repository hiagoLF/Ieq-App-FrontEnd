import React from 'react';
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const FormalButton = ({ text, icon, onPress, loading }) => {
    return (
        <FormalButtonContainer
            onPress={onPress}
        >
            <ButtonText>{text}</ButtonText>
            {loading ? (
                <LoadingIndicator />
            ) : (
                <Icon name={icon} size={25} color='#000' />
            )}

        </FormalButtonContainer>
    )
}

const FormalButtonContainer = styled.TouchableOpacity`
    width: 95%;
    border-bottom-color: #000;
    border-bottom-width: 1px;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    flex-direction: row;
    margin-top: 15px;
`;

const ButtonText = styled.Text`
    font-weight: bold;
    font-size: 21px;
`;

const LoadingIndicator = styled.ActivityIndicator.attrs({
    size:"small",
    color:"#000",
})``;

export default FormalButton;
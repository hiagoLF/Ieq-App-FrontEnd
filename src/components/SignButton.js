import React from 'react';
import styled from 'styled-components/native'

// import { Container } from './styles';

const SignButton = ({ text = 'Exemplo', onPress = null, loading = false }) => {
    return (
        <SignButtonPressable
            onPress={!loading ? onPress: null}
        >
            {loading ? (
                <LoadingIndicator />
            ) : (
                    <SignButtonText>{text}</SignButtonText>
                )}
        </SignButtonPressable>
    )
}

const SignButtonPressable = styled.TouchableOpacity`
    background-color: #000;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    margin-top: 3%;
    width: 95%;
`;

const SignButtonText = styled.Text`
    font-weight: bold;
    color: #FFF;
    font-size: 24px;
`;

const LoadingIndicator = styled.ActivityIndicator.attrs({
    size:"large",
    color: "#FFF",
})``;

export default SignButton;
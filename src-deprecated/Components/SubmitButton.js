import React, {useState} from 'react';
import styled from 'styled-components/native'
import {Dimensions} from 'react-native'
import { useEffect } from 'react/cjs/react.development';

// Screen Size
const widthScreen = Dimensions.get('window').width

const SubmitButton = ({text, onSubmitButtonPress}) => {

    const [loading, setLoading] = useState(false)

    const handleClickLoginButton = () => {
        setLoading(true)
        onSubmitButtonPress()
    }

    return (
        <SubmitLoginButton
            activeOpacity={loading ? 1 : 0.2}
            onPress={loading ? null : handleClickLoginButton}
        >
            {loading ?
                <LoadingIndicator />
                :
                <BtnLoginText>{text}</BtnLoginText>
            }

        </SubmitLoginButton>
    )
}


const SubmitLoginButton = styled.TouchableOpacity`
    background-color: #21b0c0;
    width: ${widthScreen * 0.84}px;
    padding: 2%;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
`;

const LoadingIndicator = styled.ActivityIndicator.attrs({
    size: 'large',
    color: '#FFF'
})``;

const BtnLoginText = styled.Text`
    font-size: ${widthScreen/15}px;
    font-weight: bold;
`;

export default SubmitButton;
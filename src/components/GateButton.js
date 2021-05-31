// Node Modules
import React from 'react';
import styled from 'styled-components'

const GateButton = ({ text = 'Exemplo', image = null, onPress, onLongPress }) => {

    return (
        <GateButtonPressable
            onPress={onPress}
            onLongPress={onLongPress}
        >
            {image ? (
                <>
                    <BackgroundImageButton
                        blurRadius={2}
                        source={{ uri: image }}
                    />
                    <BackgroundDefault />
                </>
            ) : (
                    <BackgroundDefault />
                )}

            <TextButton>{text}</TextButton>
        </GateButtonPressable>
    )
}

const GateButtonPressable = styled.TouchableOpacity`
    width: 96%;
    height: 71px;
    position: relative;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    margin-top: 7px;
`;

const BackgroundImageButton = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 20px;
    z-index: 0;
`;

const TextButton = styled.Text`
    font-weight: bold;
    font-size: 24px;
    font-family: bold;
    position: absolute;
    z-index: 5;
    color: #FFF;
`;

const BackgroundDefault = styled.View`
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background-color: #391B13;
    opacity: 0.8;
    position: absolute;
`;

export default GateButton;
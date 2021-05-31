// Node Modules
import React from 'react'
import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import {useNavigation} from '@react-navigation/native'

// Images
import DefaultImage from '../assets/background-default.jpg'

// Screen Size
const heightScreen = Dimensions.get('window').height

// GateToPage
// Parâmetros...
//      page > Nome da tela que será direcionada
//      text > Titulo que aparece na Gate
//      props > Objetos para enviar a Screen que for navegar
export default function GateToPage({ page, text, props }) {

    // Instances
    const navigation = useNavigation()

    return (
        <GateToPageContainer onPress={() => navigation.navigate(page, {paramsOfNavigation: props})}>
            <ImageBackground>
                <GateToPageText>{text}</GateToPageText>
            </ImageBackground>
        </GateToPageContainer>
    )
}

const GateToPageContainer = styled.TouchableOpacity`
    width: 95%;
    height: ${() => heightScreen/9}px;

    margin-top: ${() => heightScreen/100}px;;

    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

const ImageBackground = styled.ImageBackground.attrs({
    source: DefaultImage,
    styles: {resizeMode: "cover"},
    imageStyle: {borderRadius: 10}
})`
    flex: 1;
    width: 100%;
    justify-content: center;
`;

const GateToPageText = styled.Text`
    color: #FFF;
    font-size: ${() => Dimensions.get('window').width / 20}px;
    text-align: center;
    padding: 20px 0 20px;;
    font-weight: bold;
`;




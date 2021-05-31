// Node Modules
import styled from 'styled-components/native';
import { Dimensions } from 'react-native'

const widthScreen = Dimensions.get('window').width

export const BasicSubmitButton = styled.TouchableOpacity`
    background-color: #21b0c0;
    width: ${widthScreen * 0.84}px;
    padding: 2%;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
`;

export const BasicSubmitButtonText = styled.Text`
    
`;
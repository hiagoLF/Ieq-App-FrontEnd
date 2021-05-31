// Node Modules
import styled from 'styled-components/native';
import {Dimensions} from 'react-native'

// Screen Size
const widthScreen = Dimensions.get('window').width

export const LoginContainer = styled.View`
    width: 90%;
    height: 70%;
    background-color: #FFF;
    border-radius: 20px;
    justify-content: space-between;
    align-items: center;
    padding: 10% 0;
`;

export const Title = styled.Text`
    font-weight: bold;
    font-size: ${widthScreen / 15}px;
`;
export const FormContainer = styled.View`
    justify-content: center;
    align-items: center;
`;
export const EmailInputContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    padding: 2%;
    background-color: #cfcfcf;
    margin-bottom: 2%;
`;
export const EmailInput = styled.TextInput.attrs({
    placeholder:'e-mail'
})`
    width: 80%;
    font-size: ${widthScreen / 17}px;
    margin-left: 2%;
`;

export const PasswordInputContainer = styled(EmailInputContainer)``;

export const PasswordInput = styled(EmailInput).attrs({
    placeholder:'senha',
    secureTextEntry: true,
})``;

export const SubmitLoginButton = styled.TouchableOpacity`
    background-color: #21b0c0;
    width: ${widthScreen * 0.84}px;
    padding: 2%;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
`;

export const LoadingIndicator = styled.ActivityIndicator.attrs({
    size: 'large',
    color: '#FFF'
})``;

export const BtnLoginText = styled.Text`
    font-size: ${widthScreen/15}px;
    font-weight: bold;
`;

export const RegisterPageButton = styled.TouchableOpacity`
    flex-direction: row;
`;

export const ButtonTextNormal = styled.Text``;

export const ButtonTextBold = styled(ButtonTextNormal)`
    font-weight: bold;
`;

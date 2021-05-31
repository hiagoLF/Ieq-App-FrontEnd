// Node Modules
import React, { useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import NetInfo from "@react-native-community/netinfo";

// Local Modules
import { MainContainerView } from '../../../Components/MainContainer'
import {
    LoginContainer,
    Title,
    FormContainer,
    EmailInputContainer,
    EmailInput,
    PasswordInputContainer,
    PasswordInput,
    SubmitLoginButton,
    BtnLoginText,
    RegisterPageButton,
    ButtonTextNormal,
    ButtonTextBold,
    LoadingIndicator,
} from './styles';
import { LoginAuthentication } from '../../../functions/User'
import { useUser } from '../../../Contexts/index'

const Login = () => {

    // States
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [user, setUser] = useUser({})
    const [loading, setLoading] = useState(false)
    const [opennedConectionModal, setOpennedConectionModal] = useState(false)

    // Instances
    const navigation = useNavigation()

    // Functions
    handleClickLoginButton = async () => {
        // Verificar se há internet 
        const netInfo = await NetInfo.fetch()
        if (!netInfo.isConnected) {
            setOpennedConectionModal(true)
        }

        // Ainda falta criar o modal de verificação se a internet tá ligada

        // Ligar o Loading
        setLoading(true)
        // Fazer Login com email e password
        const userInformations = await LoginAuthentication(email, password)
        // Colocar estas mesmas informações de login dentro do Context
        setUser(userInformations)
        // Voltar para a tela inicial
        navigation.reset({
            routes: [{name: 'Home'}]
        })
    }

    return (
        <MainContainerView>
            <LoginContainer>

                <Title>Login de Membro</Title>

                <FormContainer>
                    <EmailInputContainer>
                        <Icon name='person-pin' size={40} color="#000" />
                        <EmailInput
                            value={email}
                            onChangeText={(t) => setEmail(t)}
                        />
                    </EmailInputContainer>
                    <PasswordInputContainer>
                        <Icon name='lock' size={40} color="#000" />
                        <PasswordInput
                            value={password}
                            onChangeText={(t) => setPassword(t)}
                        />
                    </PasswordInputContainer>

                    <SubmitLoginButton
                        activeOpacity={loading ? 1 : 0.2}
                        onPress={loading ? null : handleClickLoginButton}
                    >
                        {loading ?
                            <LoadingIndicator />
                            :
                            <BtnLoginText>Login</BtnLoginText>
                        }

                    </SubmitLoginButton>
                </FormContainer>

                <RegisterPageButton onPress={() => navigation.navigate('Register')}>
                    <ButtonTextNormal>Não possui uma conta? </ButtonTextNormal>
                    <ButtonTextBold>Registre-se</ButtonTextBold>
                </RegisterPageButton>

            </LoginContainer>
        </MainContainerView>
    )
}

export default Login;
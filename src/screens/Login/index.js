// Node Modules
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'

// Local Modules
import { loginUser } from '../../generic-functions/user'
import { useUser } from '../../Contexts/index'

// Component Modules
import {
    MainView,
    FormCard
} from '../../generic-styles'
import {
    LoginPageContainer,
    TitleForm,
    FormField,
} from './styled'
import SignInput from '../../components/SignInput'
import SignButton from '../../components/SignButton'
import SignPageButton from '../../components/SignPageButton'

const Login = () => {

    // Instances
    const navigation = useNavigation()

    // Contexts
    const [user, setUser] = useUser()

    // States
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    // Functions
    // .....................................
    async function handleSignButtonClick() {
        // Ligar loading
        setLoading(true)
        // Fazer Requisição de Login com login e password 
        const userLoginResult = await loginUser(login, password)
        // Se não recebeu informações do usuário...
        if (!userLoginResult) {
            // Estabelecer o contexto user como undefined
            setUser({})
            // Abrir um modal dizendo que não foi possível fazer o login
            alert('Não foi possível fazer o login')
            // Desligar o loading
            setLoading(false)
            // Dar um return
            return
        }
        // Se Recebeu...
        // Estabalecer o contexto user
        setUser(userLoginResult)
        navigation.reset({
            routes: [{ name: 'Home' }]
        })
    }

    return (
        <MainView>
            <LoginPageContainer>
                <FormCard>
                    <TitleForm>Login de Membro</TitleForm>
                    <FormField>
                        <SignInput
                            title='Login'
                            placeholder='digite seu login'
                            icon='person'
                            onChangeText={(t) => setLogin(t)}
                        />
                        <SignInput
                            title='Senha'
                            placeholder='digite sua senha'
                            icon='lock'
                            onChangeText={(t) => setPassword(t)}
                            secureTextEntry={true}
                        />
                        <SignButton
                            text='Entrar'
                            onPress={handleSignButtonClick}
                            loading={loading}
                        />
                    </FormField>

                    <SignPageButton
                        normalText='Não tem uma conta? '
                        boldText='Cadastre-se'
                        onPress={() => navigation.navigate('Register', {changePassword: false})}
                    />

                </FormCard>
            </LoginPageContainer>
        </MainView>
    )
}

export default Login;
// Node Modules
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'

// Local Modules
import { useUser } from '../../Contexts'
import { registerUser } from '../../generic-functions/user'
import {
    MainView,
    FormCard,
} from '../../generic-styles'
import SignInput from '../../components/SignInput'
import SignButton from '../../components/SignButton'
import SignPageButton from '../../components/SignPageButton'
import {
    RegisterPageContainer,
    TitleForm,
    FormField
} from './styles';
import {
    updatePasswordRequest
} from '../../api/userApi'

const Register = ({ route }) => {

    // Parameters..............................
    const { changePassword } = route.params

    // Instancies..............................
    const navigation = useNavigation()

    // Contexts................................
    const [user, setUser] = useUser({})

    // States..................................
    // States para modo de Registrar Usuário
    const [name, setName] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [passwordTwo, setPasswordTwo] = useState('')

    // States para modo de Alterar Senha
    const [lastPassword, setLastPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordAgain, setNewPasswordAgain] = useState('')

    // Outros States
    const [loading, setLoading] = useState(false)

    // Functions.....................................

    // Registrar usuário.............................
    const handleRegisterButtonClick = async () => {
        // Ligar o loading
        setLoading(true)
        // Verificar se as duas senhas batem
        if (password != passwordTwo) {
            // Se não bater...
            // Desligar o loading
            setLoading(false)
            // Alerta de que senhas não batem
            alert('As duas senhas não batem')
            return
        }
        // Registrar Conta
        const userInformations = await registerUser(name, login, password)
        // Verificar se Recebeu os dados
        if (!userInformations) {
            // Se não recebeu...
            // Desligar o loading
            setLoading(false)
            // Alerta de que não foi possível registrar
            alert('Não foi possível registrar a conta')
            return
        }
        // Se recebeu...
        // Pegar as informações do usuário recebidas e colocar no contexto user
        setUser(userInformations)
        // Navegar para Home sem permitir retorno
        navigation.reset({
            routes: [{ name: 'Home' }]
        })
    }

    // Alterar Senha do usuário
    const handleUpdatePasswordButtonClick = async () => {
        // Ligar o loading
        setLoading(true)
        // Se as duas senhas não baterem...
        if (newPassword != newPasswordAgain) {
            // Alertar quer as sehas não correspondem
            alert('As senhas digitadas não correspondem')
            setLoading(false)
            // Return
            return
        }
        // Requisição de alterar senha
        const updatePasswordRequestResponse = await updatePasswordRequest(
            lastPassword,
            newPassword,
            user.loggedToken
        )
        // Se não foi possível alterar a senha...
        if (!updatePasswordRequestResponse) {
            // Alertar
            alert('Antiga Senha Incorreta')
            // Desligar o loading
            setLoading(false)
            // Return
            return
        }
        // Mensagem de sucesso ao alterar a senha
        alert('Senha alterada com sucesso')
        // Voltar para Home
        navigation.reset({
            routes: [{ name: 'Home' }]
        })
    }

    return (
        <MainView>
            <RegisterPageContainer>
                <FormCard>

                    <TitleForm>
                        {changePassword ?
                            'Alterar Senha' :
                            'Registro de Membro'
                        }
                    </TitleForm>

                    <FormField>


                        {changePassword ? <>
                            {/* Modo de Edição de Senha */}

                            <SignInput
                                title='Antiga Senha'
                                placeholder='digite sua antiga senha'
                                icon='keyboard-control'
                                onChangeText={(t) => setLastPassword(t)}
                            />

                            <SignInput
                                title='Nova Senha'
                                placeholder='digite sua nova senha'
                                icon='lock'
                                onChangeText={(t) => setNewPassword(t)}
                            />

                            <SignInput
                                title='Repita a Nova Senha'
                                placeholder='digite a nova senha outra vez'
                                icon='lock'
                                onChangeText={(t) => setNewPasswordAgain(t)}
                            />

                            <SignButton
                                text='Alterar Senha'
                                onPress={handleUpdatePasswordButtonClick}
                                loading={loading}
                            />
                        </> : <>

                            {/* Modo de Registro de Usuários */}
                            <SignInput
                                title='Nome'
                                placeholder='digite seu nome'
                                icon='drive-file-rename-outline'
                                onChangeText={(t) => setName(t)}
                            />

                            <SignInput
                                title='Login'
                                placeholder='digite seu login'
                                icon='person'
                                onChangeText={(t) => setLogin(t)}
                            />

                            <SignInput
                                title='Senha'
                                placeholder='digite uma senha'
                                icon='lock'
                                onChangeText={(t) => setPassword(t)}
                                secureTextEntry={true}
                            />

                            <SignInput
                                title='Senha Novamente'
                                placeholder='digite a senha novamente'
                                icon='lock'
                                onChangeText={(t) => setPasswordTwo(t)}
                                secureTextEntry={true}
                            />

                            <SignButton
                                text='Registrar'
                                onPress={handleRegisterButtonClick}
                                loading={loading}
                            />
                        </>}


                    </FormField>

                    {!changePassword && (
                        <SignPageButton
                            normalText='Já tem uma conta? '
                            boldText='Faça Login'
                            onPress={() => navigation.navigate('Login')}
                        />
                    )}
                </FormCard>
            </RegisterPageContainer>
        </MainView>
    )
}

export default Register;
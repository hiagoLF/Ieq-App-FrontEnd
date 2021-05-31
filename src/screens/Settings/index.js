// Node Modules
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'

// Local Modules
import { MainView } from '../../generic-styles'
import HeaderPage from '../../components/HeaderPage'
import FormalButton from '../../components/FormalButton'
import {
    ButtonsContainer
} from './styles'
import { useUser } from '../../Contexts'
import { loggoutUser } from '../../generic-functions/user'
import SelectPersonModal from '../../components/SelectPersonModal'

const Settings = () => {

    // Instances
    const navigation = useNavigation()

    // Contexts
    const [user, setUser] = useUser()

    // States
    const [logoutLoading, setLogoutLoading] = useState()
    const [selectUserModalOpen, setSelectUserModalOpen] = useState(false)

    // .............................................
    // Functions

    const handleModalPersonPress = (person) => {
        setSelectUserModalOpen(false)
        navigation.navigate('UpdateUser', { person })
    }

    // Botão de Sair é Clicado......................
    const handleExitToAppButtonClick = async () => {
        // Ligar o Loading
        setLogoutLoading(true)
        // Deslogar o usuário do aplicativo
        const userLoggout = await loggoutUser(user.loggedToken)
        // Verificar se Deslogou
        if (!userLoggout) {
            alert('Não foi possível sair do aplicativo')
            setLogoutLoading(false)
            return
        }
        // Zerar user
        setUser({})
        // Tela Inicial
        navigation.reset({
            routes: [{ name: 'Home' }]
        })
    }

    return (
        <MainView>

            {/* Modal Para Escolher alguma pessoa */}
            <SelectPersonModal
                visible={selectUserModalOpen}
                onButtonClose={() => setSelectUserModalOpen(false)}
                onPersonPress={(person) => handleModalPersonPress(person)}
            />

            {/* Cabeçalho */}
            <HeaderPage
                text='Configurações'
                onButtonBack={() => navigation.goBack()}
            />

            <ButtonsContainer>

                {/* Botão Alterar Senha */}
                {user.type < 3 && (
                    <FormalButton
                        text='Alterar Senha'
                        icon='lock'
                        onPress={() => navigation.navigate('Register', { changePassword: true })}
                    />
                )}

                {/* Botão Editar Image */}
                {user.type < 3 && (
                    <FormalButton
                        text='Editar imagem do perfil'
                        icon='image'
                        onPress={() => navigation.navigate('EditImage')}
                    />
                )}

                {/* Botão Página de Usuários */}
                {user.type <= 1 && (

                    <FormalButton
                        text='Usuários'
                        icon='people'
                        onPress={() => setSelectUserModalOpen(true)}
                    />
                )}


                {/* Aprovar Usuário */}
                {user.type <= 1 && (
                    <FormalButton
                        text='Aprovar Usuário'
                        icon='verified-user'
                        onPress={() => navigation.navigate('QrCodeScanner', { mode: 'aprove-user' })}
                    />
                )}


                {/* Botão Página de Créditos do desenvolvedor */}
                <FormalButton
                    text='Créditos do desenvolvedor'
                    icon='developer-mode'
                    onPress={() => alert('Não é possível acessar esta página no momento')}
                />


                {/* Botão Sair */}
                <FormalButton
                    text='Sair'
                    icon='exit-to-app'
                    onPress={handleExitToAppButtonClick}
                    loading={logoutLoading}
                />

            </ButtonsContainer>

        </MainView>
    )
}

export default Settings;
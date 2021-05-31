// Node Modules
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo'
import messaging from '@react-native-firebase/messaging';

// Local Modules
import {
    refreshUser,
    loginRequest,
    registerRequest,
    logoutRequest,
    updateUserRequest,
    sendTokenRequest
} from '../api/userApi'

// Error Instance
const error = undefined




// ................................................................
// Pegar informações de usuário
export async function getUserInformations() {
    // Pegar Token Firebase do telefone
    const phoneToken = await messaging().getToken()
    // Enviar Token para o servidor
    await sendTokenRequest(phoneToken)
    // Buscar @userInformations no AsyncStorage
    const userInfoResult = await AsyncStorage.getItem('@userInformations').catch(() => { error = true })
    // Se não houver nada lá dentro...
    if (!userInfoResult || error) {
        // Retornar undefined
        return undefined
    }
    // Se houver algo lá dentro...
    // Converter para json
    const userInfoObject = JSON.parse(userInfoResult)
    // Instanciar se há internet
    const netInfo = await NetInfo.fetch().catch(() => { error = true })
    /* const netInfo = false */
    // Se não houver internet...
    if (!netInfo.isConnected) {
        // Retornar as informações do usuário que estavam no Async Storage
        return userInfoObject
    }
    // Caso haja internet...
    // Pegar o token do usuário e dar um refresh buscando novas informações do usuário
    const userRefreshResult = await refreshUser(userInfoObject.loggedToken)
    // Se não conseguiu pegar nenhuma informação de usuário...
    if (!userRefreshResult) {
        // Retirar @userInformations do Async Storage
        await AsyncStorage.setItem('@userInformations', '')
        // Retornar false
        return false
    }
    // Se conseguiu pegar informações do usuário...
    // Guardar informações atuais em @userInformations no AsyncStorage
    await AsyncStorage.setItem('@userInformations', JSON.stringify(userRefreshResult))
    // Retornar as informações conseguidas
    return userRefreshResult
}



// ...........................................................
// Fazer login de usuário
export async function loginUser(login, password) {
    // Fazer uma requisição de login na api
    const loginRequestResult = await loginRequest(login, password)
    // Verificar se teve resultado
    if (!loginRequestResult) {
        return false
    }
    // Definir @userInformations no Async Storage como o resultado
    await AsyncStorage.setItem('@userInformations', JSON.stringify(loginRequestResult))
    // Retornar as informações
    return loginRequestResult
}




// .............................................................
// Registrar Usuário
export async function registerUser(name, login, password) {
    // Instanciar se tem internet
    const netInfo = await NetInfo.fetch().catch(() => { error = true })
    if (!netInfo.isConnected) {
        // Se não tiver...
        // Retornar false
        return false
    }
    // Fazer uma requisição de registro na api
    const registerRequestResult = await registerRequest(name, login, password)
    // Verificar se teve resultado
    if (!registerRequestResult) {
        return false
    }
    // Definir @userInformations no Async Storage como o resultado
    await AsyncStorage.setItem('@userInformations', JSON.stringify(registerRequestResult))
    // Retornar as informações
    return registerRequestResult
}


// ........................................................
// Deslogar Usuário do aplicativo
export async function loggoutUser(token) {
    // Requisição para deslogar
    const logoutRequestResult = await logoutRequest(token)
    // Verificar se a requisição foi um sucesso
    if (!logoutRequestResult) {
        return false
    }
    // Excluir Usuário do AsyncStorage
    AsyncStorage.setItem('@userInformations', '')
    // Retornar True
    return true
}



// Editar Imagem do Perfil do Usário
export async function updateUserImage(imageUri, token, identificator) {
    // Criar um new FormData
    const formData = new FormData()
    // Se removeImage for false...
    if (imageUri) {
        // Incluir a imagem neste Formulário
        console.log('Adicionando imagem no form')
        formData.append('image', {
            name: 'user-profile-image.jpg',
            type: 'image/jpeg',
            uri: imageUri,
        })
    }else{
        formData.append('nothing', 'nothing')
    }
    // Requisição de alterar imagem do usuário
    const updateUserRequestResult = await updateUserRequest(formData, token, identificator)
    // Verificar se alterou
    if (!updateUserRequestResult) {
        return false
    }
    // Retornar true
    return true
}

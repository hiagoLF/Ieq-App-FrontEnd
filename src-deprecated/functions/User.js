// Node Modules
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo'

// Local Modules
import { loginRequisition, getMyUserInformations } from '../services/api'

// error instance
var error = false

export async function LoginAuthentication(login, password) {
    // fazer requisição e pegar um token
    const token = await loginRequisition(login, password)
    // fazer requisição para pegar My User Informations
    const userInfos = await getMyUserInformations(token)
    // Armazenar My User Informations e tokne no AsyncStorage e no Context
    const data = { token, ...userInfos }

    await AsyncStorage.setItem('@userInformations', JSON.stringify(data))

    return data
}

export async function getUserData(){
    // Abrir o AsyncStorage e pegar os dados de @userInformations
    const result = await AsyncStorage.getItem('@userInformations')
    const userInformations = result ? JSON.parse(result) : {}
    // Se tiver um Token em @userInformations...
    if(userInformations.token){
        // Verificar se há internet
        const netInfo = await NetInfo.fetch().catch(() => {})
        // Se tiver internet...
        if(netInfo.isConnected){
            // Buscar novas informações do usuário
            const newUserInformations = await getMyUserInformations(userInformations.token)
            .catch(() => {})
            // Se o servidor não autorizou o acesso com esse token...
            if(newUserInformations.error){
                // Limpar @userInformations do AsyncStorage
                await AsyncStorage.setItem('@userInformations', '').catch(() => {})
                // retornar false
                return false
            }
            // Reescrever @userInformations com as novas informações
            const data = { token: userInformations.token, ...newUserInformations}
            await AsyncStorage.setItem('@userInformations', JSON.stringify(data)).catch(() => {})
            // Retornar as informações
            return data
        }
        // Se não tiver internet...
        // Retornar as informações que tem
        return userInformations
    }
    // Se não tiver token em @userInformations...
    // Retornar false
    return false
}
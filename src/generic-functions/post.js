// Node Modules
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'

// Local Modules
import { requestAllIndexes, requestPostsByIndexAndPage } from '../api/postApi'
import { getJsonFromAS, saveJsonOnAS } from './'

var error = undefined


// ...........................................
// Pegar todos os índicies disponíveis
export async function getIndexesInformations() {
    // Instanciar se há intetnet
    const netInfo = await NetInfo.fetch().catch(() => {error = true})
    /* const netInfo = false */
    // Se não tiver internet...
    if (!netInfo.isConnected) {
        // Buscar indexes no @indexInformations do AsyncStorage
        const indexesResult = await AsyncStorage.getItem('@indexInformations')
            .catch(() => { error = true })
        // Se não encontrou nada...
        if (!indexesResult) {
            // Retornar false
            return false
        }
        // Se encontrou...
        // Converter para JSON
        const indexesObject = JSON.parse(indexesResult)
        // retornar resultado
        return indexesObject
    }
    // Se tiver internet...
    // Fazer requisição de novos indicies
    const indexesRequestResult = await requestAllIndexes()
    // Gravar estes indicies no @indexInformations do AsyncStorage
    await AsyncStorage.setItem('@indexInformations', JSON.stringify(indexesRequestResult))
    // Retornar este indicies
    return indexesRequestResult
}



// ..................................................
// Buscar página de posts
export async function getPostsOfIndex(indexId, page = 1) {
    // Buscar no AsyncStorage @postsInformations
    const postsResult = await getJsonFromAS('@postsInformations')
    // instanciar se há internet
    const netInfo = await NetInfo.fetch().catch(() => { error = true })
    /* const netInfo = false */
    // Se não tiver internet...
    if (!netInfo.isConnected) {
        // Verificar se tem o indexId informado no postsInformations e retornar
        if (postsResult[indexId]) {
            return postsResult[indexId]
        }
        // Se não tiver...Retornar false
        return false
    }
    // Se tiver internet...
    // Fazer uma requisição de novos posts pelo indexId informado e pela página informada
    const postsRequestResult = await requestPostsByIndexAndPage(indexId, page)
    // Se não encontrou nada...
    if (!postsRequestResult) {
        // Se a página foi 1...
        if (page == 1) {
            // colocar undefined no indexId do objeto que veio no AsyncStorage
            postsResult[indexId] = undefined
            // Salvar este objeto no postsInformations do AsyncStorage
            await saveJsonOnAS('@postsInformations', postsResult)
            // Retorar false
            return false
        }
        // Se a página não foi 1
        // Retornar o objeto do indexId
        return postsResult[indexId]
    }
    // Se encontrou alguma coisa...
    // Se page não é igual a 1...
    if (page != 1) {
        // Retornar o objeto que estava no AsyncStorage + objeto que veio na requisição
        return [...postsResult, ...postsRequestResult.docs]
    }
    // Se a página foi 1...
    // Colocar este resultado no indexId do objeto que veio do AsyncStorage
    postsResult[indexId] = postsRequestResult.docs
    // Guardar este objeto no postsInformations do AsyncStorage
    await saveJsonOnAS('@postsInformations', postsResult)
    // Retornar este objeto
    return postsResult[indexId]
}




// ...................................
// Pegar um post pelo id
export async function getPostData(postId, indexOfPost, token){
}



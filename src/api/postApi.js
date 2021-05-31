import { firebase } from '@react-native-firebase/messaging'
import api from './'

// Error Instance
var error = undefined

// ...................................................
// Requisição de Índicies
export async function requestAllIndexes() {
    // Fazer requisição de indexes
    const indexesResquestResult = await api.get('/postindex/')
    // Se não encontrou nada...
    if (!indexesResquestResult) {
        // Retornar false
        return false
    }
    // Se encontrou...
    // Retornar o data do resultado
    return indexesResquestResult.data
}

// .............................................................
// Requisição de Posts por página
export async function requestPostsByIndexAndPage(indexId, page) {
    const postsRequestResult = await api.get(`/postindex/${indexId}/${page}`).catch(() => {})
    if (!postsRequestResult || postsRequestResult.data.error) {
        // Retornar false
        return false
    }
    // Se encontrou...
    // Retornar o data do resultado
    return postsRequestResult.data
}


// ...............................................................
// Requisição de Post pelo seu id do post
export async function requestPostById(postId) {
    // Buscat post
    const postRequestResult = await api.get(`/post/${postId}`).catch(() => { error = true })
    // Ver se encontrou
    if (!postRequestResult || error || postRequestResult.data.error) {
        return false
    }
    // Retornar post
    return postRequestResult.data
}


//..............................................................
// Requisição para criar um novo índicie de postagens
export async function createIndexRequest(indexName, token) {
    // Definir header
    api.defaults.headers.authorization = `Bearer ${token}`
    // Criar índicie
    const indexRequestResult = await api.post('/postindex/create', { name: indexName }).catch(() => { })
    // Ver se criou
    if (!indexRequestResult || indexRequestResult.data.error) {
        return false
    }
    // Retornar true
    return true
}

export async function createNewPost(data, token) {
    // Definir header
    api.defaults.headers.authorization = `Bearer ${token}`
    // Criar Postagem
    var url = '/post/create'
    data.indexId == '001' && (url = '/event/create')
    const postCreationRequestResult = await api.post(url, data).catch(() => { })
    // Ver se criou
    if (!postCreationRequestResult || postCreationRequestResult.data.error) {
        return false
    }
    // Retornar true
    return postCreationRequestResult.data
}


export async function updatePostImage(Form, postId, token) {
    // Definir header
    api.defaults.headers.authorization = `Bearer ${token}`
    console.log('ID do post >>>>>> ', postId)
    // Atualizar a imagem
    const postImageUpdateRequestResult = await api.put(
        `/post/editimage/${postId}`,
        data = Form
    ).catch(() => { })
    // Ver se atualizou
    if (!postImageUpdateRequestResult || postImageUpdateRequestResult.data.error) {
        return false
    }
    // Retornar true
    return true
}


// Alterando o nome de um índicie
export async function editIndexRequest(indexId, newIndexText, token) {
    // Definir header
    api.defaults.headers.authorization = `Bearer ${token}`
    // Atualizar nome do íncidie
    const indexEditRequestResult = await api.put(
        `/postindex/${indexId}`,
        { name: newIndexText }
    ).catch(() => { })
    // Ver se atualizou
    if (!indexEditRequestResult || indexEditRequestResult.data.error) {
        return false
    }
    // Retornar true
    return true
}

// Removendo um índicie
export async function deleteIndexRequest(indexId, token) {
    // Definir header
    api.defaults.headers.authorization = `Bearer ${token}`
    // Remover o índicie
    const indexDeletionRequestResult = await api.delete(
        `/postindex/${indexId}`
    ).catch(() => { })
    // Ver se removeu
    if (!indexDeletionRequestResult || indexDeletionRequestResult.data.error) {
        return false
    }
    // Retornar true
    return true
}


// Deletando um post
export async function postDeleteRequest(indexId, eventId, postId, token) {
    // Definir header
    api.defaults.headers.authorization = `Bearer ${token}`
    // Definir url
    var url = undefined
    indexId == '001' ? url = `/event/${eventId}` : url = `/post/${postId}`
    // Remover o post
    const postDeletionRequestResult = await api.delete(
        url
    ).catch(() => { })
    // Ver se removeu
    if (!postDeletionRequestResult || postDeletionRequestResult.data.error) {
        return false
    }
    // Retornar true
    return true
}

export async function editPostRequest(postId, jsonData, token) {
    // Definir header
    api.defaults.headers.authorization = `Bearer ${token}`
    // alterar a postagem
    const postUpdateRequestResult = await api.put(
        `/post/edit/${postId}`,
        jsonData
    ).catch(() => { })
    // Ver se editou
    if (!postUpdateRequestResult || postUpdateRequestResult.data.error) {
        return false
    }
    // Retornar true
    return true
}
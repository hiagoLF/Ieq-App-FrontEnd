import api from './'

export async function createAlbum(title, token) {
    // Definir header token
    api.defaults.headers.authorization = `Bearer ${token}`
    // Criar Album
    const albumCreationRequestResult = await api.post(
        '/album/create',
        { albumTitle: title }
    ).catch(() => { })
    // Ver se criou
    if (!albumCreationRequestResult || albumCreationRequestResult.data.error) {
        return false
    }
    // Retornar o album criado
    return albumCreationRequestResult.data
}



export async function insertImagesRequest(imagesData, albumId, token) {
    // Definir header token
    api.defaults.headers.authorization = `Bearer ${token}`
    // Enviar Imagens
    const albumInsertImageRequestResult = await api.put(
        `/album/${albumId}/newimage`,
        data = imagesData
    ).catch(() => { })
    // Ver se criou
    if (!albumInsertImageRequestResult || albumInsertImageRequestResult.data.error) {
        return false
    }
    // Retornar o album criado
    return albumInsertImageRequestResult.data
}

export async function deleteAlbumRequest(albumId, token) {
    // Definir header token
    api.defaults.headers.authorization = `Bearer ${token}`
    // Excluir album
    const removeAlbumRequestResult = await api.delete(
        `/album/${albumId}`
    ).catch(() => { })
    // Ver se excluiu
    if (!removeAlbumRequestResult || removeAlbumRequestResult.data.error) {
        return false
    }
    // Retornar true
    return true
}

export async function updateTitleRequest(title, albumId, token) {
    // Definir header token
    api.defaults.headers.authorization = `Bearer ${token}`
    // Alterar o album
    const updateAlbumRequestResult = await api.put(
        `/album/update/${albumId}`,
        { albumTitle: title }
    ).catch(() => { })
    // Ver se alterou
    if (!updateAlbumRequestResult || updateAlbumRequestResult.data.error) {
        return false
    }
    // Retornar true
    return true
}


export async function removeImagesRequest(imagesToDelete, albumId, token) {
    // Definir header token
    api.defaults.headers.authorization = `Bearer ${token}`
    // Remover imagens
    console.log(imagesToDelete.length)
    console.log(albumId)
    console.log(token)
    const removeAlbumAlbumImagesRequestResult = await api.delete(
        `/album/${albumId}/image`,
        { data: { imageKeys: imagesToDelete } }
    ).catch(() => { })
    // Ver se alterou
    if (!removeAlbumAlbumImagesRequestResult || removeAlbumAlbumImagesRequestResult.data.error) {
        return false
    }
    // Retornar true
    return true
}
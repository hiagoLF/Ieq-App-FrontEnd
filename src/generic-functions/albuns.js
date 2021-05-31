import {
    insertImagesRequest
} from '../api/albumApi'

export async function insertImagesInAlbum(albumImagesUri, albumId, token) {
    // Criar um FormData
    const imagesData = new FormData()
    // Inserir as imagens neste form
    albumImagesUri.map((image, index) => {
        imagesData.append(
            'albumImage',
            {
                name: `albumimage-${index}.jpg`,
                type: 'image/jpeg',
                uri: image,
            })
    })
    // Fazer a requisição de inserir imagens
    const insertImagesRequestResult = await insertImagesRequest(imagesData, albumId, token)
    // Verificar se fez
    if(!insertImagesRequestResult){
        return false
    }
    return true
}
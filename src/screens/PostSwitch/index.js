// Node Modules
import { Vibration } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'

// Local Modules
import { useUser } from '../../Contexts'
import {
    PostsIndexFlatList,
    PostIndexContainer,
    AddButtonContainer
} from './styles';
import { MainView } from '../../generic-styles'
import TitleHeader from '../../components/TitleHeader'
import { getPostsOfIndex } from '../../generic-functions/post'
import GateButton from '../../components/GateButton'
import AddButton from '../../components/AddButton'
import ConfirmCancelModal from '../../components/ConfirmCancelModal'
import LoadingIndicator from '../../components/LoadingIndicator'
import {
    deleteIndexRequest,
    requestPostsByIndexAndPage
} from '../../api/postApi'


const albumImageAdress = 'https://ieq-app-image-storage.s3-sa-east-1.amazonaws.com/albuns-images/'
const imageAdress = 'https://ieq-app-image-storage.s3-sa-east-1.amazonaws.com/covers-images/'

const PostSwitch = ({ route }) => {

    // Instances
    const navigation = useNavigation()

    // Parameters........................
    const { indexId, name } = route.params

    // Contexts................................
    const [user] = useUser()

    // States...............................
    const [posts, setPosts] = useState([])
    const [deleteIndexModalOpen, setDeleteIndexModalOpen] = useState(false)
    const [loadingPosts, setLoadingPost] = useState(false)
    const [postsPage, setPostsPage] = useState(1)

    // Effects...........................
    useEffect(() => {
        async function getPostsInformations() {
            // Definir posts como loading true
            setPosts({ loading: true })
            // Buscar uma página de posts
            const postsResult = await getPostsOfIndex(indexId, 1)
            // Se não encontrou informações...
            if (!postsResult) {
                // Definir posts como Array Vazio
                setPosts([])
            }
            // Caso tenha encontrado...
            // Definir posts com as informações
            setPosts(postsResult)
        }
        getPostsInformations()
    }, [])

    // ........................................
    // Funções
    // Abrir o Modal para deletar um índicie..........................
    const handleDeleteIndexButtonClick = () => {
        if (user.type == 0) {
            Vibration.vibrate(80)
            // Verificar se não é um índicie de album ou evento
            if (indexId == '001' || indexId == '002') {
                alert('Não é possível deletar este índicie')
                return
            }
            setDeleteIndexModalOpen(true)
        }
        if (user.type == 1) {
            Vibration.vibrate(80)
            alert('Você não pode excluir este índicie')
        }
    }

    // Deletar um Índicie.............................................
    const handleConfirmIndexDeletionModalButtonClick = async () => {
        // Fechar o Modal
        setDeleteIndexModalOpen(false)
        // Requisição para deletar índicie eviando o id do índicie
        const indexDeletionRequestResult = await deleteIndexRequest(indexId, user.loggedToken)
        // Verificar se deletou
        if (!indexDeletionRequestResult) {
            alert('Não foi possível deletar este índicie')
            return
        }
        // Voltar para Home
        navigation.reset({
            routes: [{ name: 'Home' }]
        })
    }

    // Quando a rolagem de posts atinge o final
    const handleEndPostsReached = async () => {
        // Se a página de posts estiver no fim (undefined) ou loadingPosts ainda estiver em true...
        if (postsPage == undefined || loadingPosts) {
            // Return
            return
        }
        // Ligar o loadingPosts
        setLoadingPost(true)
        // Fazer a requisição da nova página de posts
        const getPostsRequestResponse = await requestPostsByIndexAndPage(indexId, postsPage + 1)
        // Se não recebeu nada...
        if (!getPostsRequestResponse) {
            // Desligar Loading e colocar posts no fim (undefined)
            setLoadingPost(false)
            setPostsPage(undefined)
            // Retornar
            return
        }
        // Se recebeu...
        // Se docs da nova página não veio com nada...
        if (getPostsRequestResponse.docs.length == 0) {
            // Definir a página atual como fim (undefined)
            setPostsPage(undefined)
            // Desligar o loadingPosts
            setLoadingPost(false)
            // Return
            return
        }
        // Aumentar o número da página em 1
        setPostsPage(postsPage + 1)
        // Adicionar os posts recebidos no State posts
        setPosts([...posts, ...getPostsRequestResponse.docs])
        // Desligar o loadingPosts
        setLoadingPost(false)
    }


    return (
        <MainView>

            {/* Modal Para deletar índicie */}
            <ConfirmCancelModal
                modalOpen={deleteIndexModalOpen}
                onButtonConfirm={handleConfirmIndexDeletionModalButtonClick}
                onButtonCancel={() => setDeleteIndexModalOpen(false)}
                text='Deletar Índicie?'
                confirmButtonText='Sim'
                cancelButtonText='Não'
            />


            {posts.length == 0 && (
                <>
                    <PostIndexContainer>
                        {/* Cabeçalho */}
                        <TitleHeader
                            text={name}
                            onLongPress={handleDeleteIndexButtonClick}
                        />
                    </PostIndexContainer>
                    {user.type < 2 && (
                        <AddButtonContainer>
                            <AddButton onPress={() => navigation.navigate('CreatePost', {
                                indexName: name,
                                indexId,
                            })} />
                        </AddButtonContainer>
                    )}
                </>
            )}

            {/* Lista de Posts */}
            {posts.length > 0 && (
                <PostsIndexFlatList
                    data={posts}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => { return <PostIndexItem item={{ ...item, indexId }} userType={user.type} /> }}
                    onEndReached={handleEndPostsReached}
                    ListFooterComponent={
                        <LoadingIndicator
                            loading={loadingPosts}
                        />}
                    ListHeaderComponent={<>
                        <PostIndexContainer>
                            {/* Cabeçalho */}
                            <TitleHeader
                                text={name}
                                onLongPress={handleDeleteIndexButtonClick}
                            />
                        </PostIndexContainer>
                        {user.type < 2 && (
                            <AddButtonContainer>
                                <AddButton onPress={() => navigation.navigate('CreatePost', {
                                    indexName: name,
                                    indexId,
                                })} />
                            </AddButtonContainer>
                        )}
                    </>}
                />
            )}
        </MainView>
    )
}

const PostIndexItem = ({ item, userType }) => {

    const navigation = useNavigation()

    const handleEditPostTrigger = () => {
        if (userType <= 1) {
            Vibration.vibrate(80)
            navigation.navigate('CreatePost', { content: item, edition: true, indexId: item.indexId })
        }
    }

    return (
        <PostIndexContainer>
            <GateButton
                onPress={() => navigation.navigate('PostPage', { content: item })}
                onLongPress={handleEditPostTrigger}
                text={item.title || item.albumTitle}
                image={
                    item.images ? albumImageAdress + item.images[0] : imageAdress + item.image
                }
            />
        </PostIndexContainer>
    )
}

export default PostSwitch;
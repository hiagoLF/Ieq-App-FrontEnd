// Node Moduled
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { Switch } from 'react-native'
import { useNavigation } from '@react-navigation/native'


// Local Modules
import {
	MainScrollView,
	BoldText,
	NormalText,
	MainView,
} from '../../generic-styles'
import {
	CreatePostPageContainer,
	HeaderCP,
	FormField,
	Container,
	ImageInputContainer,
	NormalInputTitleText,
	PreviewImage,
	InsertImageInput,
	PublicSwitchContainer,
	SwitchTextGreen,
	SwitcTextRed,
	SwitchContainer,
	CreatePostButton,
	CreatePostButtonText,
	AlbumImagesList,
	AlbumImage,
	ListContainer,
	AlbumFormField,
	AlbumImagePressable,
	LoadingIndicator,
	PreviewImageContainer,
	CloseImageButton
} from './styles'
import InputGeneric from '../../components/InputGeneric'
import TopicsInput from '../../components/TopicsInput'
import PeopleInput from '../../components/PeopleInput'
import DeleteButton from '../../components/DeleteButton'
import TitleAndDescriptionListInput from '../../components/TitleAndDescriptionListInput'
import ConfirmCancelModal from '../../components/ConfirmCancelModal'
import { useUser } from '../../Contexts'
import {
	createNewPost,
	updatePostImage,
	postDeleteRequest,
	editPostRequest
} from '../../api/postApi'
import {
	createAlbum,
	deleteAlbumRequest,
	updateTitleRequest,
	removeImagesRequest
} from '../../api/albumApi'
import {
	insertImagesInAlbum
} from '../../generic-functions/albuns'

const coverImageAdress = 'https://ieq-app-image-storage.s3-sa-east-1.amazonaws.com/covers-images/'
const albumImagesAdress = 'https://ieq-app-image-storage.s3-sa-east-1.amazonaws.com/albuns-images/'

const CreatePost = ({ route }) => {

	// Context
	const [user] = useUser()

	// Instances..........................................
	const navigation = useNavigation()
	const { indexName, indexId, edition, content = false } = route.params

	// States.............................................
	const [title, setTitle] = useState(content ? content.title || content.albumTitle : '')
	const [imageUri, setImageUri] = useState(content ? coverImageAdress + content.image : undefined)
	const [topicsList, setTopicsList] = useState(content ? content.topics : [])
	const [peopleTable, setPeopleTable] = useState(content ? content.peopleBoard : [])
	const [links, setLinks] = useState(content ? content.links : [])
	const [phones, setPhones] = useState(content ? content.callTo : [])
	const [publicPost, setPublicPost] = useState(content ? true : true)
	const [albumImagesUri, setAlbumImagesUri] = useState(content ? content.images : [])

	const [deletePostModalOpen, setDeletePostModalOpen] = useState(false)
	const [deleteAlbumModalOpen, setDeleteAlbumModalOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const [imageInserted, setImageInserted] = useState(false)
	const [imagesToDeleteList, setImagesToDeleteList] = useState([])
	const [imagesToInsertList, setImagesToInsertList] = useState([])

	console.log('Imagem >> ',imageUri)

	// Effects.......................................................
	useEffect(() => {
		if (edition && content.images) {
			formatAlbumImagesUrl()
		}
	}, [])

	// Functions...........................................
	// Formatando url de imagens do album
	const formatAlbumImagesUrl = () => {
		// Fazer cópia do array de imagens
		const formatedImagesUri = [...content.images]
		// Percorrer cada imagem do array copiado...
		formatedImagesUri.map((image, k) => {
			// Modificar o nome da imagem atual
			formatedImagesUri[k] = albumImagesAdress + image
		})
		// Salvar no estado
		setAlbumImagesUri(formatedImagesUri)
	}

	// Pegar uma imagem para a postagem.............................
	const handleInputImageClick = async () => {
		const imageUriResponse = await getImage()
		console.log('Imagem pega: ',imageUriResponse)
		if (!imageUriResponse) {
			alert('Não foi possível pegar a imagem')
			return
		}
		setImageUri(imageUriResponse)
		setImageInserted(true)
	}

	// Sistema para pegar a imagem na memória..................
	const getImage = async () => {
		// Pedir Permissão
		if (Platform.OS !== 'web') {
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== 'granted') {
				alert('Desculpe, Precisamos de sua permissão para acessar a câmera.');
			}
		}
		// Pegar a imagem
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 0.5,
		});

		if (result.cancelled) {
			return false
		}
		return result.uri
	}


	// Criar uma nova postagem...........................
	const handleSubmitPostButtonClick = async () => {
		setLoading(true)
		// Montar o JSON
		const data = {
			title,
			indexId,
			topics: topicsList,
			peopleBoard: peopleTable,
			links,
			callTo: phones,
			public: true,
		}
		// Fazer a requisição
		const newPostRequestResult = await createNewPost(data, user.loggedToken)
		// Verificar se fez a requisição
		if (!newPostRequestResult) {
			alert('Não foi possível criar esta postagem')
			return
		}
		// Verificar se tem imagem pra ser enviada
		if (imageUri) {
			// Criar o form
			const formData = new FormData()
			formData.append('coverImage', {
				name: 'postimage.jpg',
				type: 'image/jpeg',
				uri: imageUri,
			})
			// Enviar a imagem
			const imagePostUpdateRequestResult = await updatePostImage(
				formData,
				newPostRequestResult.id || newPostRequestResult._id,
				user.loggedToken
			)
			// Verificar se enviou mesmo
			if (!imagePostUpdateRequestResult) {
				alert('Não foi possível utilizar a imagem no post')
			}
		}
		// Voltar para a página inicial
		navigation.reset({
			routes: [{ name: 'Home' }]
		})
	}

	// Buscar mais uma imagem para o album................................
	const handleInsertAlbumImageButtonClick = async () => {
		// Pegar a imagem
		const newImageOfAlbum = await getImage()
		// Verificar se pegou
		if (!newImageOfAlbum) {
			alert('Não foi possível pegar essa imagem')
			return
		}
		// inserir no array de albumImagesUri
		const newAlbumURIArray = [...albumImagesUri]
		newAlbumURIArray.push(newImageOfAlbum)
		setAlbumImagesUri(newAlbumURIArray)

		// Se tiver no modo edição...
		if (edition) {
			// Inserir imagem na lista de imagesToInsertList
			setImagesToInsertList([...imagesToInsertList, newImageOfAlbum])
		}
	}

	// Excluir Preview de uma imagem.....................................
	const handleAlbumPreviewImageCloseButtoClick = (index) => {
		// Se estiver em modo de edição, verificar se a imagem fechada está no online
		if (edition && albumImagesUri[index].indexOf('https://') != -1) {
			// Se extiver...
			// Incluir no imagesToDeleteList
			setImagesToDeleteList([
				...imagesToDeleteList,
				albumImagesUri[index].replace(albumImagesAdress, '')
			])
		}

		// Verificar se a imagem fechada está no imagesToInsertList
		const indexOfImageToInsert = imagesToInsertList.indexOf(
			albumImagesUri[index].replace(albumImagesAdress, '')
		)
		// Se estiver...
		if (indexOfImageToInsert != 1) {
			// Criar uma copia de imagesToInsertList
			const imagesToInsertListCopy = [...imagesToInsertList]
			// Remover a imagem desta cópia
			imagesToInsertListCopy.splice(indexOfImageToInsert, 1)
			// salvar em imagesToInsertList
			setImagesToInsertList(imagesToInsertListCopy)
		}

		// Remover a imagem da lista de albumImagesUri
		const newAlbumArray = [...albumImagesUri]
		newAlbumArray.splice(index, 1)
		setAlbumImagesUri(newAlbumArray)
	}

	// Criar um novo Album................................................
	const handleCreateAlbumButtonClick = async () => {
		// Ligar o loading
		setLoading(true)
		// Verificar se existe Imagens dentro de albumImagesUri
		if (albumImagesUri.length == 0) {
			alert('Não existem imagens a serem enviadas')
			return
		}
		// Requisição para criar um novo album com o título sinalizado
		const newAlbum = await createAlbum(title, user.loggedToken)
		// Verificar se criou
		if (!newAlbum) {
			alert('Não foi possível criar o album')
			return
		}
		// Enviar as imagens
		const newAlbumWithImages = await insertImagesInAlbum(albumImagesUri, newAlbum._id, user.loggedToken)
		// Verificar se enviou
		if (!newAlbumWithImages) {
			alert('Não foi possível inserir as imagens')
			return
		}
		// Retornar para a página inicial
		navigation.reset({
			routes: [{ name: 'Home' }]
		})
	}

	// Deletar Postagem............................
	const handleDeletePostButtonClick = async () => {
		// Fechar Modal
		setDeletePostModalOpen(false)
		// Requisição para deletar
		const postDeleteRequestResult = await postDeleteRequest(
			content.indexId,
			content.eventId._id,
			content._id,
			user.loggedToken
		)
		// Verificar se deletou
		if (!postDeleteRequestResult) {
			alert('Não foi possível deletar o post')
			return
		}
		// Voltar para Home
		navigation.reset({
			routes: [{ name: 'Home' }]
		})
	}

	// Requisição para editar uma postagem.......................................
	const handleEditPostButtonClick = async () => {
		// Ligar loading
		setLoading(true)
		// Montar JSON
		const data = {
			title,
			indexId: content.indexId,
			topics: topicsList,
			peopleBoard: peopleTable,
			links,
			callTo: phones,
			public: true,
		}
		// Fazer requisição de editar postagem
		const editPostRequestResult = await editPostRequest(content._id, data, user.loggedToken)
		// Verificar se fez
		if (!editPostRequestResult) {
			alert('Não foi possível editar o post')
			return
		}
		// Verificar se inseriu uma nova imagem
		if (imageInserted && imageUri) {
			// Se inseriu...
			// Criar o FormData e inserir a imagem
			const formData = new FormData()
			formData.append('coverImage', {
				name: 'postimage.jpg',
				type: 'image/jpeg',
				uri: imageUri,
			})
			// Fazer requisição de editar imagem
			const postWithImage = await updatePostImage(formData, content._id, user.loggedToken)
			// Verificar se a requisição foi bem sucedida
			if (!postWithImage) {
				alert('A imagem não pôde ser enviada')
			}
		}
		// Retornar para Home
		navigation.reset({
			routes: [{ name: 'Home' }]
		})
	}

	// Deletar um album
	const handleDeleteAlbumButtonClick = async () => {
		// Fechar o modal
		setDeleteAlbumModalOpen(false)
		// Requisição para deletar Album
		const deleteAlbumRequestResult = await deleteAlbumRequest(content._id, user.loggedToken)
		// Ver se deletou
		if (!deleteAlbumRequestResult) {
			alert('Não foi possível deletar este album')
			return
		}
		// Retornar para Home
		navigation.reset({
			routes: [{ name: 'Home' }]
		})
	}

	// Requisições para editar um album......................................
	const handleEditAlbumButtonClick = async () => {
		// Ligar o loading
		setLoading(true)
		// Se o título foi alterado...
		if (content.albumTitle != title) {
			// Requisição para alterar título
			const updateTitleRequestResult = await updateTitleRequest(title, content._id, user.loggedToken)
			// Verificar se alterou título e alertar caso não
			!updateTitleRequestResult && alert('Não foi possível alterar o título')
		}
		// Se tiver imagens para remover...
		if (imagesToDeleteList.length != 0) {
			// Requisição para remover imagens
			const InsertImagesRequestResult = await removeImagesRequest(imagesToDeleteList, content._id, user.loggedToken)
			// Verificar se removeu e alertar caso não
			!InsertImagesRequestResult && alert('Não foi possível remover as imagens')
		}
		// Se tiver imagens para inserir...
		if (imagesToInsertList.length != 0) {
			// Requisição para inserir imagens
			const insertImagesRequestResult = await insertImagesInAlbum(imagesToInsertList, content._id, user.loggedToken)
			// Verificar se inseriu e alertar caso não
			!insertImagesRequestResult && alert('Não foi possível inserir novas imagens')
		}
		// Retornar para Home
		navigation.reset({
			routes: [{ name: 'Home' }]
		})
	}

	return (

		<>
			{/* 
				001 --> Eventos
				002 --> Album
			*/}
			{indexId != '002' ? (
				<MainScrollView>
					<Container>


						<CreatePostPageContainer>
							<HeaderCP>
								{edition ? (
									<>
										<BoldText>Editar Postagem</BoldText>
										<NormalText>{content.title}</NormalText>
									</>
								) : (
									<>
										<BoldText>Nova Postagem</BoldText>
										<NormalText>{indexName}</NormalText>
									</>
								)}

							</HeaderCP>

							<FormField>

								<ConfirmCancelModal
									text='Deletar Postagem?'
									confirmButtonText='Sim'
									cancelButtonText='Não'
									onButtonConfirm={handleDeletePostButtonClick}
									onButtonCancel={() => setDeletePostModalOpen(false)}
									modalOpen={deletePostModalOpen}
								/>

								{edition && (
									<DeleteButton
										onPress={() => setDeletePostModalOpen(true)}
										loading={false}
									/>
								)}

								{/* Título */}
								<InputGeneric
									title='Título'
									onChangeText={(t) => setTitle(t)}
									value={title}
								/>

								{/* Imagem */}
								<ImageInputContainer>
									<NormalInputTitleText>Imagem</NormalInputTitleText>
									{imageUri ? (
										<PreviewImageContainer>
											<CloseImageButton
												onPress={() => setImageUri(undefined)}
											>
												<Icon name='cancel' size={30} color='#000' />
											</CloseImageButton>
											<PreviewImage source={{ uri: imageUri }} />
										</PreviewImageContainer>
									) : (
										<InsertImageInput onPress={handleInputImageClick}>
											<Icon name='image' size={25} color='#000' />
										</InsertImageInput>
									)}
								</ImageInputContainer>

								{/* Tópics */}
								<TopicsInput
									topicsList={topicsList}
									onListChange={(list) => setTopicsList(list)}
								/>

								{/* Quadros de pessoas */}
								<PeopleInput
									peopleTable={peopleTable}
									onPeopleTableChange={(list) => setPeopleTable(list)}
								/>

								{/* Links */}
								<TitleAndDescriptionListInput
									InputTitle='Links'
									titleName='title'
									titleText='Título'
									descripionName='url'
									descripionText='URL'
									onTableChane={(table) => setLinks(table)}
									listValue={links}
								/>

								{/* Ligar para... */}
								<TitleAndDescriptionListInput
									InputTitle='Ligar para'
									titleName='name'
									titleText='Nome'
									descripionName='phone'
									descripionText='Telefone'
									onTableChane={(table) => setPhones(table)}
									listValue={phones}
								/>

								{/* Switch Public */}
								{/* <PublicSwitchContainer>
									<NormalInputTitleText>Público</NormalInputTitleText>
									<SwitchContainer>
										<Switch
											trackColor={{ false: "#767577", true: "#81b0ff" }}
											thumbColor={publicPost ? "#f5dd4b" : "#f4f3f4"}
											ios_backgroundColor="#3e3e3e"
											onValueChange={() => setPublicPost(!publicPost)}
											value={publicPost}
										/>
										{publicPost ? (
											<SwitchTextGreen>SIM</SwitchTextGreen>
										) : (
											<SwitcTextRed>NÃO</SwitcTextRed>
										)}
									</SwitchContainer>
								</PublicSwitchContainer> */}

								{/* Botão de Submit Postagem */}
								<CreatePostButton
									onPress={
										loading ? null : (
											edition ?
												handleEditPostButtonClick : handleSubmitPostButtonClick
										)
									}
								>
									{loading ? (
										<LoadingIndicator size="large" color="#000" />
									) : (
										<CreatePostButtonText>Enviar</CreatePostButtonText>
									)}
								</CreatePostButton>


							</FormField>
						</CreatePostPageContainer>
					</Container>
				</MainScrollView >
			) : (

				/* Formuláro para Album de Imagens */
				<MainView>
					<Container>
						<CreatePostPageContainer>
							<AlbumFormField>

								{/* Modal Para confirmar remoção do album */}
								<ConfirmCancelModal
									text='Deletar Album?'
									confirmButtonText='Sim'
									cancelButtonText='Não'
									onButtonConfirm={handleDeleteAlbumButtonClick}
									onButtonCancel={() => setDeleteAlbumModalOpen(false)}
									modalOpen={deleteAlbumModalOpen}
								/>

								{/* Botão de Deletar Album */}
								{edition && (
									<DeleteButton
										onPress={() => setDeleteAlbumModalOpen(true)}
										loading={false}
									/>
								)}

								{/* Título */}
								<InputGeneric
									title='Título'
									onChangeText={(t) => setTitle(t)}
									value={title}
								/>

								{/* Botão para adicionar imagem */}
								<ImageInputContainer>
									<NormalInputTitleText>Imagem</NormalInputTitleText>
									<InsertImageInput onPress={handleInsertAlbumImageButtonClick}>
										<Icon name='add-photo-alternate' size={25} color='#000' />
									</InsertImageInput>
								</ImageInputContainer>

								{/* Imagens a serem renderizadas */}
								{albumImagesUri && (
									<ListContainer>
										<AlbumImagesList
											data={albumImagesUri}
											keyExtractor={(item, k) => k}
											numColumns={3}
											renderItem={({ item, index }) => (
												<AlbumImagePressable
													onPress={() => handleAlbumPreviewImageCloseButtoClick(index)}
												>
													<AlbumImage
														source={{ uri: item }}
													/>
													<Icon name='cancel' size={24} color='#B62D2D' />
												</AlbumImagePressable>
											)}
										/>
									</ListContainer>
								)}

								{/* Botão Submit do Album */}
								<CreatePostButton
									onPress={
										loading ? null : (
											edition ?
												handleEditAlbumButtonClick : handleCreateAlbumButtonClick
										)
									}
								>
									{loading ? (
										<LoadingIndicator size="large" color="#000" />
									) : (
										<CreatePostButtonText>Enviar</CreatePostButtonText>
									)}
								</CreatePostButton>
							</AlbumFormField>
						</CreatePostPageContainer>
					</Container>
				</MainView>
			)
			}
		</>


	)
}

export default CreatePost;
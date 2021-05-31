// Node Modules
import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components'
import * as ImagePicker from 'expo-image-picker';

// Local Modules
import {
	EditImageScreenContainer,
	ProfileImage,
	EditButons,
	ParticularEditButton,
	LoadingContainer,
	LoadingImageIndicator,
} from './styles'
import {
	MainView
} from '../../generic-styles'
import HeaderPage from '../../components/HeaderPage'
import { useUser } from '../../Contexts'
import {
	updateUserImage
} from '../../generic-functions/user'
import { getUserInformations } from '../../generic-functions/user'

const imageProfileSource = 'https://ieq-app-image-storage.s3-sa-east-1.amazonaws.com/users-profile-image/'

const EditUserProfileImage = ({ route }) => {

	// Instances..................................
	const { identificator, image } = route.params ? route.params : [undefined, undefined]
	const navigation = useNavigation()

	// Contexts
	const [user, setUser] = useUser()

	// States
	const [confirmBox, setConfirmBox] = useState(false)
	const [imageUri, setImageUri] = useState(undefined)
	const [loading, setLoading] = useState(false)

	// Functions ............................................

	// Botão de Cancelar Imagem pressionado
	const handleCancelImageButtonClick = () => {
		setImageUri(undefined)
		setConfirmBox(false)
	}

	// Botão de Confirmar imagem pressionado
	const handleConfirmNewImageButtonClick = async () => {
		// Ligar o loading
		setLoading(true)
		// Alterar a Imagem do usuário
		const updateUserImageResult = await updateUserImage(
			imageUri,
			user.loggedToken,
			identificator ? identificator : user.identificator,
		)
		// Verificar se alterou
		if (!updateUserImageResult) {
			alert('Não foi possível Enviar a imagem')
			setLoading(false)
			return
		}
		// Redefinir Usuário
		const userResult = await getUserInformations()
		// Atualizar State do Usuário caso as novas informações do usuário forem recebidas
		if (userResult) {
			setUser(userResult)
		}
		// Verificar se Indentificator existe
		// Se não existir...
		if(!identificator){
			// Retornar para a Home
			navigation.reset({
				routes: [{ name: 'Home' }]
			})
			return
		}
		// Se existir...
		// Retornar para UpdateUser enviando userEdited true
		navigation.navigate('UpdateUser', {userEdited: true})
	}

	// Botão de Buscar a imagem é pressionado ...............
	const handleUpdateImageButtonClick = async () => {
		// Buscar Imagem na Memória
		const imageResult = await getImage()
		// Verificar se buscou
		if (!imageResult) {
			alert('Não foi possível pegar a imagem')
			return
		}
		// Colocar no State imageUri
		setImageUri(imageResult)
		// Abrir a caixa ConfirmBox
		setConfirmBox(true)
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
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 0.5,
		});

		if (result.cancelled) {
			return false
		}
		return result.uri
	}
	
	return (
		<MainView>
			<EditImageScreenContainer>
				<HeaderPage
					text='Editar Imagem'
					onButtonBack={() => navigation.goBack()}
				/>
				<ProfileImage
					source={{
						uri: imageUri ?
							imageUri : (
								identificator ?
									imageProfileSource + image
									:
									imageProfileSource + user.image
							)
					}}
				/>
				<EditButons>

					{loading ? (
						<LoadingContainer>
							<LoadingImageIndicator
								size='small'
								color='#000'
							/>
						</LoadingContainer>
					) : <>
						{confirmBox ? <>
							{/* .................Caixa de Cofirmar Imagem...............*/}
							{/* Rejeitar Nova Imagem */}
							<ParticularEditButton
								onPress={handleCancelImageButtonClick}
							>
								<Icon name='cancel' size={30} color='#941100' />
							</ParticularEditButton>

							{/* Aceitar Nova Imagem */}
							<ParticularEditButton
								onPress={() => handleConfirmNewImageButtonClick()}
							>
								<Icon name='check-circle' size={30} color='#009405' />
							</ParticularEditButton>

						</> : <>
							{/* .................Caixa de Editar Imagem................. */}
							{/* Botão Deletar Imagem */}
							<ParticularEditButton
								onPress={() => handleConfirmNewImageButtonClick()}
							>
								<Icon name='delete-forever' size={30} color='#000' />
							</ParticularEditButton>

							{/* Botão Buscar nova Imagem */}
							<ParticularEditButton
								onPress={handleUpdateImageButtonClick}
							>
								<Icon name='filter' size={30} color='#000' />
							</ParticularEditButton>

						</>}
					</>}


				</EditButons>
			</EditImageScreenContainer>
		</MainView >
	)
}

export default EditUserProfileImage;
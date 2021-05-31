// Node Modules
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'

// Local Modules
import { MainContainer } from '../../../Components/MainContainer'
import {
	FormContainer,
	HeaderTitle,
	SwitchContainer,
	HeaderTitleSwitch,
	SwitchOfPublic,
	PickImageContainer,
	HeaderPickImage,
	PickImageButton,
	ImagePreview,
	ImagePreviewContainer,
	CancelImageButton,
} from './styles'
import InputDefault from '../../../Components/InputDefault'
import SubmitButton from '../../../Components/SubmitButton'
import LinksForm from '../../../Components/LinksForm'
import { useUser } from '../../../Contexts'
import { customRequisition } from '../../../services/api'
import { refreshPosts } from '../../../functions/General'

// Local JSON
import infoConfig from '../../../services/InfoComponentsConfig.json'

const InfoFormPage = ({ route }) => {

	// Context
	const [user] = useUser()

	// Props
	const { infoName } = route.params.paramsOfNavigation

	// Instances
	const { title, fields, api } = infoConfig.infoGeneralConfig[infoName];
	const navigation = useNavigation()

	// States
	const [inputTitle, setInputTitle] = useState('')
	const [description, setDescription] = useState('')
	const [text, setText] = useState('')
	const [links, setLinks] = useState([])
	const [publicPost, setPublicPost] = useState(false)
	const [coverImage, setCoverImage] = useState(null);


	// Functions
	const handleImagePickerButton = async () => {
		if (Platform.OS !== 'web') {
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== 'granted') {
				alert('Sorry, we need camera roll permissions to make this work!');
			} else {
				const result = await ImagePicker.launchImageLibraryAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					allowsEditing: true,
					aspect: [4, 3],
					quality: 0.4,
					allowsMultipleSelection: true,
				})
				if (!result.cancelled) {
					setCoverImage(result.uri);
				}
			}
		}
	}

	const handleSubmitButtonClick = async () => {
		// Criar um Form
		const data = new FormData()
		// Adicionar todos os campos que não estiverem vazios ao form
		data.append('title', inputTitle)
		data.append('description', description)
		data.append('text', text)
		data.append('links', JSON.stringify(links))
		data.append('published', publicPost)
		coverImage && data.append('coverImage', {
			name: `cover.jpg`,
			type: 'image/jpg',
			uri: coverImage,
		})
		// Fazer uma requisição personalizada para enviar o formulário de criação de história
		const result = await customRequisition(api.create, user.token, data)
		// Se teve resultado...
		if (result) {
			// Atualiza o AsyncStorage e o context
			// Nada aqui ainda...
		}
		// Voltar para a página index de histórias
		navigation.navigate('InfoIndexPage')
	}

	return (
		<MainContainer>

			<FormContainer>
				<HeaderTitle>{`Criar ${title}`}</HeaderTitle>

				{fields.indexOf('title') != -1 &&
					<InputDefault
						title='Título'
						icon='title'
						placeholder='titulo'
						value={inputTitle}
						onChange={(t) => setInputTitle(t)}
					/>
				}
				{fields.indexOf('description') != -1 &&
					<InputDefault
						title='Descrição'
						icon='description'
						placeholder='descrição'
						value={description}
						onChange={(t) => setDescription(t)}
						inputFontSize='20px'
					/>
				}
				{fields.indexOf('coverImage') != -1 &&
					<PickImageContainer>
						<HeaderPickImage>Imagem</HeaderPickImage>

						{coverImage ?
							<ImagePreviewContainer>
								<CancelImageButton onPress={() => setCoverImage(null)}>
									<Icon name='cancel' size={30} color='#474747' />
								</CancelImageButton>
								<ImagePreview source={{ uri: coverImage }} />
							</ImagePreviewContainer>
							:
							<PickImageButton
								onPress={handleImagePickerButton}
							>
								<Icon name='add-photo-alternate' size={30} color='#000' />
							</PickImageButton>
						}
					</PickImageContainer>
				}
				{fields.indexOf('text') != -1 &&
					<InputDefault
						title='Texto'
						icon='notes'
						placeholder='Conte um pouco sobre isso...'
						value={text}
						onChange={(t) => setText(t)}
						multiline={true}
						inputFontSize='18px'
					/>
				}
				{fields.indexOf('links') != -1 &&
					<LinksForm
						onFormChange={(formLinks) => setLinks(formLinks)}
					/>
				}
				{fields.indexOf('published') != -1 &&
					<SwitchContainer>
						<HeaderTitleSwitch>Público</HeaderTitleSwitch>
						<SwitchOfPublic
							trackColor={{ false: "#767577", true: "#8c30e8" }}
							thumbColor={publicPost ? "#edab5a" : "#f4f3f4"}
							ios_backgroundColor="#3e3e3e"
							onValueChange={() => setPublicPost(!publicPost)}
							value={publicPost}
						/>
					</SwitchContainer>

				}

				<SubmitButton
					text='Enviar'
					onSubmitButtonPress={handleSubmitButtonClick}
				/>
			</FormContainer>
		</MainContainer >
	);
}

export default InfoFormPage;
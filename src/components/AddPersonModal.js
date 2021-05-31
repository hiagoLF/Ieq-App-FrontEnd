// Node Modules
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native'

// Local Modules
import { useUser } from '../Contexts'
import { getUsersByName } from '../api/userApi'
import InputGeneric from '../components/InputGeneric'

const userImageBucketAdress = 'https://ieq-app-image-storage.s3-sa-east-1.amazonaws.com/users-profile-image/'

// Local Modules
import BeautifulButton from '../components/BeautifulButton'

const AddPersonModal = ({ setVisible, visible, onPeopleTableChange, addPesonOnListIndex, onButtonClose, peopleTable }) => {

	// Context
	const [user] = useUser()

	// States
	const [userListMode, setUserListMode] = useState(true)
	const [usersList, setUsersList] = useState([])
	const [name, setName] = useState('')
	const [image, setImage] = useState('')

	// Funções......................................
	const searchUsers = async (text) => {
		// Verificar se o campo está vazio
		if (text == '') {
			return
		}
		// Fazer a requisição
		const usersSearchRequestResult = await getUsersByName(text, user.loggedToken)
		// Verificar se veio alguma coisa
		if (!usersSearchRequestResult) {
			alert('Não foi possível processar a requisição.')
			return
		}
		// Colocar resultado da requisição no usersList
		setUsersList(usersSearchRequestResult)
	}

	const handleAddUserButtonClick = (user) => {
		const newTable = [...peopleTable]
		newTable[addPesonOnListIndex].people.push({
			name: user.name,
			image: userImageBucketAdress + user.image
		})
		onPeopleTableChange(newTable)
		setVisible(false)
	}

	const handleManualUserInsert = () => {
		if(name == '' && image == ''){
			return false
		}
		const newTable = [...peopleTable]
		newTable[addPesonOnListIndex].people.push({
			name: name,
			image: image
		})
		onPeopleTableChange(newTable)
		setVisible(false)
	}

	return (
		<AddPersonModalComponent
			visible={visible}
		>
			<AddPersonViewContainer>
				<AddPersonCard>

					<CloseModalButton onPress={onButtonClose}>
						<Icon name='cancel' size={30} color='#000' />
					</CloseModalButton>


					{/* Modo de escolher usuário na lista */}
					{userListMode && (
						<>
							{usersList && (
								<>
									<BeautifulButton
										text='Manualmente'
										onPress={() => setUserListMode(false)}
									/>

									<SearchPersonContainer>
										<SearchPersonInput
											onChangeText={(t) => searchUsers(t)}
										/>
										<Icon name='search' size={30} color='#000' />
									</SearchPersonContainer>

									<UsersListContainer
										data={usersList}
										keyExtractor={(user, index) => user.identificator}
										renderItem={({ item }) =>
											<AddUserButton
												onPress={() => handleAddUserButtonClick(item)}
											>
												<UserPreviewContainer>
													<ImageUser
														source={{ uri: userImageBucketAdress + item.image }} />
													<NameUser>{item.name}</NameUser>
													<Icon name='person-add' size={25} color='#000' />
												</UserPreviewContainer>
											</AddUserButton>
										}
									/>
								</>
							)}
						</>
					)}

					{/* Modo de escolher manualmente */}
					{!userListMode && (
						<>
							<BeautifulButton
								text='Manualmente'
								onPress={() => setUserListMode(true)}
							/>
							<IsertPersonContainer>
								<InputGeneric
									title='Nome'
									onChangeText={(t) => setName(t)}
								/>
								<InputGeneric
									title='URL da imagem'
									onChangeText={(t) => setImage(t)}
								/>
								<InsertUserButton
									onPress={handleManualUserInsert}
								>
									<InsertUserButtonText>Inserir</InsertUserButtonText>
								</InsertUserButton>
							</IsertPersonContainer>
						</>
					)}

				</AddPersonCard>
			</AddPersonViewContainer>
		</AddPersonModalComponent>
	)
}

const AddPersonModalComponent = styled.Modal.attrs({
	animationType: 'slide',
	transparent: true
})``;

const AddPersonViewContainer = styled.View`
    width: 100%;
    flex: 1;
    background-color: rgba(0,0,0, 0);
    justify-content: center;
    align-items: center;
`;

const AddPersonCard = styled.View`
    background-color: rgba(244, 240, 240, 0.98);
    width: 97%;
    height: 97%;
    border-radius: 10px;
    padding: 8px 5px;
`;

const CloseModalButton = styled.TouchableOpacity`
    width: 100%;
    align-items: flex-end;
    padding-bottom: 5px;
`;

const SearchPersonContainer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom-color: #000;
    border-bottom-width: 2px;
`;

const SearchPersonInput = styled.TextInput`
    font-size: 20px;
    padding-left: 10px;
    width: 92%;
`;

const UsersListContainer = styled.FlatList``;

const UserPreviewContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
`;

const ImageUser = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 5px;
`;

const NameUser = styled.Text`
    font-size: 18px;
    padding-left: 10px;
    flex: 1;
`;

const AddUserButton = styled.TouchableOpacity``;

const IsertPersonContainer = styled.View`
	width: 100%;
	justify-content: center;
	align-items: center;
	padding-top: 30px;
`;

const InsertUserButton = styled.TouchableOpacity`
	width: 100%;
	height: 32px;
	justify-content: center;
	align-items: center;
	background-color: #81F18C;
	border-radius: 5px;
	border: 1px solid #000;
	margin-top: 10px;
`;

const InsertUserButtonText = styled.Text`
	font-weight: bold;
	font-size: 18px;
`;

export default AddPersonModal;
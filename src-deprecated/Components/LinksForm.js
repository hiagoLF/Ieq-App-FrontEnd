// Node Modules
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native'

// Icons
import Icon from 'react-native-vector-icons/MaterialIcons'


const LinksForm = ({onFormChange}) => {

	const [links, setLinks] = useState([])

	// Function
	const handleAddLinkButtonClick = () => {
		const newArrayOfFields = [...links]
		newArrayOfFields.push(['', ''])
		setLinks(newArrayOfFields)
	}

	const changeLinkInput = (t, k, input) => {
		const newArrayOfFields = [...links]
		newArrayOfFields[k][input] = t
		setLinks(newArrayOfFields)
	}

	const deleteLinkField = (k) => {
		const newArrayOfFields = [...links]
		newArrayOfFields.splice(k, 1)
		setLinks(newArrayOfFields)
	}

	useEffect(() => {
		onFormChange(links)
	}, [links])

	return (
		<Container>
			<HeaderTitle>Links</HeaderTitle>
			<LinkFormContainer>
				{links.map((link, k) => (
					<LinkField key={k}>
						<LinkDescriptionInput
							onChangeText={(t) => changeLinkInput(t, k, 0)}
							value={links[k][0]}
						/>
						<LinkURLInput
							onChangeText={(t) => changeLinkInput(t, k, 1)}
							value={links[k][1]}
						/>
						<DeleteLinkFieldButton
							onPress={() => deleteLinkField(k)}
						>
							<Icon name='cancel' size={30} color='#000' />
						</DeleteLinkFieldButton>
					</LinkField>
				))}
				<AddLinkButton onPress={handleAddLinkButtonClick}>
					<Icon name='library-add' size={30} color='#000' />
				</AddLinkButton>
			</LinkFormContainer>
		</Container>
	);
}

const Container = styled.View`
	width: 95%;
	margin-bottom: 3%;
`;

const LinkFormContainer = styled.View`
	border: solid 2px #000;
	justify-content: center;
	align-items: center;
	border-radius: 20px;
	padding: 1.5%;
`;

const HeaderTitle = styled.Text`
	font-weight: bold;
	font-size: 28px;
	margin-left: 4px;
`;

const AddLinkButton = styled.TouchableOpacity``;

const LinkField = styled.View`
	width: 100%;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
	margin-bottom: 4%;
`;
const LinkDescriptionInput = styled.TextInput.attrs({
	placeholder: 'Título'
})`
	background-color: #cfcfcf;
	width: 45%;
	font-size: 20px;
	border-radius: 10px;
	padding: 15px;
`;

const LinkURLInput = styled(LinkDescriptionInput).attrs({
	placeholder: 'URL'
})``;

const DeleteLinkFieldButton = styled.TouchableOpacity`
`;

export default LinksForm;
// Node Modules
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components'

// LocalModules
import SignButton from '../components/SignButton'

const InsertTextModal = ({
	text = 'Insira um valor',
	placeholder = 'valor',
	visible = false,
	onChangeText = null,
	buttonText = 'Clique',
	onButtonPress = null,
	buttonLoading = false,
	onCloseButtonClick = null,
	defaultValue=null,
}) => {
	return (
		<ModalComponent
			transparent={true}
			visible={visible}
			animationType="slide"
		>
			<ModalView>
				<ModalCard>
					<CloseButton onPress={onCloseButtonClick}>
						<Icon name='cancel' size={30} color='#000' />
					</CloseButton>
					<ModalTitle>{text}</ModalTitle>
					<InputValue
						placeholder={placeholder}
						onChangeText={onChangeText}
						defaultValue={defaultValue}
					/>
					<SignButton
						text={buttonText}
						onPress={onButtonPress}
						loading={buttonLoading}
					/>
				</ModalCard>
			</ModalView>
		</ModalComponent>
	)
}

const ModalComponent = styled.Modal``;

const ModalView = styled.View`
	background-color: rgba(196,196,196,0.73);
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
`;

const ModalCard = styled.View`
	width: 80%;
	height: 220px;
	justify-content:space-between;
	align-items: center;
	background-color: #FFE9E9;
	border-radius: 5px;
	padding: 20px 0;
	border: 1px solid #000;
`;

const ModalTitle = styled.Text`
	font-weight: bold;
	font-size: 24px;
`;

const InputValue = styled.TextInput`
	width: 95%;
	background-color: #C4C4C4;
	border-radius: 10px;
	font-size: 20px;
	padding-left: 10px;
	padding-right: 10px;
	text-align: center;
`;

const CloseButton = styled.TouchableOpacity`
	position: absolute;
	right: 5px;
	top: 5px;
`;


export default InsertTextModal;
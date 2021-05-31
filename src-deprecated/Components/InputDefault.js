// Node modules
import React from 'react';
import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const widthScreen = Dimensions.get('window').width

const InputDefault = ({
	title='', 
	icon = null, 
	placeholder = '', 
	value = '', 
	onChange = null, 
	secureTextEntry,
	inputFontSize=`${widthScreen / 17}px`,
	multiline,
}) => {
	return (
		<Container>
			<InputTitle>{title}</InputTitle>
			<InputContainer>
				<Icon name={icon} size={40} color="#000" />
				<TextInputStyled
					placeholder={placeholder}
					onChangeText={onChange}
					value={value}
					secureTextEntry={secureTextEntry}
					font={inputFontSize}
					multiline={multiline}
				/>
			</InputContainer>
		</Container>
	)
}

const Container = styled.View`
	width: 95%;
	margin-bottom: 1%;
`;

const InputTitle = styled.Text`
	font-weight: bold;
	font-size: 25px;
	margin-left: 2%;
`;

const InputContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    padding: 2%;
    background-color: #cfcfcf;
    margin-bottom: 2%;
`;

const TextInputStyled = styled.TextInput`
    width: 86%;
    font-size: ${(props) => props.font};
`;

export default InputDefault;
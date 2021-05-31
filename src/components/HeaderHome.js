// Node Modules
import React from 'react';
import styled from 'styled-components/native'

// Local Modules
import { useNavigation } from '@react-navigation/native'
import { useUser } from '../Contexts'
import defaultImageProfile from '../assets/default-profile.png'

// Logo image
import logo from '../assets/ieq-logo.png'

// Instancies
const imageProfileAdress = 'https://ieq-app-image-storage.s3-sa-east-1.amazonaws.com/users-profile-image/'

const Header = () => {

	// Instances
	const navigation = useNavigation()

	// Context
	const [user] = useUser()

	const imageProfileUri = user.image ? imageProfileAdress + user.image : null

	return (
		<HeaderContainer>
			<LogoImage source={logo} />
			{(!user.name && !user.loading) && (
				<MemberAreaButton onPress={() => navigation.navigate('Login')}>
					<MemberAreaButtonText>Área de Membros</MemberAreaButtonText>
				</MemberAreaButton>
			)}
			{user.name && (
				<MemberAreaButton onPress={() => navigation.navigate('Profile')}>
					<UserNameText>{user.name}</UserNameText>
					<UserImageProfile source={
						user.type <= 2 ? { uri: imageProfileUri } : defaultImageProfile
					}/>
				</MemberAreaButton>
			)}
		</HeaderContainer>
	);
}

const HeaderContainer = styled.View`
	background-color: #8DBA60;
	width: 100%;
	height: 70px;
	border-bottom-right-radius: 30px;
	border-bottom-left-radius: 30px;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
	padding: 0 10px;
`;

const LogoImage = styled.Image`
	width: 108px;
	height: 46px;
	margin-left: 10px;
`;

const MemberAreaButton = styled.TouchableOpacity`
	height: 90%;
	justify-content: space-between;
	align-items: center;
	border: 1px #FFF solid;
	background-color: #000;
	border-radius: 5px;
	border-bottom-right-radius: 30px;
	flex-direction: row;
`;

const MemberAreaButtonText = styled.Text`
	font-weight: bold;
	font-size: 18px;
	color: #FFF;
	margin: 0 10px;
`;

const UserNameText = styled.Text`
	font-weight: bold;
	font-size: 12px;
	color: #FFF;
	text-align: center;
	margin: 0 5px;
	max-width: 150px;
`;

const UserImageProfile = styled.Image`
	width: 68px;
	height: 95%;
	margin-right: 2px;
	border-radius: 5px;
	border-bottom-right-radius: 30px;
`;

export default Header;
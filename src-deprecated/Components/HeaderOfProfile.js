// Node Modules
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react';
import styled from 'styled-components'
import { Dimensions, ActivityIndicator } from 'react-native'

// Local Modules
import { useUser } from '../Contexts/index'

// Image Sources
import IeqLogo from '../assets/ieq-logo.png'

// Screen Size
const widthScreen = Dimensions.get('window').width
const heightScreen = Dimensions.get('window').height

// bucketAdressInstance
const bucketAdress = 'https://ieq-app-image-storage.s3-sa-east-1.amazonaws.com/users-profile-image/'

const HeaderOfProfile = () => {

    const navigation = useNavigation()

    // Context
    const [user] = useUser()

    return (
        <HeaderContainer>
            <LogoImage />
            {user.loading &&
                <ActivityIndicator size='large' color='#FFF' />
            }
            {user.name &&
                <ProfileGate onPress={() => navigation.navigate('Profile')}>
                    <UserName>{user.name}</UserName>
                    <UserImage
                        source={{ uri: bucketAdress + user.image }}
                    />
                </ProfileGate>
            }
            {user.content === false &&
                <ButtonToLoginPage onPress={() => navigation.navigate('Login')}>
                    <BtnLoginText>Área de membros</BtnLoginText>
                </ButtonToLoginPage>
            }
        </HeaderContainer>
    )
}

// Styled Components
const HeaderContainer = styled.View`
    width: 100%;
    height: ${() => heightScreen / 12}px;
    background-color: #62ac6c;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 2%;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
`;

const LogoImage = styled.Image.attrs({
    source: IeqLogo,
})`
    width: 28%;
    height: 80%;
`;

const ButtonToLoginPage = styled.TouchableOpacity`
    height: 80%;
    justify-content: center;
    align-items: center;

    border-radius: 10px;
    background-color: #b6d6d8;
`;

const BtnLoginText = styled.Text`
    font-weight: bold;
    font-size: ${() => widthScreen / 21}px;
    padding: 0 4%;
    border-radius: 10px;
`;

const ProfileGate = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    max-width: 50%;
    height: 100%;
    border: 1px solid #FFF;
    border-radius: 10px;
    background-color: #7aa87a;
`;

const UserName = styled.Text`
    font-weight: bold;
    max-width: 60%;
    text-align: center;
    padding: 4%;
`;

const UserImage = styled.Image`
    height: 99%;
    width: 65px;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
`;

export default HeaderOfProfile;
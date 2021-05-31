// Node Modules
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Local Modules
import { MainScrollView } from '../../generic-styles/index'
import { useUser } from '../../Contexts'
import {
    ProfileScreenContainer,
    UserImageProfile,
    BoldText,
    NormalText,
    BoldTitleText,
    MemberSinceContainer,
    NotAuthorizedCard,
    NotAuthorizedTitleCard,
    NotAuthorizedDescriptionCard,
    ConfigButtonContainer
} from './styles'
import { PostCardContainer } from '../../generic-styles'
import defaultProfileImage from '../../assets/default-profile.png'

const imageProfileAdress = 'https://ieq-app-image-storage.s3-sa-east-1.amazonaws.com/users-profile-image/'

const Profile = () => {

    // Instancies
    const navigation = useNavigation()

    // Contexts
    const [user] = useUser()

    // Instancies
    const imageProfileUri = user.image ? imageProfileAdress + user.image : null

    return (
        <MainScrollView>
            <ProfileScreenContainer>

                {user.type <= 2 && (
                    <>
                        <UserImageProfile source={{ uri: imageProfileUri }} />

                        <PostCardContainer>
                            <BoldText>{user.name}</BoldText>
                        </PostCardContainer>

                        {user.memberSince && (
                            <PostCardContainer>
                                <MemberSinceContainer>
                                    <NormalText
                                        style={{
                                            fontFamily: 'sans-serif-light'
                                        }}
                                    >Membro desde</NormalText>
                                    <BoldText>{user.memberSince}</BoldText>
                                </MemberSinceContainer>
                            </PostCardContainer>
                        )}

                        <ConfigButtonContainer
                            onPress={() => navigation.navigate('Settings')}
                        >
                            <Icon name='settings' color='#453434' size={30} />
                        </ConfigButtonContainer>
                    </>
                )}

                {user.type > 2 && (
                    <>
                        <UserImageProfile source={defaultProfileImage} />

                        <PostCardContainer>
                            <BoldText>{user.name}</BoldText>
                        </PostCardContainer>

                        <NotAuthorizedCard>
                            <NotAuthorizedTitleCard>
                                Perfil ainda não autorizado
                            </NotAuthorizedTitleCard>

                            <NotAuthorizedDescriptionCard>
                                Mostre este QR code para seu líder
                            </NotAuthorizedDescriptionCard>

                            <QRCode
                                value={user.identificator}
                                size={200}
                                backgroundColor='#E2F0D7'
                            />
                        </NotAuthorizedCard>

                        <ConfigButtonContainer
                            onPress={() => navigation.navigate('Settings')}
                        >
                            <Icon name='settings' color='#453434' size={30} />
                        </ConfigButtonContainer>
                    </>
                )}

            </ProfileScreenContainer>
        </MainScrollView>
    )
}

export default Profile;
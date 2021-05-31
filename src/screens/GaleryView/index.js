// Node Modules
import React from 'react';
import Gallery from 'react-native-image-gallery';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'

const albumImageAdress = 'https://ieq-app-image-storage.s3-sa-east-1.amazonaws.com/albuns-images/'

const GaleryView = ({ route }) => {

    const { data, initialPage } = route.params
    const dataImages = data.map(item => { return { source: { uri: albumImageAdress + item } } })

    const navigation = useNavigation()

    return (
        <GaleryViewContainer>
            <BackButton onPress={() => navigation.goBack()}>
                <Icon name='close' size={50} color='#FFF' />
            </BackButton>
            <Gallery
                style={{ flex: 1, backgroundColor: 'black' }}
                images={dataImages}
                initialPage={initialPage}
            />
        </GaleryViewContainer>
    )
}

const GaleryViewContainer = styled.View`
    width: 100%;
    flex: 1;
    background-color: #000;
`;

const BackButton = styled.TouchableOpacity`
    width: 100%;
    padding-left: 6px;
    position: absolute;
    z-index: 3;
`;

export default GaleryView;
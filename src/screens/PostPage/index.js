// Node Modules
import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/MaterialIcons'

// Local Modules
import {
    PostPageContainer,
    PostCoverImage,
    FakeImageSpacing,
    TitleText,
    TitleTopic,
    TopicText,
    VirtualSpacer,
    PostPageAlbumContainer,
    AlbumHeader,
    AlbumTitle,
    AlbumImagesList,
    ParticularImageItem,
    ImageTouchableView,
    SubscribeButton,
    SubscribeText,
    SubscriberCard,
    SubscriberText,
    SubscribeButtonContainer,
    QRCodeContainer,
    OpenQrCodeScannerButton,
} from './styles';
import { MainScrollView, MainView, BoldText } from '../../generic-styles'
import { PostCardContainer } from '../../generic-styles'
import PersonSquare from '../../components/PersonSquare'
import RenderItensInColumns from '../../components/RenderItensInColumns'
import LinkTo from '../../components/LinkTo'
import { useUser } from '../../Contexts'
import SignButton from '../../components/SignButton'
import { subscribeUserOnEvent } from '../../api/eventApi'
import SubscriptionList from '../../components/SubscriptionList'

// Image Adress
const imageImageAdress = 'https://ieq-app-image-storage.s3-sa-east-1.amazonaws.com/covers-images/'
const albumImageAdress = 'https://ieq-app-image-storage.s3-sa-east-1.amazonaws.com/albuns-images/'

const PostPage = ({ route = undefined, params = undefined }) => {

    // States.....................
    const [{
        image,
        title,
        topics,
        peopleBoard,
        links,
        callTo,
        albumTitle,
        images,
        eventId,
        _id,
    }, setPostData] = useState(route.params.content)
    const [eventSituation, setEventSituation] = useState(undefined)
    const [loading, setLoading] = useState(false)

    // Instances...................................
    const coverImageUri = imageImageAdress + image
    const navigation = useNavigation()
    const [user] = useUser()

    // Effects...................................
    useEffect(() => {
        if (eventId) {
            if (eventId.unconfirmedSubscribers.indexOf(user.identificator) != -1) {
                setEventSituation('unconfirmed')
                return
            }
            if (eventId.confirmedSubscribers.indexOf(user.identificator) != -1) {
                setEventSituation('confirmed')
                return
            }
            setEventSituation('unsubscribed')
        }
    }, [eventId, user])

    // Functions........................
    const handleImageAlbumClick = (index) => {
        navigation.navigate('GaleryView', { data: images, initialPage: index })
    }

    const handleSubscriptionButtonClick = async () => {
        // Ligar o loading
        setLoading(true)
        // Fazer requisição de inscrição
        const subscriptionResult = await subscribeUserOnEvent(eventId._id, user.loggedToken)
        // Desligar o Loading
        setLoading(false)
        // Verificar se fez a requisição certinho
        if (!subscriptionResult) {
            alert('Não foi possível concluir a inscrição')
            return
        }
        navigation.reset({
            routes: [{ name: 'Home' }]
        })
    }


    return (
        <>
            {/* Parte dos Posts */}
            {title && (
                <MainScrollView
                    refreshControl={
                        <RefreshControl
                            onRefresh={() => {
                                navigation.reset({
                                    routes: [{ name: 'Home' }]
                                })
                            }}
                        />
                    }
                >
                    <PostPageContainer>

                        <VirtualSpacer />

                        {/* Imagem Cover */}
                        {image && (
                            <>
                                <PostCoverImage source={{ uri: coverImageUri }} />
                                <FakeImageSpacing />
                            </>
                        )}

                        {/* Título da Postagem*/}
                        {title && (
                            <PostCardContainer>
                                <TitleText>{title}</TitleText>
                            </PostCardContainer>
                        )}

                        {/* Tópicos da Postagem */}
                        {topics.length != 0 && topics.map((topic, k) => (
                            <PostCardContainer key={k}>
                                <TitleTopic>{topic.title}</TitleTopic>
                                <TopicText>{topic.text}</TopicText>
                            </PostCardContainer>
                        ))}

                        {/* Quadro de pessoas */}
                        {peopleBoard.length != 0 && peopleBoard.map((board, key) => (
                            <PostCardContainer key={key}>
                                <TitleTopic>{board.title}</TitleTopic>
                                {board.people.length > 0 &&
                                <RenderItensInColumns
                                    columns={3}
                                    data={board.people}
                                    renderItems={(i, k) => <PersonSquare key={k} image={i.image} name={i.name} />}
                                />}
                            </PostCardContainer>
                        ))}

                        {/* Links da Postagem */}
                        {links.length != 0 && (
                            <PostCardContainer>
                                <TitleTopic>Links</TitleTopic>
                                {links.map((item, k) => (
                                    <LinkTo
                                        key={k}
                                        text={item.title ? item.title : ''}
                                        link={item.url ? item.url : ''}
                                        icon={'link'}
                                    />
                                ))}
                            </PostCardContainer>
                        )}

                        {/* Quadro de Ligação */}
                        {callTo.length != 0 && (
                            <PostCardContainer>
                                <TitleTopic>Ligação</TitleTopic>
                                {callTo.map((item, k) => (
                                    <LinkTo
                                        key={k}
                                        text={item.name ? item.name : ''}
                                        link={`tel: ${item.phone ? item.phone : ''}`}
                                        icon='phone'
                                    />
                                ))}
                            </PostCardContainer>
                        )}

                        {/* Área para Postagens relacionadas a Evento */}
                        {(user.name && eventSituation == 'unsubscribed') && (
                            <SubscribeButtonContainer>
                                <SignButton
                                    text='Inscrever'
                                    loading={false}
                                    onPress={handleSubscriptionButtonClick}
                                />
                            </SubscribeButtonContainer>
                        )}
                        {(user.name && eventSituation == 'unconfirmed') && (
                            <QRCodeContainer>
                                <TitleText>{title}</TitleText>
                                <QRCode
                                    value={user.identificator}
                                    size={200}
                                    backgroundColor='#E2F0D7'
                                />
                                <TopicText>
                                    Para Confirmar sua inscrição, mostre este QR code para seu líder
                                </TopicText>
                            </QRCodeContainer>
                        )}
                        {(user.name && eventSituation == 'confirmed') && (
                            <SubscriberCard>
                                <SubscriberText>
                                    Você já se Inscreveu neste evento.
                                </SubscriberText>
                            </SubscriberCard>
                        )}
                        {(eventId && user.type <= 1) && (
                            <OpenQrCodeScannerButton
                                onPress={() => navigation.navigate('QrCodeScanner', {
                                    mode: 'event',
                                    eventInformations: { title, image, eventId: eventId._id }
                                })}
                            >
                                <Icon name='qr-code-scanner' size={30} color='#FFF' />
                            </OpenQrCodeScannerButton>
                        )}
                        {(eventId && user.type <= 1) && (
                            <SubscriptionList
                                eventId={eventId._id}
                            />
                        )}


                    </PostPageContainer>
                </MainScrollView>
            )}

            {/* Parte de Album do Album de Imagens */}
            {albumTitle && (
                <View>
                    <PostPageAlbumContainer>

                        {/* Títul do Album */}
                        {albumTitle && (
                            <AlbumHeader>
                                <AlbumTitle>{albumTitle}</AlbumTitle>
                            </AlbumHeader>
                        )}

                        {/* FlatList do Album */}
                        {images.length != 0 && (
                            <AlbumImagesList
                                data={images}
                                keyExtractor={(item, index) => index}
                                renderItem={(item) => (
                                    <ImageItem
                                        props={item}
                                        onPress={handleImageAlbumClick}
                                    />
                                )}
                                numColumns={3}
                            />
                        )}

                    </PostPageAlbumContainer>
                </View>
            )}
        </>
    )
}

const ImageItem = ({ props, onPress }) => {
    return (
        <ImageTouchableView onPress={() => onPress(props.index)}>
            <ParticularImageItem source={{ uri: albumImageAdress + props.item }} />
        </ImageTouchableView>
    )
}

export default PostPage;
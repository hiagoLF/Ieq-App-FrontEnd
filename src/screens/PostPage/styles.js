// Node Modules
import styled from 'styled-components/native'

export const PostPageContainer = styled.View`
    flex: 1;
    align-items: center;
`;

export const VirtualSpacer = styled.View`
    height: 10px;
`;

export const PostCoverImage = styled.Image`
    width: 100%;
    height: 200px;
    position: absolute;
`;

export const FakeImageSpacing = styled.View`
    width: 100%;
    height: 180px;
`;

export const TitleText = styled.Text`
    font-size: 24px;
    font-weight: bold;
`;

export const TitleTopic = styled.Text`
    font-size: 20px;
    font-weight: bold;
`;

export const TopicText = styled.Text`
    font-size: 18px;
    text-align: center;
    margin-bottom: 5%;
    padding: 5px;
`;

export const PostPageAlbumContainer = styled.View`
    width: 100%;
`;

export const AlbumHeader = styled.View`
    background-color: #140F2F;
    height: 58px;
    width: 100%;
    margin-bottom: 8px;
    justify-content: center;
    align-items: center;
`;

export const AlbumTitle = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #FFF;
`;

export const AlbumImagesList = styled.FlatList`
    width: 100%;
`;

export const ImageTouchableView = styled.TouchableOpacity`
    width: 31.42%;
    height: 200px;
    margin: 1%;
`;

export const ParticularImageItem = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 10px;
`;

export const SubscribeButton = styled.TouchableOpacity`
    width: 80%;
    height: 80px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background-color: #DA89A4;
    border: 1px #000;
    margin-bottom: 10px;
`;

export const SubscribeText = styled.Text`
    font-size: 30px;
    font-weight: bold;
`;

export const SubscriberCard = styled.View`
    width: 90%;
    height: 150px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 3px dotted #001E42;
    margin-bottom: 10px;
    background-color: #c9fbbc;
`;

export const SubscriberText = styled.Text`
    font-size: 25px;
    font-weight: bold;
    text-align: center;
`;

export const SubscribeButtonContainer = styled.View`
    width: 90%;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
`;

export const QRCodeContainer = styled.View`
    width: 100%;
    justify-content: space-between;
    align-items: center;
    height: 320px;
    margin-top: 10px;
`;

export const OpenQrCodeScannerButton = styled.TouchableOpacity`
    width: 90%;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: #020;
    border: 1px solid #000;
    margin: 10px 0;
    padding: 10px ;
`;

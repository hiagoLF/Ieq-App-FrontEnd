import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const CreatePostPageContainer = styled.View`
    width: 98%;
    border-radius: 20px;
    background-color: #FFF;
    flex: 1;
    margin: 10px 0;
    padding: 20px 0;
    justify-content:center;
    align-items: center;
`;

export const HeaderCP = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

export const FormField = styled.View`
    justify-content: center;
    align-items: center;
    width: 96%;
`;

export const ImageInputContainer = styled.View`
    width: 100%;
    margin-bottom: 10px;
`;

export const NormalInputTitleText = styled.Text`
    font-size: 18px;
`;

export const PreviewImageContainer = styled.View`
    width: 100%;
`;

export const CloseImageButton = styled.TouchableOpacity`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 3;
`;

export const PreviewImage = styled.Image`
    width: 100%;
    height: 270px;
    border-radius: 10px;
`;

export const InsertImageInput = styled.TouchableOpacity`
    height: 30px;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: #D2D2D2;
    border-radius: 5px;
    border: 2px dotted #000;
`;

export const EditorsTable = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
`;

export const SectionTitle = styled.View`
    font-size: 18px;
`;

export const InsertEditorButton = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 5px 0;
`;

export const SwitchTextGreen = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #1E9700;
`;

export const SwitcTextRed = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #CB1313;
`;

export const PublicSwitchContainer = styled.View`
    margin-top: 10px;
    width: 100%;
`;

export const SwitchContainer = styled.View`
    flex-direction: row;
    margin-left: 10px;
    margin-top: 5px;
`;

export const CreatePostButton = styled.TouchableOpacity`
    width: 100%;
    height: 52px;
    justify-content: center;
    align-items: center;
    background-color: #81F18C;
    border-radius: 10px;
    margin-top: 20px;
    border: 1px solid #000;
`;

export const CreatePostButtonText = styled.Text`
    font-weight: bold;
    font-size: 24px;
`;

export const AlbumImagesList = styled.FlatList``;

export const AlbumImage = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 5px;
    position: absolute;
`;

export const ListContainer = styled.View`
    width: 100%;
    padding: 0 1%;
    flex: 1;
`;

export const AlbumImagePressable = styled.TouchableOpacity`
    width: 31%;
    height: 105px;
    margin: 1%;
`;

export const AlbumFormField = styled.View`
    flex: 1;
    width: 98%;
`;

export const LoadingIndicator = styled.ActivityIndicator``;
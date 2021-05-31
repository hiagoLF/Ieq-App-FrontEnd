import styled from 'styled-components/native';

export const FormContainer = styled.View`
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    margin: 4%;
    border-radius: 10px;
    padding: 30px 0 30px;
`;

export const HeaderTitle = styled.Text`
    font-size: 30px;
    border-bottom-color: #000;
    border-bottom-width: 1px;
    margin-bottom: 20px;
`;

export const SwitchContainer  = styled.View`
    flex-direction: row;
    width: 95%;
    margin-bottom: 3%;
`;

export const HeaderTitleSwitch = styled.Text`
    font-size: 27px;
    font-weight: bold;
    margin: 0 1% 0 2%;
`;

export const SwitchOfPublic = styled.Switch``;

export const PickImageContainer = styled.View`
    width: 95%;
`;

export const HeaderPickImage = styled.Text`
    font-size: 25px;
    font-weight: bold;
    margin-left: 2%;
`;

export const ImagePreview = styled.Image`
    width: 300px;
    height: 200px;
    border-radius: 20px;
    margin-top: 4%;
`;

export const PickImageButton = styled.TouchableOpacity`
    border: solid 2px #000;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    padding: 1% 0;
`;

export const ImagePreviewContainer = styled.View`
    justify-content: center;
    align-items: center;
`;

export const CancelImageButton = styled.TouchableOpacity`
    position: absolute;
    z-index: 5;
    right: 4.5%;
    top: 0;
`;
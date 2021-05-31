import styled from 'styled-components/native';


export const MainScrollView = styled.ScrollView`
    flex: 1;
    background-color: #E2F0D7;
`;

export const MainView = styled.View`
    flex: 1;
    background-color: #E2F0D7;
`;

export const PostCardContainer = styled.View`
    width: 96%;
    border-radius: 10px;
    background-color: #A0C5A1;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    margin-bottom: 10px;
`;

export const FormCard = styled.View`
    width: 95%;
    background-color: #94C5A7;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
`;

export const SignPageButton = styled.TouchableOpacity`
    flex-direction: row;
    width: 98%;
    justify-content: center;
    align-items: center;
    margin-bottom: 6%;
`;

export const SignButtonTextNormal = styled.Text`
    font-size: 14px;
`;

export const SignButtonTextBold = styled.Text`
    font-size: 14px;
    font-weight: bold;
`;

export const BoldText = styled.Text`
    font-size: 24px;
    font-weight: bold;
`;

export const NormalText = styled.Text`
    font-size: 24px;
`;

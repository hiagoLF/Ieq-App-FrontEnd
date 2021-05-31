// Node Modules
import styled from 'styled-components'



// Styled Components
export const ProfileScreenContainer = styled.View`
    background-color: #E2F0D7;
    width: 100%;
    align-items: center;
`;

export const UserImageProfile = styled.Image`
    width: 96%;
    height: 269px;
    border-radius: 10px;
    margin: 5px 0;
`;

export const BoldText = styled.Text`
    font-size: 24px;
    font-weight: bold;
`;

export const NormalText = styled.Text`
    font-size: 24px;
`;

export const BoldTitleText = styled.Text`
    font-size: 18px;
    font-weight: bold;
`;

export const MemberSinceContainer = styled.View`
    flex-direction: row;
    width: 90%;
    justify-content: space-between;
`;

export const NotAuthorizedCard = styled.View`
    width: 100%;
    padding: 25px;
    justify-content: center;
    align-items: center;
`;

export const NotAuthorizedTitleCard = styled.Text`
    font-weight: 400;
    font-size: 24px;
    color: #BC1414;
    margin-bottom: 15px;
`;

export const NotAuthorizedDescriptionCard = styled.Text`
    font-size: 18px;
    margin-bottom: 25px;
`;

export const ConfigButtonContainer = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: #F4FFEB;
    border: solid #BFBFBF 1px;
    padding: 10px;
`;
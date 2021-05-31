import styled from 'styled-components/native'

export const EditImageScreenContainer = styled.View`
	width: 100%;
	height: 100%;
	justify-content: space-between;
	align-items: center;
`;

export const ProfileImage = styled.Image`
	width: 100%;
	height: 300px;
`;

export const EditButons = styled.View`
	flex-direction: row;
	width: 100%;
	height: 58px;
	justify-content: space-between;
	align-items: center;
`;

export const ParticularEditButton = styled.TouchableOpacity`
	height: 100%;
	width: 48%;
	justify-content: center;
	align-items: center;
`;

export const LoadingContainer = styled.View`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

export const LoadingImageIndicator = styled.ActivityIndicator``;
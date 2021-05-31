// Node Modules
import styled from 'styled-components/native'

const generalColor = '#8b008b'

export const MainContainer = styled.ScrollView`
    background-color: ${() => generalColor};
    flex: 1;
`;

export const MainContainerView = styled.View`
    background-color: ${() => generalColor};
    flex: 1;
    justify-content: center;
    align-items: center;
`;

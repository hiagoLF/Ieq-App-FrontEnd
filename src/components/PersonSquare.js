import React from 'react';
import styled from 'styled-components'

const PersonSquare = ({ name, image }) => {

    return (
        <SquareContainer>
            <PersonImage source={{ uri: image }} />
            <PersonNameContainer>
                <PersonName>{name}</PersonName>
            </PersonNameContainer>
        </SquareContainer>
    )
}

const SquareContainer = styled.View`
    background-color: #C9DBB7;
    justify-content: space-between;
    align-items: center;
    width: 96%;
    height: 174px;
    border-radius: 5px;
    margin: 6px 0;
`;

const PersonImage = styled.Image`
    width: 100%;
    height: 100px;
    border-radius: 5px;
`;

const PersonNameContainer = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
    margin: 0 3%;
`;

const PersonName = styled.Text`
    font-weight: bold;
    font-size: 18px;
    text-align: center;
`;

export default PersonSquare;
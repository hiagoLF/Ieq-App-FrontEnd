import React from 'react';
import styled from 'styled-components/native'


const LoadingIndicator = ({ loading,  }) => {

    return (
        <LoadingContainer>
            {loading &&
                <LoadingElement size="large" color="#000" />
            }
        </LoadingContainer>
    )
}

const LoadingContainer = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
    min-height: 10px;
`;

const LoadingElement = styled.ActivityIndicator``;

export default LoadingIndicator;
// Node Modules
import React from 'react';
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const DeleteButton = ({ loading, onPress }) => {
    return (
        <DeleteButtonPressable
            onPress={loading ? null : onPress}
        >
            {loading ? (
                <LoadingIndicator size='large' color='#b01c1c' />
            ) : (
                    <Icon name='delete-forever' size={30} color='#b01c1c' />
                )}
        </DeleteButtonPressable>
    )
}

const DeleteButtonPressable = styled.TouchableOpacity`
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    height: 40px;
`;

const LoadingIndicator = styled.ActivityIndicator``;

export default DeleteButton;
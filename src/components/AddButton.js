import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components/native'

const AddButton = ({ onPress }) => {
    return (
        <AddButtonPressable
            onPress={onPress}
        >
            <Icon name='add-circle' size={40} color='#000' />
        </AddButtonPressable>
    )
}

const AddButtonPressable = styled.TouchableOpacity`
    width: 96%;
    height: 70px;
    justify-content: center;
    align-items: center;
    background-color: #94C5A7;
    border-radius: 20px;
    margin-top: 7px;
`;

export default AddButton;
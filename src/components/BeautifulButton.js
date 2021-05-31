import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components/native'

const BeautifulButton = ({onPress, text}) => {
  return (
      <ButtonPressable
        onPress={onPress}
      >
          <Icon name='person-add' size={25} color='#000'/>
          <ButtonTitleText>{text}</ButtonTitleText>
      </ButtonPressable>
  )
}

const ButtonPressable = styled.TouchableOpacity`
    width: 100%;
    height: 40px;
    border-radius: 5px;
    background-color: #DA89A4;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 5px 10px;
    border: 2px solid #000;
`;

const ButtonTitleText = styled.Text`
    font-size: 18px;
`;

export default BeautifulButton;
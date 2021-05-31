// Node Modules
import React from 'react';
import styled from 'styled-components/native'

const InputGeneric = ({title, placeholder, onChangeText, multiline, value}) => {
  return (
      <InputGenericContainer>
        {title && <InputTitle>{title}</InputTitle>}
        <InputComponent
            placeholder={placeholder}
            onChangeText={onChangeText}
            multiline={multiline}
            value={value}
        />
      </InputGenericContainer>
  )
}


const InputGenericContainer = styled.View`
    width: 100%;
    margin-bottom: 10px;
`;

const InputTitle = styled.Text`
    font-size: 18px;
    margin-left: 5px;
`;

const InputComponent = styled.TextInput`
    width: 100%;
    font-size: 20px;;
    padding-left: 5px;
    background-color: #D2D2D2;
    border-radius: 5px;
    padding-left: 10px;
    padding-right: 10px;
`;

export default InputGeneric;
// Node Modules
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components/native'


const SignInput = ({ 
    title = 'Exemplo', 
    icon = 'person', 
    placeholder = 'Exemplo', 
    onChangeText=null,
    secureTextEntry=false 
}) => {
    return (
        <InputContainer>
            <TitleInput>{title}</TitleInput>
            <FieldInput>
                <Icon name={icon} size={40} color="#000" />
                <InputText
                    placeholder={placeholder}
                    onChangeText={t => onChangeText(t)}
                    secureTextEntry={secureTextEntry}
                />
            </FieldInput>
        </InputContainer>
    )
}

const InputContainer = styled.View`
    width: 100%;
    flex-direction: column;
    margin-bottom: 2%;
`;

const TitleInput = styled.Text`
    font-size: 20px;
    margin-left: 2%;
`;

const FieldInput = styled.View`
    width: 100%;
    background-color: #FFF;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
`;

const InputText = styled.TextInput`
    width: 85%;
    font-size: 24px;
`;

export default SignInput;
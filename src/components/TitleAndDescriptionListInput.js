// Node Modules
import React, { useState } from 'react';
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/MaterialIcons'

// Local Modules
import InputGeneric from '../components/InputGeneric'

const TitleAndDescriptionListInput = ({
    InputTitle,
    titleName,
    titleText,
    descripionName,
    descripionText,
    onTableChane,
    listValue,
}) => {

    // Funções....................................................
    const handleAddElementButtonClick = () => {
        const newArray = [...listValue]
        newArray.push({})
        newArray[newArray.length-1][titleName] = ''
        newArray[newArray.length-1][descripionName] = ''
        onTableChane(newArray)
    }
    const handleChangeInput = (text, key, field) => {
        const newArray = [...listValue]
        newArray[key][field] = text
        onTableChane(newArray)
    }
    const removeElementFromList = (k) => {
        const newArray = [...listValue]
        newArray.splice(k, 1)
        onTableChane(newArray)
    }

    // Render Method.................................................................
    return (
        <Table>
            <DescriptionText>{InputTitle}</DescriptionText>
            <TableContainer>
                {listValue.map((item, k) => (
                    <ItemContainer key={k}>
                        <InputElement
                            placeholder={titleText}
                            onChangeText={(t) => handleChangeInput(t, k, titleName)}
                            value={item[titleName]}
                        />
                        <InputElement
                            placeholder={descripionText}
                            onChangeText={(t) => handleChangeInput(t, k, descripionName)}
                            value={item[descripionName]}
                        />
                        <CloseElementButton
                            onPress={() => removeElementFromList(k)}
                        >
                            <Icon name='cancel' size={24} color='red' />
                        </CloseElementButton>
                    </ItemContainer>
                ))}
                <AddElementButton
                    onPress={handleAddElementButtonClick}
                >
                    <Icon name='library-add' size={30} color='#000' />
                </AddElementButton>
            </TableContainer>
        </Table>
    )
}


const Table = styled.View`
    margin-top: 10px;
    width: 100%;
`;

const DescriptionText = styled.Text`
    font-size: 18px;
    padding-left: 3px;
`;

const TableContainer = styled.View`
    width: 100%;
    border-radius: 5px;
    border: 2px solid #000;
`;

const ItemContainer = styled.View`
    width: 100%;
    border-bottom-color: #000;
    border-bottom-width: 1px;
    flex-direction: row;
`;

const InputElement = styled.TextInput`
    background-color: #D2D2D2;
    flex: 1;
    margin: 5px 3px;
    border-radius: 5px;
    padding-left: 10px;
    padding-right: 10px;
`;

const CloseElementButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    padding-right: 2px;
`;

const AddElementButton = styled.TouchableOpacity`
    width: 100%;
    justify-content: center;
    align-items: center;
`;


export default TitleAndDescriptionListInput;
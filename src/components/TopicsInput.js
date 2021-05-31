// Node Modules
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components/native'

// Local Modules
import InputGeneric from '../components/InputGeneric'

const TopicsInput = ({ topicsList, onListChange }) => {

    // Funções...................................................
    const handleAddTopicButtonClick = () => {
        const newList = [...topicsList]
        newList.push({ title: '', text: '' })
        onListChange(newList)
    }
    const handleInputTextChange = (text, listIndex, field) => {
        const newList = [...topicsList]
        newList[listIndex][field] = text
        onListChange(newList)
    }
    const handleDeleteIndexButtonClick = (index) => {
        const newList = [...topicsList]
        newList.splice(index, 1)
        onListChange(newList)
    }

    return (
        <TopicsInputComponent>
            <NormalTitleText>Tópicos</NormalTitleText>

            <TopicsContainer>
                {topicsList.map((topic, k) => (
                    <TopicField key={k}>
                        <InputGeneric
                            title='Título'
                            onChangeText={(t) => handleInputTextChange(t, k, 'title')}
                            value={topic.title}
                        />
                        <CloseButton onPress={(k) => handleDeleteIndexButtonClick(k)}>
                            <Icon name='cancel' size={25} color='#000' />
                        </CloseButton>
                        <InputGeneric title='Texto'
                            onChangeText={(t) => handleInputTextChange(t, k, 'text')}
                            multiline={true}
                            value={topic.text}
                        />
                    </TopicField>
                ))}

                <AddTopicButton onPress={handleAddTopicButtonClick}>
                    <Icon name='library-add' size={30} color='#000' />
                </AddTopicButton>
            </TopicsContainer>
        </TopicsInputComponent>
    )
}

/* Styled Components */
const TopicsInputComponent = styled.View`
    width: 100%;
    margin-bottom: 10px;
`;

const NormalTitleText = styled.Text`
    font-size: 18px;
    font-weight: 400;
`;

const TopicsContainer = styled.View`
    width: 100%;
    border: 2px solid #000;
    border-radius: 5px; 
    justify-content: center;
    align-items: center;
`;

const AddTopicButton = styled.TouchableOpacity`
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const TopicField = styled.View`
    width: 99%;
    border-bottom-color: #000;
    border-bottom-width: 2px;
    margin-top: 10px;
`;

const CloseButton = styled.TouchableOpacity`
    position: absolute;
    right: 5px;
`;

export default TopicsInput;
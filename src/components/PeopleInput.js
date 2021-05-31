// Node Modules
import React, {useState} from 'react';
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

// Local Modules
import InputGeneric from '../components/InputGeneric'
import AddPersonModal from '../components/AddPersonModal'

const PeopleInput = ({peopleTable, onPeopleTableChange}) => {

    // States
    const [addPersonModalOpen, setAddPersonModalOpen] = useState(false)
    const [addPesonOnListIndex, setAddPesonOnListIndex] = useState(undefined)

    // Functions.............................................................
    const handleAddTableButtonClick = () => {
        const newTable = [...peopleTable]
        newTable.push({title: '', people: []})
        onPeopleTableChange(newTable)
    }
    const handleAddPesonButtonClick = (index) => {
        setAddPesonOnListIndex(index)
        setAddPersonModalOpen(true)
    }
    const handleClosePeopleListButton = (index) => {
        const newTable = [...peopleTable]
        newTable.splice(index, 1)
        onPeopleTableChange(newTable)
    }
    const handleInputTitleChangeText = (titleText, index) => {
        const newTable = [...peopleTable]
        newTable[index].title = titleText
        onPeopleTableChange(newTable)
    }
    const handleRemovePersonButtonClick = (tableIndex, listIndex) => {
        const newTable = [...peopleTable]
        newTable[tableIndex].people.splice(listIndex, 1)
        onPeopleTableChange(newTable)
    }

    return (
        <PeopleInputContainer>

            <AddPersonModal
                visible={addPersonModalOpen}
                onPeopleTableChange={onPeopleTableChange}
                addPesonOnListIndex={addPesonOnListIndex}
                peopleTable={peopleTable}
                onButtonClose={() => setAddPersonModalOpen(false)}
                setVisible={setAddPersonModalOpen}
            />

            <TitleHeaderText>Quadro de pessoas</TitleHeaderText>
            
            <PeopleInputCardContent>

                {peopleTable.map((list, k) => (
                    <PeopleListContainer key={k}>

                        <ClosePeopleList onPress={() => handleClosePeopleListButton(k)}>
                            <Icon name='cancel' size={25} color='#000'/>
                        </ClosePeopleList>

                        <InputGeneric 
                            title='Título do quadro'
                            onChangeText={(t) => handleInputTitleChangeText(t, k)}
                            value={list.title}
                        />

                        <HeaderPersonListText>Pessoas</HeaderPersonListText>
                        {list.people.map((person, i) => (
                            <PersonContainer key={i}>
                                <PersonImage
                                    source={{uri: person.image}}
                                />
                                <PersonName>{person.name}</PersonName>
                                <RemovePersonButton
                                    onPress={() => handleRemovePersonButtonClick(k, i)}
                                >
                                    <Icon name='cancel' size={24} color='red'/>
                                </RemovePersonButton>
                            </PersonContainer>
                        ))}

                        <AddPersonButton onPress={() => handleAddPesonButtonClick(k)}>
                            <Icon name='person-add' size={25} color='#000'/>
                        </AddPersonButton>
                    </PeopleListContainer>
                ))}

                <AddTableButton onPress={handleAddTableButtonClick}>
                    <Icon name='library-add' size={30} color='#000'/>
                </AddTableButton>

            </PeopleInputCardContent>
        </PeopleInputContainer>
    )
}

const PeopleInputContainer = styled.View`
    width: 100%;
`;

const TitleHeaderText = styled.Text`
    font-size: 18px;
`;

const PeopleInputCardContent = styled.View`
    justify-content: center;
    align-items: center;
    border: 2px solid #000;
    border-radius: 5px;
`;

const AddTableButton = styled.TouchableOpacity`
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const PeopleListContainer = styled.View`
    width: 100%;
    border-bottom-color: #000;
    border-bottom-width: 1px;
    padding: 3px;
`;

const ClosePeopleList = styled.TouchableOpacity`
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 2px 0;
    background-color: #f5f5f5;
`;

const AddPersonButton = styled.TouchableOpacity`
    width: 100%;
    background-color: #D2D2D2;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`;

const HeaderPersonListText = styled.Text`
    font-size: 16px;
`;

const PersonContainer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
`;

const PersonImage = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 5px;
`;

const PersonName = styled.Text`
    flex-direction: row;
    flex: 1;
    font-size: 18px;
    font-weight: bold;
    padding: 0 10px;
`;

const RemovePersonButton = styled.TouchableOpacity``;

export default PeopleInput;
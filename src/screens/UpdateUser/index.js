// Node Modules
import React, { useState, useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

// Local Modules
import {
    UpdateUserPageContainer,
    EditImageButton,
    ProfileImage,
    EditableValue,
    PostCardContent,
    RemoveUserButton,
} from './styles'
import HeaderPage from '../../components/HeaderPage'
import { MainView } from '../../generic-styles';
import { useUser } from '../../Contexts'
import { PostCardContainer, BoldText, NormalText } from '../../generic-styles'
import InsertTextModal from '../../components/InsertTextModal'
import {
    userUpdateRequest,
    userRequest,
    deleteUserRequest
} from '../../api/userApi'
import SelectPrivilegeModal from '../../components/SelectPrivilegeModal'
import ConfirmCancelModal from '../../components/ConfirmCancelModal'

const imageProfileSource = 'https://ieq-app-image-storage.s3-sa-east-1.amazonaws.com/users-profile-image/'

const UpdateUser = ({ route }) => {

    // Instances .................................
    const navigation = useNavigation()
    const { person } = route.params

    // Contexts
    const [user, setUser] = useUser()

    // States
    const [name, setName] = useState(person ? person.name : undefined)
    const [memberSince, setMemberSince] = useState(person ? person.memberSince : undefined)
    const [type, setType] = useState(person ? person.type : undefined)
    const [identificator, setIdentificator] = useState(person ? person.identificator : undefined)
    const [image, setImage] = useState(person ? person.image : undefined)
    const [login, setLogin] = useState(person ? person.login : undefined)

    const [fieldToEdit, setFieldToEdit] = useState()
    const [fieldToEditTranslated, setFieldToEditTranlated] = useState('')
    const [fieldValueToEdit, setFieldValueToEdit] = useState('')
    const [editTextFieldModalOpen, setEditTextFieldModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [editPrivilegeModalOpen, setEditPrivilegeModalOpen] = useState(false)
    const [removeUserModalOpen, setRemoveUserModalOpen] = useState(false)

    // Effects...................................................
    useFocusEffect(() => {
        const onGoBackActivity = async () => {
            if (route.params.userEdited) {
                route.params.userEdited = false
            } else {
                return
            }
            // Buscar Informa????es do usu??rio
            const userRequestResult = await userRequest(identificator, user.loggedToken)
            // Verificar se buscou
            if (!userRequestResult) {
                alert('N??o foi poss??vel buscar as novas informa????es do usu??rio')
            }
            // Atualizar as informa????es do usu??rio no state
            setImage(userRequestResult.image)
        }
        onGoBackActivity()
    })

    // Functions..................................................
    // Bot??o de Editar alguma informa????o de Texto ?? clicado
    const handleEditTextButtonClick = (field) => {
        // Definir field a ser alterado
        field == 'name' && setFieldToEditTranlated('Nome')
        field == 'memberSince' && setFieldToEditTranlated('Membro Desde')
        field == 'password' && setFieldToEditTranlated('Senha')
        field == 'login' && setFieldToEditTranlated('Login')
        setFieldToEdit(field)
        // Abrir Modal de Editar Texto
        setEditTextFieldModalOpen(true)
    }

    // Bot??o de alterar texto no modal ?? clicado
    const handleEditTextModalButtonClick = async (dataToSend = undefined) => {
        // Ligar Loading
        setLoading(true)
        // Montar o JSON
        console.log(dataToSend)
        var data = {}
        dataToSend ? data[dataToSend.field] = dataToSend.value : data[fieldToEdit] = fieldValueToEdit
        // Alterar informa????es do usu??rio
        console.log(data)
        const userUpdateRequestResult = await userUpdateRequest(data, identificator, user.loggedToken)
        // Verificar se alterou
        if (!userUpdateRequestResult) {
            alert('N??o foi poss??vel Alterar esta informa????o')
            return
        }
        // Buscar Informa????es do usu??rio
        const userRequestResult = await userRequest(identificator, user.loggedToken)
        // Verificar se buscou
        if (!userRequestResult) {
            alert('N??o foi poss??vel buscar as novas informa????es do usu??rio')
        }
        // Atualizar as informa????es do usu??rio no state
        setName(userRequestResult.name)
        setMemberSince(userRequestResult.memberSince)
        setType(userRequestResult.type)
        setLogin(userRequestResult.login)
        // Desligar Loading e fechar modal
        setLoading(false)
        setEditTextFieldModalOpen(false)
    }

    // Quando novo Privil??gio ?? Selecionado .....................................
    const handlePrivilegeButtonPress = async (privilegeSelected) => {
        // Fechar Modal
        setEditPrivilegeModalOpen(false)
        // Chamar fun????o handleEditTextModalButtonClick com os fatores
        handleEditTextModalButtonClick({ field: 'type', value: privilegeSelected })
    }

    // Quando usu??rio ?? confirmado para ser deletado .............................
    const handleDeleteUserButtonClick = async () => {
        // Fechar Modal de deletar Usu??rio
        setRemoveUserModalOpen(false)
        // Requisi????o para deletar
        const deleteUserResult = await deleteUserRequest(identificator, user.loggedToken)
        // Ver se deletou
        if (!deleteUserResult) {
            alert('N??o foi poss??vel deletar o usu??rio')
            return
        }
        // Voltar para Home
        navigation.reset({
            routes: [{ name: 'Home' }]
        })
    }

    // Fun????o chamada quando o usu??rio retornar para esta p??gina
    return (
        <MainView>
            <UpdateUserPageContainer>

                {/* Modal Para Editar Usu??rio */}
                <ConfirmCancelModal
                    text='Deletar usu??rio?'
                    confirmButtonText='Sim'
                    cancelButtonText='N??o'
                    onButtonConfirm={handleDeleteUserButtonClick}
                    onButtonCancel={() => setRemoveUserModalOpen(false)}
                    modalOpen={removeUserModalOpen}
                />

                {/* Modal para Editar Privil??gio */}
                <SelectPrivilegeModal
                    visible={editPrivilegeModalOpen}
                    onCloseButton={() => setEditPrivilegeModalOpen(false)}
                    onPrivilegePress={handlePrivilegeButtonPress}
                />

                {/* Modal para Editar Informa????es de Texto*/}
                <InsertTextModal
                    text={'Alterar ' + fieldToEditTranslated}
                    placeholder='digite o novo valor'
                    visible={editTextFieldModalOpen}
                    onChangeText={(text) => setFieldValueToEdit(text)}
                    buttonText='Alterar'
                    onButtonPress={() => handleEditTextModalButtonClick()}
                    buttonLoading={loading}
                    onCloseButtonClick={() => setEditTextFieldModalOpen(false)}
                    defaultValue={null}
                />

                {/* Cabe??alho */}
                <HeaderPage
                    text='Usu??rio'
                    onButtonBack={() => navigation.goBack()}
                />

                {/* Imagem de Perfil */}
                <EditImageButton
                    onLongPress={() => navigation.navigate('EditImage', {
                        identificator,
                        image,
                    })}
                >
                    <ProfileImage
                        source={{ uri: imageProfileSource + image }}
                    />
                </EditImageButton>

                {/* Nome */}
                <EditableValue
                    onLongPress={() => handleEditTextButtonClick('name')}
                >
                    <PostCardContainer>
                        <BoldText>{name}</BoldText>
                    </PostCardContainer>
                </EditableValue>

                {/* Login */}
                <EditableValue
                    onLongPress={() => handleEditTextButtonClick('login')}
                >
                    <PostCardContainer>
                        <PostCardContent>
                            <NormalText>Login</NormalText>
                            <BoldText>{login}</BoldText>
                        </PostCardContent>
                    </PostCardContainer>
                </EditableValue>

                {/* Membro Desde */}
                <EditableValue
                    onLongPress={() => handleEditTextButtonClick('memberSince')}
                >
                    <PostCardContainer>
                        <PostCardContent>
                            <NormalText>Membro desde</NormalText>
                            <BoldText>{memberSince}</BoldText>
                        </PostCardContent>
                    </PostCardContainer>
                </EditableValue>


                {/* Senha */}
                <EditableValue
                    onLongPress={() => handleEditTextButtonClick('password')}
                >
                    <PostCardContainer>
                        <PostCardContent>
                            <NormalText>Senha</NormalText>
                            <BoldText>******</BoldText>
                        </PostCardContent>
                    </PostCardContainer>
                </EditableValue>

                {/* Privil??gio */}
                <EditableValue
                    onLongPress={() => setEditPrivilegeModalOpen(true)}
                >
                    <PostCardContainer>
                        <PostCardContent>
                            <NormalText>Privil??gio</NormalText>
                            <BoldText>
                                {type == 0 && 'Administrador'}
                                {type == 1 && 'L??der'}
                                {type == 2 && 'Membro'}
                                {type == 3 && 'N??o Confirmado'}
                            </BoldText>
                        </PostCardContent>
                    </PostCardContainer>
                </EditableValue>

                {/* Bot??o de Remover */}
                <RemoveUserButton
                    onLongPress={() => setRemoveUserModalOpen(true)}
                >
                    <Icon name='delete-forever' size={30} color='#000' />
                </RemoveUserButton>

            </UpdateUserPageContainer>
        </MainView>
    )
}

export default UpdateUser;
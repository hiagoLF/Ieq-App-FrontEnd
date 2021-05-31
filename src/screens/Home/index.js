// Node Modules
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'

// Local Modules
import {
    HomeContainer
} from './styled'
import {
    MainScrollView, MainView
} from '../../generic-styles'
import AddButton from '../../components/AddButton'
import HeaderHome from '../../components/HeaderHome'
import GateButton from '../../components/GateButton'
import InsertTextModal from '../../components/InsertTextModal'
import { useUser } from '../../Contexts/index'
import { getIndexesInformations } from '../../generic-functions/post'
import { createIndexRequest, editIndexRequest } from '../../api/postApi'
import { Vibration } from 'react-native';

const albumImageAdress = 'https://ieq-app-image-storage.s3-sa-east-1.amazonaws.com/albuns-images/'
const imageAdress = 'https://ieq-app-image-storage.s3-sa-east-1.amazonaws.com/covers-images/'

const Home = () => {
    // Contexts...............
    const [user] = useUser()

    // States................................
    const [indexes, setIndexes] = useState([])
    const [newIndexText, setNewIndexText] = useState('')
    const [modalButtonLoading, setModalButtonLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [modalEditIndexOpen, setModalEditIndexOpen] = useState(false)
    const [editionIndexParams, setEditionIndexParams] = useState({})


    // Other Hooks
    const navigation = useNavigation()

    // Effects................
    useEffect(() => {
        stablishPostsIndex()
    }, [])

    // Functions...................................
    // Estabelecendo Índicies de Postagem
    const stablishPostsIndex = async () => {
        // Definir o state indexes como loading true
        // ............
        // Buscar Informações dos índicies
        const indexesResult = await getIndexesInformations()
        // Se não encontrou nada ... Definir indexes como array vazio
        if (!indexesResult) {
            setIndexes([])
            return
        }
        // Se encontrou ... Definir o indexes com as informações que vieram
        setIndexes(indexesResult)
    }

    // .................................................
    // Lidando com o clique de botõeos 
    const handleGateButtonClick = (buttonKey) => {
        // Pegar id e name do índex que foi clicado
        const { _id, name } = indexes[buttonKey]
        // Navegar
        navigation.navigate('PostSwitch', { indexId: _id, name })
    }

    const handleAddIndexButtonClick = () => {
        setNewIndexText('')
        setModalVisible(true)
    }

    const handleModalButtonClick = async () => {
        // Ligar o loading
        setModalButtonLoading(true)
        // Fazer requisição de Criar índicie
        const indexCreationRequestResult = await createIndexRequest(newIndexText, user.loggedToken)
        // Verificar se fez mesmo --> Mostrar alert se não fez
        if (!indexCreationRequestResult) {
            alert('Não foi possível criar um novo índicie')
            setModalButtonLoading(false)
            return
        }
        // Se criou...
        // Deslisgar o loading
        setModalButtonLoading(false)
        // Fechar o Modal
        setModalVisible(false)
        // Atualizar as informações de índicies
        stablishPostsIndex()
    }

    const handleIndexLongPress = (indexId, lastText) => {
        // Verificar se o usuário é adm
        if (user.type >= 2) {
            alert('Não é possível editar este índicie')
            return
        }
        // Vibrar
        Vibration.vibrate(80)
        // Verificar se o índicie a se modificar não é de album ou evento
        if (indexId == '001' || indexId == '002') {
            alert('Não é possível editar este índicie')
            return
        }
        // Zerar o newIndexText
        setNewIndexText('')
        // Definir o índicie a ser editado
        setEditionIndexParams({ indexId, lastText })
        // Abrir o Modal
        setModalEditIndexOpen(true)
    }
    const handleEditIndexModalButtonClick = async () => {
        // Ligar o loading
        setModalButtonLoading(true)
        // Verificar se tem alguma coisa no texto
        if (editionIndexParams.indexId == '') {
            alert('É necessário digitar algo')
            setModalButtonLoading(false)
            return
        }
        // Fazer a requisição
        const editIndexRequestResponde = await editIndexRequest(
            editionIndexParams.indexId,
            newIndexText,
            user.loggedToken
        )
        // Ver se teve resposta
        if (!editIndexRequestResponde) {
            alert('Não foi possível alterar este índicie')
            setModalButtonLoading(false)
            return
        }
        // Desligar o loading
        setModalButtonLoading(false)
        // Fechar o modal
        setModalEditIndexOpen(false)
        // Atualizar as informações de índicies
        stablishPostsIndex()
    }


    return (
        <MainScrollView>
            <HomeContainer>

                {/* Modal de criação de novo índicie */}
                <InsertTextModal
                    visible={modalVisible}
                    placeholder='Digite o nome do índicie'
                    text='Criar índicie'
                    onChangeText={(t) => setNewIndexText(t)}
                    buttonText='Criar'
                    onButtonPress={handleModalButtonClick}
                    buttonLoading={modalButtonLoading}
                    onCloseButtonClick={() => setModalVisible(false)}
                />

                {/* Modal de Edição de índicie */}
                <InsertTextModal
                    visible={modalEditIndexOpen}
                    placeholder='novo nome do índicie'
                    text='Editar índicie'
                    onChangeText={(t) => setNewIndexText(t)}
                    buttonText='Editar'
                    onButtonPress={handleEditIndexModalButtonClick}
                    buttonLoading={modalButtonLoading}
                    onCloseButtonClick={() => setModalEditIndexOpen(false)}
                    defaultValue={modalEditIndexOpen.lastText}
                />

                <HeaderHome />

                {/* Botão de adicioar postagem */}
                {user.type < 2 && (
                    <AddButton
                        onPress={handleAddIndexButtonClick}
                    />
                )}

                {/* Botões de índicies de postagens */}
                {indexes.map((item, k) => (
                    <GateButton
                        key={k}
                        text={item.name}
                        image={(item._id == '002' ? albumImageAdress : imageAdress) + item.image}
                        onPress={() => handleGateButtonClick(k)}
                        onLongPress={() => handleIndexLongPress(item._id, item.name)}
                    />
                ))}
            </HomeContainer>
        </MainScrollView>
    )
}

export default Home;
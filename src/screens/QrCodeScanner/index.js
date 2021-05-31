import React, { useState } from 'react';
import { Vibration } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';

// Local Modules
import {
    EventInformationsContainer,
    EventImage,
    ImagePreview
} from './styles';
import ConfirmCancelModal from '../../components/ConfirmCancelModal'
import {
    userRequest,
    userUpdateRequest,
} from '../../api/userApi'
import { useUser } from '../../Contexts'
import { BoldText } from '../../generic-styles'
import {
    userAproveOnEventRequest
} from '../../api/eventApi'

const coverImageSource = 'https://ieq-app-image-storage.s3-sa-east-1.amazonaws.com/covers-images/'
const imageProfileAdress = 'https://ieq-app-image-storage.s3-sa-east-1.amazonaws.com/users-profile-image/'

const QrCodeScanner = ({ route }) => {

    // Params.......................................
    const { mode, eventInformations = undefined } = route.params

    // Contexts
    const [user, setUser] = useUser()

    // States.......................................
    const [userInformations, setUserInformations] = useState({})
    const [aproveUserAccountModal, setAproveUserAccountModal] = useState(false)

    // Quando um QR-code é lido
    const handleOnReadQrCode = (e) => {
        // Vibrar
        Vibration.vibrate(30)
        // Escolha
        switch (mode) {
            case 'aprove-user':
                getUserAccountToAprove(identificator = e.data)
                break;
            case 'event':
                getUserAccountToAprove(identificator = e.data)
                break;
            default:
                alert('Não foi possível prosseguir com a operação')
        }
    }

    // Buscar Conta de usuário para aprovar
    const getUserAccountToAprove = async (identificator) => {
        // Buscar Usuário pelo identificador
        console.log(identificator)
        const userRequestResult = await userRequest(identificator, user.loggedToken)
        // Verificar se encontrou
        if (!userRequestResult) {
            alert('Não foi possível encontrar o usuário')
            return
        }
        // Carregar no state userInformations
        setUserInformations(userRequestResult)
        // Abrir Modal de Aprovação
        setAproveUserAccountModal(true)
    }

    // Aprovar conta de usuário
    const handleConfirmUserAccountButtonClick = async () => {
        // Aprovação em evento
        var aproveUserAccountRequestResult = undefined
        switch (mode) {
            case 'event':
                // Requisição para confirmar usuário em evento
                aproveUserAccountRequestResult = await userAproveOnEventRequest(
                    eventInformations.eventId,
                    userInformations.identificator,
                    user.loggedToken
                )
                break;
            case 'aprove-user':
                // Requisição de aprovar conta
                aproveUserAccountRequestResult = await userUpdateRequest(
                    {
                        type: 2
                    },
                    userInformations.identificator,
                    user.loggedToken
                )
                break;
            default:
                alert('Não foi possível processar a operalção')
        }
        // Ver se aprovou
        if (!aproveUserAccountRequestResult) {
            alert('Não foi possível encontrar esta conta')
            return
        }
        // Fechar Modal
        setAproveUserAccountModal(false)
        // Reiniciar a leitura de qrcodes
        this.scanner.reactivate()
    }

    return (
        <>

            {/* Modal Para Aprovar conta de Usuário */}
            <ConfirmCancelModal
                text={`Aprovar ${userInformations.name}?`}
                confirmButtonText='Sim'
                cancelButtonText='Não'
                onButtonConfirm={handleConfirmUserAccountButtonClick}
                onButtonCancel={() => { 
                    setAproveUserAccountModal(false)
                    this.scanner.reactivate()
                }}
                modalOpen={aproveUserAccountModal}
                image={
                    eventInformations ? coverImageSource + eventInformations.image : undefined
                }
            />

            <QRCodeScanner
                onRead={(e) => handleOnReadQrCode(e)}
                topContent={
                    mode == 'event' ?
                    <EventInformationsContainer>
                        <BoldText>{eventInformations.title}</BoldText>
                    </EventInformationsContainer>
                    :
                    <BoldText>Aprovar Conta de Usuário</BoldText>
                }
                bottomContent={null}
                ref={(node) => { this.scanner = node }}
            />
        </>
    )
}

export default QrCodeScanner;
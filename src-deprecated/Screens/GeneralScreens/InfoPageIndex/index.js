// Node Modules
import React from 'react';

// Local Modules
import {
    Header,
    HeaderTitle,
    IndexesContainer,
} from './styles'
import { MainContainer } from '../../../Components/MainContainer.js'
import { useUser } from '../../../Contexts'
import GateToPage from '../../../Components/GateToPage'
import InfosConfig from '../../../services/InfoComponentsConfig.json'

const InfoPageIndex = ({ route }) => {

    // params
    const { infoName } = route.params.paramsOfNavigation

    // Context
    const [user] = useUser()

    // Instances
    const title = InfosConfig.infoGeneralConfig[infoName].title

    return (
        <MainContainer>
            <Header>
                <HeaderTitle>{title}</HeaderTitle>
            </Header>
            <IndexesContainer>
                {user.type <= 1 &&
                    <GateToPage
                        text={`Nova postagem`}
                        page='InfoFormPage'
                        props={{
                            infoName: infoName
                        }}
                    />
                }
            </IndexesContainer>
        </MainContainer>
    );
}

export default InfoPageIndex;
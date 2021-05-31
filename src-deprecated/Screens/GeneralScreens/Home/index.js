// Node Modules
import React from 'react'

// Local Modules
import { MainContainer } from '../../../Components/MainContainer'
import GateToPage from '../../../Components/GateToPage'
import { GatesContainer } from './styles'
import HeaderOfProfile from '../../../Components/HeaderOfProfile'

function Home() {
    return (
        <MainContainer>
            <HeaderOfProfile />
            <GatesContainer>
                <GateToPage
                    text='Ministérios'
                    page='InfoIndexPage'
                    props={{
                        infoName: 'ministry'
                    }}
                />
                <GateToPage
                    text='Nossa História'
                    page='InfoIndexPage'
                    props={{
                        infoName: 'history'
                    }}
                />
                <GateToPage
                    text='Notícias'
                    page='InfoIndexPage'
                    props={{
                        infoName:'news'
                    }}
                />
                <GateToPage
                    text='Reflexões'
                    page='InfoIndexPage'
                    props={{
                        infoName:'reflection'
                    }}
                />
                <GateToPage
                    text='Pastores'
                    page='InfoIndexPage'
                    props={{
                        infoName:'shephers'
                    }}
                />
                <GateToPage
                    text='Eventos'
                    page='InfoIndexPage'
                    props={{
                        infoName:'event'
                    }}
                />
                <GateToPage
                    text='Galeria de imagens'
                    page='InfoIndexPage'
                    props={{
                        infoName:'ministry'
                    }}
                />
            </GatesContainer>
        </MainContainer>
    )
}

export default Home
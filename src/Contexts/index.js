import React, {createContext, useState, useContext} from 'react';

// Instanciar um novo Context
// Esse Context pode também ser exportado e importado dentro dos componentes children e serem utilizados com o useContext. Dessa forma, todos os elementos disponibilizados no provider estarão disponíveis lá nos children.
const GlobalContext = createContext()

// Criar um provider
// Esse provider receberá seus componentes children e eles virão nos parâmetros
export default function GlobalProvider({children}){
    // Dentro deste Provider criamos um State
    const [user, setUser] = useState({})
    return (
        // Neste provider determinamos um value que são todos os elementos que nossos componentes children poderão enchergar
        <GlobalContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

// Podemos agora criar um Hook que disponibiliza os elementos enviados pelo Provider
// Esse Hook pode agora ser recuperado de dentro do provider
export function useUser(){
    const {user, setUser} = useContext(GlobalContext)
    return [user, setUser]
}
// Node Modules
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

// Local Modules
import { useUser } from './Contexts'
import GlobalProvider from './Contexts'
import { getUserData } from './functions/User'

// Screens Modules
import HomeScreen from './Screens/GeneralScreens/Home'
import ProfileScreen from './Screens/GeneralScreens/Profile'
import LoginScreen from './Screens/GeneralScreens/Login'
import RegisterScreen from './Screens/GeneralScreens/Register'
import InfoPageIndex from './Screens/GeneralScreens/InfoPageIndex'
import InfoFormPage from './Screens/AdmScreens/InfoFormPage'

// Instances
const Stack = createStackNavigator();

function IeqApp() {

    // States
    const [user, setUser] = useUser()

    // Effects
    useEffect(() => {
        setUser({ loading: true })
        const establishUser = async () => {
            // Buscar dados do usuário atualizados
            const userInformations = await getUserData()
            // Se a busca retornou algum dado...
            if (userInformations) {
                // Escrever estes dados no user State Context
                setUser(userInformations)
                return
            }
            // Se não, deixar
            setUser({ content: false })
        }
        establishUser() 
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name='Profile' component={ProfileScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="InfoIndexPage" component={InfoPageIndex} />
                <Stack.Screen name="InfoFormPage" component={InfoFormPage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

function AppInProvider() {
    return (
        <GlobalProvider>
            <IeqApp />
        </GlobalProvider>
    )
}

export default AppInProvider;
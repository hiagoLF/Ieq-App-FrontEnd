// Node Modules
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

// Local Modules
import GlobalProvider, { useUser } from './Contexts'
import {
    getUserInformations
} from './generic-functions/user'

// Screens Modules
import HomeScreen from './screens/Home'
import LoginScreen from './screens/Login'
import ProfileScreen from './screens/Profile'
import PostSwitchScreen from './screens/PostSwitch'
import PostPageScreen from './screens/PostPage'
import RegisterScreen from './screens/Register'
import GaleryViewScreen from './screens/GaleryView'
import CreatePostScreen from './screens/CreatePost'
import SettingsScreen from './screens/Settings'
import EditImageScreen from './screens/EditUserProfileImage'
import UpdateUserScreen from './screens/UpdateUser'
import QrCodeScannerScreen from './screens/QrCodeScanner'

// Instancies
const Stack = createStackNavigator()

// Componente
function IeqApp() {

    // States
    const [user, setUser] = useUser()

    // Effects
    // ..................................
    // Effect => Estabelecer Usuário
    useEffect(() => {
        async function stablishUser() {
            // Definir user como loading true
            setUser({ loading: true })
            // Buscar Informações de usuário
            const userInformations = await getUserInformations()
            // Se não encontrou informações...
            if(!userInformations){
                // Definir usuário como vazio {}
                setUser({})
                return
            }
            // Se encontrou...
            // Definir informações de usuário
            setUser(userInformations)
        }
        stablishUser()
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Profile' component={ProfileScreen} />
                <Stack.Screen name='PostSwitch' component={PostSwitchScreen} />
                <Stack.Screen name='PostPage' component={PostPageScreen} />
                <Stack.Screen name='Register' component={RegisterScreen} />
                <Stack.Screen name='GaleryView' component={GaleryViewScreen} />
                <Stack.Screen name='CreatePost' component={CreatePostScreen} />
                <Stack.Screen name='Settings' component={SettingsScreen} />
                <Stack.Screen name='EditImage' component={EditImageScreen} />
                <Stack.Screen name='UpdateUser' component={UpdateUserScreen} />
                <Stack.Screen name='QrCodeScanner' component={QrCodeScannerScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default function AppInProvider() {
    return (
        <GlobalProvider>
            <IeqApp />
        </GlobalProvider>
    )
}
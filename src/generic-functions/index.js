import { PixelRatio } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Error Instance
const error = undefined



// Convertendo um número em píxels proporcionais a tela
export function sz(number) {
    return `${PixelRatio.getPixelSizeForLayoutSize(number)}px`
}



// Buscando item JSON no AsyncStorage
export async function getJsonFromAS(itemIndex){
    const itemStringResult = await AsyncStorage.getItem(itemIndex).catch(() => {error = true})
    if(!itemStringResult || error){
        return {}
    }
    return JSON.parse(itemStringResult)
}



// Salvando item JSON no AsyncStorage
export async function saveJsonOnAS(itemIndex, objectJSON){
    const stringObject = JSON.stringify(objectJSON)
    await AsyncStorage.setItem(itemIndex, stringObject)
    return true
}
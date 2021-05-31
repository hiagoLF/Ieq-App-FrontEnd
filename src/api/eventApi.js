import api from "."

var error = undefined

// inscrever Usuário em um evento
export async function subscribeUserOnEvent(eventId, userToken) {
    // Colocar o token de autorização
    api.defaults.headers.authorization = `Bearer ${userToken}`
    // Fazer requisição
    const subscriptionRequestResult = await api.post(`/event/${eventId}/subscribe`, {}).catch(() => { error = true })
    // Verificar se veio resposta
    if (!subscriptionRequestResult || error) {
        return false
    }
    // Retornar true
    return true
}

// Buscar informações do evento
export async function eventRequest(eventId) {
    // Fazer requisição
    const eventRequestResult = await api.get(`/event/byid/${eventId}`).catch(() => { })
    // Verificar se veio resposta
    if (!eventRequestResult || eventRequestResult.data.error) {
        return false
    }
    // Retornar as informações do evento
    return eventRequestResult.data
}

// Confirmar Usuário em um evento
export async function confirmUserRequest(eventId, userIdentificator, token) {
    // Colocar o token de autorização
    api.defaults.headers.authorization = `Bearer ${token}`
    // Fazer requisição
    const confirmSubscriptionRequestResult = await api.post(
        `/event/confirm/${eventId}/${userIdentificator}`
    ).catch(() => { })
    // Verificar se veio resposta
    if (!confirmSubscriptionRequestResult || confirmSubscriptionRequestResult.data.error) {
        return false
    }
    // Retornar true
    return true
}



// Aprovar Usuário em um evento
export async function userAproveOnEventRequest(
    eventId,
    userIdentificator,
    token
) {
    // Colocar o token de autorização
    api.defaults.headers.authorization = `Bearer ${token}`
    // Fazer requisição
    const confirmSubscriptionRequestResult = await api.post(
        `/event/confirm/${eventId}/${userIdentificator}`
    ).catch(() => { })
    // Verificar se veio resposta
    if (!confirmSubscriptionRequestResult || confirmSubscriptionRequestResult.data.error) {
        return false
    }
    // Retornar true
    return true
}
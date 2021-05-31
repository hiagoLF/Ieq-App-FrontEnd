import axios from 'axios'

// Error instance
var error = false

export default api = axios.create({
    baseURL: 'http://192.168.0.110:8888'
})

export async function loginRequisition(login, password) {
    const data = { login, password }
    const response = await api.post('/users/login', data).catch(() => { })
    if (!response) {
        return false
    }
    return response.data.token
}

export async function getMyUserInformations(token) {
    api.defaults.headers.authorization = `Bearer ${token}`
    const response = await api.get('/users/info/me').catch(() => {})
    if (!response) {
        return false
    }
    return response.data
}

export async function customRequisition(config, token = undefined, data) {
    // Desestruturar config para pegar method e url
    const { method, url } = config
    // Fazer a requisição
    token && (api.defaults.headers.authorization = `Bearer ${token}`)
    var result = undefined
    if (method === 'POST') {
        result = await api.post(url, data).catch((err) => {
            error = true
            console.log('Deu erro na requisição')
        })
    }
    // Se deu tudo certo...
    if (result || !result.error) {
        // Retornar TRUE
        return true
    }
    // Se não deu certo...
    // Enviar FALSE
    return false
}
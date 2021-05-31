// Local Modules
import api from './'

// Error Instance
var error = undefined



// .....................................................
// Atualizar informações do usuário
export async function refreshUser(token) {
    // Definir a header Authorization com o token
    api.defaults.headers.authorization = `Bearer ${token}`
    // Fazer a requisição de refresh
    const refreshUserRequestResult = await api.get('/user/refresh').catch(() => { error = true })
    // Verificar se houve resultado
    if (!refreshUserRequestResult || error || refreshUserRequestResult.data.error) {
        return false
    }
    // Retornar o date do resultado
    return refreshUserRequestResult.data
};


// .....................................................
// Buscar Informações do usuário pelo identificador
export async function userRequest(identificator, token) {
    // Definir a header Authorization com o token
    api.defaults.headers.authorization = `Bearer ${token}`
    // Fazer a requisição de buscar usuário
    const userRequestResult = await api.get(`/user/particular/${identificator}`).catch(() => { })
    // Verificar se houve resultado
    if (!userRequestResult || userRequestResult.data.error) {
        return false
    }
    // Retornar o date do resultado
    return userRequestResult.data
}


// .....................................
// Fazer Login
export async function loginRequest(login, password) {
    // Fazer a requisição de login
    const loginRequestResult = await api.post('/user/login',
        { login, password }
    ).catch(() => { })
    // Verificar se houve resultado
    if (!loginRequestResult || loginRequestResult.data.error) {
        return false
    }
    // Retornar o date do resultado
    return loginRequestResult.data
};




// .......................................
// Registrar Usuário
export async function registerRequest(name, login, password) {
    // Fazer a requisição de registro
    const registerRequestResult = await api.post('/user/create',
        { login, password, name }
    ).catch(() => { error = true })
    // Verificar se houve resultado
    if (!registerRequestResult || error || registerRequestResult.data.error) {
        return false
    }
    // Retornar o date do resultado
    return registerRequestResult.data
};



// ................................................
// Buscar Usuários pelo nome
export async function getUsersByName(userName, token) {
    // Definir token de autenticação
    api.defaults.headers.authorization = `Bearer ${token}`
    // Fazer a requisição de usuários
    const usersRequestResult = await api.get(`/user/byname/${userName}`).catch(() => { })
    // Verificar se houve resultado
    if (!usersRequestResult || usersRequestResult.data.error) {
        return false
    }
    // Retornar o date do resultado
    return usersRequestResult.data
};


// .................................................
// Alterar a seha do usuário
export async function updatePasswordRequest(lastPassword, newPassword, token) {
    // Definir token de autenticação
    api.defaults.headers.authorization = `Bearer ${token}`
    // Fazer a requisição de alterar senha

    const updatePasswordRequestResult = await api.put(
        '/user/me/password',
        {
            lastPassword,
            newPassword
        }
    ).catch(() => { })
    // Verificar se houve resultado
    if (!updatePasswordRequestResult || updatePasswordRequestResult.data.error) {
        return false
    }
    // Retornar true
    return true
};


// .............................................
// Deslogar Usuário
export async function logoutRequest(token) {
    // Definir token de autenticação
    api.defaults.headers.authorization = `Bearer ${token}`
    // Fazer a requisição de deslogar usuário
    const logoutUserRequestResult = await api.delete(
        '/user/lougout',
    ).catch(() => { })
    // Verificar se houve resultado
    if (!logoutUserRequestResult || logoutUserRequestResult.data.error) {
        return false
    }
    // Retornar true
    return true
}


// ...........................................
// Editar Imagem do Usuário
export async function updateUserRequest(formData, token, identificator) {
    // Definir token de autenticação
    api.defaults.headers.authorization = `Bearer ${token}`
    // Fazer a requisição de alterar imagem
    const updateUserRequestResult = await api.put(
        `/user/editimage/${identificator}`,
        data = formData
    ).catch(() => { })
    // Verificar se houve resultado
    if (!updateUserRequestResult || updateUserRequestResult.data.error) {
        return false
    }
    // Retornar true
    return true
}



// ......................................................
// Editar Informações do usuário
export async function userUpdateRequest(data, identificator, token) {
    // Definir token de autenticação
    api.defaults.headers.authorization = `Bearer ${token}`
    // Fazer a requisição de alterar informações
    const updateUserRequestResult = await api.put(
        `/user/edit/${identificator}`,
        data
    ).catch(() => { })
    // Verificar se houve resultado
    if (!updateUserRequestResult || updateUserRequestResult.data.error) {
        return false
    }
    // Retornar true
    return true
}


// ......................................................
// Deletar usuário
export async function deleteUserRequest(identificator, token) {
    // Definir token de autenticação
    api.defaults.headers.authorization = `Bearer ${token}`
    // Fazer a requisição de deletar usuário
    const deleteUserRequestResult = await api.delete(
        `/user/${identificator}`
    ).catch(() => { })
    // Verificar se houve resultado
    if (!deleteUserRequestResult || deleteUserRequestResult.data.error) {
        return false
    }
    // Retornar true
    return true
}


export async function sendTokenRequest(phoneToken) {
    const result = await api.post(
        '/user/devicetoken',
        {token: phoneToken}
    ).catch(() => { })
    if (!result || result.data.error) {
        return false
    }
    return true
}
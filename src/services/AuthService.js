import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1/auth'

const registration = (user) => {
    return axios.post(API_BASE_URL + '/register', user)
}

const login = (user) => {
    return axios.post(API_BASE_URL + '/login', user)
}

const logout = () => {
    const temptToken = localStorage.getItem('token')
    localStorage.removeItem('token')
    return axios.get(API_BASE_URL + '/logout', temptToken)
}

const AuthService = {
    registration,
    login,
    logout,
}

export default AuthService

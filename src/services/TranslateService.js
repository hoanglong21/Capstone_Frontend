import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1/translate'

const translateClients5 = (text, to) => {
    return axios.get(API_BASE_URL + '/clients5?text=' + text + '&to=' + to)
}

const translateGoogleapis = (text, to) => {
    return axios.get(API_BASE_URL + '/googleapis?text=' + text + '&to=' + to)
}

const translateMymemory = (text, to) => {
    return axios.get(API_BASE_URL + '/mymemory?text=' + text + '&to=' + to)
}

const TranslateService = {
    translateClients5,
    translateGoogleapis,
    translateMymemory,
}
export default TranslateService

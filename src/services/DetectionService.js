import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1/detection'

const detectVocabulary = (text) => {
    return axios.get(API_BASE_URL + '/vocabulary?text=' + text)
}

const detectGrammar = (text, to) => {
    return axios.get(API_BASE_URL + '/grammar?text=' + text + '&to=' + to)
}

const grammarCheck = (text) => {
    return axios.get(API_BASE_URL + '/grammarcheck?text=' + text)
}

const DetectionService = {
    detectVocabulary,
    detectGrammar,
    grammarCheck,
}
export default DetectionService

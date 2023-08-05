import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const getAll = () => {
    return axios.get(API_BASE_URL + '/feedbacktype')
}

const FeedbackTypeService = {
    getAll,
}

export default FeedbackTypeService

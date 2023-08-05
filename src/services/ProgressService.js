import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const getProgressByUserIdAndCardId = (userId, cardId) => {
    return axios.get(
        API_BASE_URL +
            '/progressbyuserandcard?userid=' +
            userId +
            '&cardid=' +
            cardId,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
        }
    )
}

const customUpdateProgress = (progress) => {
    return axios.put(API_BASE_URL + '/customprogress', progress, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const updateScore = (userId, cardId, score) => {
    return axios.get(
        API_BASE_URL +
            '/scoreprogress?userid=' +
            userId +
            '&cardid=' +
            cardId +
            '&score=' +
            score,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
        }
    )
}

const ProgressService = {
    getProgressByUserIdAndCardId,
    customUpdateProgress,
    updateScore,
}

export default ProgressService

import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const createAnswers = (answers) => {
    return axios.post(API_BASE_URL + '/createanswers', answers)
}

const createAnswer = (answer) => {
    return axios.post(API_BASE_URL + '/answers', answer)
}

const deleteAnswer = (id) => {
    return axios.delete(API_BASE_URL + '/answers/' + id)
}

const getAllByQuestionId = (quesId) => {
    return axios.get(API_BASE_URL + '/answersbyquestionid?id=' + quesId)
}

const updateAnswer = (id, answer) => {
    return axios.put(API_BASE_URL + '/answers/' + id, answer)
}

const AnswerService = {
    createAnswers,
    createAnswer,
    deleteAnswer,
    getAllByQuestionId,
    updateAnswer,
}

export default AnswerService

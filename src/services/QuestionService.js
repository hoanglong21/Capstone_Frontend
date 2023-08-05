import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const createQuestions = (questions) => {
    return axios.post(API_BASE_URL + '/createquestions', questions)
}

const createQuestion = (question) => {
    return axios.post(API_BASE_URL + '/questions', question)
}

const deleteQuestion = (id) => {
    return axios.delete(API_BASE_URL + '/questions/' + id)
}

const getAllByTestId = (testId) => {
    return axios.get(API_BASE_URL + '/questionsbytestid?id=' + testId)
}

const updateQuestion = (id, question) => {
    return axios.put(API_BASE_URL + '/questions/' + id, question)
}

const QuestionService = {
    createQuestions,
    createQuestion,
    deleteQuestion,
    getAllByTestId,
    updateQuestion,
}

export default QuestionService

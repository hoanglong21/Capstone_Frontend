import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const createTest = (test) => {
    return axios.post(API_BASE_URL + '/test', test)
}

const updateTest = (id, test) => {
    return axios.put(API_BASE_URL + '/test/' + id, test)
}

const getTestById = (id) => {
    return axios.get(API_BASE_URL + '/test/' + id)
}

const deleteTest = (id) => {
    return axios.delete(API_BASE_URL + '/test/' + id)
}

const getFilterList = (
    search,
    author,
    from,
    to,
    draft,
    direction,
    duration,
    classid,
    page,
    size
) => {
    return axios.get(
        API_BASE_URL +
            '/filtertest?search' +
            search +
            '&author' +
            author +
            (from ? `&from${from}` : '') +
            (to ? `&to${to}` : '') +
            '&draft' +
            draft +
            '&direction' +
            direction +
            '&duration' +
            duration +
            '&classid' +
            classid +
            '&page' +
            page +
            '&size' +
            size
    )
}

const TestService = {
    getFilterList,
    createTest,
    updateTest,
    getTestById,
    deleteTest,
}
export default TestService

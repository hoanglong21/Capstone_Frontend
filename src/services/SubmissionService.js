import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const createSubmission = (submission) => {
    return axios.post(API_BASE_URL + '/submissions', submission)
}

const updateSubmission = (id, submission) => {
    return axios.put(API_BASE_URL + '/submissions/' + id, submission)
}

const getSubmissionById = (id) => {
    return axios.get(API_BASE_URL + '/submissions/' + id)
}

const getSubmissionByAuthorIdandAssignmentId = (authorid, assignmentid) => {
    return axios.get(
        API_BASE_URL +
            '/submissionbyauthorandassignment?authorid=' +
            authorid +
            '&assignmentid=' +
            assignmentid
    )
}

const getFilterList = (search, authorid, assignmentid, mark, page, size) => {
    return axios.get(
        API_BASE_URL +
            '/filtersubmission?search' +
            search +
            '&authorid' +
            authorid +
            '&assignmentid' +
            assignmentid +
            '&mark' +
            mark +
            '&page' +
            page +
            '&size' +
            size
    )
}

const SubmissionService = {
    getSubmissionById,
    getFilterList,
    getSubmissionByAuthorIdandAssignmentId,
    createSubmission,
    updateSubmission,
}

export default SubmissionService

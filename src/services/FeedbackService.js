import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const createFeedback = (feedback) => {
    return axios.post(API_BASE_URL + '/feedbacks', feedback)
}

const replyfeedback = (id, title, content) => {
    return axios.post(API_BASE_URL + '/replyfeedback', id, title, content, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const getFeedbackById = (id) => {
    return axios.get(API_BASE_URL + '/feedbacks/' + id, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const filterFeedbackList = (
    search,
    author_id,
    author_name,
    type,
    destination,
    fromcreated,
    tocreated,
    page,
    size
) => {
    return axios.get(
        API_BASE_URL +
            '/filterfeedback?search' +
            search +
            '&author_id' +
            author_id +
            '&author_name' +
            author_name +
            '&type' +
            type +
            '&destination' +
            destination +
            '&fromcreated' +
            fromcreated +
            '&tocreated' +
            tocreated +
            '&page' +
            page +
            '&size' +
            size,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
        }
    )
}

const FeedbackService = {
    createFeedback,
    getFeedbackById,
    filterFeedbackList,
    replyfeedback,
}

export default FeedbackService

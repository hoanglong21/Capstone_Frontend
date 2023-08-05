import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const createClassLeaner = (classLearner) => {
    return axios.post(API_BASE_URL + '/classleaner', classLearner, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const deleteClassLearnerById = (id) => {
    return axios.delete(API_BASE_URL + '/delclasslearnerbyid/' + id, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const updateClassLeaner = (classLearner, id) => {
    return axios.put(API_BASE_URL + '/classleaner/' + id, classLearner, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const filterGetLeaner = (
    userId,
    classId,
    isAccepted,
    sortBy,
    direction,
    page,
    size
) => {
    return axios.get(
        API_BASE_URL +
            '/filtergetlearner?userid' +
            userId +
            '&classid' +
            classId +
            '&accepted' +
            isAccepted +
            '&sortby' +
            sortBy +
            '&direction' +
            direction +
            'page' +
            page +
            'size' +
            size
    )
}

const ClassLearnerService = {
    filterGetLeaner,
    createClassLeaner,
    deleteClassLearnerById,
    updateClassLeaner,
}

export default ClassLearnerService

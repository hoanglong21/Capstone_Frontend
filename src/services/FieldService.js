import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const getFieldsByStudySetTypeId = (studySetId) => {
    return axios.get(API_BASE_URL + '/fieldbystudyset/' + studySetId, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
    })
}

const FieldService = {
    getFieldsByStudySetTypeId,
}

export default FieldService

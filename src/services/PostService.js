import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const createPost = (post) => {
    return axios.post(API_BASE_URL + '/post', post)
}

const updatePost = (id, post) => {
    return axios.put(API_BASE_URL + '/post/' + id, post)
}

const deletePost = (id) => {
    return axios.delete(API_BASE_URL + '/post/' + id)
}

const getAllPostByClassId = (id) => {
    return axios.get(API_BASE_URL + '/postbyclassid/' + id)
}

const getPostById = (id) => {
    return axios.get(API_BASE_URL + '/post/' + id)
}
const getFilterList = (
    search,
    author,
    fromcreated,
    tocreated,
    sortby,
    direction,
    classId,
    page,
    size
) => {
    return axios.get(
        API_BASE_URL +
            '/filterpost?search' +
            search +
            '&author' +
            author +
            '&fromcreated' +
            fromcreated +
            '&tocreated' +
            tocreated +
            '&sortby' +
            sortby +
            '&direction' +
            direction +
            '&classid' +
            classId +
            '&page' +
            page +
            '&size' +
            size
    )
}

const PostService = {
    createPost,
    getAllPostByClassId,
    updatePost,
    deletePost,
    getFilterList,
    getPostById,
}

export default PostService

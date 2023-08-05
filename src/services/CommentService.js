import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

const getCommentById = (id) =>{
    return axios.get(API_BASE_URL + '/comments/' + id)
}

const getFilterList = (search, author, direction, typeid, postid, rootId, page, size) => {
    return axios.get(
        API_BASE_URL +
            '/filtercomment?search' +
            search +
            '&author' +
            author +
            '&direction' +
            direction +
            '&typeid' +
            typeid +
            '&postid' +
            postid +
            '&rootid' +
            rootId +
            '&page' +
            page +
            '&size' +
            size
    )
}

const CommentService = {
    getCommentById,
    getFilterList
}

export default CommentService
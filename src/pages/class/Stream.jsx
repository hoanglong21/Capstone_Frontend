import { useState } from 'react'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import ClassService from '../../services/ClassService'
import PostService from '../../services/PostService'
import { uploadFile } from '../../features/fileManagement'
import AttachmentService from '../../services/AttachmentService'

import Post from './post/Post'
import PostEditor from '../../components/textEditor/PostEditor'

import empty from '../../assets/images/post_empty.jpg'
import defaultAvatar from '../../assets/images/default_avatar.png'
import {
    CopyIcon,
    DeleteIcon,
    OptionVerIcon,
    ResetIcon,
    UploadIcon,
} from '../../components/icons'

const Stream = () => {
    const { userInfo } = useSelector((state) => state.user)

    const { id } = useParams()

    const [classroom, setClassroom] = useState({})
    const [showResetMess, setShowResetMess] = useState(false)

    const [posts, setPosts] = useState([])
    const [showInput, setShowInput] = useState(false)

    const [loadingAddPost, setLoadingAddPost] = useState(false)
    const [addPost, setAddPost] = useState({})

    const [uploadFiles, setUploadFiles] = useState([])
    const [loadingUploadFile, setLoadingUploadFile] = useState(false)

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const tempClass = (await ClassService.getClassroomById(id)).data
                setClassroom(tempClass)
                setPosts(
                    (
                        await PostService.getFilterList(
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            `=${tempClass.id}`,
                            '=1',
                            '=10'
                        )
                    ).data.list
                )
                setAddPost({
                    user: {
                        id: userInfo.id,
                        username: userInfo.username,
                    },
                    classroom: {
                        id: tempClass.id,
                    },
                    content: '',
                })
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        if (userInfo?.id) {
            fetchData()
        }
    }, [userInfo])

    // ignore error
    useEffect(() => {
        window.addEventListener('error', (e) => {
            if (e.message === 'ResizeObserver loop limit exceeded') {
                const resizeObserverErrDiv = document.getElementById(
                    'webpack-dev-server-client-overlay-div'
                )
                const resizeObserverErr = document.getElementById(
                    'webpack-dev-server-client-overlay'
                )
                if (resizeObserverErr) {
                    resizeObserverErr.setAttribute('style', 'display: none')
                }
                if (resizeObserverErrDiv) {
                    resizeObserverErrDiv.setAttribute('style', 'display: none')
                }
            }
        })
    }, [])

    const toggleShowResetMess = () => {
        setShowResetMess(!showResetMess)
    }

    const handleResetCode = async () => {
        const tempClass = (await ClassService.resetClassCode(classroom.id)).data
        setClassroom(tempClass)
        toggleShowResetMess()
    }

    const handleCopyCode = (event) => {
        navigator.clipboard.writeText(classroom.classcode)
    }

    const handleDeleteFile = (index) => {
        var temp = [...uploadFiles]
        temp.splice(index, 1)
        setUploadFiles(temp)
    }

    const handleUploadFile = async (event) => {
        setLoadingUploadFile(true)
        const file = event.target.files[0]
        if (file) {
            setUploadFiles([
                ...uploadFiles,
                { file_name: file.name, file_type: file.type, file: file },
            ])
        }
        setLoadingUploadFile(false)
    }

    const handleAddPost = async () => {
        setLoadingAddPost(true)
        try {
            // add post
            const tempPost = (await PostService.createPost(addPost)).data
            // upload file to firebase
            let tempAttachments = []
            for (const uploadFileItem of uploadFiles) {
                const url = await uploadFile(
                    uploadFileItem.file,
                    `${userInfo.username}/class/${classroom.id}/post/${tempPost.id}`
                )
                tempAttachments.push({
                    file_name: uploadFileItem.file_name,
                    file_type: uploadFileItem.file_type,
                    file_url: url,
                    post: {
                        id: tempPost.id,
                    },
                    attachmentType: {
                        id: 3,
                    },
                })
            }
            // add attachments
            await AttachmentService.createAttachments(tempAttachments)
            // clear
            setAddPost({
                user: {
                    id: userInfo.id,
                },
                classroom: {
                    id: classroom.id,
                },
                content: '',
            })
            setUploadFiles([])
            setPosts([...posts, tempPost])
            setShowInput(false)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoadingAddPost(false)
    }

    const handleCancelAddPost = () => {
        setUploadFiles([])
        setAddPost({ ...addPost, content: '' })
        setShowInput(false)
    }

    return (
        <div className="row">
            {/* Side */}
            <div className="col-3">
                {/* Class code */}
                {userInfo?.id === classroom?.user?.id && (
                    <div className="card classCode_container mb-4">
                        <div className="card-body">
                            <div className="card-title mainClass_sectionTitle d-flex justify-content-between align-items-center">
                                <span>Class code</span>
                                <div className="dropdown">
                                    <button
                                        className="mainClass_sectionButton btn btn-light p-2 rounded-circle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <OptionVerIcon />
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <button
                                                className="dropdown-item py-2 px-3 d-flex align-items-center"
                                                type="button"
                                                onClick={handleCopyCode}
                                            >
                                                <CopyIcon
                                                    className="me-3"
                                                    size="1.3rem"
                                                />
                                                <span className="align-middle fw-medium">
                                                    Copy class code
                                                </span>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="dropdown-item py-2 px-3 d-flex align-items-center"
                                                type="button"
                                                onClick={handleResetCode}
                                            >
                                                <ResetIcon
                                                    className="me-3"
                                                    size="1.3rem"
                                                />
                                                <span className="align-middle fw-medium">
                                                    Reset class code
                                                </span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="classCode_value">
                                {classroom?.classcode}
                            </div>
                        </div>
                    </div>
                )}
                {/* Upcoming */}
                <div className="card">
                    <div className="card-body">
                        <div className="card-title mainClass_sectionTitle">
                            Upcoming
                        </div>
                        <p className="mainClass_subText">No work due</p>
                    </div>
                </div>
            </div>
            {/* Main */}
            <div className="col-9">
                {/* Add post */}
                <div className="card mainClass_postAddContainer mb-4">
                    {showInput ? (
                        <div>
                            <div className="createAssign_formGroup form-floating mb-4">
                                <PostEditor
                                    onChange={(event, editor) => {
                                        if (addPost?.user?.id) {
                                            setAddPost({
                                                ...addPost,
                                                content: editor.getData(),
                                            })
                                        }
                                    }}
                                />
                                <label className="createAssign_formLabel createAssign_editorLabel">
                                    Announce something to your class
                                </label>
                            </div>
                            <div className="mainClass_filesUpload mt-3">
                                {uploadFiles.map((file, index) => (
                                    <div className="card mb-2" key={index}>
                                        <div className="card-body d-flex justify-content-between">
                                            <a
                                                className="text-decoration-none w-100"
                                                href={file.file_url}
                                                target="_blank"
                                            >
                                                <div className="fileUploadName">
                                                    {file.file_name}
                                                </div>
                                                <div className="fileUploadType">
                                                    {file.file_type}
                                                </div>
                                            </a>
                                            <button
                                                className="btn fileUploadDelButton"
                                                onClick={() =>
                                                    handleDeleteFile(index)
                                                }
                                            >
                                                <DeleteIcon />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="d-flex align-items-center justify-content-between mt-4">
                                <input
                                    type="file"
                                    id="uploadPostFile"
                                    className="postUpload"
                                    onClick={(event) => {
                                        event.target.value = null
                                    }}
                                    onChange={handleUploadFile}
                                />
                                <button type="btn" disabled={loadingUploadFile}>
                                    <label
                                        htmlFor="uploadPostFile"
                                        className="postUploadButton p-2 rounded-circle d-flex align-items-center justify-content-center"
                                    >
                                        {loadingUploadFile ? (
                                            <div
                                                className="spinner-border spinner-border-sm text-secondary"
                                                role="status"
                                            >
                                                <span className="visually-hidden">
                                                    LoadingUpload...
                                                </span>
                                            </div>
                                        ) : (
                                            <UploadIcon strokeWidth="2" />
                                        )}
                                    </label>
                                </button>
                                <div className="d-flex align-items-center">
                                    <button
                                        onClick={handleCancelAddPost}
                                        className="btn btn-light mx-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddPost}
                                        className="btn btn-primary"
                                        disabled={
                                            !addPost?.content || loadingAddPost
                                        }
                                    >
                                        {loadingAddPost ? 'Posting...' : 'Post'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="mainClass_postAddWrapper d-flex align-items-center"
                            onClick={() => {
                                setShowInput(true)
                            }}
                        >
                            <div className="maiClass_postAddAuthor">
                                <img
                                    src={
                                        userInfo.avatar
                                            ? userInfo.avatar
                                            : defaultAvatar
                                    }
                                    className="w-100 h-100"
                                    alt="author avatar"
                                />
                            </div>
                            <span className="ms-4">
                                Announce something to your class
                            </span>
                        </div>
                    )}
                </div>
                {/* Empty */}
                {posts?.length === 0 && (
                    <div className="card emptyPosts_container">
                        <div className="card-body d-flex flex-column align-items-center">
                            <img src={empty} alt="" />
                            <p className="emptyPosts_heading">
                                This is where you can talk to your class
                            </p>
                            <p className="emptyPosts_content">
                                Use the stream to share announcements, post
                                assignments, and respond to student questions
                            </p>
                        </div>
                    </div>
                )}
                {/* Post list */}
                {posts?.map((post, index) => (
                    <Post
                        key={post.id}
                        post={post}
                        index={index}
                        stateChanger={setPosts}
                        posts={posts}
                        userInfo={userInfo}
                    />
                ))}
            </div>
            {/* Toast reset code */}
            <ToastContainer
                className="p-3 mt-5 position-sticky"
                position="bottom-start"
                style={{ zIndex: 9999 }}
            >
                <Toast
                    show={showResetMess}
                    onClose={toggleShowResetMess}
                    delay={5000}
                    className="toast align-items-center text-bg-dark border-0"
                    autohide
                >
                    <Toast.Body className="d-flex flex-column p-3">
                        <div className="d-flex justify-content-between">
                            <span className="me-auto">
                                Class code set to {classroom.classcode}
                            </span>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="toast"
                                aria-label="Close"
                            ></button>
                        </div>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}
export default Stream

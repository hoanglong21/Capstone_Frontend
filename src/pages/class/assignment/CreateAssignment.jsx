import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { uploadFile } from '../../../features/fileManagement'
import ClassService from '../../../services/ClassService'
import AssignmentService from '../../../services/AssignmentService'
import AttachmentService from '../../../services/AttachmentService'

import InstructionEditor from '../../../components/textEditor/InstructionEditor'

import { DeleteIcon, UploadIcon } from '../../../components/icons'

function CreateAssignment() {
    const navigate = useNavigate()

    const { id } = useParams()
    const { userInfo } = useSelector((state) => state.user)

    const [classroom, setClassroom] = useState({})
    const [assignment, setAssignment] = useState({})
    const [loadingUploadFile, setLoadingUploadFile] = useState(false)
    const [uploadFiles, setUploadFiles] = useState([])
    const [loadingCreateAssign, setLoadingCreateAssign] = useState(false)

    function padWithLeadingZeros(num, totalLength) {
        return String(num).padStart(totalLength, '0')
    }

    function getToday() {
        const today = new Date()
        return (
            today.getFullYear() +
            '-' +
            padWithLeadingZeros(today.getMonth() + 1, 2) +
            '-' +
            padWithLeadingZeros(today.getDate(), 2) +
            'T' +
            padWithLeadingZeros(today.getHours(), 2) +
            ':' +
            padWithLeadingZeros(today.getMinutes(), 2)
        )
    }

    useEffect(() => {
        const fetchData = async () => {
            const tempClass = (await ClassService.getClassroomById(id)).data
            setClassroom(tempClass)
            setAssignment({
                title: '',
                classroom: {
                    id: tempClass.id,
                },
                user: {
                    id: userInfo.id,
                    username: userInfo.username,
                },
                due_date: '',
                start_date: getToday(),
                created_date: getToday(),
                instruction: '',
                _draft: true,
            })
        }
        if (userInfo?.id) {
            fetchData()
        }
    }, [userInfo])

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

    const handleDeleteFile = (index) => {
        var temp = [...uploadFiles]
        temp.splice(index, 1)
        setUploadFiles(temp)
    }

    const handleChange = (event) => {
        setAssignment({
            ...assignment,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (draft) => {
        setLoadingCreateAssign(true)
        try {
            const tempAssignment = (
                await AssignmentService.createAssignment({
                    ...assignment,
                    _draft: draft,
                })
            ).data
            // add attachments
            let tempAttachments = []
            for (const uploadFileItem of uploadFiles) {
                const url = await uploadFile(
                    uploadFileItem.file,
                    `${userInfo.username}/class/${classroom.id}/assignment/${tempAssignment.id}/tutor`
                )
                tempAttachments.push({
                    file_name: uploadFileItem.file_name,
                    file_type: uploadFileItem.file_type,
                    file_url: url,
                    assignment: {
                        id: tempAssignment.id,
                    },
                    attachmentType: {
                        id: 1,
                    },
                })
            }
            await AttachmentService.createAttachments(tempAttachments)
            navigate('../assignments')
            // clear
            handleClear()
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0
        setLoadingCreateAssign(false)
    }

    const handleClear = () => {
        setAssignment({
            title: {},
            classroom: {
                id: classroom.id,
            },
            user: {
                id: userInfo.id,
            },
            due_date: '',
            start_date: new Date().toISOString().substring(0, 16),
            instruction: '',
            _draft: true,
        })
        setUploadFiles([])
        navigate('../assignments')
    }

    return (
        <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center">
                <button
                    className="createAssign_cancelBtn"
                    onClick={handleClear}
                >
                    cancel
                </button>
                <div className="d-flex">
                    <button
                        className="createAssign_submitBtn"
                        disabled={!assignment?.title || loadingCreateAssign}
                        onClick={() => handleSubmit(false)}
                    >
                        {loadingCreateAssign ? 'Assigning...' : 'Assign'}
                    </button>
                    <button
                        className="createAssign_draftBtn"
                        disabled={!assignment?.title}
                        onClick={() => handleSubmit(true)}
                    >
                        Save draft
                    </button>
                </div>
            </div>
            <div className="card mt-4">
                <div className="card-body p-4">
                    <div className="createAssign_formGroup form-floating mb-4">
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            placeholder="title"
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="title"
                            className="createAssign_formLabel"
                        >
                            Title
                        </label>
                    </div>
                    <div className="createAssign_formGroup form-floating mb-4">
                        <InstructionEditor
                            onChange={(event, editor) => {
                                setAssignment({
                                    ...assignment,
                                    instruction: editor.getData(),
                                })
                            }}
                        />
                        <label className="createAssign_formLabel createAssign_editorLabel">
                            Instruction (Optional)
                        </label>
                    </div>
                    <div className="row mb-4">
                        <div className="col-6">
                            <div className="createAssign_formGroup form-floating">
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    name="start_date"
                                    id="start_date"
                                    placeholder="start date"
                                    min={assignment?.created_date || ''}
                                    value={assignment?.start_date || ''}
                                    onChange={handleChange}
                                />
                                <label
                                    htmlFor="start_date"
                                    className="createAssign_formLabel"
                                >
                                    Start date
                                </label>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="createAssign_formGroup form-floating">
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="due_date"
                                    name="due_date"
                                    min={assignment?.start_date || ''}
                                    placeholder="due date"
                                    onChange={handleChange}
                                />
                                <label
                                    htmlFor="due_date"
                                    className="createAssign_formLabel"
                                >
                                    Due date
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {uploadFiles.map((file, index) => (
                            <div className="col-6" key={index}>
                                <div className="card mb-2">
                                    <div className="card-body d-flex justify-content-between">
                                        <a
                                            className="text-decoration-none w-100 text-truncate"
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
                            </div>
                        ))}
                    </div>
                    <input
                        type="file"
                        id="uploadPostFile"
                        className="postUpload"
                        onChange={handleUploadFile}
                    />
                    <button disabled={loadingUploadFile}>
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
                </div>
            </div>
        </div>
    )
}

export default CreateAssignment

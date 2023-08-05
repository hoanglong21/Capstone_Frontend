import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import {
    deleteFileByUrl,
    uploadFile,
} from '../../../features/fileManagement'
import ClassService from '../../../services/ClassService'
import AssignmentService from '../../../services/AssignmentService'
import AttachmentService from '../../../services/AttachmentService'

import InstructionEditor from '../../../components/textEditor/InstructionEditor'

import { DeleteIcon, UploadIcon } from '../../../components/icons'

function UpdateAssignment() {
    const navigate = useNavigate()

    const { id } = useParams()
    const { assign_id } = useParams()

    const { userInfo } = useSelector((state) => state.user)

    const [classroom, setClassroom] = useState({})
    const [currentAssignment, setCurrentAssignment] = useState({})
    const [updateAssignment, setUpdateAssignment] = useState({})
    const [loadingUploadFile, setLoadingUploadFile] = useState(false)
    const [currentFiles, setCurrentFiles] = useState([])
    const [uploadFiles, setUploadFiles] = useState([])
    const [loadingUpdateAssign, setLoadingUpdateAssign] = useState(false)

    function toFEDate(date) {
        return date?.replace(' ', 'T')
    }

    function toBEDate(date) {
        if (date && !date.includes('+07:00')) {
            return date?.replace(/\s/g, 'T') + '.000' + '+07:00'
        }
        return ''
    }

    useEffect(() => {
        const fetchData = async () => {
            const tempClass = (await ClassService.getClassroomById(id)).data
            setClassroom(tempClass)
            const tempAssignment = (
                await AssignmentService.getAssignmentById(assign_id)
            ).data
            setCurrentAssignment({
                ...tempAssignment,
                start_date: toFEDate(tempAssignment.start_date),
                due_date: toFEDate(tempAssignment.due_date),
            })
            setUpdateAssignment({
                ...tempAssignment,
                start_date: toFEDate(tempAssignment.start_date),
                due_date: toFEDate(tempAssignment.due_date),
            })
            const tempAttachments = (
                await AttachmentService.getAttachmentsByAssignmentId(
                    tempAssignment.id
                )
            ).data
            setCurrentFiles([...tempAttachments])
            setUploadFiles([...tempAttachments])
        }
        if (userInfo?.id) {
            fetchData()
        }
    }, [userInfo])

    const handleUploadFile = async (event) => {
        setLoadingUploadFile(true)
        const file = event.target.files[0]
        if (file) {
            const url = await uploadFile(
                file,
                `${userInfo.username}/class/${classroom.id}/assignment/${updateAssignment.id}/tutor`
            )
            setUploadFiles([
                ...uploadFiles,
                {
                    file_name: file.name,
                    file_type: file.type,
                    file_url: url,
                    assignment: {
                        id: updateAssignment.id,
                    },
                    attachmentType: {
                        id: 1,
                    },
                },
            ])
        }
        setLoadingUploadFile(false)
    }

    const handleDeleteFile = async (file, index) => {
        var temp = [...uploadFiles]
        temp.splice(index, 1)
        setUploadFiles(temp)
        await deleteFileByUrl(
            file.file_url,
            `${userInfo.username}/class/${classroom.id}/assignment/${updateAssignment.id}/tutor`
        )
    }

    const handleChange = (event) => {
        setUpdateAssignment({
            ...updateAssignment,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (draft) => {
        setLoadingUpdateAssign(true)
        try {
            var tempAssignment = { ...updateAssignment }
            tempAssignment.classroom.created_date = toBEDate(
                updateAssignment.classroom.created_date
            )
            tempAssignment.classroom.user.created_date = toBEDate(
                updateAssignment.classroom.user.created_date
            )
            tempAssignment.user.created_date = toBEDate(
                updateAssignment.user.created_date
            )
            if (tempAssignment.created_date) {
                tempAssignment.created_date = toBEDate(
                    updateAssignment.created_date
                )
            }
            if (tempAssignment.modified_date) {
                tempAssignment.modified_date = toBEDate(
                    updateAssignment.modified_date
                )
            }
            if (tempAssignment.start_date) {
                tempAssignment.start_date = toBEDate(
                    updateAssignment.start_date
                )
            }
            if (tempAssignment.due_date) {
                tempAssignment.due_date = toBEDate(updateAssignment.due_date)
            }
            await AssignmentService.updateAssignment(updateAssignment.id, {
                ...tempAssignment,
                _draft: draft,
            })
            // add attachments
            await AttachmentService.createAttachments(uploadFiles)
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
        setLoadingUpdateAssign(false)
    }

    const handleClear = () => {
        setUpdateAssignment({ ...currentAssignment })
        setUploadFiles([...currentFiles])
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
                {updateAssignment?._draft ? (
                    <div className="d-flex">
                        <button
                            className="createAssign_submitBtn"
                            disabled={
                                !updateAssignment?.title || loadingUpdateAssign
                            }
                            onClick={() => handleSubmit(false)}
                        >
                            {loadingUpdateAssign ? 'Assigning...' : 'Assign'}
                        </button>
                        <button
                            className="createAssign_draftBtn"
                            disabled={!updateAssignment?.title}
                            onClick={() => handleSubmit(true)}
                        >
                            Save draft
                        </button>
                    </div>
                ) : (
                    <button
                        className="createAssign_submitBtn"
                        disabled={
                            !updateAssignment?.title || loadingUpdateAssign
                        }
                        onClick={() => handleSubmit(false)}
                    >
                        {loadingUpdateAssign ? 'Saving...' : 'Save'}
                    </button>
                )}
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
                            value={updateAssignment?.title || ''}
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
                            data={updateAssignment?.instruction || null}
                            onChange={(event, editor) => {
                                if (updateAssignment?.id) {
                                    setUpdateAssignment({
                                        ...updateAssignment,
                                        instruction: editor.getData(),
                                    })
                                }
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
                                    min={updateAssignment?.created_date || ''}
                                    value={updateAssignment?.start_date || ''}
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
                                    placeholder="due date"
                                    value={updateAssignment?.due_date || ''}
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
                                                handleDeleteFile(file, index)
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
                </div>
            </div>
        </div>
    )
}

export default UpdateAssignment

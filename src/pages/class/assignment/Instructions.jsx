import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import AssignmentService from '../../../services/AssignmentService'
import AttachmentService from '../../../services/AttachmentService'
import { deleteFolder } from '../../../features/fileManagement'

import { OptionHorIcon } from '../../../components/icons'

const Instructions = () => {
    const navigate = useNavigate()

    const { id } = useParams()
    const { assign_id } = useParams()

    const { userInfo } = useSelector((state) => state.user)

    const [assignment, setAssignment] = useState({})
    const [attachments, setAttachments] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const tempAssignment = (
                await AssignmentService.getAssignmentById(assign_id)
            ).data
            setAssignment(tempAssignment)
            const tempAttachments = (
                await AttachmentService.getAttachmentsByAssignmentId(assign_id)
            ).data
            setAttachments(tempAttachments)
        }
        fetchData()
    }, [])

    const handleDelete = async (e) => {
        e.preventDefault()
        // clear validation
        setLoading(true)
        try {
            await AssignmentService.deleteAssignment(assign_id)
            await deleteFolder(
                `files/${assignment.classroom.user.username}/class/${id}/assignment/${assign_id}`
            )
            document
                .getElementById(`closeDeleteAssignmentDetailModal${assign_id}`)
                .click()
            navigate(`/class/${id}/assignments`)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoading(false)
    }

    const handleCopyLink = (event) => {
        navigator.clipboard.writeText(window.location.href)
    }

    return (
        <div className="instruction_container">
            <div className="instruction_main">
                <div className="d-flex align-items-center justify-content-between mb-1">
                    <div className="instruction_heading">
                        {assignment?.title}
                    </div>
                    <div className="dropdown align-self-start">
                        <button
                            className="btn btn-outline-secondary icon-outline-secondary "
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <OptionHorIcon />
                        </button>
                        <ul className="dropdown-menu">
                            {userInfo?.id ===
                                assignment?.classroom?.user?.id && (
                                <div>
                                    <li>
                                        <Link
                                            className="dropdown-item py-1 px-3 d-flex align-items-center"
                                            type="button"
                                            to={`../../../edit-assignment/${assign_id}`}
                                            relative="path"
                                        >
                                            Edit
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item py-1 px-3 d-flex align-items-center"
                                            type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#deleteAssignmentDetailModal${assign_id}`}
                                        >
                                            Delete
                                        </button>
                                    </li>
                                </div>
                            )}
                            <li>
                                <button
                                    className="dropdown-item py-1 px-3 d-flex align-items-center"
                                    type="button"
                                    onClick={handleCopyLink}
                                >
                                    Copy link
                                </button>
                            </li>
                            {userInfo?.id !==
                                assignment?.classroom?.user?.id && (
                                <div>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item py-1 px-3 d-flex align-items-center"
                                            type="button"
                                        >
                                            Report
                                        </button>
                                    </li>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="d-flex mb-2 instruction_info">
                    <div>{assignment?.user?.username}</div>
                    <div className="mx-1">·</div>
                    <div>
                        {assignment?.created_date}{' '}
                        {assignment?.modified_date
                            ? `(Edited ${assignment?.modified_date})`
                            : ''}
                    </div>
                </div>
                <div className="d-flex justify-content-between mb-3 instruction_date">
                    <div>
                        {assignment?.start_date
                            ? `Start ${assignment?.start_date}`
                            : 'No start date'}
                    </div>
                    <div>
                        {assignment?.due_date
                            ? `Due ${assignment?.due_date}`
                            : 'No due date'}
                    </div>
                </div>
            </div>
            {/* attchments */}
            <div className="row">
                {attachments.map((file, index) => (
                    <div className="col-6" key={index}>
                        <a
                            className="card mb-2 text-decoration-none"
                            href={file.file_url}
                            target="_blank"
                        >
                            <div className="card-body d-flex justify-content-between">
                                <div className="fileUploadContainer">
                                    <div className="fileUploadName">
                                        {file.file_name}
                                    </div>
                                    <div className="fileUploadType">
                                        {file.file_type}
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
            {/* delete modal */}
            <div
                className="modal fade assignDeleteModal"
                tabIndex="-1"
                id={`deleteAssignmentDetailModal${assign_id}`}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete assignment?</h5>
                            <button
                                id={`closeDeleteAssignmentDetailModal${assign_id}`}
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>Grades and comments will also be deleted</p>
                            <div className="text-end mt-4">
                                <button
                                    type="button"
                                    className="btn btn-secondary me-3"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={handleDelete}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div
                                            className="spinner-border text-secondary mx-auto mb-1"
                                            role="status"
                                            id="loading"
                                        >
                                            <span className="visually-hidden">
                                                Loading...
                                            </span>
                                        </div>
                                    ) : (
                                        'Delete'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Instructions

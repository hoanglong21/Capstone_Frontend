import { useState } from 'react'

import AssignmentService from '../../../services/AssignmentService'
import { deleteFolder } from '../../../features/fileManagement'

import '../../../assets/styles/popup.css'

const DeleteAssignment = ({ assignments, assign, stateChanger, index }) => {
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        // clear validation
        setLoading(true)
        try {
            await AssignmentService.deleteAssignment(assign.id)
            var tempAssignments = [...assignments]
            tempAssignments.splice(index, 1)
            stateChanger(tempAssignments)
            document
                .getElementById(`closeDeleteAssignmentModal${assign?.id}`)
                .click()
            await deleteFolder(
                `files/${assign.classroom.user.username}/class/${assign.classroom.id}/assignment/${assign.id}`
            )
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoading(false)
    }

    return (
        <div
            className="modal fade assignDeleteModal"
            tabIndex="-1"
            id={`deleteAssignmentModal${assign?.id}`}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete assignment?</h5>
                        <button
                            id={`closeDeleteAssignmentModal${assign?.id}`}
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
                                onClick={handleSubmit}
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
    )
}

export default DeleteAssignment

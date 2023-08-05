import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import StudySetService from '../../services/StudySetService'

import '../../assets/styles/popup.css'

const DeleteSet = ({ studySet }) => {
    let navigate = useNavigate()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        // clear validation
        setError('')
        setLoading(true)
        try {
            await StudySetService.deleteStudySet(studySet.id)
            document.getElementById('closeDeleteSetModal').click()
            navigate('/')
            // clear validation
            setError('')
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data)
            } else {
                setError(error.message)
            }
        }
        setLoading(false)
    }

    return (
        <div
            className="modal fade setDeleteModal"
            tabIndex="-1"
            id="deleteSetModal"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header border-0 px-4">
                        <h5 className="modal-title setModalTitle">
                            Delete this set?
                        </h5>
                        <button
                            id="closeDeleteSetModal"
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => {
                                setError('')
                            }}
                        ></button>
                    </div>
                    <div className="modal-body px-4">
                        {/* error message */}
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <div className="setModalHeading mb-1">
                            {studySet?.title}
                        </div>
                        <p className="mb-1">
                            You are about to delete this set and all of its
                            data. No one will be able to access this set ever
                            again.
                        </p>
                        <p className="fw-semibold">
                            Are you sure? This cannot be undone.
                        </p>
                    </div>
                    <div className="modal-footer px-4">
                        <div className="text-end">
                            <button
                                type="button"
                                className="btn btn-secondary classModalBtn me-3"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                className="btn btn-danger classModalBtn"
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
                                    'Yes, delete this set'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteSet

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import ClassService from '../../services/ClassService'

import '../../assets/styles/popup.css'

const DeleteClass = ({ classroom }) => {
    let navigate = useNavigate()

    const [deleteClass, setDeleteClass] = useState({})
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (classroom.class_name) {
            setDeleteClass({ ...classroom })
        }
    }, [classroom])

    const handleSubmit = async (e) => {
        e.preventDefault()
        // clear validation
        setError('')
        setLoading(true)
        try {
            await ClassService.deleteClass(deleteClass.id)
            document.getElementById('closeDeleteClassModal').click()
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
            className="modal fade classDeleteModal"
            tabIndex="-1"
            id="deleteClassModal"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header bg-primary">
                        <h5 className="modal-title classModalTitle">
                            Delete this class?
                        </h5>
                        <button
                            id="closeDeleteClassModal"
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => {
                                document
                                    .querySelector('.needs-validation')
                                    .classList.remove('was-validated')
                                document
                                    .getElementById('class_name')
                                    .classList.remove('is-invalid')
                                setDeleteClass({})
                                setError('')
                            }}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {/* error message */}
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <div className="classModalHeading mb-4">
                            {deleteClass.class_name}
                        </div>
                        <p>You are about to delete this class.</p>
                        <p className="fw-semibold">
                            Are you sure? This cannot be undone.
                        </p>
                        <div className="text-end mt-4">
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
                                    'Yes, delete this class'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteClass

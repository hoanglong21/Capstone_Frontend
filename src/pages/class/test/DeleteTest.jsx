import { useState } from 'react'

import AssignmentService from '../../../services/AssignmentService'
import { deleteFolder } from '../../../features/fileManagement'

import '../../../assets/styles/popup.css'
import TestService from '../../../services/TestService'

const DeleteTest = ({ tests, test, stateChanger, index, classroom }) => {
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        // clear validation
        setLoading(true)
        try {
            await TestService.deleteTest(test.id)
            var tempTests = [...tests]
            tempTests.splice(index, 1)
            stateChanger(tempTests)
            document.getElementById(`closeDeleteTestModal${test?.id}`).click()
            await deleteFolder(
                `files/${classroom.user.username}/class/${classroom.id}/test/${test.id}`
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
            className="modal fade testDeleteModal"
            tabIndex="-1"
            id={`deleteTestModal${test?.id}`}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete test</h5>
                        <button
                            id={`closeDeleteTestModal${test?.id}`}
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this quiz?</p>
                        <div className="text-end mt-4">
                            <button
                                type="button"
                                className="btn btn-secondary me-3"
                                data-bs-dismiss="modal"
                            >
                                Cancel
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

export default DeleteTest

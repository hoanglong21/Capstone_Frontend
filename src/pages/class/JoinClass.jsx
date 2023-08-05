import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import ClassService from '../../services/ClassService'

import FormStyles from '../../assets/styles/Form.module.css'
import '../../assets/styles/popup.css'

const JoinClass = () => {
    const navigate = useNavigate()

    const { userInfo } = useSelector((state) => state.user)

    const [classCode, setClassCode] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        var form = document.querySelector('.needs-validation')
        const classCodeEl = document.getElementById('classCode')
        // clear validation
        form.classList.remove('was-validated')
        classCodeEl.classList.remove('is-invalid')
        setError('')
        form.classList.add('was-validated')
        if (!classCode) {
            setError('Class code cannot be empty.')
            classCodeEl.classList.add('is-invalid')
        } else {
            try {
                const temp = (
                    await ClassService.joinClass(classCode, userInfo.username)
                ).data
                navigate(`/class/${temp.id}`)
                document.getElementById('closeJoinClassModal').click()
                // clear validation
                form.classList.remove('was-validated')
                classCodeEl.classList.remove('is-invalid')
                setClassCode('')
                setError('')
            } catch (error) {
                if (error.response && error.response.data) {
                    setError(error.response.data)
                } else {
                    setError(error.message)
                }
            }
        }
        setLoading(false)
    }

    return (
        <div
            className="modal fade classModal"
            tabIndex="-1"
            id="joinClassModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content p-2">
                    <div className="modal-header border-0">
                        <h5 className="modal-title classModalTitle">
                            Join class
                        </h5>
                        <button
                            id="closeJoinClassModal"
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
                                setClassCode('')
                                setError('')
                            }}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form className="needs-validation" noValidate>
                            {/* error message */}
                            {error && (
                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                >
                                    {error}
                                </div>
                            )}
                            {/* Class code */}
                            <div className="form-floating mb-3">
                                <input
                                    id="classCode"
                                    name="classCode"
                                    type="text"
                                    className={`form-control ${FormStyles.formControl}`}
                                    placeholder="Enter a class code"
                                    value={classCode || ''}
                                    onChange={(event) => {
                                        setClassCode(event.target.value)
                                    }}
                                    required
                                />
                                <label htmlFor="classCode">Class code</label>
                            </div>
                            <div className="text-end">
                                <button
                                    className="btn btn-primary classModalBtn mt-3"
                                    onClick={handleSubmit}
                                >
                                    Join
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default JoinClass

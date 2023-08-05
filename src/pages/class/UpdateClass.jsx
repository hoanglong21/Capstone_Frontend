import { useState, useEffect } from 'react'

import ClassService from '../../services/ClassService'

import FormStyles from '../../assets/styles/Form.module.css'
import '../../assets/styles/popup.css'

const UpdateClass = ({ classroom, stateChanger }) => {
    const [updateClass, setUpdateClass] = useState({})
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (classroom.class_name) {
            setUpdateClass({ ...classroom })
        }
    }, [classroom])

    const handleChange = (event) => {
        setUpdateClass({
            ...updateClass,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        var form = document.querySelector('.needs-validation')
        const classNameEl = document.getElementById('class_name')
        // clear validation
        form.classList.remove('was-validated')
        classNameEl.classList.remove('is-invalid')
        setError('')

        form.classList.add('was-validated')
        if (!updateClass.class_name) {
            setError('Class name cannot be empty.')
            classNameEl.classList.add('is-invalid')
        } else {
            try {
                const temp = (
                    await ClassService.updateClassroom(
                        updateClass,
                        updateClass.id
                    )
                ).data
                setUpdateClass(temp)
                document.getElementById('closeUpdateClassModal').click()
                stateChanger(temp)
                // clear validation
                form.classList.remove('was-validated')
                classNameEl.classList.remove('is-invalid')
                setUpdateClass({})
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
            id="updateClassModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content p-2">
                    <div className="modal-header border-0">
                        <h5 className="modal-title classModalTitle">
                            Edit class
                        </h5>
                        <button
                            id="closeUpdateClassModal"
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
                                setUpdateClass({})
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
                            {/* Class name */}
                            <div className="form-floating mb-3">
                                <input
                                    id="class_name"
                                    name="class_name"
                                    type="text"
                                    value={updateClass.class_name || ''}
                                    className={`form-control ${FormStyles.formControl}`}
                                    placeholder="Enter a class name"
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="class_name">Class name</label>
                            </div>
                            {/* Description */}
                            <div className="form-floating mb-3">
                                <textarea
                                    name="description"
                                    type="text"
                                    value={updateClass.description || ''}
                                    className={`form-control ${FormStyles.formControl}`}
                                    style={{ height: '6rem' }}
                                    placeholder="Enter a description"
                                    onChange={handleChange}
                                />
                                <label htmlFor="description">Description</label>
                            </div>
                            <div className="text-end">
                                <button
                                    className="btn btn-primary classModalBtn mt-3"
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
                                        'Save'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateClass

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ClassService from '../../services/ClassService'

import FormStyles from '../../assets/styles/Form.module.css'
import '../../assets/styles/popup.css'

export default function CreateClass() {
    let navigate = useNavigate()

    const { userInfo } = useSelector((state) => state.user)

    const [newClass, setNewClass] = useState({})
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = () => {
            setNewClass({
                class_name: '',
                description: '',
                user: {
                    id: userInfo.id,
                    username: userInfo.username,
                },
            })
        }
        if (userInfo.username) {
            fetchData()
        }
    }, [userInfo])

    const handleChange = (event) => {
        setNewClass({ ...newClass, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        console.log(newClass)
        var form = document.querySelector('.needs-validation')
        const classNameEl = document.getElementById('class_name')
        // clear validation
        form.classList.remove('was-validated')
        classNameEl.classList.remove('is-invalid')
        setError('')

        form.classList.add('was-validated')
        if (!form.checkValidity()) {
            setError('Class name cannot be empty.')
            classNameEl.classList.add('is-invalid')
        } else {
            try {
                const temp = (await ClassService.createClassroom(newClass)).data
                setNewClass(temp)
                document.getElementById('closeCreateClassModal').click()
                navigate(`/class/${temp.id}`)
                // clear validation
                form.classList.remove('was-validated')
                classNameEl.classList.remove('is-invalid')
                setNewClass({
                    class_name: '',
                    description: '',
                    user: {
                        id: userInfo.id,
                        username: userInfo.username,
                    },
                })
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
            id="createClassModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content p-2">
                    <div className="modal-header border-0">
                        <h5 className="modal-title classModalTitle">
                            Create a new class
                        </h5>
                        <button
                            id="closeCreateClassModal"
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
                                setError('')
                                setNewClass({})
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
                                    value={newClass.class_name || ''}
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
                                    value={newClass.description || ''}
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
                                        'Create class'
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

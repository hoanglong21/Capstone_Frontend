import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import UserService from '../../services/UserService'

import FormStyles from '../../assets/styles/Form.module.css'
import "./auth.css"

const ResetPassword = () => {
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()

    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleReset = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            var form = document.querySelector('.needs-validation')
            const newPassEl = document.getElementById('newPass')
            const confirmPassEl = document.getElementById('confirmPass')
            // clear validation
            form.classList.remove('was-validated')
            newPassEl.classList.remove('is-invalid')
            confirmPassEl.classList.remove('is-invalid')
            setError('')

            form.classList.add('was-validated')
            if (!newPass) {
                setError('Please enter a password.')
                newPassEl.classList.add('is-invalid')
            } else if (!newPass.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
                setError(`<ul>
                        Your new password must contain the following:
                        <li id="letter" className="invalid">
                            A <b>lowercase</b> letter
                        </li>
                        <li id="capital" className="invalid">
                            A <b>capital (uppercase)</b> letter
                        </li>
                        <li id="number" className="invalid">
                            A <b>number</b>
                        </li>
                        <li id="length" className="invalid">
                            Minimum <b>8 characters</b>
                        </li>
                    </ul>`)
                newPassEl.classList.add('is-invalid')
            } else if (confirmPass !== newPass) {
                setError('Your passwords did not match. Type them again.')
                confirmPassEl.classList.add('is-invalid')
                newPassEl.classList.add('is-invalid')
            } else {
                await UserService.changePassword(
                    searchParams.get('username'),
                    newPass
                )
                navigate('/login')
            }
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
        <div className="container">
            <h2 className='auth-header'>Reset Password</h2>
            <form className="needs-validation mt-4" noValidate>
                {/* error message */}
                {error && (
                    <div
                        className="error alert alert-danger"
                        role="alert"
                        dangerouslySetInnerHTML={{ __html: error }}
                    ></div>
                )}
                <div className="form-floating mb-3">
                    <input
                        id="newPass"
                        name="newPass"
                        type="password"
                        value={newPass}
                        className={`form-control ${FormStyles.formControl}`}
                        placeholder="New password"
                        onChange={(event) => {
                            setNewPass(event.target.value)
                        }}
                        required
                    />
                    <label htmlFor="newPass">New password</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        id="confirmPass"
                        name="confirmPass"
                        type="password"
                        value={confirmPass}
                        className={`form-control ${FormStyles.formControl}`}
                        placeholder="Confirm password"
                        onChange={(event) => {
                            setConfirmPass(event.target.value)
                        }}
                        required
                    />
                    <label htmlFor="confirmPass">Confirm password</label>
                </div>
                <div className="form-group mt-5">
                    <button
                        className={`btn btn-primary ${FormStyles.btn}`}
                        onClick={handleReset}
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
                            'Save password'
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}
export default ResetPassword

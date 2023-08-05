import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import FormStyles from '../../assets/styles/Form.module.css'
import UserService from '../../services/UserService'
import { useEffect } from 'react'

const ForgotPassword = () => {
    const { userInfo } = useSelector((state) => state.user)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const fetchData = () => {
            setUsername(userInfo.username)
            setEmail(userInfo.email)
        }
        if (userInfo.username) {
            fetchData()
        }
    }, [userInfo])

    const handleForgot = async (event) => {
        event.preventDefault()
        setLoading(true)
        setSuccess(false)
        if (userInfo) {
            const res = await UserService.sendResetPasswordEmail(username)
            setEmail(res.data)
            setSuccess(true)
        } else {
            try {
                var form = document.querySelector('.needs-validation')
                const usernameEl = document.getElementById('username')
                // clear validation
                form.classList.remove('was-validated')
                usernameEl.classList.remove('is-invalid')
                setError('')

                form.classList.add('was-validated')
                if (!username) {
                    setError('You did not enter a username')
                    usernameEl.classList.add('is-invalid')
                    return
                } else {
                    const res = await UserService.sendResetPasswordEmail(
                        username
                    )
                    setEmail(res.data)
                    setSuccess(true)
                }
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

    function hideEmail(userEmail) {
        const partialEmail = userEmail.replace(
            /(\w{3})[\w.-]+@([\w.]{3})[\w.]{3}/,
            '$1***@$2***'
        )
        return partialEmail
    }

    if (!success) {
        if (!userInfo.username) {
            return (
                <div className="container">
                    <h2>Forgot Password</h2>
                    <p className="m-0">
                        Enter your username or the email address you signed up
                        with. We'll email you a link to log in and reset your
                        password.
                    </p>
                    <form className="form needs-validation mt-4" noValidate>
                        {/* error message */}
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <div className="form-group">
                            <input
                                id="username"
                                name="username"
                                className={`form-control ${FormStyles.formControl} ${FormStyles.formControl_noLabel}`}
                                placeholder="Username or email address"
                                value={username}
                                onChange={(event) =>
                                    setUsername(event.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="form-group mt-4">
                            <button
                                className={`btn btn-primary ${FormStyles.btn}`}
                                onClick={handleForgot}
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
                                    'Submit'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )
        } else {
            return (
                <div className="container">
                    <h2>Reset your password</h2>
                    <p className="m-0">
                        Request a link to reset your password below.
                    </p>
                    <button
                        className={`btn btn-primary ${FormStyles.btn} mt-4`}
                        onClick={handleForgot}
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
                            'Submit'
                        )}
                    </button>
                </div>
            )
        }
    } else {
        return (
            <div className="container">
                <h2>Check your email!</h2>
                <p>We've sent an email to {hideEmail(email)}</p>
                <p>
                    Please check your spam folder if you don't see the email in
                    your inbox.
                </p>
                <a
                    className="link-offset-2 link-underline link-underline-opacity-0"
                    href="#"
                >
                    Need more help?
                </a>
            </div>
        )
    }
}

export default ForgotPassword

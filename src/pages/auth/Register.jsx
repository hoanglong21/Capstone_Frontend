import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { register as userRegister } from '../../features/auth/authAction'
import { reset } from '../../features/auth/authSlice'

import { ArrowLeftLongIcon } from '../../components/icons'
import styles from '../../assets/styles/Form.module.css'
import "./auth.css"
const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userToken, error, success } = useSelector((state) => state.auth)
    const { register, handleSubmit } = useForm()

    const [emptyMess, setEmptyMess] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (userToken) navigate('/')
    }, [userToken])

    // reset state
    useEffect(() => {
        dispatch(reset())
    }, [])

    useEffect(() => {
        const usernameEl = document.querySelector('#username')
        const firstNameEl = document.querySelector('#first_name')
        const lastNameEl = document.querySelector('#last_name')
        const emailEl = document.querySelector('#email')
        const passEl = document.querySelector('#password')
        if (Array.isArray(error)) {
            for (const item of error) {
                if (
                    item?.includes(
                        'Invalid username. Only letters, numbers, and underscores are allowed.'
                    ) ||
                    item?.includes(
                        'Username must be between 5 and 30 characters'
                    )
                ) {
                    usernameEl.classList.add('is-invalid')
                }
                if (
                    item?.includes(
                        'Invalid email. Only letters, numbers, and dot are allowed.'
                    )
                ) {
                    emailEl.classList.add('is-invalid')
                }
                if (
                    item?.includes('First name must contain letters only') ||
                    item?.includes(
                        'First name must be between 1 and 30 characters'
                    )
                ) {
                    firstNameEl.classList.add('is-invalid')
                }
                if (
                    item?.includes('Last name must contain letters only') ||
                    item?.includes(
                        'Last name must be between 1 and 30 characters'
                    )
                ) {
                    lastNameEl.classList.add('is-invalid')
                }
                if (
                    item?.includes(
                        'Password must contain at least one lowercase letter'
                    ) ||
                    item?.includes(
                        'Password must contain at least one uppercase letter'
                    ) ||
                    item?.includes(
                        'Password must contain at least one digit (number)'
                    ) ||
                    item?.includes('Password at least 8 characters')
                ) {
                    passEl.classList.add('is-invalid')
                }
            }
        } else {
            if (error?.includes('Username already registered')) {
                usernameEl.classList.add('is-invalid')
            }
            if (error?.includes('Email already registered')) {
                emailEl.classList.add('is-invalid')
            }
        }
    }, [error])

    const submitForm = async (data) => {
        const usernameEl = document.querySelector('#username')
        const emailEl = document.querySelector('#email')
        const firstNameEl = document.querySelector('#first_name')
        const lastNameEl = document.querySelector('#last_name')
        const passEl = document.querySelector('#password')
        var form = document.querySelector('#registerForm')
        // clear validation
        form.classList.remove('was-validated')
        usernameEl.classList.remove('is-invalid')
        firstNameEl.classList.remove('is-invalid')
        lastNameEl.classList.remove('is-invalid')
        passEl.classList.remove('is-invalid')
        dispatch(reset())
        setEmptyMess('')
        form.classList.add('was-validated')
        if (
            !data.username ||
            !data.first_name ||
            !data.last_name ||
            !data.email ||
            !data.password ||
            !data.role
        ) {
            setEmptyMess('Please complete all the fields.')
        } else {
            setLoading(true)
            dispatch(userRegister({ ...data }))
            // clear validation
            dispatch(reset())
            setLoading(false)
            form.classList.remove('was-validated')
            usernameEl.classList.remove('is-invalid')
            emailEl.classList.remove('is-invalid')
            firstNameEl.classList.remove('is-invalid')
            lastNameEl.classList.remove('is-invalid')
            passEl.classList.remove('is-invalid')
            setEmptyMess('')
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0
    }

    return (
        <div className="auth-login">
            <button className="backHomeBtn" onClick={() => navigate('/')}>
                <ArrowLeftLongIcon />
            </button>
            <div className="container auth me-5">
            <h2 className='auth-header'>Get Started</h2>
            <h5 className="auth-header-h5 fw-normal" style={{ color: 'var(--text-light)' }}>
                Create your account now
            </h5>
            <form
                id="registerForm"
                className="authform form"
                // style={{ marginTop: '4rem' }}
                onSubmit={handleSubmit(submitForm)}
                noValidate
            >
                {/* error message */}
                {(emptyMess || error) && (
                    <div className="error alert alert-danger" role="alert">
                        <div>{emptyMess}</div>
                        {Array.isArray(error) ? (
                            <ul className="m-0">
                                {error?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        ) : (
                            <div>{error}</div>
                        )}
                    </div>
                )}
                {/* success message */}
                {success && (
                    <div className="error alert alert-success" role="alert">
                        Registered successfully. Please{' '}
                        <Link to="/login" className="link-success">
                            Login
                        </Link>{' '}
                        to continue.
                    </div>
                )}
                {/* username */}
                <div className="form-group mb-4">
                    <label className={styles.formLabel}>Username</label>
                    <input
                        placeholder="Type your username"
                        id="username"
                        name="username"
                        className={`form-control ${styles.formControl}`}
                        {...register('username')}
                        required
                    />
                </div>
                {/* First name */}
                <div className="form-group mb-4">
                    <label className={styles.formLabel}>First Name</label>
                    <input
                        placeholder="Type your first name"
                        name="first_name"
                        id="first_name"
                        className={`form-control ${styles.formControl}`}
                        {...register('first_name')}
                        required
                    />
                </div>
                {/* Last name */}
                <div className="form-group mb-4">
                    <label className={styles.formLabel}>Last Name</label>
                    <input
                        placeholder="Type your last name"
                        name="last_name"
                        id="last_name"
                        className={`form-control ${styles.formControl}`}
                        {...register('last_name')}
                        required
                    />
                </div>
                {/* Email */}
                <div className="form-group mb-4">
                    <label className={styles.formLabel}>Email</label>
                    <input
                        placeholder="Type your email"
                        id="email"
                        name="email"
                        type="email"
                        className={`form-control ${styles.formControl}`}
                        {...register('email')}
                        required
                    />
                </div>
                {/* Password */}
                <div className="form-group mb-4">
                    <label className={styles.formLabel}>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        id="password"
                        className={`form-control ${styles.formControl}`}
                        {...register('password')}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        required
                    />
                    <div className="invalid-feedback">
                        <ul>
                            Password must contain the following:
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
                        </ul>
                    </div>
                </div>
                {/* Role */}
                <div className="form-group mb-4">
                    <label className={`d-block ${styles.formLabel}`}>
                        Role
                    </label>
                    <div className="form-check form-check-inline me-5">
                        <input
                            type="radio"
                            className={`form-check-input ${styles.formCheckInput}`}
                            name="role"
                            id="learner"
                            value="ROLE_LEARNER"
                            autoComplete="off"
                            {...register('role')}
                            required
                        />
                        <label className="form-check-label" htmlFor="learner">
                            Learner
                        </label>
                    </div>
                    <div className="form-check mb-4 form-check-inline">
                        <input
                            type="radio"
                            className={`form-check-input ${styles.formCheckInput}`}
                            name="role"
                            id="tutor"
                            value="ROLE_TUTOR"
                            autoComplete="off"
                            {...register('role')}
                            required
                        />
                        <label className="form-check-label" htmlFor="tutor">
                            Tutor
                        </label>
                    </div>
                </div>
                {/* register btn */}
                <div className="auth-forgot form-group mt-5">
                    <button
                        type="submit"
                        className={`btn btn-primary col-12 ${styles.btn}`}
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
                            'Register'
                        )}
                    </button>
                </div>
            </form>
            <div className="auth-forgot d-flex">
                <p>Have an account?</p>
                <Link
                    to="/login"
                    className="link-primary text-decoration-none ms-2 me-5 fw-semibold"
                >
                    Login
                </Link>
            </div>
            </div>
        </div>
    )
}
export default Register

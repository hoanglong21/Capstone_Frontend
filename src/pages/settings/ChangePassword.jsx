import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import UserService from '../../services/UserService'

import FormStyles from '../../assets/styles/Form.module.css'
import { getUser } from '../../features/user/userAction'

const ChangePassword = () => {
    const dispatch = useDispatch()

    const { userInfo } = useSelector((state) => state.user)

    const [currentPass, setCurrentPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        var form = document.querySelector('.needs-validation')
        const currentPassEl = document.getElementById('currentPass')
        const newPassEl = document.getElementById('newPass')
        const confirmPassEl = document.getElementById('confirmPass')
        // clear validation
        form.classList.remove('was-validated')
        currentPassEl.classList.remove('is-invalid')
        newPassEl.classList.remove('is-invalid')
        confirmPassEl.classList.remove('is-invalid')
        setError('')

        form.classList.add('was-validated')
        if (!currentPass) {
            currentPassEl.classList.add('is-invalid')
            setError('Please complete all the fields.')
        } else if (!newPass) {
            newPassEl.classList.add('is-invalid')
            setError('Please complete all the fields.')
        } else if (!confirmPass) {
            confirmPassEl.classList.add('is-invalid')
            setError('Please complete all the fields.')
        } else if (
            !(
                await UserService.checkMatchPassword(
                    userInfo.username,
                    currentPass
                )
            ).data
        ) {
            setError('Your current password is incorrect.')
            currentPassEl.classList.add('is-invalid')
        } else if (currentPass === newPass) {
            setError(
                'Your new password cannot be the same as your old password. Please enter a different password.'
            )
            currentPassEl.classList.add('is-invalid')
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
            setError('The password confirmation does not match.')
            newPassEl.classList.add('is-invalid')
            confirmPassEl.classList.add('is-invalid')
        } else {
            await UserService.changePassword(userInfo.username, newPass)
            dispatch(getUser(userInfo.token))
            setSuccess(true)
            // auto hide after 5s
            setTimeout(function () {
                setSuccess(false)
            }, 5000)
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0
    }

    return (
        <div className="mx-5 ps-3 pe-5">
            <h4>Change your password</h4>
            <form className="mt-5 needs-validation" noValidate>
                {/* error message */}
                {error && (
                    <div
                        className="alert alert-danger"
                        role="alert"
                        dangerouslySetInnerHTML={{ __html: error }}
                    ></div>
                )}
                {/* success message */}
                {success && (
                    <div className="alert alert-success" role="alert">
                        Your changes have been successfully saved!
                    </div>
                )}
                <div className="form-group mb-3">
                    <label className={FormStyles.formLabel}>
                        Current Password
                    </label>
                    <input
                        id="currentPass"
                        name="currentPass"
                        type="password"
                        value={currentPass}
                        className={`form-control ${FormStyles.formControl}`}
                        onChange={(event) => setCurrentPass(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label className={FormStyles.formLabel}>New Password</label>
                    <input
                        id="newPass"
                        name="newPass"
                        type="password"
                        value={newPass}
                        className={`form-control ${FormStyles.formControl}`}
                        onChange={(event) => setNewPass(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label className={FormStyles.formLabel}>
                        Confirm Password
                    </label>
                    <input
                        id="confirmPass"
                        name="confirmPass"
                        type="password"
                        value={confirmPass}
                        className={`form-control ${FormStyles.formControl}`}
                        onChange={(event) => setConfirmPass(event.target.value)}
                        required
                    />
                </div>
                <button
                    className="btn btn-primary px-4 mt-1"
                    onClick={handleSubmit}
                >
                    Save
                </button>
                <p className="mt-3">
                    If you forgot your password, you can{' '}
                    <Link
                        to="/forgotten"
                        className="link-primary link-underline-opacity-0 link-underline-opacity-75-hover"
                    >
                        Reset your password
                    </Link>
                    .
                </p>
            </form>
        </div>
    )
}
export default ChangePassword

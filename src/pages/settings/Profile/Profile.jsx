import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {
    deleteFileByUrl,
    getAll,
    uploadFile,
} from '../../../features/fileManagement'

import { updateUser } from '../../../features/user/userAction'
import { reset } from '../../../features/user/userSlice'

import { DeleteIcon, EditIcon } from '../../../components/icons'
import defaultAvatar from '../../../assets/images/default_avatar.png'
import FormStyles from '../../../assets/styles/Form.module.css'
import './Profile.css'

const Profile = () => {
    const dispatch = useDispatch()

    const { userInfo, error, success } = useSelector((state) => state.user)

    const [newUser, setNewUser] = useState({})
    const [errorMess, setErrorMess] = useState('')
    const [successMess, setSuccessMess] = useState(false)
    const [defaultAvatars, setDefaultAvatars] = useState([])
    const [userAvatars, setUserAvatars] = useState([])
    const [loading, setLoading] = useState(false)

    // fetch user state
    useEffect(() => {
        setNewUser({ ...userInfo })
    }, [userInfo])

    // fetch avatar
    useEffect(() => {
        async function fetchAvatar() {
            setLoading(true)
            // fetch default avatar
            const tempDefault = await getAll('system/default_avatar')
            setDefaultAvatars(tempDefault)
            // fetch user avatar
            const tempUser = await getAll(`files/${newUser.username}/avatar`)
            setUserAvatars(tempUser)
            setLoading(false)
        }
        fetchAvatar()
    }, [newUser.username])

    // reset state
    useEffect(() => {
        dispatch(reset())
    }, [dispatch])

    // hide success mess
    useEffect(() => {
        if (success) {
            setSuccessMess(true)
            setTimeout(function () {
                setSuccessMess(false)
            }, 5000)
        }
    }, [success])

    const handleChange = (event) => {
        setNewUser({ ...newUser, [event.target.name]: event.target.value })
    }

    const handleSelectAvatar = (avatarURL) => () => {
        setNewUser({ ...newUser, avatar: avatarURL })
        document.getElementById('toggleModal').click()
    }

    const handleUploadAvatar = async (event) => {
        const file = event.target.files[0]
        if (file) {
            await uploadFile(file, `${newUser.username}/avatar`)
            // reload userAvatars
            setLoading(true)
            const tempUser = await getAll(
                `files/image/avatar/${newUser.username}`
            )
            setUserAvatars(tempUser)
            setLoading(false)
        }
    }

    const handleDeleteAvatar = (avatarUrl) => async () => {
        await deleteFileByUrl(avatarUrl, `${newUser.username}/avatar`)
        // reload userAvatars
        setLoading(true)
        const tempUser = await getAll(`files/${newUser.username}/avatar`)
        setUserAvatars(tempUser)
        setLoading(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        var form = document.querySelector('.needs-validation')
        const firstNameEl = document.getElementById('first_name')
        const lastNameEl = document.getElementById('last_name')
        // clear validation
        form.classList.remove('was-validated')
        firstNameEl.classList.remove('is_invalid')
        lastNameEl.classList.remove('is_invalid')
        setErrorMess('')
        setSuccessMess(false)

        form.classList.add('was-validated')
        if (!newUser.first_name) {
            setErrorMess("First name can't be blank.")
            firstNameEl.classList.add('is_invalid')
        } else if (!newUser.last_name) {
            setErrorMess("Last name can't be blank.")
            lastNameEl.classList.add('is_invalid')
        } else {
            dispatch(updateUser(newUser))
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0
    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0')
    }

    function formatDate(timestamp) {
        let date = new Date(timestamp)
        return (
            date.getFullYear() +
            '-' +
            padTo2Digits(date.getMonth() + 1) +
            '-' +
            padTo2Digits(date.getDate())
        )
    }

    return (
        <div className="mx-5 px-3">
            <h4>My Profile</h4>
            <form className="row g-4 needs-validation" noValidate>
                {/* error message */}
                {(errorMess || error) && (
                    <div
                        className="alert alert-danger col-12 mb-0"
                        role="alert"
                        dangerouslySetInnerHTML={{ __html: errorMess || error }}
                    ></div>
                )}
                {/* successMess message */}
                {successMess && (
                    <div
                        className="alert alert-success col-12 mb-0"
                        role="alert"
                    >
                        Your changes have been successfully saved!
                    </div>
                )}
                {/* avatar */}
                <div className="col-12">
                    <div className="userAvatar mx-auto">
                        <img
                            src={
                                newUser.avatar ? newUser.avatar : defaultAvatar
                            }
                            alt=""
                            className="h-100"
                        />
                        <button
                            type="button"
                            className="btn btn-primary p-0"
                            data-bs-toggle="modal"
                            data-bs-target="#avatarModal"
                        >
                            <EditIcon size="0.75rem" />
                        </button>
                    </div>
                </div>
                {/* Username */}
                <div className="form-group col-6">
                    <label className={FormStyles.formLabel}>Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={newUser.username || ''}
                        className="form-control-plaintext p-0"
                        readOnly
                    />
                </div>
                {/* Email */}
                <div className="form-group col-6">
                    <label className={FormStyles.formLabel}>Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={newUser.email || ''}
                        className="form-control-plaintext p-0"
                        readOnly
                    />
                </div>
                {/* First name */}
                <div className="form-group col-6">
                    <label className={FormStyles.formLabel}>First Name</label>
                    <input
                        id="first_name"
                        name="first_name"
                        type="text"
                        value={newUser.first_name || ''}
                        className={`form-control ${FormStyles.formControl}`}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Last name */}
                <div className="form-group col-6">
                    <label className={FormStyles.formLabel}>Last Name</label>
                    <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        value={newUser.last_name || ''}
                        className={`form-control ${FormStyles.formControl}`}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* DOB  */}
                <div className="form-group col-6">
                    <label className={FormStyles.formLabel}>
                        Date of Birth
                    </label>
                    <input
                        id="dob"
                        name="dob"
                        type="date"
                        value={
                            newUser.dob ? formatDate(newUser.dob) : undefined
                        }
                        className={`form-control ${FormStyles.formControl}`}
                        onChange={handleChange}
                    />
                </div>
                {/* Phone */}
                <div className="form-group col-6">
                    <label className={FormStyles.formLabel}>Phone</label>
                    <input
                        id="phone"
                        name="phone"
                        type="phone"
                        value={newUser.phone || ''}
                        className={`form-control ${FormStyles.formControl}`}
                        onChange={handleChange}
                    />
                </div>
                {/* Gender */}
                <div className="form-group col-6">
                    <label className={`d-block ${FormStyles.formLabel}`}>
                        Gender
                    </label>
                    <div className="form-check form-check-inline me-5">
                        <input
                            type="radio"
                            className={`form-check-input ${FormStyles.formCheckInput}`}
                            name="gender"
                            id="male"
                            value="male"
                            autoComplete="off"
                            checked={newUser.gender === 'male' ? true : false}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="male">
                            Male
                        </label>
                    </div>
                    <div className="form-check form-check-inline me-5">
                        <input
                            type="radio"
                            className={`form-check-input ${FormStyles.formCheckInput}`}
                            name="gender"
                            id="female"
                            value="female"
                            autoComplete="off"
                            checked={newUser.gender === 'female' ? true : false}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="female">
                            Female
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className={`form-check-input ${FormStyles.formCheckInput}`}
                            name="gender"
                            id="other"
                            value="other"
                            autoComplete="off"
                            checked={newUser.gender === 'other' ? true : false}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="other">
                            Other
                        </label>
                    </div>
                </div>
                {/* Role */}
                <div className="form-group col-6">
                    <label className={FormStyles.formLabel}>Role</label>
                    <input
                        name="role"
                        type="text"
                        value={
                            newUser.role === 'ROLE_LEARNER'
                                ? 'Learner'
                                : newUser.role === 'ROLE_TUTOR'
                                ? 'Tutor'
                                : 'Admin'
                        }
                        className="form-control-plaintext p-0"
                        readOnly
                    />
                </div>
                {/* Address */}
                <div className="form-group col-12">
                    <label className={FormStyles.formLabel}>Address</label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        value={newUser.address || ''}
                        className={`form-control ${FormStyles.formControl}`}
                        onChange={handleChange}
                    />
                </div>
                {/* Bio */}
                <div className="form-group col-12">
                    <label className={FormStyles.formLabel}>Bio</label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={newUser.bio || ''}
                        className={`form-control ${FormStyles.formControl}`}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12">
                    <button
                        className="btn btn-primary px-4 mt-1"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </div>
            </form>
            {/* Avatar Modal */}
            <div
                className="avatarModal modal fade"
                id="avatarModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="avatarModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="d-flex modal-heading justify-content-between align-items-center">
                                <p className="">Choose your profile picture</p>
                                <button
                                    id="toggleModal"
                                    type="button"
                                    className="btn-close me-1 mt-1"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="defaultAvatar mt-3 row m-0">
                                {loading ? (
                                    <div
                                        className="spinner-border text-secondary mx-auto"
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            LoadingUpload...
                                        </span>
                                    </div>
                                ) : (
                                    <div>
                                        {defaultAvatars.map(
                                            (avatarURL, index) => (
                                                <div
                                                    key={`defaultAvatars${index}`}
                                                    className="avatarItem col-1 d-inline"
                                                >
                                                    <button
                                                        key={avatarURL}
                                                        className="btn "
                                                        onClick={handleSelectAvatar(
                                                            avatarURL
                                                        )}
                                                    >
                                                        <img
                                                            src={avatarURL}
                                                            alt=""
                                                        />
                                                    </button>
                                                </div>
                                            )
                                        )}
                                        {userAvatars.map((avatarURL, index) => (
                                            <div
                                                key={`userAvatars${index}`}
                                                className="col-1 avatarItem d-inline"
                                            >
                                                <button
                                                    key={avatarURL}
                                                    className="btn"
                                                    onClick={handleSelectAvatar(
                                                        avatarURL
                                                    )}
                                                >
                                                    <img
                                                        src={avatarURL}
                                                        alt=""
                                                    />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-del p-1 rounded-circle"
                                                    onClick={handleDeleteAvatar(
                                                        avatarURL
                                                    )}
                                                >
                                                    <DeleteIcon size="0.85rem" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="col-12 mt-4 p-0 text-center mb-2">
                                    <input
                                        type="file"
                                        id="uploadAvatar"
                                        accept="image/*"
                                        name="picture"
                                        className="avatarUpload"
                                        onChange={handleUploadAvatar}
                                    />
                                    <button className="btn btn-info p-0">
                                        <label htmlFor="uploadAvatar">
                                            Upload your own avatar
                                        </label>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile

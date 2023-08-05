import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-bootstrap/Toast'
import { useState, useEffect } from 'react'
import ToastContainer from 'react-bootstrap/ToastContainer'

import { logout as authLogout } from '../../features/auth/authSlice'
import { logout as userLogout } from '../../features/user/userSlice'

import CreateClass from '../../pages/class/CreateClass'
import JoinClass from '../../pages/class/JoinClass'
import { getUser } from '../../features/user/userAction'

import logo from '../../assets/images/logo-2.png'
import {
    HomeIcon,
    TranslateIcon,
    AddCircleIcon,
    NotifyIcon,
    HelpIcon,
    LogoutIcon,
    DictIcon,
    LibraryIcon,
    SettingIcon,
    AchievementIcon,
} from '../icons'
import defaultAvatar from '../../assets/images/default_avatar.png'
import './Header.css'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userToken } = useSelector((state) => state.auth)
    const { userInfo } = useSelector((state) => state.user)

    const [showLogoutMess, setShowLogoutMess] = useState(false)

    useEffect(() => {
        if (userToken) {
            dispatch(getUser(userToken))
        }
    }, [userToken])

    const toggleShowLogoutMess = () => setShowLogoutMess(!showLogoutMess)

    const handleLogout = () => {
        dispatch(userLogout())
        dispatch(authLogout())
        toggleShowLogoutMess()
        navigate('/')
    }

    const handleAddStudySet = async (type) => {
        if (userToken) {
            navigate(`create-set?type=${type}`)
        } else {
            navigate('login')
        }
    }

    const handleAddClass = () => {
        if (userToken) {
            document.getElementById('toggleCreateModal').click()
        } else {
            navigate('/login')
        }
    }

    const handleJoinClass = () => {
        if (userToken) {
            document.getElementById('toggleJoinModal').click()
        } else {
            navigate('/login')
        }
    }

    return (
        <header className="px-4 border-bottom">
            <nav className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start navbar navbar-expand-sm">
                <a
                    href="/"
                    className="navbar-brand d-flex align-items-center mb-2 mb-lg-0 me-2 text-white text-decoration-none"
                >
                    <img
                        className="bi me-5"
                        src={logo}
                        alt="logo"
                        width="60rem"
                    />
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                >
                    <span className="navbar-toggler-icon fs-7"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav d-flex align-items-center flex-grow-1 me-3 mb-2 mb-md-0 fw-semibold">
                        <li className="nav-item">
                            <NavLink
                                to={'.'}
                                className={
                                    'nav-link px-3 ' +
                                    (({ isActive }) =>
                                        isActive ? 'active' : '')
                                }
                            >
                                <HomeIcon className="mx-2" />
                                <span className="align-middle">Home</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="vocab"
                                className={
                                    'nav-link px-3 ' +
                                    (({ isActive }) =>
                                        isActive ? 'active' : '')
                                }
                            >
                                <DictIcon className="mx-2" />
                                <span className="align-middle">Dictionary</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="translate"
                                className={
                                    'nav-link px-3 ' +
                                    (({ isActive }) =>
                                        isActive ? 'active' : '')
                                }
                            >
                                <TranslateIcon className="mx-2" />
                                <span className="align-middle">Translate</span>
                            </NavLink>
                        </li>
                        {userToken ? (
                            <li className="nav-item">
                                <NavLink
                                    to="/library/sets"
                                    className={
                                        'nav-link px-3 ' +
                                        (({ isActive }) =>
                                            isActive ? 'active' : '')
                                    }
                                >
                                    <LibraryIcon className="mx-2" />
                                    <span className="align-middle">
                                        Your Library
                                    </span>
                                </NavLink>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <NavLink
                                    to="/discovery"
                                    className={
                                        'nav-link px-3 ' +
                                        (({ isActive }) =>
                                            isActive ? 'active' : '')
                                    }
                                >
                                    <LibraryIcon className="mx-2" />
                                    <span className="align-middle">
                                        Discovery
                                    </span>
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="d-flex align-items-center">
                    {/* Add button */}
                    <div className="dropdown d-inline-flex">
                        <button
                            className="btn btn-avatar"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <AddCircleIcon
                                className="icon-primary"
                                size="3.5rem"
                            />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end p-2">
                            <li>
                                <a
                                    className="dropdown-item py-2 px-2"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="true"
                                >
                                    <span className="align-middle fw-semibold">
                                        Study Set
                                    </span>
                                </a>
                                <ul
                                    className="dropdown-menu dropdown-submenu dropdown-submenu-left"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => handleAddStudySet(1)}
                                        >
                                            Vocabulary
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => handleAddStudySet(2)}
                                        >
                                            Kanji
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => handleAddStudySet(3)}
                                        >
                                            Grammar
                                        </button>
                                    </li>
                                </ul>
                            </li>
                            {(!userInfo ||
                                userInfo?.role !== 'ROLE_LEARNER') && (
                                <li>
                                    <button
                                        className="dropdown-item py-2 px-2"
                                        type="button"
                                        onClick={handleAddClass}
                                    >
                                        <span className="align-middle fw-semibold">
                                            Class
                                        </span>
                                    </button>
                                    <button
                                        id="toggleCreateModal"
                                        className="d-none"
                                        data-bs-toggle="modal"
                                        data-bs-target="#createClassModal"
                                    ></button>
                                </li>
                            )}
                            <li>
                                <button
                                    className="dropdown-item py-2 px-2"
                                    type="button"
                                    onClick={handleJoinClass}
                                >
                                    <span className="align-middle fw-semibold">
                                        Join Class
                                    </span>
                                </button>
                                <button
                                    id="toggleJoinModal"
                                    className="d-none"
                                    data-bs-toggle="modal"
                                    data-bs-target="#joinClassModal"
                                ></button>
                            </li>
                        </ul>
                    </div>
                    {userToken ? (
                        <div>
                            {/* Notify */}
                            <div
                                id="bell"
                                className="dropdown d-inline-flex me-2"
                            >
                                <button
                                    className="btn notify_btn btn-outline-secondary icon-outline-secondary"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <NotifyIcon strokeWidth="2" />
                                </button>
                                <ul
                                    className="dropdown-menu dropdown-menu-end p-2 notifications"
                                    id="box"
                                >
                                    <li className="notifications-item dropdown-item">
                                        <div className="text">
                                            <h4>AnhDuong</h4>
                                            <p
                                                style={{
                                                    marginBottom: '0',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                You have homework to do
                                            </p>
                                            <p>10 minutes ago</p>
                                        </div>
                                    </li>
                                    <li className="notifications-item dropdown-item">
                                        <div className="text">
                                            <h4>AnhDuong</h4>
                                            <p
                                                style={{
                                                    marginBottom: '0',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                You have homework to do
                                            </p>
                                            <p>10 minutes ago</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            {/* User */}
                            <div className="dropdown d-inline-flex">
                                <button
                                    className="btn btn-avatar pe-0"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <img
                                        src={
                                            userInfo?.avatar
                                                ? userInfo?.avatar
                                                : defaultAvatar
                                        }
                                        alt="avatar"
                                        className="avatar"
                                    />
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end p-2">
                                    <li>
                                        <div className="dropdown-header d-flex align-items-center">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={
                                                        userInfo?.avatar
                                                            ? userInfo?.avatar
                                                            : defaultAvatar
                                                    }
                                                    alt="avatar"
                                                    className="avatar"
                                                />
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <p className="fw-semibold">
                                                    {userInfo?.username}
                                                </p>
                                                <p
                                                    className="text-truncate"
                                                    style={{
                                                        maxWidth: '8rem',
                                                    }}
                                                >
                                                    {userInfo?.email}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item py-2 px-3"
                                            type="button"
                                            onClick={() => {
                                                navigate(
                                                    '/library/achievements'
                                                )
                                            }}
                                        >
                                            <AchievementIcon
                                                className="me-3"
                                                strokeWidth="1.65"
                                            />
                                            <span className="align-middle fw-semibold">
                                                Achievements
                                            </span>
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item py-2 px-3"
                                            type="button"
                                            onClick={() => {
                                                navigate('/account')
                                            }}
                                        >
                                            <SettingIcon
                                                className="me-3"
                                                strokeWidth="2"
                                            />
                                            <span className="align-middle fw-semibold">
                                                Settings
                                            </span>
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item py-2 px-3"
                                            type="button"
                                            onClick={() => {
                                                navigate('/help-center')
                                            }}
                                        >
                                            <HelpIcon
                                                className="me-3"
                                                strokeWidth="2"
                                            />
                                            <span className="align-middle fw-semibold">
                                                Help Center
                                            </span>
                                        </button>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item py-2 px-3"
                                            type="button"
                                            onClick={handleLogout}
                                        >
                                            <LogoutIcon
                                                className="me-3"
                                                strokeWidth="2"
                                            />
                                            <span className="align-middle fw-semibold">
                                                Logout
                                            </span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link to="/login">
                                <button
                                    type="button"
                                    className="btn btn-light me-2"
                                >
                                    Login
                                </button>
                            </Link>
                            <Link to="register">
                                <button
                                    type="button"
                                    className="btn btn-warning"
                                >
                                    Sign up
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </nav>
            {/* Logout message */}
            <ToastContainer
                className="p-3 mt-5"
                position="top-end"
                style={{ zIndex: 9999 }}
            >
                <Toast
                    show={showLogoutMess}
                    onClose={toggleShowLogoutMess}
                    delay={3000}
                    autohide
                >
                    <Toast.Body>You have been logged out</Toast.Body>
                </Toast>
            </ToastContainer>
            {/* Create class modal */}
            <CreateClass />
            {/* Join class modal */}
            <JoinClass />
        </header>
    )
}
export default Header

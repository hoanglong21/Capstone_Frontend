import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'

import ClassService from '../../../services/ClassService'

import UpdateClass from '../UpdateClass'
import DeleteClass from '../DeleteClass'

import {
    ClassIcon,
    DeleteIcon,
    EditIcon,
    OptionHorIcon,
    ReportIcon,
    StudySetIcon,
    UnenrollIcon,
} from '../../../components/icons'
import './classLayout.css'
import ClassLearnerService from '../../../services/ClassLearnerService'

const ClassLayout = () => {
    const { userInfo } = useSelector((state) => state.user)

    const { id } = useParams()

    const [classroom, setClassroom] = useState({})
    const [hasAccess, setHasAccess] = useState(false)
    const [isWaiting, setIsWaiting] = useState(false)

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const tempClass = (await ClassService.getClassroomById(id)).data
                setClassroom(tempClass)
                const tempHasAccess = (
                    await ClassService.checkUserClass(id, userInfo.id)
                ).data
                setHasAccess(tempHasAccess)
                if (!tempHasAccess) {
                    const tempIsWaiting = (
                        await ClassService.checkUserClassWaiting(
                            id,
                            userInfo.id
                        )
                    ).data
                    setIsWaiting(tempIsWaiting)
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        if (userInfo.username) {
            fetchData()
        }
    }, [userInfo, id])

    const handleRequest = async () => {
        try {
            await ClassLearnerService.createClassLeaner({
                user: { id: userInfo.id, username: userInfo.username },
                classroom: {
                    id: classroom.id,
                },
                _accepted: false,
            })
            setIsWaiting(true)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    const handleCancelRequest = async () => {
        try {
            await ClassLearnerService.deleteClassLearner(
                userInfo.id,
                classroom.id
            )
            setIsWaiting(false)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    return (
        <div>
            <div className="mainClass_container mx-auto">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <div className="d-flex align-items-center">
                            <ClassIcon
                                size="3.125rem"
                                className="mainClassHeader_icon"
                                strokeWidth="2"
                            />
                            <h1 className="mainClass_title m-0 ms-3">
                                {classroom.class_name}
                            </h1>
                        </div>
                        {!hasAccess && (
                            <p className="mt-1">{classroom.description}</p>
                        )}
                    </div>
                    {hasAccess ? (
                        <div className="dropdown align-self-start">
                            <button
                                className="btn btn-outline-secondary icon-outline-secondary "
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <OptionHorIcon />
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <button
                                        className="dropdown-item py-2 px-3 d-flex align-items-center"
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#updateClassModal"
                                    >
                                        <EditIcon
                                            className="me-3"
                                            size="1.3rem"
                                        />
                                        <span className="align-middle fw-semibold">
                                            Edit
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item py-2 px-3 d-flex align-items-center"
                                        type="button"
                                    >
                                        <ReportIcon
                                            className="me-3"
                                            size="1.3rem"
                                            strokeWidth="2"
                                        />
                                        <span className="align-middle fw-semibold">
                                            Report
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                {userInfo?.id === classroom?.user?.id ? (
                                    <li>
                                        <button
                                            className="dropdown-item btn-del py-2 px-3 d-flex align-items-center"
                                            type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#deleteClassModal"
                                        >
                                            <DeleteIcon
                                                className="me-3"
                                                size="1.3rem"
                                                strokeWidth="2"
                                            />
                                            <span className="align-middle fw-semibold">
                                                Delete
                                            </span>
                                        </button>
                                    </li>
                                ) : (
                                    <li>
                                        <button
                                            className="dropdown-item btn-del py-2 px-3 d-flex align-items-center"
                                            type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#deleteClassModal"
                                        >
                                            <UnenrollIcon
                                                className="me-3"
                                                size="1.3rem"
                                                strokeWidth="2"
                                            />
                                            <span className="align-middle fw-semibold">
                                                Unenroll
                                            </span>
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    ) : (
                        <div>
                            {isWaiting ? (
                                <button
                                    className="btn btn-outline-primary rounded"
                                    type="button"
                                    onClick={handleCancelRequest}
                                >
                                    Cancel Request
                                </button>
                            ) : (
                                <button
                                    className="btn btn-outline-primary rounded"
                                    type="button"
                                    onClick={handleRequest}
                                >
                                    Request to join class
                                </button>
                            )}
                        </div>
                    )}
                </div>
                {hasAccess ? (
                    <div>
                        <div className="mainClass_navbar mt-4">
                            <ul className="nav">
                                <li>
                                    <NavLink
                                        to=""
                                        end
                                        className={
                                            'mainClass_navlink ' +
                                            (({ isActive }) =>
                                                isActive ? 'active' : '')
                                        }
                                    >
                                        <span className="align-middle">
                                            Stream
                                        </span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="assignments"
                                        className={
                                            'mainClass_navlink ' +
                                            (({ isActive }) =>
                                                isActive ? 'active' : '')
                                        }
                                    >
                                        <span className="align-middle">
                                            Assignments
                                        </span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="tests"
                                        className={
                                            'mainClass_navlink ' +
                                            (({ isActive }) =>
                                                isActive ? 'active' : '')
                                        }
                                    >
                                        <span className="align-middle">
                                            Tests
                                        </span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="people"
                                        className={
                                            'mainClass_navlink ' +
                                            (({ isActive }) =>
                                                isActive ? 'active' : '')
                                        }
                                    >
                                        <span className="align-middle">
                                            People
                                        </span>
                                    </NavLink>
                                </li>
                                {userInfo?.id === classroom?.user?.id && (
                                    <div className="d-flex">
                                        <li>
                                            <NavLink
                                                to="grades"
                                                className={
                                                    'mainClass_navlink ' +
                                                    (({ isActive }) =>
                                                        isActive
                                                            ? 'active'
                                                            : '')
                                                }
                                            >
                                                <span className="align-middle">
                                                    Grades
                                                </span>
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="statistics"
                                                className={
                                                    'mainClass_navlink ' +
                                                    (({ isActive }) =>
                                                        isActive
                                                            ? 'active'
                                                            : '')
                                                }
                                            >
                                                <span className="align-middle">
                                                    Statistics
                                                </span>
                                            </NavLink>
                                        </li>
                                    </div>
                                )}
                            </ul>
                        </div>
                        <div className="mt-4">
                            <Outlet />
                        </div>
                    </div>
                ) : (
                    <div className="row mt-5">
                        {isWaiting ? (
                            <div className="col-8 text-center">
                                <h3 className="mainClass_infoTitle">
                                    Your request to join this class has been
                                    sent
                                </h3>
                                <p>
                                    Once a class owner approves, you'll start
                                    receiving class announcements
                                </p>
                            </div>
                        ) : (
                            <div className="col-8 text-center">
                                <h3 className="mainClass_infoTitle">
                                    Join this class to get access to its content
                                </h3>
                            </div>
                        )}
                        <div className="col-4">
                            <h6 className="mainClass_infoLabel">
                                CLASS DETAILS
                            </h6>
                            <div className="d-flex align-items-center mt-2">
                                <img
                                    src={classroom?.user?.avatar}
                                    className="mainClass_authorAvatar"
                                />
                                <div className="ms-3">
                                    {classroom?.user?.username}
                                </div>
                            </div>
                            <div className="d-flex align-items-center mt-2">
                                <StudySetIcon size="20px" />
                                <div className="ms-3">
                                    {classroom?.studySets?.length} sets
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* Update class Modal */}
            <UpdateClass classroom={classroom} stateChanger={setClassroom} />
            {/* Delete class modal */}
            <DeleteClass classroom={classroom} />
        </div>
    )
}

export default ClassLayout

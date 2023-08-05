import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import StudySetService from '../../../services/StudySetService'
import CardService from '../../../services/CardService'

import ViewCard from './ViewCard'
import DeleteSet from '../DeleteSet'

import defaultAvatar from '../../../assets/images/default_avatar.png'
import {
    DeleteIcon,
    EditIcon,
    LearnSolidIcon,
    OptionHorIcon,
    AddCircleIcon,
    StudySetSolidIcon,
    TestSolidIcon,
    ArrowDownIcon,
} from '../../../components/icons'
import './viewStudySet.css'

const ViewStudySet = () => {
    const navigate = useNavigate()

    const { userToken } = useSelector((state) => state.auth)
    const { userInfo } = useSelector((state) => state.user)

    const { id } = useParams()

    const [studySet, setStudySet] = useState({})
    const [cards, setCards] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const tempStudySet = (await StudySetService.getStudySetById(id))
                .data
            setStudySet(tempStudySet)
            const tempCards = (
                await CardService.getAllByStudySetId(tempStudySet.id)
            ).data
            setCards(tempCards)
        }
        if (id) {
            fetchData()
        }
    }, [id])

    function checkAuth() {
        if (!userToken) {
            navigate('/login')
        }
    }

    return (
        <div className="container setPageContainer">
            <div className="setTitle">
                <h2>{studySet?.title}</h2>
            </div>
            {/* Modes */}
            <div className="row mb-4">
                <div className="col-4">
                    <Link
                        to={`/flashcards/${studySet.id}`}
                        className="studyModesItem d-flex align-items-center justify-content-center"
                    >
                        <StudySetSolidIcon
                            className="StudyModesIcon"
                            size="2rem"
                        />
                        <span className="studyModesItemName">Flashcards</span>
                    </Link>
                </div>
                <div className="col-4">
                    <Link
                        to={`/learn/${studySet.id}`}
                        className="studyModesItem d-flex align-items-center justify-content-center"
                    >
                        <LearnSolidIcon
                            className="StudyModesIcon"
                            size="2rem"
                        />
                        <span className="studyModesItemName" href="/learn">
                            Learn
                        </span>
                    </Link>
                </div>
                <div className="col-4">
                    <Link
                        to={`/quiz/${studySet.id}`}
                        className="studyModesItem d-flex align-items-center justify-content-center"
                    >
                        <TestSolidIcon className="StudyModesIcon" size="2rem" />
                        <span className="studyModesItemName">Quiz</span>
                    </Link>
                </div>
            </div>
            {/* Author + Options */}
            <div className="setPageInformation d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <div className="setAuthorAvatar">
                        <img
                            alt="avatarAuthor"
                            className="w-100 h-100"
                            src={
                                studySet?.user?.avatar
                                    ? studySet.user.avatar
                                    : defaultAvatar
                            }
                        />
                    </div>
                    <div className="setAuthorInfo ms-2">
                        <span className="setAuthorInfo_createdBy">
                            Created by
                        </span>
                        <span className="setAuthorInfo_username">
                            {studySet?.user?.username}
                        </span>
                    </div>
                </div>
                <div className="dropdown setPageOptions d-flex align-items-center justify-content-center">
                    <button
                        type="button dropdown-toggle"
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
                                onClick={() => checkAuth()}
                            >
                                <AddCircleIcon
                                    className="me-3"
                                    size="1.3rem"
                                    strokeWidth="2"
                                />
                                <span className="align-middle fw-semibold">
                                    Add to a class
                                </span>
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item py-2 px-3 d-flex align-items-center"
                                type="button"
                                onClick={() => {
                                    navigate(`/edit-set/${id}`)
                                }}
                            >
                                <EditIcon className="me-3" size="1.3rem" />
                                <span className="align-middle fw-semibold">
                                    Edit
                                </span>
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item btn-del py-2 px-3 d-flex align-items-center"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteSetModal"
                                onClick={() => checkAuth()}
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
                    </ul>
                </div>
            </div>
            {/* Details */}
            <div className="setPageTermsHeader d-flex align-items-center justify-content-between">
                <span className="setPageTermsHeading">
                    Terms in this set ({cards.length})
                </span>
                <div className="dropdown setPageTermsHeader_controls">
                    <button
                        type="button dropdown-toggle"
                        data-bs-toggle="dropdown"
                        className="setPageTermsHeader_btn"
                        aria-expanded="false"
                    >
                        <span>Original</span>
                        <ArrowDownIcon
                            className="ms-2"
                            size="1rem"
                            strokeWidth="2"
                        />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end p-2">
                        <li>
                            <button
                                className="dropdown-item py-1"
                                type="button"
                            >
                                <span className="setPageTermHeader_dropdown">
                                    Original
                                </span>
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item py-1"
                                type="button"
                            >
                                <span className="setPageTermHeader_dropdown">
                                    Alphabetical
                                </span>
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item py-1"
                                type="button"
                            >
                                <span className="setPageTermHeader_dropdown">
                                    Your stats
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Terms */}
            <div className="setPageTerms">
                {cards.map((card) => (
                    <ViewCard card={card} key={card.id} userInfo={userInfo} />
                ))}
            </div>
            {/* delete set modal */}
            <DeleteSet studySet={studySet} />
        </div>
    )
}

export default ViewStudySet

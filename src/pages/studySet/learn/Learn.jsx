import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import StudySetService from '../../../services/StudySetService'
import FieldService from '../../../services/FieldService'
import { getUser } from '../../../features/user/userAction'

import VocabCard from './VocabCard'
import KanjiCard from './KanjiCard'
import GrammarCard from './GrammarCard'

import {
    StudySetSolidIcon,
    ArrowDownIcon,
    CloseIcon,
    LearnSolidIcon,
    TestSolidIcon,
} from '../../../components/icons'
import finishQuizImg from '../../../assets/images/finish_quiz.png'
import FormStyles from '../../../assets/styles/Form.module.css'
import './learn.css'

const Learn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { id } = useParams()

    const { userToken } = useSelector((state) => state.auth)
    const { userInfo } = useSelector((state) => state.user)

    const [studySet, setStudySet] = useState({})
    const [type, setType] = useState(1)
    const [fields, setFields] = useState([])
    const [numNot, setNumNot] = useState(0)
    const [numStill, setNumStill] = useState(0)
    const [numMaster, setNumMaster] = useState(0)
    const [numNotStar, setNumNotStar] = useState(0)
    const [numStillStar, setNumStillStar] = useState(0)
    const [numMasterStar, setNumMasterStar] = useState(0)

    const [questionTypes, setQuestionTypes] = useState([1, 2, 3])
    const [progressStatus, setProgressStatus] = useState([])
    const [isStar, setIsStar] = useState(false)
    const [isShuffle, setIsShuffle] = useState(false)
    const [writtenPromptWith, setWrittenPromptWith] = useState([])
    const [writtenAnswerWith, setWrittenAnswerWith] = useState(0)
    const [multiplePromptWith, setMultiplePromptWith] = useState([])
    const [multipleAnswerWith, setMultipleAnswerWith] = useState([])
    const [trueFalsePromptWith, setTrueFalsePromptWith] = useState([])
    const [trueFalseAnswerWith, setTrueFalseAnswerWith] = useState([])
    const [showPicture, setShowPicture] = useState(false)
    const [showAudio, setShowAudio] = useState(false)
    const [showNote, setShowNote] = useState(false)

    const [optionQuestionTypes, setOptionQuestionTypes] = useState([1, 2, 3])
    const [optionProgressStatus, setOptionProgressStatus] = useState([])
    const [optionIsStar, setOptionIsStar] = useState(false)
    const [optionIsShuffle, setOptionIsShuffle] = useState(false)
    const [optionShowPicture, setOptionShowPicture] = useState(false)
    const [optionShowAudio, setOptionShowAudio] = useState(false)
    const [optionShowNote, setOptionShowNote] = useState(false)
    const [optionWrittenPromptWith, setOptionWrittenPromptWith] = useState([])
    const [optionWrittenAnswerWith, setOptionWrittenAnswerWith] = useState(0)
    const [optionMultiplePromptWith, setOptionMultiplePromptWith] = useState([])
    const [optionMultipleAnswerWith, setOptionMultipleAnswerWith] = useState([])
    const [optionTrueFalsePromptWith, setOptionTrueFalsePromptWith] = useState(
        []
    )
    const [optionTrueFalseAnswerWith, setOptionTrueFalseAnswerWith] = useState(
        []
    )
    const [error, setError] = useState(false)

    const [progress, setProgress] = useState(0)
    const [questions, setQuestions] = useState([])
    const [isEnd, setIsEnd] = useState(false)

    const [loading, setLoading] = useState(false)

    // initial
    useEffect(() => {
        setIsEnd(false)
        setError('')
        document.getElementById('toggleQuizOptionsModalBtn').click()
        const headerHeight = document.getElementById('quizHeader').clientHeight
        document.getElementById('quizProgressContainer').style.top =
            headerHeight
    }, [])

    // fetch user info
    useEffect(() => {
        if (userToken) {
            dispatch(getUser(userToken))
        }
    }, [userToken])

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                // study set
                const tempStudySet = (await StudySetService.getStudySetById(id))
                    .data
                setStudySet(tempStudySet)
                // set type
                setType(tempStudySet.studySetType.id)
                // fields
                const tempFields = (
                    await FieldService.getFieldsByStudySetTypeId(
                        tempStudySet.id
                    )
                ).data
                setFields(tempFields)
                // count
                const tempCounts = (
                    await StudySetService.countCardInSet(userInfo.id, id)
                ).data
                setNumNot(tempCounts['Not studied'])
                setNumStill(tempCounts['Still learning'])
                setNumMaster(tempCounts['Mastered'])
                setNumNotStar(tempCounts['Not studied star'])
                setNumStillStar(tempCounts['Still learning star'])
                setNumMasterStar(tempCounts['Mastered star'])
                // set progress
                var tempProgressStatus = []
                if (tempCounts['Not studied'] != 0) {
                    tempProgressStatus.push('not studied')
                }
                if (tempCounts['Still learning'] != 0) {
                    tempProgressStatus.push('still learning')
                }
                if (tempCounts['Mastered'] != 0) {
                    tempProgressStatus.push('mastered')
                }
                setProgressStatus([...tempProgressStatus])
                setOptionProgressStatus([...tempProgressStatus])
                // prompt with + answer with
                var tempWrittenPromptWith = [tempFields[0].id]
                var tempWrittenAnsWith = []
                for (let index = 1; index < tempFields.length; index++) {
                    const field = tempFields[index]
                    tempWrittenAnsWith.push(field.id)
                }
                setWrittenPromptWith([...tempWrittenPromptWith])
                setWrittenAnswerWith(tempFields[1].id)
                setOptionWrittenPromptWith([...tempWrittenPromptWith])
                setOptionWrittenAnswerWith(tempFields[1].id)
                setMultiplePromptWith([...tempWrittenPromptWith])
                setMultipleAnswerWith([...tempWrittenAnsWith])
                setOptionMultiplePromptWith([...tempWrittenPromptWith])
                setOptionMultipleAnswerWith([...tempWrittenAnsWith])
                setTrueFalsePromptWith([...tempWrittenPromptWith])
                setTrueFalseAnswerWith([...tempWrittenAnsWith])
                setOptionTrueFalsePromptWith([...tempWrittenPromptWith])
                setOptionTrueFalseAnswerWith([...tempWrittenAnsWith])
                // get learn
                const tempNumCards = numNot + numStill + numMaster
                if (tempNumCards > 0) {
                    const tempQuestions = (
                        await StudySetService.getLearningStudySetId(
                            userInfo.id,
                            tempStudySet.id,
                            questionTypes,
                            tempProgressStatus,
                            isShuffle,
                            isStar
                        )
                    ).data
                    setQuestions(tempQuestions)
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
            setLoading(false)
        }
        if (userInfo?.id) {
            fetchData()
        }
    }, [id, userInfo])

    const handleChangeQuestionType = (event) => {
        var tempQuestionsTypes = [...optionQuestionTypes]
        const value = Number(event.target.value)
        if (event.target.checked) {
            tempQuestionsTypes.push(value)
        } else {
            tempQuestionsTypes = tempQuestionsTypes.filter(
                (item) => item !== value
            )
        }
        setOptionQuestionTypes(tempQuestionsTypes)
    }

    const handleCreateLearn = async () => {
        setProgress(0)
        setIsEnd(false)
        setError('')
        // validation
        if (optionProgressStatus?.length < 1) {
            setError('You must select at least one progress status.')
            setLoading(false)
            return
        }
        if (optionQuestionTypes?.length < 1) {
            setError('You must select at least one question type.')
            setLoading(false)
            return
        }
        if (optionQuestionTypes.includes(1)) {
            if (optionWrittenPromptWith?.length < 1) {
                setError(
                    'You must select at least one side for your written prompt.'
                )
                return
            }
            if (optionWrittenAnswerWith === 0) {
                setError('You must select one side for your written answer.')
                return
            }
            for (const prompt of optionWrittenPromptWith) {
                if (optionWrittenAnswerWith === prompt) {
                    setError(
                        'Your written prompt and written answer cannot have the same item.'
                    )
                    return
                }
            }
        }
        if (optionQuestionTypes.includes(2)) {
            if (optionMultiplePromptWith?.length < 1) {
                setError(
                    'You must select at least one side for your multiple choice prompt.'
                )
                return
            }
            if (optionMultipleAnswerWith?.length < 1) {
                setError(
                    'You must select at least one side for your multiple choice answer.'
                )
                return
            }
            for (const prompt of optionMultiplePromptWith) {
                if (optionMultipleAnswerWith?.includes(prompt)) {
                    setError(
                        'Your multiple choice prompt and multiple choice answer cannot have the same item.'
                    )
                    return
                }
            }
        }
        if (optionQuestionTypes.includes(3)) {
            if (optionTrueFalsePromptWith?.length < 1) {
                setError(
                    'You must select at least one side for your true/false prompt.'
                )
                return
            }
            if (optionTrueFalseAnswerWith?.length < 1) {
                setError(
                    'You must select at least one side for your true/false answer.'
                )
                return
            }
            for (const prompt of optionTrueFalsePromptWith) {
                if (optionTrueFalseAnswerWith?.includes(prompt)) {
                    setError(
                        'Your true/false prompt and true/false answer cannot have the same item.'
                    )
                    return
                }
            }
        }
        // create
        try {
            setLoading(true)
            const tempQuestions = (
                await StudySetService.getLearningStudySetId(
                    userInfo.id,
                    studySet.id,
                    optionQuestionTypes,
                    optionProgressStatus,
                    optionIsShuffle,
                    optionIsStar
                )
            ).data
            setQuestions(tempQuestions)
            setProgressStatus(optionProgressStatus)
            setIsStar(optionIsStar)
            setIsShuffle(optionIsShuffle)
            setShowPicture(optionShowPicture)
            setShowAudio(optionShowAudio)
            setShowNote(optionShowNote)
            setQuestionTypes(optionQuestionTypes)
            setWrittenPromptWith(optionWrittenPromptWith)
            setWrittenAnswerWith(optionWrittenAnswerWith)
            setMultiplePromptWith(optionMultiplePromptWith)
            setMultipleAnswerWith(optionMultipleAnswerWith)
            setTrueFalsePromptWith(optionTrueFalsePromptWith)
            setTrueFalseAnswerWith(optionTrueFalseAnswerWith)
            document.getElementById('learnOptionModalCloseBtn').click()
            setError('')
            setLoading(false)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    const handleCancelCreateLearn = () => {
        setError('')
        setOptionProgressStatus(progressStatus)
        setOptionIsStar(isStar)
        setOptionIsShuffle(isShuffle)
        setOptionShowPicture(showPicture)
        setOptionShowAudio(showAudio)
        setOptionShowNote(showNote)
        setOptionQuestionTypes(questionTypes)
        setOptionWrittenPromptWith(writtenPromptWith)
        setOptionWrittenAnswerWith(writtenAnswerWith)
        setOptionMultiplePromptWith(multiplePromptWith)
        setOptionMultipleAnswerWith(multipleAnswerWith)
        setOptionTrueFalsePromptWith(trueFalsePromptWith)
        setOptionTrueFalseAnswerWith(trueFalseAnswerWith)
    }

    const handleChangeProgressStatus = (event) => {
        var tempProgressStatus = [...optionProgressStatus]
        const value = event.target.value
        if (event.target.checked) {
            tempProgressStatus.push(value)
        } else {
            tempProgressStatus = tempProgressStatus.filter(
                (item) => item != value
            )
        }
        setOptionProgressStatus(tempProgressStatus)
    }

    return (
        <div>
            {/* loading */}
            {loading && (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            {/* Header */}
            <div
                id="quizHeader"
                className="quizHeader d-flex justify-content-between align-items-center"
            >
                <div className="d-flex align-items-center">
                    <LearnSolidIcon className="quizModeIcon" size="2rem" />
                    <div className="quizMode dropdown d-flex align-items-center">
                        <button
                            type="button dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <span className="ps-2 me-2">Learn</span>
                            <ArrowDownIcon size="1rem" strokeWidth="2.6" />
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <button
                                    className="dropdown-item py-2 px-3 d-flex align-items-center"
                                    type="button"
                                    onClick={() => {
                                        navigate(`/flashcards/${id}`)
                                    }}
                                >
                                    <StudySetSolidIcon
                                        className="me-3 quizModeIcon"
                                        size="1.3rem"
                                    />
                                    <span className="align-middle fw-semibold">
                                        Flashcards
                                    </span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item quizModeIcon py-2 px-3 d-flex align-items-center"
                                    type="button"
                                    onClick={() => {
                                        navigate(`/quiz/${id}`)
                                    }}
                                >
                                    <TestSolidIcon
                                        className="me-3 quizModeIcon"
                                        size="1.3rem"
                                        strokeWidth="2"
                                    />
                                    <span className="align-middle fw-semibold">
                                        Quiz
                                    </span>
                                </button>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <button
                                    className="dropdown-item py-2 px-3 d-flex align-items-center"
                                    type="button"
                                >
                                    <span className="align-middle fw-semibold">
                                        Home
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="quizInfo d-flex flex-column align-items-center">
                    <h3>
                        {progress} /{' '}
                        {isStar
                            ? numNotStar + numStillStar + numMasterStar
                            : numNot + numStill + numMaster}
                    </h3>
                    <h3 className="quizInfo_title">{studySet?.title}</h3>
                </div>
                <div className="quizOptions d-flex">
                    {isEnd ? (
                        <button
                            id="toggleQuizOptionsModalBtn"
                            className="quizOptions_btn"
                            onClick={handleCreateLearn}
                        >
                            Take a new test
                        </button>
                    ) : (
                        <button
                            id="toggleQuizOptionsModalBtn"
                            className="quizOptions_btn"
                            data-bs-toggle="modal"
                            data-bs-target="#quizOptionModal"
                        >
                            Options
                        </button>
                    )}
                    <button
                        className="quizClose_btn ms-3 d-flex align-items-center"
                        onClick={() => {
                            navigate(`/set/${id}`)
                        }}
                    >
                        <CloseIcon strokeWidth="2" />
                    </button>
                </div>
            </div>
            {/* Progress */}
            {/* {isEnd ? (
                <div
                    id="quizProgressContainer"
                    className="progress-stacked quizEndProgressContainer"
                >
                    <div
                        className="progress"
                        role="progressbar"
                        aria-label="Segment one"
                        aria-valuenow={`${(correct / numQues) * 100}`}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: `${(correct / numQues) * 100}%` }}
                    >
                        <div className="progress-bar bg-success">
                            {(correct / numQues) * 100}%
                        </div>
                    </div>
                    <div
                        className="progress"
                        role="progressbar"
                        aria-label="Segment two"
                        aria-valuenow={`${(incorrect / numQues) * 100}`}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: `${(incorrect / numQues) * 100}%` }}
                    >
                        <div className="progress-bar bg-danger">
                            {(incorrect / numQues) * 100}%
                        </div>
                    </div>
                </div>
            ) : ( */}
            <div id="quizProgressContainer" className="quizProgressContainer">
                <div
                    className="quizProgress"
                    style={{
                        width: `${
                            (progress / isStar
                                ? numNotStar + numStillStar + numMasterStar
                                : numNot + numStill + numMaster) * 100
                        }%`,
                    }}
                ></div>
            </div>
            {/* )} */}
            {/* Questions */}

            {/* Option modal */}
            <div
                className="modal fade quizOptionModal"
                id="quizOptionModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3
                                className="modal-title"
                                id="quizOptionModalLabel"
                            >
                                Options
                            </h3>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={handleCancelCreateLearn}
                            ></button>
                            <button
                                id="learnOptionModalCloseBtn"
                                type="button"
                                className="d-none"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {/* error message */}
                            {error && (
                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                >
                                    {error}
                                </div>
                            )}
                            <div className="row mb-3">
                                <div className="col-6">
                                    {/* types */}
                                    <div className="quizOptionBlock">
                                        <legend>QUESTION TYPES</legend>
                                        <div className="mb-2">
                                            <input
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                value={1}
                                                checked={
                                                    optionQuestionTypes?.includes(
                                                        1
                                                    ) || ''
                                                }
                                                id="written"
                                                onChange={
                                                    handleChangeQuestionType
                                                }
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="written"
                                            >
                                                Written
                                            </label>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                value={2}
                                                checked={
                                                    optionQuestionTypes?.includes(
                                                        2
                                                    ) || ''
                                                }
                                                id="mupltipleChoice"
                                                onChange={
                                                    handleChangeQuestionType
                                                }
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="mupltipleChoice"
                                            >
                                                Multiple choice
                                            </label>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                value={3}
                                                checked={
                                                    optionQuestionTypes?.includes(
                                                        3
                                                    ) || ''
                                                }
                                                id="trueFalse"
                                                onChange={
                                                    handleChangeQuestionType
                                                }
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="trueFalse"
                                            >
                                                True/False
                                            </label>
                                        </div>
                                    </div>
                                    {/* picture */}
                                    <div className="quizOptionBlock">
                                        <legend>PICTURE</legend>
                                        <div className="mb-2">
                                            <input
                                                id="picture"
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                checked={optionShowPicture}
                                                onChange={() => {
                                                    setOptionShowPicture(
                                                        !optionShowPicture
                                                    )
                                                }}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="picture"
                                            >
                                                Show picture
                                            </label>
                                        </div>
                                    </div>
                                    {/* audio */}
                                    <div className="quizOptionBlock">
                                        <legend>AUDIO</legend>
                                        <div className="mb-2">
                                            <input
                                                id="audio"
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                checked={optionShowAudio}
                                                onChange={() => {
                                                    setOptionShowAudio(
                                                        !optionShowAudio
                                                    )
                                                }}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="audio"
                                            >
                                                Show audio
                                            </label>
                                        </div>
                                    </div>
                                    {/* note */}
                                    <div className="quizOptionBlock">
                                        <legend>NOTE</legend>
                                        <div className="mb-2">
                                            <input
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                checked={optionShowNote}
                                                id="note"
                                                onChange={() => {
                                                    setOptionShowNote(
                                                        !optionShowNote
                                                    )
                                                }}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="note"
                                            >
                                                Show note
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    {/* status */}
                                    <div className="quizOptionBlock">
                                        <legend>PROGRESS STATUS</legend>
                                        <div className="mb-2">
                                            <input
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                value="not studied"
                                                checked={
                                                    optionProgressStatus?.includes(
                                                        'not studied'
                                                    ) || ''
                                                }
                                                id="notStudied"
                                                onChange={
                                                    handleChangeProgressStatus
                                                }
                                                disabled={
                                                    optionIsStar
                                                        ? numNotStar == 0
                                                        : numNot == 0
                                                }
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="notStudied"
                                            >
                                                Not studied
                                            </label>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                value="still learning"
                                                checked={
                                                    optionProgressStatus?.includes(
                                                        'still learning'
                                                    ) || ''
                                                }
                                                id="stillLearning"
                                                onChange={
                                                    handleChangeProgressStatus
                                                }
                                                disabled={
                                                    optionIsStar
                                                        ? numStillStar == 0
                                                        : numStill == 0
                                                }
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="stillLearning"
                                            >
                                                Still learning
                                            </label>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                value="mastered"
                                                checked={
                                                    optionProgressStatus?.includes(
                                                        'mastered'
                                                    ) || ''
                                                }
                                                id="mastered"
                                                onChange={
                                                    handleChangeProgressStatus
                                                }
                                                disabled={
                                                    optionIsStar
                                                        ? numMasterStar == 0
                                                        : numMaster == 0
                                                }
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="mastered"
                                            >
                                                Mastered
                                            </label>
                                        </div>
                                    </div>
                                    {/* star */}
                                    <div className="quizOptionBlock">
                                        <legend>STAR</legend>
                                        <div className="mb-2">
                                            <input
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                checked={optionIsStar}
                                                id="isStar"
                                                onChange={() => {
                                                    setOptionIsStar(
                                                        !optionIsStar
                                                    )
                                                }}
                                                disabled={
                                                    numNotStar +
                                                        numStillStar +
                                                        numMasterStar ==
                                                    0
                                                }
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="isStar"
                                            >
                                                Study starred terms only
                                            </label>
                                        </div>
                                    </div>
                                    {/* shuffle  */}
                                    <div className="quizOptionBlock">
                                        <legend>SHUFFLE</legend>
                                        <div className="mb-2">
                                            <input
                                                id="shuffle"
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                checked={optionIsShuffle}
                                                onChange={() => {
                                                    setOptionIsShuffle(
                                                        !optionIsShuffle
                                                    )
                                                }}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="shuffle"
                                            >
                                                Shuffle cards
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* selection */}
                            <ul className="nav nav-tabs mb-3" role="tablist">
                                <li className="nav-item">
                                    <a
                                        className={`nav-link quizOptionBlock_label ${
                                            optionQuestionTypes?.includes(1)
                                                ? ''
                                                : 'disabled'
                                        }`}
                                        aria-current="page"
                                        id="listWrittenList"
                                        data-bs-toggle="list"
                                        href="#listWritten"
                                        role="tab"
                                        aria-controls="listWritten"
                                    >
                                        Written
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`nav-link quizOptionBlock_label ${
                                            optionQuestionTypes?.includes(2)
                                                ? ''
                                                : 'disabled'
                                        }`}
                                        id="listMultipleList"
                                        data-bs-toggle="list"
                                        href="#listMultiple"
                                        role="tab"
                                        aria-controls="listMultiple"
                                    >
                                        Multiple choice
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`nav-link quizOptionBlock_label ${
                                            optionQuestionTypes?.includes(3)
                                                ? ''
                                                : 'disabled'
                                        }`}
                                        id="listTrueFalseList"
                                        data-bs-toggle="list"
                                        href="#listTrueFalse"
                                        role="tab"
                                        aria-controls="listTrueFalse"
                                    >
                                        True/False
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                {/* written */}
                                <div
                                    className={`tab-pane fade ${
                                        optionQuestionTypes?.includes(1)
                                            ? ''
                                            : 'hide'
                                    }`}
                                    id="listWritten"
                                    role="tabpanel"
                                    aria-labelledby="listWrittenList"
                                >
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="quizOptionBlock mb-4">
                                                <legend>PROMPT WITH</legend>
                                                {fields?.map((field, index) => (
                                                    <div
                                                        className="mb-2"
                                                        key={index}
                                                    >
                                                        <input
                                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                            type="checkbox"
                                                            id={`writtenPromptWith${field.id}`}
                                                            checked={
                                                                optionWrittenPromptWith?.includes(
                                                                    field.id
                                                                ) || ''
                                                            }
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                if (
                                                                    event.target
                                                                        .checked
                                                                ) {
                                                                    var tempWrittenPromptWith =
                                                                        [
                                                                            ...optionWrittenPromptWith,
                                                                        ]
                                                                    tempWrittenPromptWith.push(
                                                                        field.id
                                                                    )
                                                                    setOptionWrittenPromptWith(
                                                                        tempWrittenPromptWith
                                                                    )
                                                                } else {
                                                                    const tempWrittenPromptWith =
                                                                        [
                                                                            ...optionWrittenPromptWith,
                                                                        ].filter(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item !==
                                                                                field.id
                                                                        )
                                                                    setOptionWrittenPromptWith(
                                                                        tempWrittenPromptWith
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor={`writtenPromptWith${field.id}`}
                                                        >
                                                            {field.name}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="quizOptionBlock">
                                                <legend>ANSWER WITH</legend>
                                                {fields?.map((field, index) => (
                                                    <div
                                                        className="mb-2"
                                                        key={index}
                                                    >
                                                        <input
                                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                            type="radio"
                                                            name="writtenAnswerWith"
                                                            checked={
                                                                optionWrittenAnswerWith ===
                                                                    field.id ||
                                                                ''
                                                            }
                                                            id={`writtenAnswerWith${field.id}`}
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                if (
                                                                    event.target
                                                                        .checked
                                                                ) {
                                                                    setOptionWrittenAnswerWith(
                                                                        field.id
                                                                    )
                                                                } else {
                                                                    setOptionWrittenAnswerWith(
                                                                        0
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor={`writtenAnswerWith${field.id}`}
                                                        >
                                                            {field.name}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* multiple */}
                                <div
                                    className={`tab-pane fade  ${
                                        optionQuestionTypes?.includes(2)
                                            ? ''
                                            : 'hide'
                                    }`}
                                    id="listMultiple"
                                    role="tabpanel"
                                    aria-labelledby="listMultipleList"
                                >
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="quizOptionBlock mb-4">
                                                <legend>PROMPT WITH</legend>
                                                {fields?.map((field, index) => (
                                                    <div
                                                        className="mb-2"
                                                        key={index}
                                                    >
                                                        <input
                                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                            type="checkbox"
                                                            id={`multiplePromptWith${field.id}`}
                                                            checked={
                                                                optionMultiplePromptWith?.includes(
                                                                    field.id
                                                                ) || ''
                                                            }
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                if (
                                                                    event.target
                                                                        .checked
                                                                ) {
                                                                    var tempMultiplePromptWith =
                                                                        [
                                                                            ...optionMultiplePromptWith,
                                                                        ]
                                                                    tempMultiplePromptWith.push(
                                                                        field.id
                                                                    )
                                                                    setOptionMultiplePromptWith(
                                                                        tempMultiplePromptWith
                                                                    )
                                                                } else {
                                                                    const tempMultiplePromptWith =
                                                                        [
                                                                            ...optionMultiplePromptWith,
                                                                        ].filter(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item !==
                                                                                field.id
                                                                        )
                                                                    setOptionMultiplePromptWith(
                                                                        tempMultiplePromptWith
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor={`multiplePromptWith${field.id}`}
                                                        >
                                                            {field.name}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="quizOptionBlock">
                                                <legend>ANSWER WITH</legend>
                                                {fields?.map((field, index) => (
                                                    <div
                                                        className="mb-2"
                                                        key={index}
                                                    >
                                                        <input
                                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                            type="checkbox"
                                                            checked={
                                                                optionMultipleAnswerWith?.includes(
                                                                    field.id
                                                                ) || ''
                                                            }
                                                            id={`multipleAnswerWith${field.id}`}
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                if (
                                                                    event.target
                                                                        .checked
                                                                ) {
                                                                    var tempMultipleAnswerWith =
                                                                        [
                                                                            ...optionMultipleAnswerWith,
                                                                        ]
                                                                    tempMultipleAnswerWith.push(
                                                                        field.id
                                                                    )
                                                                    setOptionMultipleAnswerWith(
                                                                        tempMultipleAnswerWith
                                                                    )
                                                                } else {
                                                                    const tempMultipleAnswerWith =
                                                                        [
                                                                            ...optionMultipleAnswerWith,
                                                                        ].filter(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item !==
                                                                                field.id
                                                                        )
                                                                    setOptionMultipleAnswerWith(
                                                                        tempMultipleAnswerWith
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor={`multipleAnswerWith${field.id}`}
                                                        >
                                                            {field.name}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* true false */}
                                <div
                                    className={`tab-pane fade ${
                                        optionQuestionTypes?.includes(3)
                                            ? ''
                                            : 'hide'
                                    }`}
                                    id="listTrueFalse"
                                    role="tabpanel"
                                    aria-labelledby="listTrueFalseList"
                                >
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="quizOptionBlock mb-4">
                                                <legend>PROMPT WITH</legend>
                                                {fields?.map((field, index) => (
                                                    <div
                                                        className="mb-2"
                                                        key={index}
                                                    >
                                                        <input
                                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                            type="checkbox"
                                                            id={`trueFalsePromptWith${field.id}`}
                                                            checked={
                                                                optionTrueFalsePromptWith?.includes(
                                                                    field.id
                                                                ) || ''
                                                            }
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                if (
                                                                    event.target
                                                                        .checked
                                                                ) {
                                                                    var tempTrueFalsePromptWith =
                                                                        [
                                                                            ...optionTrueFalsePromptWith,
                                                                        ]
                                                                    tempTrueFalsePromptWith.push(
                                                                        field.id
                                                                    )
                                                                    setOptionTrueFalsePromptWith(
                                                                        tempTrueFalsePromptWith
                                                                    )
                                                                } else {
                                                                    const tempTrueFalsePromptWith =
                                                                        [
                                                                            ...optionTrueFalsePromptWith,
                                                                        ].filter(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item !==
                                                                                field.id
                                                                        )
                                                                    setOptionTrueFalsePromptWith(
                                                                        tempTrueFalsePromptWith
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor={`trueFalsePromptWith${field.id}`}
                                                        >
                                                            {field.name}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="quizOptionBlock">
                                                <legend>ANSWER WITH</legend>
                                                {fields?.map((field, index) => (
                                                    <div
                                                        className="mb-2"
                                                        key={index}
                                                    >
                                                        <input
                                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                            type="checkbox"
                                                            checked={
                                                                optionTrueFalseAnswerWith?.includes(
                                                                    field.id
                                                                ) || ''
                                                            }
                                                            id={`trueFalseAnswerWith${field.id}`}
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                if (
                                                                    event.target
                                                                        .checked
                                                                ) {
                                                                    var tempTrueFalseAnswerWith =
                                                                        [
                                                                            ...optionTrueFalseAnswerWith,
                                                                        ]
                                                                    tempTrueFalseAnswerWith.push(
                                                                        field.id
                                                                    )
                                                                    setOptionTrueFalseAnswerWith(
                                                                        tempTrueFalseAnswerWith
                                                                    )
                                                                } else {
                                                                    const tempTrueFalseAnswerWith =
                                                                        [
                                                                            ...optionTrueFalseAnswerWith,
                                                                        ].filter(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item !==
                                                                                field.id
                                                                        )
                                                                    setOptionTrueFalseAnswerWith(
                                                                        tempTrueFalseAnswerWith
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor={`trueFalseAnswerWith${field.id}`}
                                                        >
                                                            {field.name}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary classModalBtn me-3"
                                data-bs-dismiss="modal"
                                onClick={handleCancelCreateLearn}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary classModalBtn"
                                onClick={handleCreateLearn}
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="d-flex justify-content-center">
                                        <div
                                            className="spinner-border"
                                            role="status"
                                        >
                                            <span className="visually-hidden">
                                                Loading...
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    'Create new quiz'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Learn

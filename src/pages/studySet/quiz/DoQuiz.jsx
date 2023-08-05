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
    ListIcon,
} from '../../../components/icons'
import finishQuizImg from '../../../assets/images/finish_quiz.png'
import FormStyles from '../../../assets/styles/Form.module.css'
import './quiz.css'
import ProgressService from '../../../services/ProgressService'

const DoQuiz = () => {
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
    const [numQues, setNumQues] = useState(0)
    const [writtenPromptWith, setWrittenPromptWith] = useState([])
    const [writtenAnswerWith, setWrittenAnswerWith] = useState(0)
    const [multiplePromptWith, setMultiplePromptWith] = useState([])
    const [multipleAnswerWith, setMultipleAnswerWith] = useState([])
    const [trueFalsePromptWith, setTrueFalsePromptWith] = useState([])
    const [trueFalseAnswerWith, setTrueFalseAnswerWith] = useState([])
    const [showPicture, setShowPicture] = useState(false)
    const [showAudio, setShowAudio] = useState(false)
    const [isStar, setIsStar] = useState(false)

    const [optionQuestionTypes, setOptionQuestionTypes] = useState([1, 2, 3])
    const [optionNumQues, setOptionNumQues] = useState(0)
    const [optionShowPicture, setOptionShowPicture] = useState(false)
    const [optionShowAudio, setOptionShowAudio] = useState(false)
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
    const [optionIsStar, setOptionIsStar] = useState(false)
    const [error, setError] = useState(false)

    const [progress, setProgress] = useState(0)
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [results, setResults] = useState([])
    const [skipAnswer, setSkipAnswer] = useState(null)
    const [isEnd, setIsEnd] = useState(false)
    const [correct, setCorrect] = useState(false)
    const [incorrect, setIncorrect] = useState(false)

    const [loading, setLoading] = useState(false)

    // initial
    useEffect(() => {
        setResults([])
        setIsEnd(false)
        setSkipAnswer(null)
        setProgress(0)
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
                // number of questions
                const tempNumQues =
                    tempCounts['Not studied'] +
                    tempCounts['Still learning'] +
                    tempCounts['Mastered']
                setNumQues(tempNumQues)
                setOptionNumQues(tempNumQues)
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
                // get quiz
                if (tempNumQues > 0) {
                    const tempQuestions = (
                        await StudySetService.getQuizByStudySetId(
                            tempStudySet.id,
                            questionTypes,
                            tempNumQues,
                            userInfo.id,
                            isStar
                        )
                    ).data
                    setQuestions(tempQuestions)
                }
                // set answers
                var tempAnswers = []
                for (let index = 0; index < tempNumQues; index++) {
                    tempAnswers.push(null)
                }
                setAnswers(tempAnswers)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
            setLoading(false)
        }
        if (id && userInfo?.id) {
            fetchData()
        }
    }, [userInfo, id])

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

    const handleCreateQuiz = async () => {
        setProgress(0)
        setResults([])
        setIsEnd(false)
        setError('')
        setSkipAnswer(null)
        // validation
        if (optionQuestionTypes?.length < 1) {
            setError('You must select at least one question type.')
            setLoading(false)
            return
        }
        if (optionNumQues < 1) {
            setError('Please enter a valid number of questions.')
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
                await StudySetService.getQuizByStudySetId(
                    studySet.id,
                    optionQuestionTypes,
                    optionNumQues,
                    userInfo?.id,
                    optionIsStar
                )
            ).data
            setQuestions(tempQuestions)
            setNumQues(optionNumQues)
            setIsStar(optionIsStar)
            setShowPicture(optionShowPicture)
            setShowAudio(optionShowAudio)
            setQuestionTypes(optionQuestionTypes)
            setWrittenPromptWith(optionWrittenPromptWith)
            setWrittenAnswerWith(optionWrittenAnswerWith)
            setMultiplePromptWith(optionMultiplePromptWith)
            setMultipleAnswerWith(optionMultipleAnswerWith)
            setTrueFalsePromptWith(optionTrueFalsePromptWith)
            setTrueFalseAnswerWith(optionTrueFalseAnswerWith)
            var tempAnswers = []
            for (let index = 0; index < optionNumQues; index++) {
                tempAnswers.push(null)
            }
            setAnswers(tempAnswers)
            document.getElementById('quizOptionModalCloseBtn').click()
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

    const handleCancelCreateQuiz = () => {
        setError('')
        setOptionQuestionTypes(questionTypes)
        setOptionNumQues(numQues)
        setOptionIsStar(isStar)
        setOptionShowPicture(showPicture)
        setOptionShowAudio(showAudio)
        setOptionWrittenPromptWith(writtenPromptWith)
        setOptionWrittenAnswerWith(writtenAnswerWith)
        setOptionMultiplePromptWith(multiplePromptWith)
        setOptionMultipleAnswerWith(multipleAnswerWith)
        setOptionTrueFalsePromptWith(trueFalsePromptWith)
        setOptionTrueFalseAnswerWith(trueFalseAnswerWith)
    }

    const handleChangeAnswer = (ans, index) => {
        var tempAnswers = [...answers]
        if (ans) {
            tempAnswers[index] = ans
        } else {
            tempAnswers[index] = ans
        }
        setAnswers(tempAnswers)
    }

    const handleCheckSubmit = () => {
        // validation
        if (progress < numQues) {
            for (let index = 0; index < answers.length; index++) {
                const ans = answers[index]
                if (!ans) {
                    setSkipAnswer(index)
                    document.getElementById('quizSubmitModalToggleBtn').click()
                    return
                }
            }
        } else {
            handleSubmit()
        }
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            var tempCorrect = 0
            var tempResults = []
            for (let index = 0; index < questions.length; index++) {
                const ques = questions[index]
                var tempIsCorrect = false
                if (ques.question_type === 1) {
                    var correctAnswer = ''
                    for (const itemContent of ques.question.content) {
                        if (itemContent.field.id === writtenAnswerWith) {
                            const tempContent = itemContent.content
                                .replaceAll(/(<([^>]+)>)/gi, ' ')
                                .trim()
                            correctAnswer = tempContent
                            break
                        }
                    }
                    if (answers[index] == correctAnswer) {
                        tempCorrect += 1
                        tempResults.push(1)
                        tempIsCorrect = true
                    } else {
                        tempResults.push(0)
                    }
                } else if (ques.question_type === 2) {
                    if (answers[index] == ques.question.card.id) {
                        tempCorrect += 1
                        tempResults.push(1)
                        tempIsCorrect = true
                    } else {
                        tempResults.push(0)
                    }
                } else if (ques.question_type === 3) {
                    const correctAnswer =
                        ques.question.card.id === ques.answers[0].card.id
                    if (answers[index] == correctAnswer) {
                        tempCorrect += 1
                        tempResults.push(1)
                        tempIsCorrect = true
                    } else {
                        tempResults.push(0)
                    }
                }
                await ProgressService.updateScore(
                    userInfo.id,
                    ques.question.card.id,
                    tempIsCorrect ? 1 : -1
                )
            }
            setCorrect(tempCorrect)
            setResults(tempResults)
            setIncorrect(numQues - tempCorrect)
            document.getElementById('quizSubmitModalCloseBtn')?.click()
            setIsEnd(true)
            setLoading(false)
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
                    <TestSolidIcon className="quizModeIcon" size="2rem" />
                    <div className="quizMode dropdown d-flex align-items-center">
                        <button
                            type="button dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <span className="ps-2 me-2">Quiz</span>
                            <ArrowDownIcon size="1rem" strokeWidth="2.6" />
                        </button>
                        <ul
                            className="dropdown-menu"
                            style={{ zIndex: '100000' }}
                        >
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
                                        navigate(`/learn/${id}`)
                                    }}
                                >
                                    <LearnSolidIcon
                                        className="me-3 quizModeIcon"
                                        size="1.3rem"
                                        strokeWidth="2"
                                    />
                                    <span className="align-middle fw-semibold">
                                        Learn
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
                        {progress} / {numQues}
                    </h3>
                    <h3 className="quizInfo_title">{studySet?.title}</h3>
                </div>
                <div className="quizOptions d-flex">
                    {isEnd ? (
                        <button
                            className="quizOptions_btn"
                            onClick={handleCreateQuiz}
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
            {isEnd ? (
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
            ) : (
                <div
                    id="quizProgressContainer"
                    className="quizProgressContainer"
                >
                    <div
                        className="quizProgress"
                        style={{
                            width: `${(progress / numQues) * 100}%`,
                        }}
                    ></div>
                </div>
            )}
            {/* Questions sidebar */}
            {questions.length > 0 && (
                <div className="questionsSidebar">
                    <button
                        id="questionsListBtn"
                        className="btn quizQuesList_Btn"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasQuestionsList"
                        aria-controls="offcanvasQuestionsList"
                    >
                        <ListIcon strokeWidth="2" />
                    </button>
                    <div
                        className="offcanvas offcanvas-start"
                        tabIndex="-1"
                        id="offcanvasQuestionsList"
                        aria-labelledby="offcanvasQuestionsListLabel"
                    >
                        <div className="offcanvas-header">
                            <h5
                                className="offcanvas-title"
                                id="offcanvasQuestionsListLabel"
                            >
                                Questions List
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="offcanvas-body">
                            <div className="list-group list-group-flush text-center">
                                {questions.map((ques, index) => (
                                    <a
                                        key={index}
                                        href={`#question${index}`}
                                        className={`list-group-item list-group-item-action ${
                                            results[index] === 0
                                                ? 'incorrect'
                                                : results[index] === 1
                                                ? 'correct'
                                                : answers[index]
                                                ? 'selected'
                                                : ''
                                        }`}
                                    >
                                        {index + 1}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Questions list */}
            {questions?.map((ques, quesIndex) => (
                <section
                    key={quesIndex}
                    id={`question${quesIndex}`}
                    className="quizQues_container mt-5"
                >
                    {type === 1 && (
                        <VocabCard
                            ques={ques}
                            quesIndex={quesIndex}
                            numQues={numQues}
                            writtenPromptWith={writtenPromptWith}
                            multiplePromptWith={multiplePromptWith}
                            multipleAnswerWith={multipleAnswerWith}
                            trueFalsePromptWith={trueFalsePromptWith}
                            trueFalseAnswerWith={trueFalseAnswerWith}
                            handleChangeAnswer={handleChangeAnswer}
                            setProgress={setProgress}
                            progress={progress}
                            answers={answers}
                            results={results}
                            showPicture={showPicture}
                            showAudio={showAudio}
                        />
                    )}
                    {type === 2 && (
                        <KanjiCard
                            ques={ques}
                            quesIndex={quesIndex}
                            numQues={numQues}
                            writtenPromptWith={writtenPromptWith}
                            multiplePromptWith={multiplePromptWith}
                            multipleAnswerWith={multipleAnswerWith}
                            trueFalsePromptWith={trueFalsePromptWith}
                            trueFalseAnswerWith={trueFalseAnswerWith}
                            handleChangeAnswer={handleChangeAnswer}
                            setProgress={setProgress}
                            progress={progress}
                            answers={answers}
                            results={results}
                            showPicture={showPicture}
                            showAudio={showAudio}
                        />
                    )}
                    {type === 3 && (
                        <GrammarCard
                            ques={ques}
                            quesIndex={quesIndex}
                            numQues={numQues}
                            writtenPromptWith={writtenPromptWith}
                            multiplePromptWith={multiplePromptWith}
                            multipleAnswerWith={multipleAnswerWith}
                            trueFalsePromptWith={trueFalsePromptWith}
                            trueFalseAnswerWith={trueFalseAnswerWith}
                            handleChangeAnswer={handleChangeAnswer}
                            setProgress={setProgress}
                            progress={progress}
                            answers={answers}
                            results={results}
                            showPicture={showPicture}
                            showAudio={showAudio}
                        />
                    )}
                </section>
            ))}
            {/* Submit */}
            <div className="quizSubmit_container d-flex flex-column align-items-center justify-content-center">
                <img src={finishQuizImg} alt="finish quiz image" />
                <h3>All done! Ready to submit?</h3>
                <div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleCheckSubmit}
                    >
                        Submit Quiz
                    </button>
                </div>
            </div>
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
                                onClick={handleCancelCreateQuiz}
                            ></button>
                            <button
                                id="quizOptionModalCloseBtn"
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
                                    {/* num ques */}
                                    <div className="quizOptionBlock mb-4">
                                        <legend>QUESTION LIMIT</legend>
                                        <div className="mb-2 d-flex align-items-center">
                                            <input
                                                className="form-control"
                                                type="number"
                                                id="quesLimit"
                                                value={optionNumQues}
                                                onChange={(event) => {
                                                    setOptionNumQues(
                                                        event.target.value
                                                    )
                                                }}
                                            />
                                            <p className="form-check-label m-0">
                                                of{' '}
                                                {optionIsStar
                                                    ? numNotStar +
                                                      numStillStar +
                                                      numMasterStar
                                                    : numNot +
                                                      numStill +
                                                      numMaster}{' '}
                                                questions
                                            </p>
                                        </div>
                                    </div>
                                    {/* types */}
                                    <div className="quizOptionBlock">
                                        <legend>QUESTION TYPES</legend>
                                        <div className="mb-2">
                                            <input
                                                id="written"
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                value={1}
                                                checked={
                                                    optionQuestionTypes?.includes(
                                                        1
                                                    ) || ''
                                                }
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
                                        <div>
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
                                </div>
                                <div className="col-6">
                                    {/* star */}
                                    <div className="quizOptionBlock">
                                        <legend>STAR</legend>
                                        <div className="mb-2">
                                            <input
                                                id="isStar"
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                checked={optionIsStar}
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
                                    {/* picture */}
                                    <div className="quizOptionBlock">
                                        <legend>PICTURE</legend>
                                        <div className="mb-2">
                                            <input
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                checked={optionShowPicture}
                                                id="showPicture"
                                                onChange={() => {
                                                    setOptionShowPicture(
                                                        !optionShowPicture
                                                    )
                                                }}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="showPicture"
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
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                checked={optionShowAudio}
                                                id="showAudio"
                                                onChange={() => {
                                                    setOptionShowAudio(
                                                        !optionShowAudio
                                                    )
                                                }}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="showAudio"
                                            >
                                                Show audio
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
                                onClick={handleCancelCreateQuiz}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary classModalBtn"
                                onClick={handleCreateQuiz}
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
            {/* Submit modal */}
            <button
                id="quizSubmitModalToggleBtn"
                type="button"
                className="d-none"
                data-bs-toggle="modal"
                data-bs-target="#quizSubmitModal"
            >
                Submit Quiz
            </button>
            <div className="modal fade quizOptionModal" id="quizSubmitModal">
                <div className="modal-dialog modal-lg">
                    <button
                        id="quizSubmitModalCloseBtn"
                        type="button"
                        className="d-none"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <h2 className="modal-title mb-2">
                                You haven't answered all the questions.
                            </h2>
                            <p className="modal-text">
                                Would you like to review the skipped questions
                                or submit the test now?
                            </p>
                        </div>
                        <div className="modal-footer border border-0">
                            <a
                                className="btn btn-light me-3"
                                href={`#question${skipAnswer}`}
                            >
                                Review skipped questions
                            </a>
                            <button
                                className="btn btn-primary"
                                onClick={handleSubmit}
                            >
                                Submit quiz
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoQuiz

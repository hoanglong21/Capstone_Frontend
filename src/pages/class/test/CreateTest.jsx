import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
    deleteFileByUrl,
    deleteFolder,
    uploadFile,
} from '../../../features/fileManagement'
import ClassService from '../../../services/ClassService'
import TestService from '../../../services/TestService'
import QuestionService from '../../../services/QuestionService'
import AnswerService from '../../../services/AnswerService'

import {
    CloseIcon,
    DeleteIcon,
    ImageIcon,
    SpeakIcon,
    VideoIcon,
} from '../../../components/icons'

const CreateTest = () => {
    const navigate = useNavigate()

    const { id } = useParams()
    const { test_id } = useParams()

    const { userInfo } = useSelector((state) => state.user)

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [test, setTest] = useState({})
    const [isScroll, setIsScroll] = useState(false)
    const [questions, setQuestions] = useState([])
    const [classroom, setClassroom] = useState({})

    function padWithLeadingZeros(num, totalLength) {
        return String(num).padStart(totalLength, '0')
    }

    function getToday() {
        const today = new Date()
        return (
            today.getFullYear() +
            '-' +
            padWithLeadingZeros(today.getMonth() + 1, 2) +
            '-' +
            padWithLeadingZeros(today.getDate() + 1, 2) +
            'T' +
            padWithLeadingZeros(today.getHours(), 2) +
            ':' +
            padWithLeadingZeros(today.getMinutes(), 2)
        )
    }

    function toFEDate(date) {
        return date ? date?.replace(' ', 'T') : ''
    }

    function toBEDate(date) {
        if (date && !date.includes('+07:00')) {
            return date?.replace(/\s/g, 'T') + '.000' + '+07:00'
        }
        return ''
    }

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const tempClass = (await ClassService.getClassroomById(id)).data
                setClassroom(tempClass)
                if (test_id) {
                    var tempTest = (await TestService.getTestById(test_id)).data
                    const testClassCreated = toBEDate(
                        tempTest.classroom.created_date
                    )
                    const testClassUserCreated = toBEDate(
                        tempTest.classroom.user.created_date
                    )
                    const testUserCreated = toBEDate(tempTest.user.created_date)
                    const testCreated = toBEDate(tempTest.created_date)
                    const testModified = toBEDate(tempTest.modified_date)
                    const testStart = toBEDate(tempTest.start_date)
                    const testDue = toBEDate(tempTest.due_date)
                    tempTest.classroom.created_date = testClassCreated
                    tempTest.classroom.user.created_date = testClassUserCreated
                    tempTest.user.created_date = testUserCreated
                    setTest({
                        ...tempTest,
                        start_date: toFEDate(tempTest.start_date),
                        created_date: toFEDate(tempTest.created_date),
                        due_date: toFEDate(tempTest.due_date),
                    })
                    const tempQuestions = (
                        await QuestionService.getAllByTestId(tempTest.id)
                    ).data
                    var tempUpdateQuestions = []
                    for (var ques of tempQuestions) {
                        // change date format
                        ques.test.classroom.created_date = testClassCreated
                        ques.test.classroom.user.created_date =
                            testClassUserCreated
                        ques.test.user.created_date = testUserCreated
                        ques.test.created_date = testCreated
                        ques.test.modified_date = testModified
                        ques.test.start_date = testStart
                        ques.test.due_date = testDue
                        var tempAnswers = (
                            await AnswerService.getAllByQuestionId(ques.id)
                        ).data
                        for (var ans of tempAnswers) {
                            ans.question.test.classroom.created_date =
                                testClassCreated
                            ans.question.test.classroom.user.created_date =
                                testClassUserCreated
                            ans.question.test.user.created_date =
                                testUserCreated
                            ans.question.test.created_date = testCreated
                            ans.question.test.modified_date = testModified
                            ans.question.test.start_date = testStart
                            ans.question.test.due_date = testDue
                        }
                        tempUpdateQuestions.push({
                            ...ques,
                            answers: tempAnswers,
                        })
                    }
                    setQuestions(tempUpdateQuestions)
                } else {
                    const tempTest = (
                        await TestService.createTest({
                            title: '',
                            classroom: {
                                id: tempClass.id,
                            },
                            user: {
                                id: userInfo.id,
                                username: userInfo.username,
                            },
                            description: '',
                            duration: '',
                            num_attemps: 1,
                            due_date: '',
                            start_date: getToday(),
                            _draft: true,
                        })
                    ).data
                    setTest({
                        ...tempTest,
                        start_date: toFEDate(tempTest.start_date),
                        created_date: toFEDate(tempTest.created_date),
                        due_date: tempTest.due_date
                            ? toFEDate(tempTest.due_date)
                            : null,
                    })
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
            setError('')
        }
        if (userInfo?.id) {
            setLoading(true)
            fetchData()
            setLoading(false)
        }
    }, [userInfo])

    // handle sticky header
    useEffect(() => {
        const handleScroll = () => {
            setIsScroll(window.scrollY > 200)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // test
    const handleCreate = async () => {
        // validation
        // check duration > 0
        if (test?.duration && test?.duration <= 0) {
            setError('Duration must be a positive number')
            return
        }
        // check num attempts > 0
        if (
            test?.num_attemps &&
            (test?.num_attemps <= 0 || !Number.isInteger(test?.num_attemps))
        ) {
            setError('Number of attempts must be a positive integer number')
            return
        }
        // check question.length > 0
        if (questions?.length <= 0) {
            setError('There must be at least one question')
            return
        }
        for (let indexQues = 0; indexQues < questions?.length; indexQues++) {
            const ques = questions[indexQues]
            // check if question content null
            if (!ques.question) {
                setError(
                    `The content of <a href="#question${indexQues}">this</a> question cannot be left blank.`
                )
                return
            }
            // check answer length of multiple choice
            if (ques?.answers?.length < 2 && ques?.questionType?.id === 2) {
                setError(
                    `Please add at least 2 answer options for <a href="#question${indexQues}">this</a> question.`
                )
                return
            }
            var isSelectCorrectAns = false
            for (
                let indexAns = 0;
                indexAns < ques?.answers?.length;
                indexAns++
            ) {
                const ans = ques?.answers[indexAns]
                // check if answer content null
                if (!ans?.content) {
                    setError(
                        `The answer to <a href="#question${indexQues}">this</a> question cannot be left blank.`
                    )
                    return
                }
                if (ans?._true) {
                    isSelectCorrectAns = true
                }
            }
            // check if select correct answer
            if (!isSelectCorrectAns) {
                setError(
                    `Please mark the correct answer to <a href="#question${indexQues}">this</a> question.`
                )
                return
            }
        }
        try {
            // update test
            await TestService.updateTest(test.id, {
                ...test,
                _draft: false,
                created_date: toBEDate(test.created_date),
                modified_date: toBEDate(test.modified_date),
                start_date: toBEDate(test.start_date),
                due_date: toBEDate(test.due_date),
            })
            navigate('../tests')
            // clear
            setTest({})
            setError('')
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0
    }

    const handleChangeTest = (event) => {
        setTest({ ...test, [event.target.name]: event.target.value })
    }

    const handleUpdateTest = async () => {
        setSaving(true)
        try {
            await TestService.updateTest(test.id, {
                ...test,
                created_date: toBEDate(test.created_date),
                modified_date: toBEDate(test.modified_date),
                start_date: toBEDate(test.start_date),
                due_date: toBEDate(test.due_date),
            })
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setSaving(false)
    }

    // question
    const handleAddMultipleChoiceQuestion = async () => {
        setSaving(true)
        try {
            const ques = (
                await QuestionService.createQuestion({
                    question: '',
                    questionType: {
                        id: 2,
                    },
                    picture: null,
                    audio: null,
                    video: null,
                    test: {
                        id: test.id,
                    },
                })
            ).data
            setQuestions([
                ...questions,
                {
                    ...ques,
                },
            ])
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setSaving(false)
    }

    const handleAddTrueFalseQuestion = async () => {
        setSaving(true)
        try {
            const ques = (
                await QuestionService.createQuestion({
                    question: '',
                    questionType: {
                        id: 3,
                    },
                    picture: null,
                    audio: null,
                    video: null,
                    test: {
                        id: test.id,
                    },
                })
            ).data
            const answers = (
                await AnswerService.createAnswers([
                    {
                        question: {
                            id: ques.id,
                        },
                        content: 'True',
                        _true: false,
                    },
                    {
                        question: {
                            id: ques.id,
                        },
                        content: 'False',
                        _true: false,
                    },
                ])
            ).data
            setQuestions([
                ...questions,
                {
                    ...ques,
                    answers: answers,
                },
            ])
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setSaving(false)
    }

    const handleAddWrittenQuestion = async () => {
        setSaving(true)
        try {
            const ques = (
                await QuestionService.createQuestion({
                    question: '',
                    questionType: {
                        id: 1,
                    },
                    picture: null,
                    audio: null,
                    video: null,
                    test: {
                        id: test.id,
                    },
                })
            ).data
            const answer = await AnswerService.createAnswer({
                question: {
                    id: ques.id,
                },
                content: '',
                _true: true,
            })
            setQuestions([
                ...questions,
                {
                    ...ques,
                    answers: [{ ...answer }],
                },
            ])
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setSaving(false)
    }

    const handleChangeQuestion = (event, quesIndex) => {
        var tempQuestions = [...questions]
        tempQuestions[quesIndex] = {
            ...tempQuestions[quesIndex],
            [event.target.name]: event.target.value,
        }
        setQuestions(tempQuestions)
    }

    const handleUpdateQuestion = async (ques) => {
        setSaving(true)
        try {
            var tempQuestion = { ...ques }
            delete tempQuestion.answers
            await QuestionService.updateQuestion(tempQuestion.id, tempQuestion)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setSaving(false)
    }

    const handleUploadFileQuestion = async (event, ques, quesIndex) => {
        setSaving(true)
        var file = event.target.files[0]
        if (file) {
            const url = await uploadFile(
                file,
                `${userInfo.username}/class/${classroom.id}/test/${test.id}/${ques.id}/question`
            )
            var tempQuestions = [...questions]
            tempQuestions[quesIndex] = {
                ...tempQuestions[quesIndex],
                [event.target.name]: url,
            }
            setQuestions(tempQuestions)
            handleUpdateQuestion(tempQuestions[quesIndex])
        }
        setSaving(false)
    }

    const handleDeleteQues = async (ques, quesIndex) => {
        setSaving(true)
        var tempQuestions = [...questions]
        tempQuestions.splice(quesIndex, 1)
        setQuestions(tempQuestions)
        await QuestionService.deleteQuestion(ques.id)
        await deleteFolder(
            `files/${userInfo.username}/class/${classroom.id}/test/${test.id}/${ques.id}`
        )
        setSaving(false)
    }

    const handleDeleteFileQues = async (event, ques, quesIndex) => {
        setSaving(true)
        var tempQuestions = [...questions]
        const url = tempQuestions[quesIndex][event.target.name]
        tempQuestions[quesIndex] = {
            ...tempQuestions[quesIndex],
            [event.target.name]: null,
        }
        setQuestions(tempQuestions)
        handleUpdateQuestion(tempQuestions[quesIndex])
        await deleteFileByUrl(
            url,
            `${userInfo.username}/class/${classroom.id}/test/${test.id}/${ques.id}`
        )
        setSaving(false)
    }

    // answer
    const handleAddAnswer = async (ques, quesIndex) => {
        setSaving(true)
        try {
            const ans = (
                await AnswerService.createAnswer({
                    question: {
                        id: ques.id,
                    },
                    content: '',
                    _true: false,
                })
            ).data
            var tempQuestions = [...questions]
            var tempAnswers = tempQuestions[quesIndex]?.answers
                ? [...tempQuestions[quesIndex]?.answers]
                : []
            tempAnswers.push(ans)
            tempQuestions[quesIndex] = {
                ...tempQuestions[quesIndex],
                answers: tempAnswers,
            }
            setQuestions(tempQuestions)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setSaving(false)
    }

    const handleAnswerFocus = (quesIndex, ansIndex) => {
        const buttonsEl = document
            .getElementById(`createAnswer${quesIndex}-${ansIndex}`)
            .querySelectorAll(`#createAnswer${quesIndex}-${ansIndex} .btn-hide`)
        for (const btnEl of buttonsEl) {
            btnEl.classList.add('d-inline-block')
        }
    }

    const handleAnswerBlur = (quesIndex, ansIndex) => {
        const buttonsEl = document
            .getElementById(`createAnswer${quesIndex}-${ansIndex}`)
            .querySelectorAll(`#createAnswer${quesIndex}-${ansIndex} .btn-hide`)
        for (const btnEl of buttonsEl) {
            btnEl.classList.remove('d-inline-block')
        }
    }

    const handleChangeAnswer = (event, quesIndex, ansIndex) => {
        var tempQuestions = [...questions]
        var tempAnswers = [...tempQuestions[quesIndex].answers]
        tempAnswers[ansIndex] = {
            ...tempAnswers[ansIndex],
            content: event.target.value,
        }
        tempQuestions[quesIndex] = {
            ...tempQuestions[quesIndex],
            answers: tempAnswers,
        }
        setQuestions(tempQuestions)
    }

    const handleChangeAnswerCorrect = (event, quesIndex, ansIndex) => {
        var tempQuestions = [...questions]
        var tempAnswers = [...tempQuestions[quesIndex].answers]
        tempAnswers[ansIndex] = {
            ...tempAnswers[ansIndex],
            _true: event.target.checked,
        }
        tempQuestions[quesIndex] = {
            ...tempQuestions[quesIndex],
            answers: tempAnswers,
        }
        setQuestions(tempQuestions)
    }

    const handleUpdateAnswer = async (ans) => {
        setSaving(true)
        try {
            await AnswerService.updateAnswer(ans.id, ans)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setSaving(false)
    }

    const handleUploadFileAnswer = async (
        event,
        ques,
        quesIndex,
        ans,
        ansIndex
    ) => {
        setSaving(true)
        const file = event.target.files[0]
        if (file) {
            const url = await uploadFile(
                file,
                `${userInfo.username}/class/${classroom.id}/test/${test.id}/${ques.id}/answer/${ans.id}`
            )
            var tempQuestions = [...questions]
            var tempAnswers = [...tempQuestions[quesIndex].answers]
            tempAnswers[ansIndex] = {
                ...tempAnswers[ansIndex],
                [event.target.name]: url,
            }
            tempQuestions[quesIndex] = {
                ...tempQuestions[quesIndex],
                answers: tempAnswers,
            }
            setQuestions(tempQuestions)
            handleUpdateAnswer(tempQuestions[quesIndex])
        }
        setSaving(false)
    }

    const handleDeleteAnswer = async (ques, quesIndex, ans, ansIndex) => {
        setSaving(true)
        var tempQuestions = [...questions]
        var tempAnswers = [...tempQuestions[quesIndex].answers]
        tempAnswers.splice(ansIndex, 1)
        tempQuestions[quesIndex] = {
            ...tempQuestions[quesIndex],
            answers: tempAnswers,
        }
        setQuestions(tempQuestions)
        await AnswerService.deleteAnswer(ans.id)
        await deleteFolder(
            `files/${userInfo.username}/class/${classroom.id}/test/${test.id}/${ques.id}/answer/${ans.id}`
        )
        setSaving(false)
    }

    const handleDeleteFileAns = async (
        event,
        ques,
        quesIndex,
        ans,
        ansIndex
    ) => {
        setSaving(true)
        var tempQuestions = [...questions]
        var tempAnswers = [...tempQuestions[quesIndex].answers]
        const url = tempAnswers[ansIndex][event.target.name]
        tempAnswers[ansIndex] = {
            ...tempAnswers[ansIndex],
            [event.target.name]: null,
        }
        tempQuestions[quesIndex] = {
            ...tempQuestions[quesIndex],
            answers: tempAnswers,
        }
        setQuestions(tempQuestions)
        await deleteFileByUrl(
            url,
            `${userInfo.username}/class/${classroom.id}/test/${test.id}/${ques.id}/answer/${ans.id}`
        )
        handleUpdateAnswer(tempQuestions[quesIndex])
        setSaving(false)
    }

    return (
        <div>
            <div
                className={`d-flex justify-content-between align-items-center sticky-top sticky-header ${
                    isScroll ? 'scroll-shadows p-3 rounded-bottom' : ''
                }`}
            >
                <div className="d-flex">
                    <button
                        className="createTest_cancelBtn"
                        onClick={() => {
                            navigate('../tests')
                        }}
                    >
                        cancel
                    </button>
                    {loading && (
                        <div className="createTest_status">Loading</div>
                    )}
                    <div className="createTest_status">
                        {saving ? 'Saving...' : 'Saved'}
                    </div>
                </div>
                {test?._draft ? (
                    <div className="d-flex">
                        <button
                            className="createTest_submitBtn"
                            onClick={handleCreate}
                            disabled={!test?.title}
                        >
                            Create
                        </button>
                        <button
                            className="createTest_draftBtn"
                            onClick={() => {
                                navigate('../tests')
                            }}
                        >
                            Save draft
                        </button>
                    </div>
                ) : (
                    <button
                        className="createTest_submitBtn"
                        onClick={handleCreate}
                        disabled={!test?.title}
                    >
                        Save
                    </button>
                )}
            </div>
            {/* Test */}
            <div className="card mt-4">
                <div className="card-body p-4">
                    {error && (
                        <div
                            className="alert alert-danger mb-4"
                            role="alert"
                            dangerouslySetInnerHTML={{ __html: error }}
                        ></div>
                    )}
                    <div className="createTest_formGroup form-floating mb-4">
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            placeholder="title"
                            value={test?.title || ''}
                            onBlur={handleUpdateTest}
                            onChange={handleChangeTest}
                        />
                        <label htmlFor="title" className="createTest_formLabel">
                            Title
                        </label>
                    </div>
                    <div className="createTest_formGroup form-floating mb-4">
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            placeholder="description"
                            value={test?.description || ''}
                            onBlur={handleUpdateTest}
                            onChange={handleChangeTest}
                        />
                        <label
                            htmlFor="description"
                            className="createTest_formLabel"
                        >
                            Description
                        </label>
                    </div>
                    <div className="row mb-4">
                        <div className="col-6">
                            <div className="createTest_formGroup form-floating">
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    name="start_date"
                                    id="start_date"
                                    placeholder="start date"
                                    min={test?.created_date || ''}
                                    value={test?.start_date || ''}
                                    onChange={handleChangeTest}
                                    onBlur={handleUpdateTest}
                                />
                                <label
                                    htmlFor="start_date"
                                    className="createTest_formLabel"
                                >
                                    Start date
                                </label>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="createTest_formGroup form-floating">
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="due_date"
                                    name="due_date"
                                    placeholder="due date"
                                    min={test?.start_date || ''}
                                    value={test?.due_date || ''}
                                    onChange={handleChangeTest}
                                    onBlur={handleUpdateTest}
                                />
                                <label
                                    htmlFor="due_date"
                                    className="createTest_formLabel"
                                >
                                    Due date
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-6">
                            <div className="createTest_formGroup form-floating">
                                <input
                                    type="number"
                                    className="form-control"
                                    name="duration"
                                    id="duration"
                                    placeholder="duration"
                                    value={test?.duration || ''}
                                    onChange={handleChangeTest}
                                    onBlur={handleUpdateTest}
                                />
                                <label
                                    htmlFor="duration"
                                    className="createTest_formLabel"
                                >
                                    Duration (minutes)
                                </label>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="createTest_formGroup form-floating">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="num_attemps"
                                    name="num_attemps"
                                    placeholder="Number of attempts"
                                    value={test?.num_attemps || ''}
                                    onChange={handleChangeTest}
                                    onBlur={handleUpdateTest}
                                />
                                <label
                                    htmlFor="num_attemps"
                                    className="createTest_formLabel"
                                >
                                    Number of attempts allowed for learners
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Question */}
            {questions?.map((ques, quesIndex) => (
                <div
                    className="card mt-4"
                    key={quesIndex}
                    id={`question${quesIndex}`}
                >
                    <div className="card-body p-4">
                        <div className="createTest_formGroup mb-4 d-flex align-items-center">
                            <input
                                type="text"
                                className="form-control"
                                name="question"
                                placeholder="Question"
                                value={ques?.question || ''}
                                onChange={(event) =>
                                    handleChangeQuestion(event, quesIndex)
                                }
                                onBlur={() => handleUpdateQuestion(ques)}
                            />
                            {/* picture question */}
                            <input
                                type="file"
                                id={`uploadQuesImg${quesIndex}`}
                                name="picture"
                                accept="image/*"
                                className="postUpload"
                                onClick={(event) => {
                                    event.target.value = null
                                }}
                                onChange={(event) =>
                                    handleUploadFileQuestion(
                                        event,
                                        ques,
                                        quesIndex
                                    )
                                }
                            />
                            <button className="btn p-0" type="btn">
                                <label
                                    htmlFor={`uploadQuesImg${quesIndex}`}
                                    className="btn-customLight ms-3 p-2 rounded-circle d-flex align-items-center justify-content-center"
                                >
                                    <ImageIcon />
                                </label>
                            </button>
                            {/* audio question */}
                            <input
                                type="file"
                                id={`uploadQuesAudio${quesIndex}`}
                                name="audio"
                                accept="audio/*"
                                className="postUpload"
                                onClick={(event) => {
                                    event.target.value = null
                                }}
                                onChange={(event) =>
                                    handleUploadFileQuestion(
                                        event,
                                        ques,
                                        quesIndex
                                    )
                                }
                            />
                            <button className="btn p-0" type="btn">
                                <label
                                    htmlFor={`uploadQuesAudio${quesIndex}`}
                                    className="btn-customLight ms-1 p-2 rounded-circle d-flex align-items-center justify-content-center"
                                >
                                    <SpeakIcon />
                                </label>
                            </button>
                            {/* video question */}
                            <input
                                type="file"
                                id={`uploadQuesVideo${quesIndex}`}
                                name="video"
                                accept="video/*"
                                className="postUpload"
                                onClick={(event) => {
                                    event.target.value = null
                                }}
                                onChange={(event) =>
                                    handleUploadFileQuestion(
                                        event,
                                        ques,
                                        quesIndex
                                    )
                                }
                            />
                            <button className="btn p-0" type="btn">
                                <label
                                    htmlFor={`uploadQuesVideo${quesIndex}`}
                                    className="btn-customLight ms-1 p-2 rounded-circle d-flex align-items-center justify-content-center"
                                >
                                    <VideoIcon />
                                </label>
                            </button>
                        </div>
                        <div className="row">
                            {ques?.picture && (
                                <div className="col-6 mb-2">
                                    <div className="uploadFileAnsItem">
                                        <img
                                            src={ques?.picture}
                                            className="createTest_img"
                                            alt="question picture"
                                        />
                                        <button
                                            type="button"
                                            name="picture"
                                            className="btn btn-danger ms-5 p-2 rounded-circle"
                                            onClick={(event) =>
                                                handleDeleteFileQues(
                                                    event,
                                                    ques,
                                                    quesIndex
                                                )
                                            }
                                        >
                                            <DeleteIcon size="1.25rem" />
                                        </button>
                                    </div>
                                </div>
                            )}
                            {ques?.audio && (
                                <div className="col-6 mb-2">
                                    <div className="uploadFileAnsItem">
                                        <audio
                                            controls
                                            src={ques?.audio}
                                            alt="question audio"
                                        />
                                        <button
                                            type="button"
                                            name="audio"
                                            className="btn btn-danger ms-5 p-2 rounded-circle"
                                            onClick={(event) =>
                                                handleDeleteFileQues(
                                                    event,
                                                    ques,
                                                    quesIndex
                                                )
                                            }
                                        >
                                            <DeleteIcon size="1.25rem" />
                                        </button>
                                    </div>
                                </div>
                            )}
                            {ques?.video && (
                                <div className="col-6 mb-2">
                                    <div className="uploadFileAnsItem">
                                        <video
                                            className="createTest_video"
                                            controls
                                            src={ques?.video}
                                        >
                                            Your browser does not support the
                                            video tag.
                                        </video>
                                        <button
                                            type="button"
                                            name="video"
                                            className="btn btn-danger ms-5 p-2 rounded-circle"
                                            onClick={(event) =>
                                                handleDeleteFileQues(
                                                    event,
                                                    ques,
                                                    quesIndex
                                                )
                                            }
                                        >
                                            <DeleteIcon size="1.25rem" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* true false answer */}
                        {ques?.questionType?.id === 3 && (
                            <div>
                                {ques?.answers?.map((ans, ansIndex) => (
                                    <div key={ansIndex}>
                                        <div className="createTest_formGroup-sm mb-2 form-check">
                                            <input
                                                id={`answer${ques?.id}_${ans?.id}`}
                                                className="form-check-input"
                                                type="radio"
                                                checked={ans?._true || false}
                                                name={`answerCorrect${ques.id}`}
                                                onChange={(event) =>
                                                    handleChangeAnswerCorrect(
                                                        event,
                                                        quesIndex,
                                                        ansIndex
                                                    )
                                                }
                                                onBlur={() =>
                                                    handleUpdateAnswer(ans)
                                                }
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor={`answer${ques.id}_${ans.id}`}
                                            >
                                                {ans?.content}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {/* Multiple choice answer */}
                        {ques?.questionType?.id === 2 && (
                            <div>
                                {ques?.answers?.map((ans, ansIndex) => (
                                    <div key={ansIndex}>
                                        <div className="createAnswerContainer createTest_formGroup-sm mb-2 form-check d-flex align-items-center">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={ans?._true || false}
                                                onChange={(event) =>
                                                    handleChangeAnswerCorrect(
                                                        event,
                                                        quesIndex,
                                                        ansIndex
                                                    )
                                                }
                                                onBlur={() =>
                                                    handleUpdateAnswer(ans)
                                                }
                                            />
                                            <div
                                                className="createAnswerContainer_btn d-flex align-items-center w-100"
                                                id={`createAnswer${quesIndex}-${ansIndex}`}
                                            >
                                                <input
                                                    type="text"
                                                    className="form-control ms-3"
                                                    placeholder="Option"
                                                    value={ans?.content || ''}
                                                    onChange={(event) =>
                                                        handleChangeAnswer(
                                                            event,
                                                            quesIndex,
                                                            ansIndex
                                                        )
                                                    }
                                                    onFocus={() =>
                                                        handleAnswerFocus(
                                                            quesIndex,
                                                            ansIndex
                                                        )
                                                    }
                                                    onBlur={() => {
                                                        handleAnswerBlur(
                                                            quesIndex,
                                                            ansIndex
                                                        )
                                                        handleUpdateAnswer(ans)
                                                    }}
                                                />
                                                {/* picture answer */}
                                                {!ans?.picture && (
                                                    <div>
                                                        <input
                                                            type="file"
                                                            id={`uploadAnsImg${quesIndex}-${ansIndex}`}
                                                            name="picture"
                                                            accept="image/*"
                                                            className="postUpload"
                                                            onChange={(event) =>
                                                                handleUploadFileAnswer(
                                                                    event,
                                                                    ques,
                                                                    quesIndex,
                                                                    ans,
                                                                    ansIndex
                                                                )
                                                            }
                                                        />
                                                        <button
                                                            className="btn-hide p-0"
                                                            type="btn"
                                                            onMouseDown={(e) =>
                                                                e.preventDefault()
                                                            }
                                                        >
                                                            <label
                                                                htmlFor={`uploadAnsImg${quesIndex}-${ansIndex}`}
                                                                className="btn-customLight ms-3 p-2 rounded-circle d-flex align-items-center justify-content-center"
                                                            >
                                                                <ImageIcon />
                                                            </label>
                                                        </button>
                                                    </div>
                                                )}
                                                {/* audio answer */}
                                                {!ans?.audio && (
                                                    <div>
                                                        <input
                                                            type="file"
                                                            id={`uploadAnsAudio${quesIndex}-${ansIndex}`}
                                                            name="audio"
                                                            accept="audio/*"
                                                            className="postUpload"
                                                            onChange={(event) =>
                                                                handleUploadFileAnswer(
                                                                    event,
                                                                    ques,
                                                                    quesIndex,
                                                                    ans,
                                                                    ansIndex
                                                                )
                                                            }
                                                        />
                                                        <button
                                                            className="btn-hide p-0"
                                                            type="btn"
                                                            onMouseDown={(e) =>
                                                                e.preventDefault()
                                                            }
                                                        >
                                                            <label
                                                                htmlFor={`uploadAnsAudio${quesIndex}-${ansIndex}`}
                                                                className="btn-customLight ms-1 p-2 rounded-circle d-flex align-items-center justify-content-center"
                                                            >
                                                                <SpeakIcon />
                                                            </label>
                                                        </button>
                                                    </div>
                                                )}
                                                {/* video answer */}
                                                {!ans?.video && (
                                                    <div>
                                                        <input
                                                            type="file"
                                                            id={`uploadAnsVideo${quesIndex}-${ansIndex}`}
                                                            name="video"
                                                            accept="video/*"
                                                            className="d-none"
                                                            onChange={(event) =>
                                                                handleUploadFileAnswer(
                                                                    event,
                                                                    ques,
                                                                    quesIndex,
                                                                    ans,
                                                                    ansIndex
                                                                )
                                                            }
                                                        />
                                                        <button
                                                            className="btn-hide p-0"
                                                            type="btn"
                                                            onMouseDown={(e) =>
                                                                e.preventDefault()
                                                            }
                                                        >
                                                            <label
                                                                htmlFor={`uploadAnsVideo${quesIndex}-${ansIndex}`}
                                                                className="btn-customLight ms-1 p-2 rounded-circle d-flex align-items-center justify-content-center"
                                                            >
                                                                <VideoIcon />
                                                            </label>
                                                        </button>
                                                    </div>
                                                )}
                                                {ques?.answers.length > 1 && (
                                                    <button
                                                        className="btn-customLight ms-1 p-2 rounded-circle"
                                                        style={{
                                                            marginRight:
                                                                '-0.5rem',
                                                        }}
                                                        onMouseDown={(e) =>
                                                            e.preventDefault()
                                                        }
                                                        onClick={() =>
                                                            handleDeleteAnswer(
                                                                ques,
                                                                quesIndex,
                                                                ans,
                                                                ansIndex
                                                            )
                                                        }
                                                    >
                                                        <CloseIcon />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row mt-1">
                                            {ans?.picture && (
                                                <div className="col-4 mb-2">
                                                    <div className="uploadFileAnsItem--sm">
                                                        <img
                                                            src={ans?.picture}
                                                            className="createTest_img--sm"
                                                            alt="answer picture"
                                                        />
                                                        <button
                                                            type="button"
                                                            name="picture"
                                                            className="btn btn-danger p-1 rounded-circle"
                                                            onClick={(event) =>
                                                                handleDeleteFileAns(
                                                                    event,
                                                                    ques,
                                                                    quesIndex,
                                                                    ans,
                                                                    ansIndex
                                                                )
                                                            }
                                                        >
                                                            <DeleteIcon size="0.85rem" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                            {ans?.audio && (
                                                <div className="col-4 mb-2">
                                                    <div className="uploadFileAnsItem--sm">
                                                        <audio
                                                            controls
                                                            src={ans?.audio}
                                                            alt="answer audio"
                                                        />
                                                        <button
                                                            type="button"
                                                            name="audio"
                                                            className="btn btn-danger p-1 rounded-circle"
                                                            onClick={(event) =>
                                                                handleDeleteFileAns(
                                                                    event,
                                                                    ques,
                                                                    quesIndex,
                                                                    ans,
                                                                    ansIndex
                                                                )
                                                            }
                                                        >
                                                            <DeleteIcon size="0.85rem" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                            {ans?.video && (
                                                <div className="col-4 mb-2">
                                                    <div className="uploadFileAnsItem--sm">
                                                        <video
                                                            className="createTest_video--sm"
                                                            controls
                                                            src={ans?.video}
                                                        >
                                                            Your browser does
                                                            not support the
                                                            video tag.
                                                        </video>
                                                        <button
                                                            type="button"
                                                            name="video"
                                                            className="btn btn-danger p-1 rounded-circle"
                                                            onClick={(event) =>
                                                                handleDeleteFileAns(
                                                                    event,
                                                                    ques,
                                                                    quesIndex,
                                                                    ans,
                                                                    ansIndex
                                                                )
                                                            }
                                                        >
                                                            <DeleteIcon size="0.85rem" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="createTest_addOptionBtn"
                                    onClick={() =>
                                        handleAddAnswer(ques, quesIndex)
                                    }
                                >
                                    Add option
                                </button>
                            </div>
                        )}
                        {/* Written answer */}
                        {ques?.questionType?.id === 1 && (
                            <div className="createTest_formGroup-sm d-flex align-items-center w-100">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Answer"
                                    value={ques?.answers[0]?.content || ''}
                                    onChange={(event) =>
                                        handleChangeAnswer(event, quesIndex, 0)
                                    }
                                    onBlur={() => {
                                        handleUpdateAnswer(ques?.answers[0])
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="card-footer bg-white d-flex align-items-center justify-content-between">
                        <div className="createTest_formGroup d-flex align-items-center">
                            <input
                                type="number"
                                className="form-control me-2"
                                name="point"
                                placeholder="Point"
                                style={{ width: '5rem' }}
                                value={ques?.point || ''}
                                onChange={(event) =>
                                    handleChangeQuestion(event, quesIndex)
                                }
                                onBlur={() => handleUpdateQuestion(ques)}
                            />
                            <span>points</span>
                        </div>
                        <button
                            className="btn btn-customLight p-2 rounded-circle"
                            onClick={() => handleDeleteQues(ques, quesIndex)}
                        >
                            <DeleteIcon />
                        </button>
                    </div>
                </div>
            ))}
            <div className="card mt-4 mb-3 py-4 px-5">
                <div className="card-body d-flex justify-content-between px-5">
                    <button
                        type="button"
                        className="createTest_addQuesBtn"
                        onClick={handleAddTrueFalseQuestion}
                    >
                        + TRUE/FALSE
                    </button>
                    <button
                        type="button"
                        className="createTest_addQuesBtn"
                        onClick={handleAddMultipleChoiceQuestion}
                    >
                        + MULTIPLE CHOICE
                    </button>
                    <button
                        type="button"
                        className="createTest_addQuesBtn"
                        onClick={handleAddWrittenQuestion}
                    >
                        + WRITTEN
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateTest

import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import { useSelector } from 'react-redux'

import CardService from '../../../services/CardService'
import StudySetService from '../../../services/StudySetService'
import { deleteFile, deleteFolder } from '../../../features/fileManagement'

import { VocabCard } from './VocabCard'
import { GrammarCard } from './GrammarCard'
import { KanjiCard } from './KanjiCard'

import styles from '../../../assets/styles/Form.module.css'
import CardStyles from '../../../assets/styles/Card.module.css'
import '../../../assets/styles/stickyHeader.css'

const CreateSet = () => {
    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()

    const { id } = useParams()
    const { userInfo } = useSelector((state) => state.user)

    const [type, setType] = useState(Number(searchParams.get('type')))
    const [isScroll, setIsScroll] = useState(false)
    const [studySet, setStudySet] = useState({})
    const [cards, setCards] = useState([])
    const [error, setError] = useState('')
    const [showDiscardMess, setShowDiscardMess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)

    function toBEDate(date) {
        if (date && !date.includes('+07:00')) {
            return date?.replace(/\s/g, 'T') + '.000' + '+07:00'
        }
        return ''
    }

    // draft can go to edit, back to create
    useEffect(() => {
        if (id && studySet._draft) {
            navigate(`/create-set?type=${type}`)
        }
    }, [studySet])

    // fetch data
    useEffect(() => {
        const fetchData = async (tempType) => {
            setLoading(true)
            try {
                // study set
                let temp = {}
                if (id) {
                    temp = (await StudySetService.getStudySetById(id)).data
                } else {
                    const listSets = (
                        await StudySetService.getFilterList(
                            '=0',
                            '',
                            '=1',
                            '',
                            `=${userInfo?.id}`,
                            '',
                            `=${tempType}`,
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            '',
                            ''
                        )
                    ).data
                    if (listSets.totalItems > 0) {
                        temp = listSets.list[0]
                    } else {
                        temp = (
                            await StudySetService.createStudySet({
                                user: {
                                    id: userInfo.id,
                                    username: userInfo.username,
                                },
                                title: '',
                                description: '',
                                _deleted: false,
                                _public: true,
                                _draft: true,
                                studySetType: {
                                    id: tempType,
                                },
                                deleted_date: '',
                            })
                        ).data
                    }
                }
                const tempSetCreatedDate = temp?.created_date
                temp.created_date = toBEDate(tempSetCreatedDate)
                if (temp.user) {
                    const tempUserCreatedDate = temp?.user?.created_date
                    temp.user.created_date = toBEDate(tempUserCreatedDate)
                }
                setStudySet(temp)
                // type
                setType(
                    Number(searchParams.get('type')) || temp.studySetType.id
                )
                // cards
                var tempCards = (await CardService.getAllByStudySetId(temp.id))
                    .data
                for (var card of tempCards) {
                    const tempSetCreatedDate = card?.studySet?.created_date
                    card.studySet.created_date = toBEDate(tempSetCreatedDate)
                    const tempUserCreatedDate = card.studySet.user.created_date
                    card.studySet.user.created_date =
                        toBEDate(tempUserCreatedDate)
                }
                setCards(tempCards)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                    if (error.response.data.includes('not exist')) {
                        navigate('/')
                    }
                } else {
                    console.log(error.message)
                }
            }
            setLoading(false)
        }
        setError('')
        if (userInfo.username) {
            setError('')
            fetchData(Number(searchParams.get('type')))
        }
    }, [userInfo, searchParams.get('type')])

    // handle sticky header
    useEffect(() => {
        const handleScroll = () => {
            setIsScroll(window.scrollY > 96)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // handle reload page
    useEffect(() => {
        const handleReload = (event) => {
            event.preventDefault()
            if (studySet._draft) {
                sessionStorage.setItem('isReload', 'true')
            }
            return false
        }
        window.addEventListener('beforeunload', handleReload)
        return () => {
            window.removeEventListener('beforeunload', handleReload)
        }
    }, [])

    // toggle discard toast
    useEffect(() => {
        setShowDiscardMess(sessionStorage.getItem('isReload') === 'true')
    }, [])

    const toggleShowDiscardMess = () => {
        setShowDiscardMess(!showDiscardMess)
        sessionStorage.clear()
    }

    const handleAddCard = async () => {
        setSaving(true)
        try {
            const card = (
                await CardService.createCard({
                    picture: '',
                    audio: '',
                    studySet: {
                        id: studySet.id,
                        user: {
                            id: userInfo.id,
                            username: userInfo.username,
                        },  
                    },
                })
            ).data
            setCards([...cards, card])
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data)
            } else {
                setError(error.message)
            }
        }
        setSaving(false)
    }

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault()
        const titleEl = document.querySelector('#title')
        var form = document.querySelector('.needs-validation')
        // clear validate
        form.classList.remove('was-validated')
        titleEl.classList.remove('is-invalid')
        setError('')
        try {
            form.classList.add('was-validated')
            if (!studySet.title) {
                titleEl.classList.add('is-invalid')
            } else if (cards.length === 0) {
                setError('You must have at least one cards to save your set.')
            } else {
                const emptyCards = (
                    await StudySetService.checkStudySet(studySet.id)
                ).data
                if (emptyCards.length === 0) {
                    setStudySet({ ...studySet, _draft: false })
                    await StudySetService.updateStudySet(studySet.id, {
                        ...studySet,
                        _draft: false,
                    })
                    navigate('/set/' + studySet.id)
                    form.classList.remove('was-validated')
                    titleEl.classList.remove('is-invalid')
                    setError('')
                } else {
                    setError(
                        `<p class="mb-0">Your card can not be empty. Please review your set.</p>
                    <a href="#${emptyCards[0]}" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                    Go to empty card.
                    </a>`
                    )
                }
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data)
            } else {
                setError(error.message)
            }
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0
        setLoading(false)
    }

    const handleDelete = async (event, card) => {
        setSaving(true)
        try {
            var cardEl = event.target.closest('.card')
            await CardService.deleteCard(cardEl.id)
            await deleteFolder(
                `files/${userInfo.username}/studySet/${studySet.id}/card/${card.id}`
            )
            var array = [...cards]
            var index = cardEl.getAttribute('index')
            if (index > -1) {
                array.splice(index, 1)
            }
            setCards([...array])
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data)
            } else {
                setError(error.message)
            }
        }
        setSaving(false)
    }

    const handleChange = (event) => {
        setStudySet({ ...studySet, [event.target.name]: event.target.value })
    }

    const doUpdate = async () => {
        setSaving(true)
        try {
            await StudySetService.updateStudySet(studySet.id, studySet)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setSaving(false)
    }

    const handleDiscard = async () => {
        setLoading(true)
        try {
            const newStudySet = (
                await StudySetService.createStudySet({
                    user: {
                        id: userInfo.id,
                    },
                    title: '',
                    description: '',
                    _deleted: false,
                    _public: true,
                    _draft: true,
                    studySetType: {
                        id: type,
                    },
                    deleted_date: '',
                })
            ).data
            await StudySetService.deleteStudySet(studySet.id)
            await deleteFile('', `${userInfo.username}/studySet/${studySet.id}`)
            setStudySet(newStudySet)
            setCards([])
            toggleShowDiscardMess()
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoading(false)
    }

    return (
        <div>
            <form className="mt-2 needs-validation" noValidate>
                {/* Heading */}
                <div
                    className={`p-3 sticky-top sticky-header ${
                        isScroll ? 'scroll-shadows' : ''
                    }`}
                >
                    {studySet._draft ? (
                        <div className="container d-flex justify-content-between">
                            <div className="d-flex">
                                <h3 className="fw-bold">
                                    Create a new study set
                                </h3>
                                {loading && (
                                    <div className="createTest_status">
                                        Loading
                                    </div>
                                )}
                                <div className="createTest_status">
                                    {saving ? 'Saving...' : 'Saved'}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleSubmit}
                            >
                                Create
                            </button>
                        </div>
                    ) : (
                        <div className="container d-flex justify-content-between">
                            <div className="d-flex">
                                <Link
                                    to={`/set/${studySet.id}`}
                                    className={CardStyles.card_button}
                                    style={{
                                        backgroundColor: 'inherit',
                                        textDecoration: 'none',
                                    }}
                                >
                                    BACK TO SET
                                </Link>
                                {loading && (
                                    <div className="createTest_status">
                                        Loading
                                    </div>
                                )}
                                <div className="createTest_status">
                                    {saving
                                        ? 'Saving...'
                                        : loading
                                        ? ''
                                        : 'Saved'}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleSubmit}
                            >
                                Done
                            </button>
                        </div>
                    )}
                </div>
                <div className="container mt-4">
                    {/* error message */}
                    {error && (
                        <div
                            className="alert alert-danger"
                            role="alert"
                            dangerouslySetInnerHTML={{ __html: error }}
                        ></div>
                    )}
                    {/* Study set */}
                    <div className="row">
                        {/* title */}
                        <div className="form-group mb-3 col-6">
                            <label className={styles.formLabel}>Title</label>
                            <input
                                placeholder="Enter your title"
                                id="title"
                                name="title"
                                className={`form-control ${styles.formControl}`}
                                value={studySet.title || ''}
                                onChange={handleChange}
                                onBlur={doUpdate}
                                required
                            />
                            <div className="invalid-feedback">
                                Please enter a title to create your set.
                            </div>
                        </div>
                        {/* is_public */}
                        <div className="form-group mb-3 col-6">
                            <label className={styles.formLabel}>Access</label>
                            <select
                                className={`form-select ${styles.formSelect}`}
                                aria-label="public"
                                name="_public"
                                value={studySet._public}
                                onChange={handleChange}
                                onBlur={doUpdate}
                            >
                                <option value={true}>Public</option>
                                <option value={false}>Private</option>
                            </select>
                        </div>
                    </div>
                    {/* description */}
                    <div className="form-group mb-5">
                        <label className={styles.formLabel}>Description</label>
                        <textarea
                            className={`form-control ${styles.formControl}`}
                            style={{ height: '6rem' }}
                            placeholder="Add a description..."
                            name="description"
                            value={studySet.description || ''}
                            onChange={handleChange}
                            onBlur={doUpdate}
                        ></textarea>
                    </div>
                    {/* Card */}
                    {cards.map((card, index) => {
                        if (type === 1) {
                            return (
                                <VocabCard
                                    key={card.id}
                                    index={index}
                                    card={card}
                                    handleDelete={(event) =>
                                        handleDelete(event, card)
                                    }
                                    setLoading={setLoading}
                                    setSaving={setSaving}
                                />
                            )
                        }
                        if (type === 2) {
                            return (
                                <KanjiCard
                                    key={card.id}
                                    index={index}
                                    card={card}
                                    handleDelete={(event) =>
                                        handleDelete(event, card)
                                    }
                                    setLoading={setLoading}
                                    setSaving={setSaving}
                                />
                            )
                        }
                        if (type === 3) {
                            return (
                                <GrammarCard
                                    key={card.id}
                                    index={index}
                                    card={card}
                                    handleDelete={(event) =>
                                        handleDelete(event, card)
                                    }
                                    setLoading={setLoading}
                                    setSaving={setSaving}
                                />
                            )
                        }
                    })}
                    {/* Add button */}
                    <div className={`card ${CardStyles.card} mb-3 py-4`}>
                        <div
                            className={`card-body ${CardStyles.card_body} d-flex justify-content-center`}
                        >
                            <button
                                type="button"
                                className={CardStyles.card_button}
                                onClick={handleAddCard}
                            >
                                + ADD CARD
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            {/* discard message */}
            <ToastContainer
                className="p-3 mt-5 opacity-75 position-sticky"
                position="bottom-start"
                style={{ zIndex: 9999 }}
            >
                <Toast
                    show={showDiscardMess}
                    onClose={toggleShowDiscardMess}
                    delay={5000}
                    className="toast align-items-center text-bg-dark border-0"
                    autohide
                >
                    <Toast.Body className="d-flex flex-column p-3">
                        <div className="d-flex justify-content-between">
                            <span className="me-auto">
                                This is an auto-saved set.
                            </span>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="toast"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div>
                            <button
                                className="btn text-white"
                                onClick={handleDiscard}
                            >
                                Discard it
                            </button>
                        </div>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}
export default CreateSet

import { useState, useEffect } from 'react'

import ProgressService from '../../../services/ProgressService'

import { NoteSolidIcon, StarSolidIcon } from '../../../components/icons'

const GrammarCard = ({
    userInfo,
    fullCard,
    cardIndex,
    handleAutoPlay,
    isAuto,
    fullCards,
    setFullCards,
    setShowNoteModal,
    handleUpdateNumStar,
}) => {
    const [card, setCard] = useState({})
    const [progress, setProgress] = useState({})
    const [title, setTitle] = useState(null)
    const [jlptLevel, setJlptLevel] = useState(null)
    const [meaning, setMeaning] = useState(null)
    const [example, setExample] = useState(null)
    const [explanation, setExplanation] = useState(null)
    const [note, setNote] = useState(null)
    const [structure, setStructure] = useState(null)

    function toBEDate(date) {
        if (date && !date.includes('+07:00')) {
            return date?.replace(/\s/g, 'T') + '.000' + '+07:00'
        }
        return ''
    }

    useEffect(() => {
        const fetchData = async () => {
            setCard(fullCard.card)
            setProgress(fullCard.progress)
            const tempContents = fullCard.content
            for (const content of tempContents) {
                switch (content.field.name) {
                    case 'title':
                        setTitle(content)
                        break
                    case 'jlptLevel':
                        setJlptLevel(content)
                        break
                    case 'meaning':
                        setMeaning(content)
                        break
                    case 'example':
                        setExample(content)
                        break
                    case 'explanation':
                        setExplanation(content)
                        break
                    case 'note':
                        setNote(content)
                        break
                    case 'structure':
                        setStructure(content)
                        break
                    default:
                        break
                }
            }
        }
        if (fullCard?.card?.id) {
            fetchData()
        }
    }, [fullCard])

    useEffect(() => {
        if (isAuto) {
            handleAutoPlay()
        }
    }, [isAuto, title])

    const toggleFlip = () => {
        document
            .getElementById(`flipElement${cardIndex}`)
            ?.classList.toggle('is-flipped')
    }

    // catch press space event
    useEffect(() => {
        const handleUserSpacePress = (event) => {
            if (event.defaultPrevented) {
                return // Do nothing if event already handled
            }
            switch (event.code) {
                case 'Space':
                    toggleFlip()
            }
            if (event.code !== 'Tab') {
                // Consume the event so it doesn't get handled twice,
                // as long as the user isn't trying to move focus away
                event.preventDefault()
            }
        }
        window.addEventListener('keydown', handleUserSpacePress, true)
        return () => {
            window.removeEventListener('keydown', handleUserSpacePress, true)
        }
    }, [])

    const handleChangeStar = async () => {
        var tempCard = { ...card }
        tempCard.studySet.created_date = toBEDate(
            tempCard.studySet.created_date
        )
        tempCard.studySet.user.created_date = toBEDate(
            tempCard.studySet.user.created_date
        )
        var tempUser = {
            ...userInfo,
            created_date: toBEDate(userInfo.created_date),
        }
        var tempProgress = {
            user: tempUser,
            card: tempCard,
            star: progress?.id ? !progress?._star : 0,
            audio: progress?.audio || '',
            picture: progress?.picture || '',
            note: progress?.note || '',
        }
        tempProgress = (
            await ProgressService.customUpdateProgress(tempProgress)
        ).data
        // update progress
        setProgress(tempProgress)
        // update list cards
        var tempFullCards = [...fullCards]
        tempFullCards[cardIndex] = { ...fullCard, progress: tempProgress }
        setFullCards(tempFullCards)
        // update number star
        handleUpdateNumStar(tempProgress.status, tempProgress._star)
    }

    return (
        <div
            className="flashcardContentContainer"
            onClick={(event) => {
                if (event.target.name !== 'flashcardContent_noteBtn') {
                    toggleFlip()
                }
            }}
        >
            <div
                className="flashcardContentWrapper"
                id={`flipElement${cardIndex}`}
            >
                <div className="flashcardFront d-flex align-items-center justify-content-center">
                    <div className="flashcardContent_noteBtn">
                        <button
                            name="flashcardContent_noteBtn"
                            className={`setPageTerm_btn btn btn-customLight ${
                                progress?._star ? 'star' : ''
                            }`}
                            onClick={handleChangeStar}
                        >
                            <StarSolidIcon size="16px" />
                        </button>
                        <button
                            name="flashcardContent_noteBtn"
                            className="btn btn-customLight"
                            onClick={() => {
                                setShowNoteModal(true)
                            }}
                        >
                            <NoteSolidIcon size="16px" />
                        </button>
                    </div>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: title?.content,
                        }}
                    ></div>
                </div>
                <div className="flashcardBack">
                    <div className="flashcardContent_noteBtn">
                        <button
                            name="flashcardContent_noteBtn"
                            className={`setPageTerm_btn btn btn-customLight ${
                                progress?._star ? 'star' : ''
                            }`}
                            onClick={handleChangeStar}
                        >
                            <StarSolidIcon size="16px" />
                        </button>
                        <button
                            name="flashcardContent_noteBtn"
                            className="btn btn-customLight"
                            onClick={() => {
                                setShowNoteModal(true)
                            }}
                        >
                            <NoteSolidIcon size="16px" />
                        </button>
                    </div>
                    <div className="row">
                        {structure && (
                            <div className="col-12 col-xl-6 mb-3">
                                <div className="flashCardField_label mb-2">
                                    Structure
                                </div>
                                <div
                                    className="flashCardField_content"
                                    dangerouslySetInnerHTML={{
                                        __html: structure?.content || '...',
                                    }}
                                ></div>
                            </div>
                        )}
                        {jlptLevel && (
                            <div className="col-12 col-xl mb-3">
                                <div className="flashCardField_label mb-2">
                                    JLPT Level
                                </div>
                                <div
                                    className="flashCardField_content"
                                    dangerouslySetInnerHTML={{
                                        __html: jlptLevel?.content || '...',
                                    }}
                                ></div>
                            </div>
                        )}
                        {meaning && (
                            <div className="col-12 col-xl-6 mb-3">
                                <div className="flashCardField_label mb-2">
                                    Meaning
                                </div>
                                <div
                                    className="flashCardField_content"
                                    dangerouslySetInnerHTML={{
                                        __html: meaning?.content || '...',
                                    }}
                                ></div>
                            </div>
                        )}
                        {example && (
                            <div className="col-12 col-xl-6 mb-3">
                                <div className="flashCardField_label mb-2">
                                    Example
                                </div>
                                <div
                                    className="flashCardField_content"
                                    dangerouslySetInnerHTML={{
                                        __html: example?.content || '...',
                                    }}
                                ></div>
                            </div>
                        )}
                        {explanation && (
                            <div className="col-12 col-xl-6 mb-3">
                                <div className="flashCardField_label mb-2">
                                    Explanation
                                </div>
                                <div
                                    className="flashCardField_content"
                                    dangerouslySetInnerHTML={{
                                        __html: explanation?.content || '...',
                                    }}
                                ></div>
                            </div>
                        )}
                        {note && (
                            <div className="col-12 col-xl mb-3">
                                <div className="flashCardField_label mb-2">
                                    Note
                                </div>
                                <div
                                    className="flashCardField_content"
                                    dangerouslySetInnerHTML={{
                                        __html: note?.content || '...',
                                    }}
                                ></div>
                            </div>
                        )}
                    </div>
                    <div className="row my-2 flashCardNote">
                        <div className="col-12 col-xl-6">
                            {(progress?.picture || card?.picture) && (
                                <div className="flashCardField_img d-flex align-items-center">
                                    <img
                                        src={progress?.picture || card?.picture}
                                        alt="card picture"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="col-12 col-xl-6">
                            {(progress?.audio || card?.audio) && (
                                <div className="d-flex align-items-center">
                                    <audio
                                        controls
                                        src={progress?.audio || card?.audio}
                                        alt="card audio"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GrammarCard

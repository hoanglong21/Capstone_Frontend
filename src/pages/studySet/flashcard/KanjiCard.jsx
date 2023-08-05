import { useState, useEffect } from 'react'

import ProgressService from '../../../services/ProgressService'

import { NoteSolidIcon, StarSolidIcon } from '../../../components/icons'

const KanjiCard = ({
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
    const [character, setCharacter] = useState(null)
    const [name, setName] = useState(null)
    const [strokeOrder, setStrokeOrder] = useState(null)
    const [meanings, setMeanings] = useState(null)
    const [onyomi, setOnyomi] = useState(null)
    const [kunyomi, setKunyomi] = useState(null)
    const [radical, setRadical] = useState(null)
    const [example, setExample] = useState(null)
    const [jlptLevel, setJlptLevel] = useState(null)
    const [strokes, setStrokes] = useState(null)

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
                    case 'character':
                        setCharacter(content)
                        break
                    case 'name':
                        setName(content)
                        break
                    case 'strokeOrder':
                        setStrokeOrder(content)
                        break
                    case 'meanings':
                        setMeanings(content)
                        break
                    case 'onyomi':
                        setOnyomi(content)
                        break
                    case 'kunyomi':
                        setKunyomi(content)
                        break
                    case 'radical':
                        setRadical(content)
                        break
                    case 'example':
                        setExample(content)
                        break
                    case 'jlptLevel':
                        setJlptLevel(content)
                        break
                    case 'strokes':
                        setStrokes(content)
                        break
                    default:
                        break
                }
            }
        }
        if (fullCard?.card.id) {
            fetchData()
        }
    }, [fullCard])

    useEffect(() => {
        if (isAuto) {
            handleAutoPlay()
        }
    }, [isAuto, character])

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
                            __html: character?.content,
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
                        {strokeOrder?.content && (
                            <div className="col-3 mb-3">
                                <div className="flashCardField_img">
                                    <img
                                        src={strokeOrder?.content}
                                        alt="stroke order img"
                                    />
                                </div>
                            </div>
                        )}
                        <div
                            className={
                                strokeOrder?.content ? 'col-9' : 'col-12'
                            }
                        >
                            <div className="row">
                                {name && (
                                    <div className="col-6 mb-3">
                                        <div className="flashCardField_label mb-2">
                                            Name
                                        </div>
                                        <div
                                            className="flashCardField_content"
                                            dangerouslySetInnerHTML={{
                                                __html: name?.content || '...',
                                            }}
                                        ></div>
                                    </div>
                                )}
                                {meanings && (
                                    <div className="col-6 mb-3">
                                        <div className="flashCardField_label mb-2">
                                            Meanings
                                        </div>
                                        <div
                                            className="flashCardField_content"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    meanings?.content || '...',
                                            }}
                                        ></div>
                                    </div>
                                )}
                                {onyomi && (
                                    <div className="col-6 mb-3">
                                        <div className="flashCardField_label mb-2">
                                            Onyomi
                                        </div>
                                        <div
                                            className="flashCardField_content"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    onyomi?.content || '...',
                                            }}
                                        ></div>
                                    </div>
                                )}
                                {kunyomi && (
                                    <div className="col-6 mb-3">
                                        <div className="flashCardField_label mb-2">
                                            Kunyomi
                                        </div>
                                        <div
                                            className="flashCardField_content"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    kunyomi?.content || '...',
                                            }}
                                        ></div>
                                    </div>
                                )}
                                {radical && (
                                    <div className="col-6 mb-3">
                                        <div className="flashCardField_label mb-2">
                                            Radical
                                        </div>
                                        <div
                                            className="flashCardField_content"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    radical?.content || '...',
                                            }}
                                        ></div>
                                    </div>
                                )}
                                {example && (
                                    <div className="col-6 mb-3">
                                        <div className="flashCardField_label mb-2">
                                            Example
                                        </div>
                                        <div
                                            className="flashCardField_content"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    example?.content || '...',
                                            }}
                                        ></div>
                                    </div>
                                )}
                                {jlptLevel && (
                                    <div className="col-6 mb-3">
                                        <div className="flashCardField_label mb-2">
                                            JLPT Level
                                        </div>
                                        <div
                                            className="flashCardField_content"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    jlptLevel?.content || '...',
                                            }}
                                        ></div>
                                    </div>
                                )}
                                {strokes && (
                                    <div className="col-6 mb-3">
                                        <div className="flashCardField_label mb-2">
                                            Strokes
                                        </div>
                                        <div
                                            className="flashCardField_content"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    strokes?.content || '...',
                                            }}
                                        ></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-6">
                            {(progress?.picture || card?.picture) && (
                                <div className="flashCardField_img d-flex align-items-center">
                                    <img
                                        src={progress?.picture || card?.picture}
                                        alt="card picture"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="col-6">
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

export default KanjiCard

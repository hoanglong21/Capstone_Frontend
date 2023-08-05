import { useState, useEffect } from 'react'

import ProgressService from '../../../services/ProgressService'

import { NoteSolidIcon, StarSolidIcon } from '../../../components/icons'

const VocabCard = ({
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
    const [contents, setContents] = useState([])
    const [progress, setProgress] = useState({})

    function toBEDate(date) {
        if (date && !date.includes('+07:00')) {
            return date?.replace(/\s/g, 'T') + '.000' + '+07:00'
        }
        return ''
    }

    useEffect(() => {
        const fetchData = async () => {
            setCard(fullCard?.card)
            setContents(fullCard.content)
            setProgress(fullCard.progress)
        }
        if (fullCard?.card?.id) {
            fetchData()
        }
    }, [fullCard])

    useEffect(() => {
        if (isAuto) {
            handleAutoPlay()
        }
    }, [isAuto, contents])

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
    }, [cardIndex])

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
                            __html: contents[0]?.content,
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
                    <div className="row h-100 p-5 d-flex align-items-center">
                        <div className="col-12 col-lg-8">
                            {contents.map((contentItem, index) => {
                                if (index > 0) {
                                    return (
                                        <div
                                            className="mb-5"
                                            key={contentItem?.id}
                                        >
                                            <div className="flashCardField_label mb-2">
                                                {contentItem?.field.name}
                                            </div>
                                            <div
                                                className="flashCardField_content"
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        contentItem?.content ||
                                                        '...',
                                                }}
                                            ></div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                        <div className="col-12 col-lg-4">
                            {(progress?.picture || card?.picture) && (
                                <div className="mb-4 flashCardField_img d-flex align-items-center">
                                    <img
                                        src={progress?.picture || card?.picture}
                                        alt="card picture"
                                    />
                                </div>
                            )}
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

export default VocabCard

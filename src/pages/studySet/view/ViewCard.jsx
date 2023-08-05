import { useEffect, useState } from 'react'
import ContentService from '../../../services/ContentService'
import {
    CloseIcon,
    DeleteIcon,
    ImageIcon,
    MicIcon,
    NoteSolidIcon,
    StarSolidIcon,
} from '../../../components/icons'
import NoteEditor from '../../../components/textEditor/NoteEditor'
import ProgressService from '../../../services/ProgressService'
import { deleteFileByUrl, uploadFile } from '../../../features/fileManagement'

const ViewCard = ({ card, userInfo }) => {
    const [term, setTerm] = useState('')
    const [definition, setDefinition] = useState('')
    const [picture, setPicture] = useState('')
    const [audio, setAudio] = useState('')
    const [note, setNote] = useState('')
    const [showNote, setShowNote] = useState(false)
    const [loadingPicture, setLoadingPicture] = useState(false)
    const [loadingAudio, setLoadingAudio] = useState(false)
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            var tempProgress = {}
            try {
                // content
                const tempContents = (
                    await ContentService.getAllByCardId(card.id)
                ).data
                const type = card.studySet.studySetType.id
                if (type === 1) {
                    setTerm(tempContents[0]?.content)
                    setDefinition(tempContents[1]?.content)
                } else if (type === 2) {
                    setTerm(tempContents[0]?.content)
                    setDefinition(tempContents[1]?.content)
                } else if (type === 3) {
                    setTerm(tempContents[0]?.content)
                    setDefinition(tempContents[2]?.content)
                }
                // progress
                tempProgress = (
                    await ProgressService.getProgressByUserIdAndCardId(
                        userInfo.id,
                        card.id
                    )
                ).data
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
            if (tempProgress?.id) {
                setPicture(tempProgress.picture)
                setAudio(tempProgress.audio)
                setNote(tempProgress.note)
                setProgress(tempProgress)
            }
        }
        fetchData()
    }, [card.id, userInfo.id])

    useEffect(() => {
        if (showNote) {
            document
                .getElementsByTagName('body')[0]
                .classList.add('setPage_modalOpen')
        } else {
            document
                .getElementsByTagName('body')[0]
                .classList.remove('setPage_modalOpen')
        }
    }, [showNote])

    const handleChangeFile = async (event) => {
        const name = event.target.name
        name === 'picture' ? setLoadingPicture(true) : setLoadingAudio(true)
        const file = event.target.files[0]
        if (file) {
            name === 'picture' ? setPicture(file) : setAudio(file)
        }
        name === 'picture' ? setLoadingPicture(false) : setLoadingAudio(false)
    }

    const handleDeleteFile = async (event) => {
        const name = event.target.name
        name === 'picture' ? setPicture('') : setAudio('')
    }

    const handleSave = async () => {
        setLoading(true)
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
            star: progress?.id ? progress?._star : 0,
            note: note,
        }
        try {
            if (progress?.id) {
                // delete old
                if (picture?.type && progress?.picture) {
                    await deleteFileByUrl(
                        progress.picture,
                        `${card.studySet.user.username}/studySet/${card.studySet.id}/card/${card.id}/progress/${progress.id}`
                    )
                }
                if (audio?.type && progress?.audio) {
                    await deleteFileByUrl(
                        progress.audio,
                        `${card.studySet.user.username}/studySet/${card.studySet.id}/card/${card.id}/progress/${progress.id}`
                    )
                }
                // upload new
                var tempPicture = picture
                if (picture && picture != progress.picture) {
                    tempPicture = await uploadFile(
                        picture,
                        `${card.studySet.user.username}/studySet/${card.studySet.id}/card/${card.id}/progress/${progress.id}`
                    )
                    setPicture(tempPicture)
                }
                var tempAudio = audio
                if (audio && audio != progress.audio) {
                    tempAudio = await uploadFile(
                        audio,
                        `${card.studySet.user.username}/studySet/${card.studySet.id}/card/${card.id}/progress/${progress.id}`
                    )
                    setAudio(tempAudio)
                }
                tempProgress = {
                    ...tempProgress,
                    picture: tempPicture,
                    audio: tempAudio,
                }
            } else {
                tempProgress = (
                    await ProgressService.customUpdateProgress(tempProgress)
                ).data
                // upload new
                var tempPicture = picture
                if (picture) {
                    tempPicture = await uploadFile(
                        picture,
                        `${card.studySet.user.username}/studySet/${card.studySet.id}/card/${card.id}/progress/${tempProgress.id}`
                    )
                    setPicture(tempPicture)
                }
                var tempAudio = audio
                if (audio) {
                    tempAudio = await uploadFile(
                        audio,
                        `${card.studySet.user.username}/studySet/${card.studySet.id}/card/${card.id}/progress/${tempProgress.id}`
                    )
                    setAudio(tempAudio)
                }
                tempProgress = {
                    ...tempProgress,
                    picture: tempPicture,
                    audio: tempAudio,
                }
            }
            tempProgress = (
                await ProgressService.customUpdateProgress(tempProgress)
            ).data
            setProgress(tempProgress)
            setShowNote(false)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoading(false)
    }

    const handleCancel = () => {
        setShowNote(false)
        setPicture(progress?.picture || '')
        setAudio(progress?.audio || '')
        setNote(progress?.note || '')
    }

    function getUrl(file) {
        try {
            return URL.createObjectURL(file)
        } catch (error) {
            return file
        }
    }

    function toBEDate(date) {
        if (date && !date.includes('+07:00')) {
            return date?.replace(/\s/g, 'T') + '.000' + '+07:00'
        }
        return ''
    }

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
            audio: audio,
            picture: picture,
            note: note,
        }
        tempProgress = (
            await ProgressService.customUpdateProgress(tempProgress)
        ).data
        setProgress(tempProgress)
    }

    return (
        <div className="setPageTerm mb-3">
            <div className="row">
                <div
                    className="col-3 d-flex align-items-center"
                    style={{ borderRight: '0.125rem solid #f6f7fb' }}
                >
                    <div className="setPageTerm_termText">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: term ? term : '...',
                            }}
                        ></div>
                    </div>
                </div>
                <div className="col-7">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="setPageTerm_definitionText">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: definition ? definition : '...',
                                }}
                            ></div>
                        </div>
                        <div className="setPageTerm_imageWrap d-flex align-items-center">
                            {card.picture && <img src={card?.picture} />}
                        </div>
                    </div>
                </div>
                <div className="col-2 d-flex justify-content-center">
                    <button
                        className={`setPageTerm_btn btn btn-customLight ${
                            progress?._star ? 'star' : ''
                        }`}
                        onClick={handleChangeStar}
                    >
                        <StarSolidIcon size="20px" />
                    </button>
                    <button
                        className="btn btn-customLight"
                        onClick={() => {
                            setShowNote(true)
                        }}
                    >
                        <NoteSolidIcon size="20px" />
                    </button>
                    {/* note modal */}
                    {showNote && (
                        <div className="setPage_noteModal">
                            <div className="modal-content">
                                <div className="d-flex justify-content-between mb-3">
                                    <div>
                                        <input
                                            type="file"
                                            id="noteUploadImage"
                                            accept="image/*"
                                            name="picture"
                                            className="d-none"
                                            onClick={(event) => {
                                                event.target.value = null
                                            }}
                                            onChange={(event) =>
                                                handleChangeFile(event)
                                            }
                                        />
                                        <label htmlFor="noteUploadImage">
                                            <ImageIcon className="ms-3 icon-warning" />
                                        </label>
                                        <input
                                            type="file"
                                            id="noteUploadAudio"
                                            accept="audio/*"
                                            name="audio"
                                            className="d-none"
                                            onClick={(event) => {
                                                event.target.value = null
                                            }}
                                            onChange={(event) =>
                                                handleChangeFile(event)
                                            }
                                        />
                                        <label htmlFor="noteUploadAudio">
                                            <MicIcon className="ms-3 icon-warning" />
                                        </label>
                                    </div>
                                    <button
                                        className="close p-0"
                                        onClick={handleCancel}
                                    >
                                        <CloseIcon size="1.875rem" />
                                    </button>
                                </div>
                                <div className="setPage_noteEditor">
                                    <NoteEditor
                                        data={note}
                                        onChange={(event, editor) => {
                                            setNote(editor.getData())
                                        }}
                                    />
                                </div>
                                {(loadingPicture ||
                                    loadingAudio ||
                                    picture ||
                                    audio) && (
                                    <div className="row mt-2 setPage_noteUploadFile">
                                        <div className="col-6 d-flex flex-column align-items-center">
                                            {loadingPicture && (
                                                <div
                                                    className="spinner-border text-secondary mb-3"
                                                    role="status"
                                                >
                                                    <span className="visually-hidden">
                                                        LoadingUpload...
                                                    </span>
                                                </div>
                                            )}
                                            {!loadingPicture && picture && (
                                                <div className="d-flex align-self-start align-items-center">
                                                    <img
                                                        src={getUrl(picture)}
                                                    />
                                                    <button
                                                        type="button"
                                                        name="picture"
                                                        className="btn btn-danger ms-5 p-0 rounded-circle"
                                                        onClick={(event) =>
                                                            handleDeleteFile(
                                                                event
                                                            )
                                                        }
                                                    >
                                                        <DeleteIcon size="1.25rem" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-6 d-flex flex-column align-items-center">
                                            {loadingAudio && (
                                                <div
                                                    className="spinner-border text-secondary mb-3"
                                                    role="status"
                                                >
                                                    <span className="visually-hidden">
                                                        LoadingUpload...
                                                    </span>
                                                </div>
                                            )}
                                            {!loadingAudio && audio && (
                                                <div className="d-flex align-self-start align-items-center">
                                                    <audio
                                                        controls
                                                        src={getUrl(audio)}
                                                    ></audio>
                                                    <button
                                                        type="button"
                                                        name="audio"
                                                        className="btn btn-danger ms-5 p-0 rounded-circle"
                                                        onClick={(event) =>
                                                            handleDeleteFile(
                                                                event
                                                            )
                                                        }
                                                    >
                                                        <DeleteIcon size="1.25rem" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                <div className="d-flex justify-content-end mt-3">
                                    <button
                                        className="btn btn-secondary me-3"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleSave}
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving' : 'Save'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default ViewCard

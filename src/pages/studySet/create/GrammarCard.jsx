import { useEffect, useState } from 'react'

import { uploadFile, deleteFileByUrl } from '../../../features/fileManagement'
import ContentService from '../../../services/ContentService'
import CardService from '../../../services/CardService'

import { DeleteIcon, ImageIcon, MicIcon } from '../../../components/icons'
import CardEditor from '../../../components/textEditor/CardEditor'
import styles from '../../../assets/styles/Card.module.css'

export const GrammarCard = (props) => {
    const [card, setCard] = useState(props.card)
    const [title, setTitle] = useState({})
    const [jlptLevel, setJlptLevel] = useState({})
    const [meaning, setMeaning] = useState({})
    const [example, setExample] = useState({})
    const [explanation, setExplanation] = useState({})
    const [note, setNote] = useState({})
    const [structure, setStructure] = useState({})
    const [loadingPicture, setLoadingPicture] = useState(false)
    const [loadingAudio, setLoadingAudio] = useState(false)

    //fetch data
    useEffect(() => {
        const fetchData = async () => {
            props.setLoading(true)
            const contents = (await ContentService.getAllByCardId(card.id)).data
            if (contents.length === 0) {
                setTitle(
                    (
                        await ContentService.createContent({
                            card: {
                                id: card.id,
                            },
                            field: {
                                id: 14,
                            },
                            content: '',
                        })
                    ).data
                )
                setJlptLevel(
                    (
                        await ContentService.createContent({
                            card: {
                                id: card.id,
                            },
                            field: {
                                id: 15,
                            },
                            content: '',
                        })
                    ).data
                )
                setMeaning(
                    (
                        await ContentService.createContent({
                            card: {
                                id: card.id,
                            },
                            field: {
                                id: 16,
                            },
                            content: '',
                        })
                    ).data
                )
                setExample(
                    (
                        await ContentService.createContent({
                            card: {
                                id: card.id,
                            },
                            field: {
                                id: 17,
                            },
                            content: '',
                        })
                    ).data
                )
                setExplanation(
                    (
                        await ContentService.createContent({
                            card: {
                                id: card.id,
                            },
                            field: {
                                id: 18,
                            },
                            content: '',
                        })
                    ).data
                )
                setNote(
                    (
                        await ContentService.createContent({
                            card: {
                                id: card.id,
                            },
                            field: {
                                id: 19,
                            },
                            content: '',
                        })
                    ).data
                )
                setStructure(
                    (
                        await ContentService.createContent({
                            card: {
                                id: card.id,
                            },
                            field: {
                                id: 20,
                            },
                            content: '',
                        })
                    ).data
                )
            } else {
                setTitle(contents[0])
                setJlptLevel(contents[1])
                setMeaning(contents[2])
                setExample(contents[3])
                setExplanation(contents[4])
                setNote(contents[5])
                setStructure(contents[6])
            }
            props.setLoading(false)
        }
        fetchData()
    }, [card.id])

    // ignore error
    useEffect(() => {
        window.addEventListener('error', (e) => {
            console.log(e)
            const resizeObserverErrDiv = document.getElementById(
                'webpack-dev-server-client-overlay-div'
            )
            const resizeObserverErr = document.getElementById(
                'webpack-dev-server-client-overlay'
            )
            if (resizeObserverErr) {
                resizeObserverErr.setAttribute('style', 'display: none')
            }
            if (resizeObserverErrDiv) {
                resizeObserverErrDiv.setAttribute('style', 'display: none')
            }
        })
    }, [])

    const doUpdateCard = async (tempCard) => {
        props.setSaving(true)
        await CardService.updateCard(tempCard.id, tempCard)
        props.setSaving(false)
    }

    const handleChangeFile = async (event) => {
        props.setSaving(true)
        const name = event.target.name
        name === 'picture' ? setLoadingPicture(true) : setLoadingAudio(true)
        const file = event.target.files[0]
        if (file) {
            const urlOld = String(card[name])
            const url = await uploadFile(
                file,
                `${card.studySet.user.username}/studySet/${card.studySet.id}/card/${card.id}`
            )
            const tempCard = { ...card, [name]: url }
            setCard(tempCard)
            if (urlOld) {
                await deleteFileByUrl(
                    urlOld,
                    `${card.studySet.user.username}/studySet/${card.studySet.id}/card/${card.id}`
                )
            }
            doUpdateCard(tempCard)
        }
        name === 'picture' ? setLoadingPicture(false) : setLoadingAudio(false)
        props.setSaving(false)
    }

    const handleDeleteFile = async (event) => {
        props.setSaving(true)
        const name = event.target.name
        name === 'picture' ? setLoadingPicture(false) : setLoadingAudio(false)
        const urlOld = card[name]
        const tempCard = { ...card, [name]: '' }
        setCard(tempCard)
        if (urlOld) {
            await deleteFileByUrl(
                urlOld,
                `${card.studySet.user.username}/studySet/${card.studySet.id}/card/${card.id}`
            )
        }
        doUpdateCard(tempCard)
        name === 'picture' ? setLoadingPicture(false) : setLoadingAudio(false)
        props.setSaving(false)
    }

    const doUpdateContent = async (content) => {
        props.setSaving(true)
        try {
            await ContentService.updateContent(content.id, content)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        props.setSaving(false)
    }

    return (
        <div
            className={`card ${styles.card} mb-3`}
            index={props.index}
            id={card.id}
        >
            <div
                className={`card-header ${styles.card_header} d-flex justify-content-between align-items-center mb-1 px-4`}
            >
                <span className={styles.card_header_label}>
                    {props.index + 1}
                </span>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <input
                            type="file"
                            id={`uploadImage${props.index}`}
                            accept="image/*"
                            name="picture"
                            className={styles.file_upload}
                            onClick={(event) => {
                                event.target.value = null
                            }}
                            onChange={(event) => handleChangeFile(event)}
                        />
                        <label htmlFor={`uploadImage${props.index}`}>
                            <ImageIcon className="ms-3 icon-warning" />
                        </label>
                    </div>
                    <div>
                        <input
                            type="file"
                            id={`uploadAudio${props.index}`}
                            accept="audio/*"
                            name="audio"
                            className={styles.file_upload}
                            onClick={(event) => {
                                event.target.value = null
                            }}
                            onChange={(event) => handleChangeFile(event)}
                        />
                        <label htmlFor={`uploadAudio${props.index}`}>
                            <MicIcon className="ms-3 icon-warning" />
                        </label>
                    </div>
                    <button
                        type="button"
                        className="btn pe-0"
                        onClick={props.handleDelete}
                    >
                        <DeleteIcon className="icon-warning" />
                    </button>
                </div>
            </div>
            <div className={`card-body ${styles.card_body}`}>
                <div className="row px-2 py-1">
                    <div className="col-9 col-xl-10 pe-4">
                        <CardEditor
                            name="title"
                            data={title?.content}
                            onChange={(event, editor) => {
                                if (title?.id) {
                                    setTitle({
                                        ...title,
                                        content: editor.getData(),
                                    })
                                }
                            }}
                            onBlur={() => doUpdateContent(title)}
                        />
                        <span
                            className={`card-header-label ${styles.card_header_label} mt-1`}
                        >
                            TITLE
                        </span>
                    </div>
                    <div className="col-3 col-xl-2 ps-3 d-flex flex-column justify-content-end">
                        <select
                            className={`form-select ${styles.card_select}`}
                            aria-label="level"
                            name="jlptLevel"
                            value={jlptLevel?.content}
                            onChange={(event) => {
                                if (jlptLevel?.id) {
                                    setJlptLevel({
                                        ...jlptLevel,
                                        content: event.target.value,
                                    })
                                }
                            }}
                            onBlur={() => {
                                doUpdateContent(jlptLevel)
                            }}
                        >
                            <option value="Unknown">Unknown</option>
                            <option value="N1">N1</option>
                            <option value="N2">N2</option>
                            <option value="N3">N3</option>
                            <option value="N4">N4</option>
                            <option value="N5">N5</option>
                        </select>
                        <span
                            className={`card-header-label ${styles.card_header_label} mt-1`}
                        >
                            JLPT LEVEL
                        </span>
                    </div>
                    <div className="col-12 mt-4">
                        <CardEditor
                            name="meaning"
                            className={`${styles.card_editor}`}
                            data={meaning?.content}
                            onChange={(event, editor) => {
                                if (meaning?.id) {
                                    setMeaning({
                                        ...meaning,
                                        content: editor.getData(),
                                    })
                                }
                            }}
                            onBlur={() => doUpdateContent(meaning)}
                        />
                        <span
                            className={`card-header-label ${styles.card_header_label} mt-1`}
                        >
                            MEANING
                        </span>
                    </div>
                    <div className="col-12 mt-4">
                        <CardEditor
                            name="structure"
                            className={`${styles.card_editor}`}
                            data={structure?.content}
                            onChange={(event, editor) => {
                                if (structure?.id) {
                                    setStructure({
                                        ...structure,
                                        content: editor.getData(),
                                    })
                                }
                            }}
                            onBlur={() => doUpdateContent(structure)}
                        />
                        <span
                            className={`card-header-label ${styles.card_header_label} mt-1`}
                        >
                            STRUCTURE
                        </span>
                    </div>
                    <div className="col-12 mt-4">
                        <CardEditor
                            name="example"
                            data={example?.content}
                            onChange={(event, editor) => {
                                if (example?.id) {
                                    setExample({
                                        ...example,
                                        content: editor.getData(),
                                    })
                                }
                            }}
                            onBlur={() => doUpdateContent(example)}
                        />
                        <span
                            className={`card-header-label ${styles.card_header_label} mt-1`}
                        >
                            EXAMPLE
                        </span>
                    </div>
                    <div className="col-12 mt-4">
                        <CardEditor
                            name="explanation"
                            data={explanation?.content}
                            onChange={(event, editor) => {
                                if (explanation?.id) {
                                    setExplanation({
                                        ...explanation,
                                        content: editor.getData(),
                                    })
                                }
                            }}
                            onBlur={() => doUpdateContent(explanation)}
                        />
                        <span
                            className={`card-header-label ${styles.card_header_label} mt-1`}
                        >
                            EXPLANATION
                        </span>
                    </div>
                    <div className="col-12 mt-4">
                        <CardEditor
                            name="note"
                            data={note?.content}
                            onChange={(event, editor) => {
                                if (note?.id) {
                                    setNote({
                                        ...note,
                                        content: editor.getData(),
                                    })
                                }
                            }}
                            onBlur={() => doUpdateContent(note)}
                        />
                        <span
                            className={`card-header-label ${styles.card_header_label} mt-1`}
                        >
                            NOTE
                        </span>
                    </div>
                </div>
            </div>
            {(loadingPicture || loadingAudio || card.picture || card.audio) && (
                <div className={`card-footer ${styles.card_footer} p-3`}>
                    <div className="row">
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
                            {!loadingPicture && card.picture && (
                                <div className="d-flex align-self-start align-items-center">
                                    <img
                                        src={card.picture}
                                        className={styles.image_upload}
                                        alt="user upload"
                                    />
                                    <button
                                        type="button"
                                        name="picture"
                                        className={`btn btn-danger ms-5 p-0 rounded-circle ${styles.btn_del}`}
                                        onClick={(event) =>
                                            handleDeleteFile(event)
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
                            {!loadingAudio && card.audio && (
                                <div className="d-flex align-self-start align-items-center">
                                    <audio controls src={card.audio}></audio>
                                    <button
                                        type="button"
                                        name="audio"
                                        className={`btn btn-danger ms-5 p-0 rounded-circle ${styles.btn_del}`}
                                        onClick={(event) =>
                                            handleDeleteFile(event)
                                        }
                                    >
                                        <DeleteIcon size="1.25rem" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

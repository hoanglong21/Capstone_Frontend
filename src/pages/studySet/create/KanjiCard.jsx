import { useEffect, useState } from 'react'

import { uploadFile, deleteFileByUrl } from '../../../features/fileManagement'
import ContentService from '../../../services/ContentService'
import CardService from '../../../services/CardService'

import { DeleteIcon, ImageIcon, MicIcon } from '../../../components/icons'
import CardEditor from '../../../components/textEditor/CardEditor'
import styles from '../../../assets/styles/Card.module.css'

export const KanjiCard = (props) => {
    const [card, setCard] = useState(props.card)
    const [character, setCharacter] = useState({})
    const [name, setName] = useState({})
    const [strokes, setStrokes] = useState({})
    const [jlptLevel, setJlptLevel] = useState({})
    const [radical, setRadical] = useState({})
    const [onyomi, setOnyomi] = useState({})
    const [kunyomi, setKunyomi] = useState({})
    const [meanings, setMeanings] = useState({})
    const [strokeOrder, setStrokeOrder] = useState({})
    const [example, setExample] = useState({})

    const [loadingPicture, setLoadingPicture] = useState(false)
    const [loadingAudio, setLoadingAudio] = useState(false)
    const [loadingStrokeOrder, setLoadingStrokeOrder] = useState(false)

    //fetch data
    useEffect(() => {
        const fetchData = async () => {
            props.setLoading(true)
            try {
                const contents = (await ContentService.getAllByCardId(card.id))
                    .data
                if (contents.length === 0) {
                    setCharacter(
                        (
                            await ContentService.createContent({
                                card: {
                                    id: card.id,
                                },
                                field: {
                                    id: 4,
                                },
                                content: '',
                            })
                        ).data
                    )
                    setName(
                        (
                            await ContentService.createContent({
                                card: {
                                    id: card.id,
                                },
                                field: {
                                    id: 5,
                                },
                                content: '',
                            })
                        ).data
                    )
                    setStrokes(
                        (
                            await ContentService.createContent({
                                card: {
                                    id: card.id,
                                },
                                field: {
                                    id: 6,
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
                                    id: 7,
                                },
                                content: 'Unknown',
                            })
                        ).data
                    )
                    setRadical(
                        (
                            await ContentService.createContent({
                                card: {
                                    id: card.id,
                                },
                                field: {
                                    id: 8,
                                },
                                content: '',
                            })
                        ).data
                    )
                    setOnyomi(
                        (
                            await ContentService.createContent({
                                card: {
                                    id: card.id,
                                },
                                field: {
                                    id: 9,
                                },
                                content: '',
                            })
                        ).data
                    )
                    setKunyomi(
                        (
                            await ContentService.createContent({
                                card: {
                                    id: card.id,
                                },
                                field: {
                                    id: 10,
                                },
                                content: '',
                            })
                        ).data
                    )
                    setMeanings(
                        (
                            await ContentService.createContent({
                                card: {
                                    id: card.id,
                                },
                                field: {
                                    id: 11,
                                },
                                content: '',
                            })
                        ).data
                    )
                    setStrokeOrder(
                        (
                            await ContentService.createContent({
                                card: {
                                    id: card.id,
                                },
                                field: {
                                    id: 12,
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
                                    id: 13,
                                },
                                content: '',
                            })
                        ).data
                    )
                } else {
                    setCharacter(contents[0])
                    setName(contents[1])
                    setStrokes(contents[2])
                    setJlptLevel(contents[3])
                    setRadical(contents[4])
                    setOnyomi(contents[5])
                    setKunyomi(contents[6])
                    setMeanings(contents[7])
                    setStrokeOrder(contents[8])
                    setExample(contents[9])
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
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
        // set loading
        if (name === 'picture') {
            setLoadingPicture(true)
        }
        if (name === 'audio') {
            setLoadingAudio(true)
        }
        if (name === 'strokeOrder') {
            setLoadingStrokeOrder(true)
        }
        const file = event.target.files[0]
        if (file) {
            const urlOld = String(card[name])
            const url = await uploadFile(
                file,
                `${card.studySet.user.username}/studySet/${card.studySet.id}/card/${card.id}`
            )
            if (name === 'strokeOrder') {
                // update stroke order
                const tempStrokeOrder = { ...strokeOrder, content: url }
                setStrokeOrder(tempStrokeOrder)
                doUpdateContent(tempStrokeOrder)
            } else {
                // update card
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
        }
        // set loading
        if (name === 'picture') {
            setLoadingPicture(false)
        }
        if (name === 'audio') {
            setLoadingAudio(false)
        }
        if (name === 'strokeOrder') {
            setLoadingStrokeOrder(false)
        }
        props.setSaving(false)
    }

    const handleDeleteFile = async (event) => {
        props.setSaving(true)
        const name = event.target.name
        // set loading
        if (name === 'picture') {
            setLoadingPicture(true)
        }
        if (name === 'audio') {
            setLoadingAudio(true)
        }
        if (name === 'strokeOrder') {
            setLoadingStrokeOrder(true)
        }
        const urlOld = card[name]
        if (name === 'strokeOrder') {
            // update stroke order
            const tempStrokeOrder = { ...strokeOrder, content: '' }
            setStrokeOrder(tempStrokeOrder)
            doUpdateContent(tempStrokeOrder)
        } else {
            // update card
            const tempCard = { ...card, [name]: '' }
            setCard(tempCard)
            doUpdateCard(tempCard)
        }
        // delete url
        if (urlOld) {
            await deleteFileByUrl(
                urlOld,
                `${card.studySet.user.username}/studySet/${card.studySet.id}/card/${card.id}`
            )
        }
        // set loading
        if (name === 'picture') {
            setLoadingPicture(false)
        }
        if (name === 'audio') {
            setLoadingAudio(false)
        }
        if (name === 'strokeOrder') {
            setLoadingStrokeOrder(false)
        }
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
                    <div className="col-12 col-lg-7 pe-lg-4 d-flex flex-column justify-content-end">
                        <CardEditor
                            name="character"
                            data={character?.content}
                            onChange={(event, editor) => {
                                if (character?.id) {
                                    setCharacter({
                                        ...character,
                                        content: editor.getData(),
                                    })
                                }
                            }}
                            onBlur={() => doUpdateContent(character)}
                        />
                        <span
                            className={`card-header-label ${styles.card_header_label} mt-1`}
                        >
                            CHARACTER
                        </span>
                    </div>
                    <div className="col-12 col-lg-5 ps-lg-4 d-flex flex-column justify-content-end">
                        <CardEditor
                            name="radical"
                            data={radical?.content}
                            onChange={(event, editor) => {
                                if (radical?.id) {
                                    setRadical({
                                        ...radical,
                                        content: editor.getData(),
                                    })
                                }
                            }}
                            onBlur={() => doUpdateContent(radical)}
                        />
                        <span
                            className={`card-header-label ${styles.card_header_label} mt-1`}
                        >
                            RADICAL
                        </span>
                    </div>
                    <div className="col-12 col-lg-9 mt-4 pe-lg-4">
                        <CardEditor
                            name="name"
                            data={name?.content}
                            onChange={(event, editor) => {
                                if (name?.id) {
                                    setName({
                                        ...name,
                                        content: editor.getData(),
                                    })
                                }
                            }}
                            onBlur={() => doUpdateContent(name)}
                        />
                        <span
                            className={`card-header-label ${styles.card_header_label} mt-1`}
                        >
                            NAME
                        </span>
                    </div>
                    <div className="col-12 col-lg-3 mt-4 ps-lg-4 d-flex flex-column justify-content-end">
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
                    <div className="col-12 col-xl-6 mt-4 pe-xl-4 d-flex flex-column justify-content-end">
                        <CardEditor
                            name="onyomi"
                            data={onyomi?.content}
                            onChange={(event, editor) => {
                                if (onyomi?.id) {
                                    setOnyomi({
                                        ...onyomi,
                                        content: editor.getData(),
                                    })
                                }
                            }}
                            onBlur={() => doUpdateContent(onyomi)}
                        />
                        <span
                            className={`card-header-label ${styles.card_header_label} mt-1`}
                        >
                            ONYOMI
                        </span>
                    </div>
                    <div className="col-12 col-xl-6 mt-4 ps-xl-4 d-flex flex-column justify-content-end">
                        <CardEditor
                            name="kunyomi"
                            data={kunyomi?.content}
                            onChange={(event, editor) => {
                                if (kunyomi?.id) {
                                    setKunyomi({
                                        ...kunyomi,
                                        content: editor.getData(),
                                    })
                                }
                            }}
                            onBlur={() => doUpdateContent(kunyomi)}
                        />
                        <span
                            className={`card-header-label ${styles.card_header_label} mt-1`}
                        >
                            KUNYOMI
                        </span>
                    </div>
                    <div className="col-12 mt-4">
                        <CardEditor
                            name="meanings"
                            data={meanings?.content}
                            onChange={(event, editor) => {
                                if (meanings?.id) {
                                    setMeanings({
                                        ...meanings,
                                        content: editor.getData(),
                                    })
                                }
                            }}
                            onBlur={() => doUpdateContent(meanings)}
                        />
                        <span
                            className={`card-header-label ${styles.card_header_label} mt-1`}
                        >
                            MEANINGS
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
                    <div className="col-12 col-xl-2 mt-4 d-flex flex-column justify-content-end">
                        <input
                            name="strokes"
                            type="number"
                            min={0}
                            value={strokes?.content || '0'}
                            className={`form-control ${styles.card_control}`}
                            onChange={(event) => {
                                if (strokes?.id) {
                                    setStrokes({
                                        ...strokes,
                                        content: event.target.value.replace(
                                            /^0+/,
                                            ''
                                        ),
                                    })
                                }
                            }}
                            onBlur={() => doUpdateContent(strokes)}
                        />
                        <span
                            className={`card-header-label ${styles.card_header_label} mt-1`}
                        >
                            STROKES
                        </span>
                    </div>
                    <div className="col-12 col-xl-10 mt-4 d-flex flex-column justify-content-end">
                        {strokeOrder?.content ? (
                            <div className={styles.card_strokeImageWrapper}>
                                <div className={styles.card_strokeImage}>
                                    <img
                                        className="h-100"
                                        src={strokeOrder?.content}
                                        alt="stroke order"
                                    />
                                </div>
                                <button
                                    type="button"
                                    name="strokeOrder"
                                    className={`btn btn-danger p-1 rounded-circle ${styles.card_delImage}`}
                                    onClick={(event) => handleDeleteFile(event)}
                                >
                                    <DeleteIcon size="1rem" />
                                </button>
                            </div>
                        ) : (
                            <label
                                htmlFor="uploadStrokeOrder"
                                className={`d-flex justify-content-center align-items-center ${styles.card_uploadImage}`}
                            >
                                <input
                                    type="file"
                                    id="uploadStrokeOrder"
                                    name="strokeOrder"
                                    className={styles.file_upload}
                                    accept="image/*"
                                    onClick={(event) => {
                                        event.target.value = null
                                    }}
                                    onChange={(event) =>
                                        handleChangeFile(event)
                                    }
                                />
                                {loadingStrokeOrder ? (
                                    <div
                                        className="spinner-border text-secondary"
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            LoadingUpload...
                                        </span>
                                    </div>
                                ) : (
                                    <ImageIcon className="icon-warning" />
                                )}
                            </label>
                        )}

                        <span
                            className={`card-header-label ${styles.card_header_label} mt-1`}
                        >
                            STROKE ORDER
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

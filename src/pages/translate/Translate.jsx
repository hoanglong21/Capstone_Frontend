import { useState } from 'react'
import { useEffect } from 'react'

import TranslateService from '../../services/TranslateService'
import DetectionService from '../../services/DetectionService'

import SpeechToText from '../../components/InputModel/SpeechToText'
import Draw from '../../components/InputModel/draw/Draw'
import {
    CloseIcon,
    CopyIcon,
    ExchangeIcon,
    TranslateIcon,
} from '../../components/icons'
import './Translate.css'
import TextToSpeech from '../../components/InputModel/TextToSpeech'

function Translate() {
    const [origText, setOrigText] = useState('')
    const [origLang, setOrigLang] = useState('ja')
    const [transText, setTransText] = useState('')
    const [transLang, setTransLang] = useState('vi')
    const [loadingTrans, setLoadingTrans] = useState(false)

    const [isTriggerTrans, setIsTriggerTrans] = useState(false)

    const [grammarCheck, setGrammarCheck] = useState('')
    const [loadingCheck, setLoadingCheck] = useState(false)

    const [analysis, setAnalysis] = useState([])
    const [loadingAnalysis, setLoadingAnalysis] = useState(false)

    const [openAI, setOpenAI] = useState('')
    const [loadingOpenAI, setLoadingOpenAI] = useState(false)

    const [isClearVoice, setIsClearVoice] = useState(false)

    const [error, setError] = useState('')

    useEffect(() => {
        if (origText.length > 5000) {
            setError('Your data exceeds the allowed length.')
        } else {
            setError('')
        }
    }, [origText])

    const translate = async () => {
        setGrammarCheck('')
        setAnalysis([])
        setOpenAI('')
        setLoadingOpenAI('')
        if (origText.length > 0 && origText.length <= 5000) {
            // translate
            setLoadingTrans(true)
            setLoadingCheck(true)
            setLoadingAnalysis(true)
            let resTrans = ''
            try {
                resTrans = (
                    await TranslateService.translateClients5(
                        origText,
                        transLang
                    )
                ).data
            } catch (error) {
                console.log(error)
            }
            if (!resTrans) {
                try {
                    resTrans = (
                        await TranslateService.translateGoogleapis(
                            origText,
                            transLang
                        )
                    ).data
                } catch (error) {
                    setLoadingTrans(false)
                    if (error.response && error.response.data) {
                        setError(error.response.data)
                    } else {
                        setError(error.message)
                    }
                    return
                }
            }
            setTransText(resTrans)
            setLoadingTrans(false)
            // grammar check
            if (origLang === 'ja') {
                try {
                    const resGrammarCheck = (
                        await DetectionService.grammarCheck(origText)
                    ).data
                    setGrammarCheck(resGrammarCheck)
                } catch (error) {
                    setLoadingAnalysis(false)
                    if (error.response && error.response.data) {
                        setGrammarCheck(error.response.data)
                    } else {
                        setGrammarCheck(error.message)
                    }
                    return
                }
            }
            setLoadingCheck(false)
            // analysis
            try {
                if (origLang === 'ja') {
                    const resOrigAnalysis = (
                        await DetectionService.detectVocabulary(origText)
                    ).data
                    setAnalysis(resOrigAnalysis)
                }
                if (transLang === 'ja') {
                    const resTransAnalysis = (
                        await DetectionService.detectVocabulary(resTrans)
                    ).data
                    setAnalysis(resTransAnalysis)
                }
            } catch (error) {
                setLoadingAnalysis(false)
                if (error.response && error.response.data) {
                    setAnalysis(error.response.data)
                } else {
                    setAnalysis(error.message)
                }
                return
            }
            setLoadingAnalysis(false)
        }
    }

    useEffect(() => {
        if (isTriggerTrans) {
            translate()
            setIsTriggerTrans(false)
        }
    }, [isTriggerTrans])

    const autoGrow = (event) => {
        event.target.style.height = '5px'
        event.target.style.height = event.target.scrollHeight + 'px'
    }

    const switchLanguage = () => {
        setOrigLang(transLang)
        setTransLang(origLang)
        setOrigText(transText)
        setTransText('')
        setIsTriggerTrans(true)
    }

    const handleClear = () => {
        setOrigText('')
        setTransText('')
        setGrammarCheck('')
        setAnalysis([])
        setOpenAI('')
        setIsClearVoice(true)
    }

    const handleVoice = (text) => {
        setOrigText(text)
        setIsTriggerTrans(true)
    }

    const handleDraw = (text) => {
        setOrigText(origText + text)
    }

    const handleOpenAI = async () => {
        setLoadingOpenAI(true)
        try {
            if (origLang === 'ja') {
                const resOrigOpenAI = (
                    await DetectionService.detectGrammar(origText, 'english')
                ).data
                setOpenAI(resOrigOpenAI)
            }
            if (transLang === 'ja') {
                const resTransOpenAI = (
                    await DetectionService.detectGrammar(transText, 'english')
                ).data
                setOpenAI(resTransOpenAI)
            }
        } catch (error) {
            setLoadingOpenAI(false)
            if (error.response && error.response.data) {
                setOpenAI(error.response.data)
            } else {
                setOpenAI(error.message)
            }
            return
        }
        setLoadingOpenAI(false)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(transText)
    }

    return (
        <div className="translateContainer mx-auto mt-4 mb-5">
            {/* error message */}
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            {/* Translate */}
            <div className="card">
                <div className="card-header d-flex justify-content-center">
                    <div className="flex-fill d-flex justify-content-center">
                        <select
                            id="targetLang"
                            name="targetLang"
                            className="form-select selectLang"
                            value={origLang}
                            onChange={(event) => {
                                const temp = event.target.value
                                setOrigLang(temp)
                                if (temp === transLang) {
                                    setTransLang(origLang)
                                }
                            }}
                        >
                            <option value="ja">Japan</option>
                            <option value="vi">Vietnamese</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                    <button
                        className="btn mx-3"
                        onClick={() => {
                            switchLanguage()
                        }}
                    >
                        <ExchangeIcon size="1.375rem" />
                    </button>
                    <div className="flex-fill d-flex justify-content-center">
                        <select
                            id="targetLang"
                            name="targetLang"
                            className="form-select selectLang"
                            value={transLang}
                            onChange={(event) => {
                                const temp = event.target.value
                                setTransLang(temp)
                                if (temp === origLang) {
                                    setOrigLang(transLang)
                                }
                            }}
                        >
                            <option value="ja">Japan</option>
                            <option value="vi">Vietnamese</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col d-flex">
                            <textarea
                                className="form-control translateInput py-2 ps-3 pe-1"
                                id="floatingTextarea"
                                value={origText}
                                onInput={autoGrow}
                                onChange={(event) => {
                                    setOrigText(event.target.value)
                                }}
                            ></textarea>
                            {origText && (
                                <button
                                    className="btn transClearButton p-0 mt-2 align-self-start"
                                    onClick={handleClear}
                                >
                                    <CloseIcon />
                                </button>
                            )}
                        </div>
                        <div className="col">
                            <textarea
                                className="form-control translateInput"
                                id="floatingTextarea"
                                value={transText}
                                onInput={autoGrow}
                                disabled
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="col d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                                <SpeechToText
                                    language={origLang}
                                    handleSpeechToText={handleVoice}
                                    refresh={isClearVoice}
                                    stateChanger={setIsClearVoice}
                                />
                                <Draw
                                    className="ms-1"
                                    handleHandWriting={handleDraw}
                                    disabled={origLang !== 'ja'}
                                />
                                {origText.length > 0 && (
                                    <TextToSpeech
                                        className="ms-1"
                                        text={origText}
                                        language={origLang}
                                        disabled={origLang === 'vi'}
                                    />
                                )}
                            </div>
                            <div className="d-flex align-items-center">
                                <div>{origText.length} / 5000</div>
                                <button
                                    id="translateButton"
                                    className="btn btn-primary btn-sm ms-2 d-flex align-items-center justify-content-center"
                                    style={{
                                        minWidth: '7rem',
                                        minHeight: '2.3rem',
                                    }}
                                    onClick={translate}
                                    disabled={loadingTrans}
                                >
                                    {loadingTrans ? (
                                        <div>
                                            <span
                                                className="spinner-border spinner-border-sm"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                            <span className="visually-hidden">
                                                Loading...
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="d-flex align-items-center">
                                            <TranslateIcon
                                                size="1.1rem"
                                                strokeWidth="1.75"
                                            />
                                            <span className="ms-1">
                                                Translate
                                            </span>
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="col">
                            {transText.length > 0 && (
                                <div className="d-flex align-items-center">
                                    <TextToSpeech
                                        className="ms-1"
                                        text={transText}
                                        language={transLang}
                                        disabled={transLang === 'vi'}
                                    />
                                    <button
                                        className="btn btn-customLight p-2 rounded-circle"
                                        onClick={handleCopy}
                                    >
                                        <CopyIcon />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="accordion mt-4" id="accordion">
                {/* Grammar check */}
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#grammarCheck"
                            aria-expanded="false"
                            aria-controls="grammarCheck"
                        >
                            Grammar Check
                        </button>
                    </h2>
                    <div
                        id="grammarCheck"
                        className="accordion-collapse collapse"
                    >
                        <div className="accordion-body">
                            {loadingCheck ? (
                                <div className="text-center">
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
                                grammarCheck
                            )}
                        </div>
                    </div>
                </div>
                {/* Analysis */}
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#analysis"
                            aria-expanded="false"
                            aria-controls="analysis"
                        >
                            Analysis
                        </button>
                    </h2>
                    <div id="analysis" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            {loadingAnalysis ? (
                                <div className="text-center">
                                    <div
                                        className="spinner-border"
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                </div>
                            ) : Array.isArray(analysis) ? (
                                analysis.length === 0 ? (
                                    ''
                                ) : (
                                    <table className="table table-responsive table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Word</th>
                                                <th scope="col">
                                                    Part of speech
                                                </th>
                                                <th scope="col">
                                                    Dictionary form
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {analysis.map((word, index) => (
                                                <tr key={index}>
                                                    <th scope="row">
                                                        {index + 1}
                                                    </th>
                                                    <td>{word.word}</td>
                                                    <td>{word.partOfSpeech}</td>
                                                    <td>
                                                        {word.dictionaryForm}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )
                            ) : (
                                analysis
                            )}
                        </div>
                    </div>
                </div>
                {/* OpenAI */}
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#openAI"
                            aria-expanded="false"
                            aria-controls="openAI"
                        >
                            OpenAI Integration
                        </button>
                    </h2>
                    <div
                        id="openAI"
                        className="accordion-collapse collapse"
                        style={{ whiteSpace: 'pre-wrap' }}
                    >
                        <div className="accordion-body">
                            {!openAI ? (
                                <button
                                    className="btn btn-primary"
                                    onClick={handleOpenAI}
                                    style={{
                                        minWidth: '8.4rem',
                                        minHeight: '2.5rem',
                                    }}
                                    disabled={!origText || loadingOpenAI}
                                >
                                    {loadingOpenAI ? (
                                        <div>
                                            <span
                                                className="spinner-border spinner-border-sm"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                            <span className="visually-hidden">
                                                Loading...
                                            </span>
                                        </div>
                                    ) : (
                                        'Run detection'
                                    )}
                                </button>
                            ) : (
                                openAI
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Translate

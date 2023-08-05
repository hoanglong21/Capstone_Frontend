import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import DictionaryService from '../../services/DictionaryService'
import TextToSpeech from '../../components/InputModel/TextToSpeech'

const VocabDict = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const search = searchParams.get('search')

    const [vocabs, setVocabs] = useState([])
    const [word, setWord] = useState({})
    const [activeIndex, setActiveIndex] = useState(0)
    const [kanjiSvgs, setKanjiSvgs] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingSelect, setLoadingSelect] = useState(false)

    async function getKanjiSvg(vocab) {
        var tempKanjiSvgs = []
        try {
            for (var i = 0; i < vocab?.length; i++) {
                const svg = (
                    await DictionaryService.getKanjivg(vocab.charAt(i))
                ).data
                tempKanjiSvgs.push({
                    kanji: vocab.charAt(i),
                    svg: svg,
                })
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        return tempKanjiSvgs
    }

    const fetchData = async (searchKey) => {
        setLoading(true)
        try {
            const temp = (
                await DictionaryService.getVocabulary(
                    '=1',
                    '=10',
                    `${searchKey ? '=' + searchKey : ''}`,
                    ''
                )
            ).data.list
            setVocabs(temp)
            if (temp.length > 0) {
                setWord(temp[0])
                setKanjiSvgs(await getKanjiSvg(temp[0].kanji[0]))
            } else {
                setWord({})
                setKanjiSvgs([])
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoading(false)
    }

    function nodeScriptClone(idSelector, index) {
        const node = document.querySelectorAll(idSelector)[0]
        var script = document.createElement('script')
        script.text = node?.innerHTML
            .replaceAll('svg=', `svg${index}=`)
            .replaceAll('svg.', `svg${index}.`)
            .replaceAll('pause=', `pause${index}=`)
            .replaceAll('pause.', `pause${index}.`)
            .replaceAll('.pause()', `.pause${index}()`)
            .replaceAll('reset=', `reset${index}=`)
            .replaceAll('reset.', `reset${index}.`)
            .replaceAll('timer', `timer${index}`)
        var i = -1,
            attrs = node?.attributes,
            attr
        while (++i < attrs?.length) {
            script.setAttribute((attr = attrs[i]).name, attr.value)
        }
        return script
    }

    // fetch data
    useEffect(() => {
        fetchData(search ? search : '')
    }, [search])

    // kanji svg button
    useEffect(() => {
        if (kanjiSvgs.length > 0) {
            kanjiSvgs.forEach((kanjiSvgs, index) => {
                const idSelector = `#svgKanji${index} svg script`
                var script = nodeScriptClone(idSelector, index)
                if (document.querySelectorAll(idSelector)) {
                    document.body.appendChild(script)
                }
            })
        }
        return () => {
            const scripts = document.querySelectorAll('body > script')
            for (const script of scripts) {
                document.body.removeChild(script)
            }
        }
    }, [kanjiSvgs])

    function getDisplay(words) {
        if (words) {
            var res = ''
            words.forEach((element) => {
                res += element + ', '
            })
            return res.substring(0, res.length - 2)
        }
        return ''
    }

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <div
                    className="spinner-border mt-5"
                    style={{ width: '3rem', height: '3rem' }}
                    role="status"
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    } else {
        return (
            <div className="mt-4 mb-5">
                {word?.kanji ? (
                    <div className="row">
                        <div className="col-2 ">
                            <div className="dictResultWordList">
                                {vocabs.map((vocab, index) => (
                                    <div
                                        className={`dictResultWord ${
                                            activeIndex === index
                                                ? 'active'
                                                : ''
                                        }`}
                                        key={index}
                                        onClick={async () => {
                                            setLoadingSelect(true)
                                            setWord(vocab)
                                            setActiveIndex(index)
                                            setKanjiSvgs(
                                                await getKanjiSvg(
                                                    vocab.kanji[0]
                                                )
                                            )
                                            setLoadingSelect(false)
                                        }}
                                    >
                                        <div className="word">
                                            <b>{vocab.kanji[0]}</b> [
                                            {getDisplay(vocab.reading)}]
                                        </div>
                                        <i className="wordSense">
                                            {getDisplay(
                                                vocab.sense[0].definition
                                            )}
                                        </i>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-7">
                            {loadingSelect ? (
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
                                <div className="word-detail h-100">
                                    <div className="word-detail-overview d-flex flex-column align-items-center">
                                        <span className="txtKanji">
                                            {word?.kanji[0]}
                                        </span>
                                        <div className="d-flex">
                                            <span className="txtFurigana">
                                                {getDisplay(word?.reading)}
                                            </span>
                                            <span className="sound">
                                                <TextToSpeech
                                                    className="ms-1"
                                                    text={word?.kanji[0]}
                                                    language="ja"
                                                    size="1.25rem"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="word-detail-info">
                                        {word?.sense?.map((item, index) => (
                                            <div key={index}>
                                                <div className="word-type">
                                                    {getDisplay(item.type)}
                                                </div>
                                                <div className="word-meaning">
                                                    -{' '}
                                                    {getDisplay(
                                                        item.definition
                                                    )}
                                                </div>
                                                <ul className="word-examples">
                                                    {item.example.map(
                                                        (
                                                            exampleItem,
                                                            index
                                                        ) => (
                                                            <div key={index}>
                                                                <div className="wordExampleJa">
                                                                    {
                                                                        exampleItem.exampleSentenceJapanese
                                                                    }
                                                                </div>
                                                                <div className="wordExampleVi">
                                                                    {
                                                                        exampleItem.exampleSentenceVietnamese
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        {!loadingSelect && (
                            <div className="col-3">
                                <div
                                    className="accordion accordion-flush"
                                    id="accordionKanjiSvg"
                                >
                                    {kanjiSvgs?.map((kanjiSvg, index) => (
                                        <div
                                            className="accordion-item"
                                            key={index}
                                        >
                                            <h2 className="accordion-header">
                                                <button
                                                    className="accordion-button collapsed"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#svgKanji${index}`}
                                                    aria-expanded="false"
                                                    aria-controls={`svgKanji${index}`}
                                                >
                                                    {kanjiSvg?.kanji}
                                                </button>
                                            </h2>
                                            <div
                                                id={`svgKanji${index}`}
                                                className="accordion-collapse collapse"
                                            >
                                                <div
                                                    className="svgKanji accordion-body d-flex justify-content-center"
                                                    dangerouslySetInnerHTML={{
                                                        __html: kanjiSvg?.svg,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <p>No words matching {search} found</p>
                )}
            </div>
        )
    }
}
export default VocabDict

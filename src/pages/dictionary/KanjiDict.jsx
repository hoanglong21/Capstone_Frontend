import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import DictionaryService from '../../services/DictionaryService'

const KanjiDict = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const search = searchParams.get('search')

    const [kanjis, setKanjis] = useState([])
    const [word, setWord] = useState({})
    const [activeIndex, setActiveIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [loadingSelect, setLoadingSelect] = useState(false)

    const fetchData = async (searchKey) => {
        setLoading(true)
        var tempKanjis = []
        if (searchKey.length > 1) {
            for (var i = 0; i < searchKey.length; i++) {
                var char = searchKey.charAt(i)
                const temp = (
                    await DictionaryService.getKanji('=1', '=10', `=${char}`)
                ).data.list
                tempKanjis.push(...temp)
            }
        } else {
            tempKanjis = (
                await DictionaryService.getKanji(
                    '=1',
                    '=10',
                    `${searchKey ? '=' + searchKey : ''}`
                )
            ).data.list
        }
        setKanjis(tempKanjis)
        setWord(tempKanjis[0])
        setActiveIndex(0)
        setLoading(false)
    }

    function nodeScriptClone() {
        const node = document.querySelectorAll('.kanji_svg svg script')[0]
        var script = document.createElement('script')
        script.text = node?.innerHTML
            .replaceAll('svg=', `svg0=`)
            .replaceAll('svg.', `svg0.`)
            .replaceAll('pause=', `pause0=`)
            .replaceAll('pause.', `pause0.`)
            .replaceAll('.pause()', `.pause0()`)
            .replaceAll('reset=', `reset0=`)
            .replaceAll('reset.', `reset0.`)
            .replaceAll('timer', `timer0`)
        var i = -1,
            attrs = node?.attributes,
            attr
        while (++i < attrs?.length) {
            script.setAttribute((attr = attrs[i]).name, attr.value)
        }
        return script
    }

    const clearSetTimeout = () => {
        var id = window.setTimeout(function () {}, 0)
        while (id--) {
            window.clearTimeout(id) // will do nothing if no timeout with id is present
        }
    }

    // fetch data
    useEffect(() => {
        clearSetTimeout()
        fetchData(search ? search : '')
    }, [search])

    // kanji svg button
    useEffect(() => {
        var script = nodeScriptClone()
        if (document.querySelectorAll('.kanji_svg svg script')) {
            document.body.appendChild(script)
        }
        return () => {
            document.body.removeChild(script)
        }
    }, [document.querySelectorAll('.kanji_svg svg script')])

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
                {word?.character ? (
                    <div className="row">
                        <div className="col-2">
                            <div className="dictResultWordList">
                                {kanjis.map((kanji, index) => (
                                    <div
                                        className={`dictResultWord ${
                                            activeIndex === index
                                                ? 'active'
                                                : ''
                                        }`}
                                        key={index}
                                        onClick={() => {
                                            setLoadingSelect(true)
                                            setWord(kanji)
                                            setActiveIndex(index)
                                            clearSetTimeout()
                                            setLoadingSelect(false)
                                        }}
                                    >
                                        <div className="word">
                                            <b className="me-2">
                                                {kanji?.character}
                                            </b>
                                            {getDisplay(kanji.readingVietnam)}
                                        </div>
                                        <i className="wordSense">
                                            {getDisplay(kanji?.meanings)}
                                        </i>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-10">
                            {loadingSelect ? (
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="word-detail h-100">
                                    <div className="kanji-search-header">
                                        {word?.character} -{' '}
                                        {getDisplay(word?.readingVietnam)}
                                    </div>
                                    <div className="kanji-search-main">
                                        <div className="row">
                                            <div className="col-3">
                                                <div className="kanji_svg">
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: word?.svgFile,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <div className="col-9">
                                                <div>
                                                    <div className="kanji-search-block ed">
                                                        <label>Meaning:</label>
                                                        <p>
                                                            {getDisplay(
                                                                word?.meanings
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="kanji-search-block ed">
                                                        <label>
                                                            Kanji radicals:
                                                        </label>
                                                        <p>
                                                            {getDisplay(
                                                                word?.radicals
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="kanji-search-block ed">
                                                        <label>Onyomi:</label>
                                                        {word?.readingJapaneseOn?.map(
                                                            (onyomi, index) => (
                                                                <p
                                                                    className="ony"
                                                                    key={index}
                                                                >
                                                                    {onyomi}
                                                                </p>
                                                            )
                                                        )}
                                                    </div>
                                                    <div className="kanji-search-block ed">
                                                        <label>Kunyomi:</label>
                                                        {word?.readingJapaneseKun?.map(
                                                            (
                                                                kunyomi,
                                                                index
                                                            ) => (
                                                                <p
                                                                    className="kuny"
                                                                    key={index}
                                                                >
                                                                    {kunyomi}
                                                                </p>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="kanji-search-block ed">
                                                        <label>
                                                            JLPT level:
                                                        </label>
                                                        <p className="kanji-search-bold">
                                                            {word?.jlptLevel
                                                                ? `N${word.jlptLevel}`
                                                                : ''}
                                                        </p>
                                                    </div>
                                                    <div className="kanji-search-block ed">
                                                        <label>
                                                            Stroke count:
                                                        </label>
                                                        <p className="kanji-search-bold">
                                                            {word?.strokeCount}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <p>No kanji matching {search} found</p>
                )}
            </div>
        )
    }
}
export default KanjiDict

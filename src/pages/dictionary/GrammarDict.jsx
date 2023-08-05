import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import DictionaryService from '../../services/DictionaryService'
import GrammarDetail from './GrammarDetail'

const GrammarDict = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const search = searchParams.get('search')

    const [grammars, setGrammars] = useState([])
    const [grammar, setGrammar] = useState({})
    const [loading, setLoading] = useState(true)

    const fetchData = async (searchKey) => {
        setLoading(true)
        const temp = (
            await DictionaryService.getGrammar(
                '=1',
                '=40',
                `${searchKey ? '=' + searchKey : ''}`
            )
        ).data.list
        setGrammars(temp)
        setLoading(false)
    }

    useEffect(() => {
        fetchData(search ? search : '')
    }, [search])

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
            <div>
                <div className="row mt-4 mb-5">
                    {grammars.length == 0 && (
                        <p>No grammars matching {search} found</p>
                    )}
                    {grammars.map((grammarInfo) => (
                        <div className="col-3 mb-2">
                            <div
                                className="card h-100 grammar_item"
                                onClick={() => {
                                    document
                                        .getElementById('grammarDetailOpenBtn')
                                        .click()
                                    setGrammar(grammarInfo)
                                }}
                            >
                                <div className="card-body">
                                    <div className="grammar_title">
                                        {grammarInfo.title}
                                    </div>
                                    <div className="grammar_meaning">
                                        {grammarInfo.explanation}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Grammar modal */}
                <button
                    type="button"
                    className="btn btn-primary d-none"
                    id="grammarDetailOpenBtn"
                    data-bs-toggle="modal"
                    data-bs-target="#grammarDetailModal"
                >
                    Launch demo modal
                </button>
                <GrammarDetail grammar={grammar} />
            </div>
        )
    }
}
export default GrammarDict

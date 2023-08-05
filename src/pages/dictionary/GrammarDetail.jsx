import { useSearchParams } from 'react-router-dom'

import { CautionSolidIcon } from '../../components/icons'

const GrammarDetail = ({ grammar }) => {
    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <div
            className="modal fade"
            id="grammarDetailModal"
            tabindex="-1"
            aria-labelledby="grammarDetailLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-fullscreen">
                <div className="modal-content">
                    <div className="grammarDetail_header p-3 d-flex align-items-center justify-content-center w-100">
                        <div className="d-flex flex-column align-items-center">
                            <h1
                                className="modal-title fs-5"
                                id="grammarDetailModalLabel"
                            >
                                {grammar.title}
                            </h1>
                            <h2 className="grammarDetail_meaning">
                                {grammar.explanation}
                            </h2>
                            <div className="d-flex align-items-center grammarDetail_attention">
                                <CautionSolidIcon />
                                <p className="m-0 ms-2">{grammar.attention}</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="btn-close grammarDetailClose_button"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            id="grammarDetailCloseBtn"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="card grammarDetail_block py-3 px-4">
                                <div className="card-body">
                                    <h3 className="grammarDetail_subtitle">
                                        Structure
                                    </h3>
                                    <div className="grammar_structure">
                                        {grammar.structure}
                                    </div>
                                </div>
                            </div>
                            <div className="card grammarDetail_block py-3 px-4">
                                <div className="card-body">
                                    <h3 className="grammarDetail_subtitle">
                                        About {grammar.title}
                                    </h3>
                                    <div className="grammar_structure">
                                        {grammar.about}
                                    </div>
                                </div>
                            </div>
                            <div className="card grammarDetail_block py-3 px-4">
                                <div className="card-body">
                                    <h3 className="grammarDetail_subtitle">
                                        Synonyms
                                    </h3>
                                    <div className="row">
                                        {grammar?.synonyms?.map((synonym) => (
                                            <div className="col-4 mb-2">
                                                <div
                                                    className="synonymItem"
                                                    onClick={() => {
                                                        setSearchParams({
                                                            search: synonym.text,
                                                        })
                                                        document
                                                            .getElementById(
                                                                'grammarDetailCloseBtn'
                                                            )
                                                            .click()
                                                    }}
                                                >
                                                    <div className="synonym_text">
                                                        {synonym.text}
                                                    </div>
                                                    <div className="synonym_explanation">
                                                        {synonym.explanation}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="card grammarDetail_block py-3 px-4">
                                <div className="card-body">
                                    <h3 className="grammarDetail_subtitle">
                                        Antonyms
                                    </h3>
                                    <div className="row">
                                        {grammar?.antonyms?.map((antonym) => (
                                            <div className="col-4 mb-2">
                                                <div
                                                    className="synonymItem"
                                                    onClick={() => {
                                                        setSearchParams({
                                                            search: antonym.text,
                                                        })
                                                        document
                                                            .getElementById(
                                                                'grammarDetailCloseBtn'
                                                            )
                                                            .click()
                                                    }}
                                                >
                                                    <div className="synonym_text">
                                                        {antonym.text}
                                                    </div>
                                                    <div className="synonym_explanation">
                                                        {antonym.explanation}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="card grammarDetail_block py-3 px-4">
                                <div className="card-body">
                                    <h3 className="grammarDetail_subtitle">
                                        Examples
                                    </h3>
                                    <div className="row">
                                        {grammar?.example?.map(
                                            (exampleItem) => (
                                                <div className="col-4 mb-2">
                                                    <div className="exampleItem h-100">
                                                        {exampleItem}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default GrammarDetail

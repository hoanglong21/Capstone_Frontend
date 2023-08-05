import './viewStudySet.css'

function ViewKanjiDetail() {
    return (
        <div>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#viewkanjiModal"
            >
                View Details
            </button>

            <div
                className="modal modal-dialog modal-xl fade"
                id="viewkanjiModal"
                tabindex="-1"
                aria-labelledby="viewkanjiModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h1
                                className="modal-title fs-4 text-center"
                                id="viewkanjiModalLabel"
                            >
                                姙-NHÂM
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body container">
                            <div className="row">
                                <div className="col-4 ms-5 mt-5">
                                    <div
                                        id="drawkanji"
                                        style={{
                                            width: '398px',
                                            height: '398px',
                                        }}
                                        data-text="姙"
                                    >
                                        <svg
                                            height="300px"
                                            version="1.1"
                                            width="300px"
                                            xmlns="http://www.w3.org/2000/svg"
                                            style={{
                                                overflow: 'hidden',
                                                position: 'relative',
                                                left: '-0.5px',
                                            }}
                                            viewBox="0 0 109 109"
                                            preserveAspectRatio="xMinYMin"
                                            class="dmak-svg"
                                        >
                                            <path
                                                fill="none"
                                                stroke="#cccccc"
                                                d="M54.5,0L54.5,109"
                                                stroke-width="0.5"
                                                stroke-dasharray="4,1.5"
                                            ></path>
                                            <path
                                                fill="none"
                                                stroke="#cccccc"
                                                d="M0,54.5L109,54.5"
                                                stroke-width="0.5"
                                                stroke-dasharray="4,1.5"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="col-6 ms-5 mt-5">
                                    <div
                                        className="kanji-search-block ed"
                                        style={{
                                            display: 'inline-block',
                                            width: '50%',
                                            boxSizing: 'border-box',
                                            marginRight: '0',
                                            height: '60px',
                                            float: 'left',
                                        }}
                                    >
                                        <label>Meaning:</label>
                                        <p>Cũng như chữ nhâm [妊].</p>
                                    </div>
                                    <div
                                        className="kanji-search-block ed"
                                        style={{
                                            display: 'inline-block',
                                            width: '50%',
                                            boxSizing: 'border-box',
                                            marginRight: '0',
                                            height: '60px',
                                            float: 'left',
                                        }}
                                    >
                                        <label>Explain:</label>
                                        <p>Cũng như chữ nhâm [妊].</p>
                                    </div>
                                    <div>
                                        <div
                                            className="kanji-search-block ed"
                                            style={{
                                                display: 'inline-block',
                                                width: '50%',
                                                boxSizing: 'border-box',
                                                marginRight: '0',
                                                height: '60px',
                                                float: 'left',
                                            }}
                                        >
                                            <label>Onyomi: </label>
                                            <p>ニン, ジン</p>
                                        </div>
                                        <div
                                            className="kanji-search-block ed"
                                            style={{
                                                display: 'inline-block',
                                                width: '50%',
                                                boxSizing: 'border-box',
                                                marginRight: '0',
                                                height: '60px',
                                                float: 'left',
                                            }}
                                        >
                                            <label>Kunyomi: </label>
                                            <p>はらむ, みごもる</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            className="kanji-search-block ed"
                                            style={{
                                                display: 'inline-block',
                                                width: '50%',
                                                boxSizing: 'border-box',
                                                marginRight: '0',
                                                height: '60px',
                                                float: 'left',
                                            }}
                                        >
                                            <label>Level:</label>
                                            <p>JLPT N1</p>
                                        </div>
                                        <div
                                            className="kanji-search-block ed"
                                            style={{
                                                display: 'inline-block',
                                                width: '50%',
                                                boxSizing: 'border-box',
                                                marginRight: '0',
                                                height: '60px',
                                                float: 'left',
                                            }}
                                        >
                                            <label>Number of strokes:</label>
                                            <p>9</p>
                                        </div>
                                    </div>
                                    <div className="kanji-search-detail">
                                        <div
                                            className="kanji-search-block ed"
                                            style={{
                                                display: 'inline-block',
                                                width: '50%',
                                                boxSizing: 'border-box',
                                                marginRight: '0',
                                                height: '60px',
                                                float: 'left',
                                            }}
                                        >
                                            <label>Components: </label>
                                            <ul className="kanji-search-ul japan-font">
                                                <li>
                                                    <span original-title="NHÂM">
                                                        姙
                                                    </span>
                                                </li>
                                                <li>
                                                    <span original-title="NỮ">
                                                        女
                                                    </span>
                                                    <span original-title="NHIỆM">
                                                        任
                                                    </span>
                                                </li>
                                                <li>
                                                    <span original-title="NỮ">
                                                        女
                                                    </span>
                                                    <span original-title="NHÂN ĐỨNG">
                                                        亻
                                                    </span>
                                                    <span original-title="NHÂM">
                                                        壬
                                                    </span>
                                                </li>
                                                <li>
                                                    <span original-title="NỮ">
                                                        女
                                                    </span>
                                                    <span original-title="NHÂN ĐỨNG">
                                                        亻
                                                    </span>
                                                    <span original-title="PHIỆT">
                                                        丿
                                                    </span>
                                                    <span original-title="SĨ">
                                                        士
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div
                                            className="kanji-search-block ed"
                                            style={{
                                                display: 'inline-block',
                                                width: '50%',
                                                boxSizing: 'border-box',
                                                marginRight: '0',
                                                height: '60px',
                                                float: 'left',
                                            }}
                                        >
                                            <label>Example:</label>
                                            <ul className="kanji-search-ul example">
                                                <li
                                                    rel="不姙"
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    <p>
                                                        <span>不姙</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
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

export default ViewKanjiDetail

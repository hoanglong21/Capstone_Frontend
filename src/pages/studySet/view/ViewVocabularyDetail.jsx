import './viewStudySet.css'

function ViewVocabularyDetail() {
    return (
        <div>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#viewVocabModal"
            >
                View Vocabulary
            </button>

            <div
                className="modal modal-dialog modal-lg fade"
                id="viewVocabModal"
                tabindex="-1"
                aria-labelledby="viewVocabModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-4"
                                id="viewVocabModalLabel"
                            >
                                友達
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div id="word-detail-overview">
                                <p>
                                    <span id="txtKanji" data-kanji="友達">
                                        <u class="furigana_text japan-font">
                                            友達
                                        </u>
                                    </span>
                                    <span class="romaji">/tomodachi/</span>
                                    <span class="kana japan-font">
                                        ともだち
                                    </span>
                                </p>
                                <div class="hkanji-wrapbtn text-center">
                                    <i class="bi bi-volume-up fs-3 text-primary"></i>
                                    <a
                                        href="/"
                                        class="sound"
                                        title="Phát âm"
                                        data-fn="https://storage.dekiru.vn/Data/2018/03/15/tomodachi-636567027625724981.mp3"
                                    >
                                        Phát âm
                                    </a>
                                </div>
                            </div>
                            <div id="word-detail-info">
                                <label className="word-type">Danh từ</label>
                                <ol className="ol-decimal">
                                    <li>
                                        <span className="nvmn-meaning">
                                            Bạn bè, người bạn, người bầu bạn
                                        </span>
                                        <ul className="ul-disc">
                                            <li>
                                                <u className="furigana_text japan-font">
                                                    外国人と友達になることは面白いです。
                                                </u>
                                                <p>
                                                    Việc trở thành bạn với người
                                                    nước ngoài thật thú vị.
                                                </p>
                                            </li>
                                            <li>
                                                <u className="furigana_text japan-font">
                                                    彼は世界中に友達がいる。
                                                </u>
                                                <p>
                                                    Anh ấy có bạn bè trên khắp
                                                    thế giới.
                                                </p>
                                            </li>
                                            <li>
                                                <u className="furigana_text japan-font">
                                                    悲しい時は友達が励ましてくれる。
                                                </u>
                                                <p>
                                                    Khi tôi buồn bạn bè đã an ủi
                                                    tôi.
                                                </p>
                                            </li>
                                        </ul>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewVocabularyDetail

import './viewStudySet.css'

function ViewGrammarDetail() {
    return (
        <div>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#viewGrammarModal"
            >
                View Grammar
            </button>

            <div
                className="modal modal-dialog modal-lg fade"
                id="viewGrammarModal"
                tabindex="-1"
                aria-labelledby="viewGrammarModal"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-4"
                                id="viewGrammarModal"
                            >
                                からこそ
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div
                                className="gmw-wrap"
                                style={{
                                    backgroundColor: '#2bb3ff',
                                    color: 'white',
                                    textAlign: 'center',
                                    fontSize: '19px',
                                    lineHeight: '15px',
                                    padding: '10px 0',
                                }}
                            >
                                <p className="gram">からこそ </p>
                                <p className="mean">Chính là, chính vì.</p>
                            </div>
                            <div className="gram-dec">
                                <p>Thể thường +&nbsp;からこそ</p>
                            </div>
                            <div className="gram-div">
                                Mục đích sử dụng: Đây là mẫu câu được dùng để
                                nhấn mạnh nguyên nhân, lý do
                            </div>
                            <p>Example: </p>
                            <ul className="gram-ul">
                                <li>
                                    <span className="japan-font grammar-ex-japan">
                                        <u className="furigana_text">
                                            手伝ってくれたからこそ、
                                            仕事が速く出来たよ。
                                        </u>
                                    </span>
                                    <p>
                                        Chính vì có anh giúp nên công việc mới
                                        hoàn thành nhanh được đó.
                                    </p>
                                </li>
                                <li>
                                    <span className="japan-font grammar-ex-japan">
                                        <u className="furigana_text">
                                            愛情があるからこそ、 叱るんです。
                                        </u>
                                    </span>
                                    <p>
                                        Chính vì thương (con) nên mới la mắng.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewGrammarDetail

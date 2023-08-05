import jQuery from 'jquery'
import '../assets/styles/chat.css'

function Chat() {
    const chatbox = jQuery.noConflict()

    chatbox(() => {
        chatbox('.chatbox-open').click(() =>
            chatbox('.chatbox-popup, .chatbox-close').fadeIn()
        )

        chatbox('.chatbox-close').click(() =>
            chatbox('.chatbox-popup, .chatbox-close').fadeOut()
        )

        chatbox('.chatbox-maximize').click(() => {
            chatbox('.chatbox-popup, .chatbox-open, .chatbox-close').fadeOut()
            chatbox('.chatbox-panel').fadeIn()
            chatbox('.chatbox-panel').css({ display: 'flex' })
        })

        chatbox('.chatbox-minimize').click(() => {
            chatbox('.chatbox-panel').fadeOut()
            chatbox('.chatbox-popup, .chatbox-open, .chatbox-close').fadeIn()
        })

        chatbox('.chatbox-panel-close').click(() => {
            chatbox('.chatbox-panel').fadeOut()
            chatbox('.chatbox-open').fadeIn()
        })
    })

    return (
        <div class="chatbox-wrapper">
            <button class="chatbox-open">
                <i class="bi bi-messenger fs-3" aria-hidden="true"></i>
            </button>
            <button class="chatbox-close">
                <i class="bi bi-x-lg fs-3" aria-hidden="true"></i>
            </button>
            <section class="chatbox-popup">
                <header class="chatbox-popup__header">
                    <aside style={{ flex: '3' }}>
                        <i
                            class="bi bi-person-circle fs-1"
                            aria-hidden="true"
                        ></i>
                    </aside>
                    <aside style={{ flex: '8' }}>
                        <h4>Chatgpt</h4>
                    </aside>
                    <aside style={{ flex: '1' }}>
                        <button class="chatbox-maximize">
                            <i class="bi bi-window fs-3" aria-hidden="true"></i>
                        </button>
                    </aside>
                </header>
                <main class="chatbox-popup__main">
                    We make it simple and seamless for
                    <br /> bussiness and people to talk to each
                    <br /> other. Ask us anything.
                </main>
                <footer class="chatbox-popup__footer">
                    <aside
                        style={{
                            flex: '1',
                            color: '#888',
                            textAlign: 'center',
                        }}
                    >
                        <i class="bi bi-camera" aria-hidden="true"></i>
                    </aside>
                    <aside style={{ flex: '10' }}>
                        <textarea
                            type="text"
                            placeholder="Type your message here..."
                            autofocus
                        ></textarea>
                    </aside>
                    <aside
                        style={{
                            flex: '1',
                            color: '#888',
                            textAlign: 'center',
                        }}
                    >
                        <i class="bi bi-send-fill" aria-hidden="true"></i>
                    </aside>
                </footer>
            </section>
            <section class="chatbox-panel">
                <header class="chatbox-panel__header">
                    <aside style={{ flex: '3' }}>
                        <i
                            class="bi bi-person-circle fs-3"
                            aria-hidden="true"
                        ></i>
                    </aside>
                    <aside style={{ flex: '6' }}>
                        <h4>Chatgpt</h4>
                    </aside>
                    <aside style={{ flex: '3', textAlign: 'right' }}>
                        <button class="chatbox-minimize">
                            <i
                                class="bi bi-window-stack fs-5"
                                aria-hidden="true"
                            ></i>
                        </button>
                        <button class="chatbox-panel-close">
                            <i class="bi bi-x-lg fs-5" aria-hidden="true"></i>
                        </button>
                    </aside>
                </header>
                <main class="chatbox-panel__main" style={{ flex: '1' }}>
                    We make it simple and seamless for
                    <br /> bussiness and people to talk to each
                    <br /> other. Ask us anything.
                </main>
                <footer class="chatbox-panel__footer">
                    <aside
                        style={{
                            flex: '1',
                            color: '#888',
                            textAlign: 'center',
                        }}
                    >
                        <i class="bi bi-camera" aria-hidden="true"></i>
                    </aside>
                    <aside style={{ flex: '10' }}>
                        <textarea
                            type="text"
                            placeholder="Type your message here..."
                            autofocus
                        ></textarea>
                    </aside>
                    <aside
                        style={{
                            flex: '1',
                            color: '#888',
                            textAlign: 'center',
                        }}
                    >
                        <i class="bi bi-send-fill" aria-hidden="true"></i>
                    </aside>
                </footer>
            </section>
        </div>
    )
}

export default Chat

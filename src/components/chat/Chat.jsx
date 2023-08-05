import { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'
import {
    getDatabase,
    ref,
    child,
    push,
    update,
    onChildAdded,
    remove,
    onChildRemoved,
} from 'firebase/database'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import UserService from '../../services/UserService'

import {
    CloseIcon,
    DeleteSolidIcon,
    EditSquareSolidIcon,
    VideoCallSolidIcon,
} from '../icons'
import defaultAvatar from '../../assets/images/default_avatar.png'
import './chat.css'
// import { AES, enc } from 'crypto-js';

const firebaseConfig = {
    apiKey: 'AIzaSyD9Fo5y8qhokjfJ_t4Gc0Gd4DXwDC_V2tM',
    authDomain: 'capstone-project-34253.firebaseapp.com',
    databaseURL:
        'https://capstone-project-34253-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'capstone-project-34253',
    storageBucket: 'capstone-project-34253.appspot.com',
    messagingSenderId: '342570414778',
    appId: '1:342570414778:web:6f43802265129593d88883',
    measurementId: 'G-0LG2E3HGPQ',
}

// Initialize Firebase
let firebaseApp
if (!firebase.apps.length) {
    firebaseApp = firebase.initializeApp(firebaseConfig)
} else {
    firebaseApp = firebase.app()
}

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(firebaseApp)

const Chat = () => {
    const { userInfo } = useSelector((state) => state.user)

    const [loading, setLoading] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showChat, setShowChat] = useState(false)
    const [search, setSearch] = useState('')
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    const [receiverUser, setReceiverUser] = useState(null)

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            try {
                const response = await UserService.findAllNameExcept(
                    search,
                    userInfo.username
                )
                setUsers(response.data)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
            setLoading(false)
        }
        if (userInfo?.id) {
            fetchData()
        }
    }, [userInfo, search])

    useEffect(() => {
        const getData = ref(database, 'messages/')

        onChildAdded(getData, (data) => {
            let temp = { ...data.val(), key: data.key }
            setMessages((messages) => [...messages, temp])
        })

        onChildRemoved(getData, (data) => {
            const deletedMessage = data.val()
            console.log(
                `The message with ID ${data.key} was removed:`,
                deletedMessage
            )
            setMessages((messages) =>
                messages.filter((message) => message.key !== data.key)
            )
        })
    }, [])

    const tooltip = <Tooltip>New message</Tooltip>

    const sendMessage = (event) => {
        event.preventDefault()
        // get message
        var message = document.getElementById('message').value
        document.getElementById('message').value = ''
        // console.log(message);

        // save in database
        // A post entry.
        const postData = {
            sender: userInfo.username,
            receiver: receiverUser.username,
            message: message,
        }

        // Get a key for a new Post.
        const newPostKey = push(child(ref(database), 'messages')).key

        const updates = {}
        updates['/messages/' + newPostKey] = postData
        update(ref(database), updates)
    }

    const deleteMessage = (messageId) => {
        // console.log(self);
        // var messageId = self.getAttribute("data-id");

        const rootRef = ref(database, 'messages/')
        const messageRef = child(rootRef, messageId) // Retrieve the Reference object for the message
        remove(messageRef) // Remove the message from the database
        // rootRef.child(messageId).remove();
    }

    // const key = "6A576E5A7234753778217A25432A462D4A614E645267556B5870327335763879"; //256-bit && hex
    // TODO when done add to backend all of key
    function openVideoChat() {
        const myParameter = receiverUser.username
        // const url = 'http://localhost:3000/videochat?param=' + AES.encrypt(myParameter, key).toString();
        const url = 'http://localhost:3000/video-call?param=' + myParameter
        // Try to get a reference to the existing video chat window
        var myWindow = window.open('', 'myWindow')
        // Check if the window is already open
        if (myWindow.location.href === 'about:blank') {
            // If the window is not yet navigated to a page, navigate to the desired page
            myWindow.location.href = url
        } else {
            // If the window is already open and navigated to a page, focus it
            myWindow.focus()
        }
    }

    const handleSelect = (user) => {
        setShowNew(false)
        setShowChat(true)
        setReceiverUser(user)
    }

    return (
        <div className="d-flex">
            {showNew && (
                <div className="chat_container">
                    <div className="chatNew_header">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="chatNew-heading">New message</div>
                            <button
                                className="chat_btn chat_closeBtn"
                                onClick={() => {
                                    setShowNew(false)
                                }}
                            >
                                <CloseIcon />
                            </button>
                        </div>
                        <div className="chatNew_searchContainer d-flex align-items-center">
                            <div>To:</div>
                            <input
                                type="text"
                                className="chat_search"
                                value={search}
                                onChange={(event) => {
                                    setSearch(event.target.value)
                                }}
                            />
                        </div>
                    </div>
                    {loading ? (
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div>
                            {users.length > 0 ? (
                                <ul className="chat_searchResults">
                                    {users?.map((user) => (
                                        <li
                                            className="d-flex"
                                            key={user.id}
                                            onClick={() => handleSelect(user)}
                                        >
                                            <img
                                                src={
                                                    user.avatar || defaultAvatar
                                                }
                                            />
                                            <div>
                                                <div className="chat_resultUsername">
                                                    {user.username}
                                                </div>
                                                <div className="chat_resultRole">
                                                    {user.role == 'ROLE_ADMIN'
                                                        ? 'Admin'
                                                        : user.role ==
                                                          'ROLE_TUTOR'
                                                        ? 'Tutor'
                                                        : 'Learner'}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                'Result not found'
                            )}
                        </div>
                    )}
                </div>
            )}
            {showChat && (
                <div className="chat_container d-flex flex-column">
                    <div className="chat_header">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <img
                                    src={receiverUser.avatar || defaultAvatar}
                                />
                                <span className="chat_receiveUsername">
                                    {receiverUser.username}
                                </span>
                            </div>
                            <div>
                                <button
                                    className="chat_btn"
                                    onClick={openVideoChat}
                                >
                                    <VideoCallSolidIcon size="20px" />
                                </button>
                                <button
                                    className="chat_btn chat_closeBtn"
                                    onClick={() => {
                                        setShowChat(false)
                                    }}
                                >
                                    <CloseIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex-grow-1 chat_messages p-2">
                        {/* Render a list of messages */}
                        {messages
                            .filter(
                                (message) =>
                                    ((message.sender === userInfo.username &&
                                        message.receiver ===
                                            receiverUser.username) ||
                                        (message.sender ===
                                            receiverUser.username &&
                                            message.receiver ===
                                                userInfo.username)) &&
                                    message.video_call !== true
                            )
                            .map((message) => (
                                <div key={message.key}>
                                    {message.video_call ? (
                                        <a
                                            href={
                                                'videochat/' + message.message
                                            }
                                        >
                                            Call
                                        </a>
                                    ) : (
                                        <div>
                                            {message.sender ==
                                            userInfo.username ? (
                                                <div className="chat_messContainer d-flex align-items-center justify-content-end">
                                                    <button
                                                        className="chat_btn me-1"
                                                        data-id={message.key}
                                                        onClick={() =>
                                                            deleteMessage(
                                                                message.key
                                                            )
                                                        }
                                                    >
                                                        <DeleteSolidIcon size="1rem" />
                                                    </button>
                                                    <div className="chat_messSender">
                                                        {message.message}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="chat_messContainer">
                                                    <div className="chat_messReceiver d-flex align-items-center justify-content-start">
                                                        <img
                                                            src={
                                                                receiverUser.avatar ||
                                                                defaultAvatar
                                                            }
                                                        />
                                                        <span>
                                                            {message.message}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                    <form className="chat_sendMess" onSubmit={sendMessage}>
                        <input
                            id="message"
                            placeholder="Enter message"
                            autoComplete="off"
                        />
                        <input type="submit" className="d-none" />
                    </form>
                </div>
            )}
            <OverlayTrigger placement="left" overlay={tooltip}>
                <button
                    className="chatNew_btn"
                    onClick={() => {
                        setShowNew(!showNew)
                        setShowChat(false)
                    }}
                >
                    <EditSquareSolidIcon size="20px" />
                </button>
            </OverlayTrigger>
        </div>
    )
}

export default Chat

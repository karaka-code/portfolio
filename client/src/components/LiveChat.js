import React, {useEffect, useRef, useState} from "react"
import "./LiveChat.css"
import {Button, Form} from "react-bootstrap";
import io from "socket.io-client"
import {useDispatch, useSelector} from "react-redux";
import moment from "moment"
import {afterPostMessage, getChats} from "../store/chat/actions";
import ChatCard from "./ChatCard";
import AlertModal from "./AlertModal";

let socket;
const server = process.env.HOST || 'http://localhost:5000';


const LiveChat = () => {

    const dispatch = useDispatch()
    const chats = useSelector((state) => state.chat.chats)
    const user = useSelector((state) => state.user.currentUser);
    const [message, setMessage] = useState('')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [chats]);


    useEffect(() => {
        dispatch(getChats())
        socket = io(server);


        socket.on("Output Chat Message", messageFromServer => {
            dispatch(afterPostMessage(messageFromServer))
        })

    }, [dispatch])


    const sendMsg = (e) => {
        e.preventDefault()
        if (user === null) {
            handleShow();
            return;
        }
        let userId = user.userId
        let userName = user.name
        let chatMsg = message
        let nowTime = moment()
        let type = "Text"

        socket.emit("Input Chat Message", {
            chatMsg,
            userId,
            userName,
            nowTime,
            type
        })
        setMessage('')
    }


    return (
        <div className="chat">
            <h4>Live chat with me</h4>
            <AlertModal show={show} handleClose={handleClose} text={"to chat"}/>
            <div className="chat-area">
                {chats && chats.map(chat => {
                    return <ChatCard key={chat._id} chat={chat} />
                })}
                <div ref={messagesEndRef} />
            </div>
            <Form onSubmit={sendMsg}>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                        as="textarea"
                        rows={1}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    style={{float: "right"}}
                    onClick={sendMsg}
                >
                    Send
                </Button>
            </Form>
        </div>
    )
}

export default LiveChat
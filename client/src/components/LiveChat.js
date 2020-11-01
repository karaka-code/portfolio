import React, {useEffect, useRef, useState} from "react"
import "./LiveChat.css"
import {Button, Form} from "react-bootstrap";
import io from "socket.io-client"
import {useSelector} from "react-redux";
import moment from "moment"

let socket;
const server = 'http://localhost:5000';


const LiveChat = () => {

    const user = useSelector((state) => state.user.currentUser);
    const [message, setMessage] = useState('')


    useEffect(() => {
        socket = io(server);
    }, [])

    const sendMsg = (e) => {
        e.preventDefault()
        let userId = user.userId
        let userName = user.name
        let chatMsg = message
        let nowTime = moment()

        socket.emit("Input Chat Msg", {
            chatMsg,
            userId,
            userName,
            nowTime
        })
        setMessage('')
    }


    return (
        <div className="chat">
            <h4>Live chat with me</h4>
            <div className="chat-area"></div>
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
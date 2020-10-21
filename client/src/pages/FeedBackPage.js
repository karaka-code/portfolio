import React, {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import "./Styles.css"
import axios from "axios"
import {useSelector} from "react-redux";


const FeedBackPage = () => {
    const [text, setText] = useState('')
    const [feedbacks, setFeedbacks] = useState([])
    const user = useSelector(state => state.user.currentUser)

    useEffect(() => {
        axios.get("api/feedback/")
            .then((response) => {
                setFeedbacks(response.data)
            })
    }, [])

    const sendFeedback = (e) => {
        e.preventDefault()
        axios.post("api/feedback/", {
            text, userId: user.userId, name: user.name
        })
            .then((response) => {
                console.log(response)
            }, (error) => {
                console.log(error)
            })
        setText('')
    }

    return (
        <div className="container">
            <Form className="form">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Leave your feedback here.</Form.Label>
                    <Form.Control
                        as="textarea"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={10}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={sendFeedback}>
                    Leave
                </Button>
            </Form>
            <div className="feedbacks">
                <p>Feedbacks: </p>
                <ul>
                    {feedbacks.length !== 0 && feedbacks.map(item => {
                        return (
                            <li key={item._id} className="feedback">
                                <p>User: {item.name}</p>
                                <p>Text: {item.text}</p>
                                <p className="time">{item.time}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default FeedBackPage
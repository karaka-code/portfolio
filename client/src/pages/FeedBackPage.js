import React, {useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import {useSelector} from "react-redux";
import "./FeedBackPage.css";

const FeedBackPage = () => {
    const [text, setText] = useState("");
    const [feedbacks, setFeedbacks] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const user = useSelector((state) => state.user.currentUser);


   const fetchData = () => {
       axios.get("api/feedback/")
           .then((response) => {
               const reversed = response.data.reverse()
               const sortedData = reversed.sort((a, b) => a.time - b.time)
               setFeedbacks(sortedData);
           });
   }

    useEffect(() => {
        fetchData()
    }, []);


    const sendFeedback = (e) => {
        e.preventDefault();
        if (user === null) {
            handleShow();
            return;
        }
        axios
            .post("api/feedback/", {
                text,
                userId: user.userId,
                name: user.name,
            })
            .then(
                (response) => {
                    fetchData()
                },
                (error) => {
                    console.log(error);
                }
            );
        setText("");
    };

    return (
        <div className="container">
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>You need to login to leave feedbacks</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Form className="form" onSubmit={sendFeedback}>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Leave your feedback here.</Form.Label>
                    <Form.Control
                        as="textarea"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={10}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Leave
                </Button>
            </Form>
            <div className="feedbacks">
                <p>Feedbacks: </p>
                <div style={{overflow: "scroll"}}>
                    {feedbacks.length !== 0 ? (
                        feedbacks.map((item) => {
                            return (
                                <div key={item._id} className="feedback">
                                    <p>User: {item.name}</p>
                                    <p>Text: {item.text}</p>
                                    <p className="time">{item.time}</p>
                                </div>
                            );
                        })
                    ) : (
                        <p>No feedbacks</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedBackPage;

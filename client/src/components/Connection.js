import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios"
import ToastMsg from "./ToastMsg";
import {useDispatch} from "react-redux";
import {logInUser} from "../store/user/actions";

export const Registration = ({handleClose, show}) => {
    const [form, setForm] = useState({
        name: '', email: '', password: ''
    })
    const dispatch = useDispatch()

    const [response, setResponse] = useState('')

    const [showT, setShowT] = useState(false)

    const toggleShowT = () => setShowT(!showT)

    const changeForm = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleRegister = (e) => {
        e.preventDefault()
        axios.post("api/auth/register", {
            ...form
        })
            .then((response) => {
                setResponse(response.data.message)
                dispatch(logInUser(response.data))
            }, (error) => {
                setResponse(error.response.data.message)
            })
        toggleShowT()
        handleClose()
    }

    return (
        <>
            <ToastMsg showT={showT} toggleShowT={toggleShowT} response={response}  />
            <Form>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Registration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Your name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                value={form.name}
                                onChange={changeForm}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={form.email}
                                onChange={changeForm}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={form.password}
                                onChange={changeForm}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="primary"
                            type={"submit"}
                            onClick={handleRegister}
                        >
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </>
    )
}

export const Login = ({handleCloseL, showL}) => {
    const [form, setForm] = useState({
        email: '', password: ''
    })

    const dispatch = useDispatch()

    const [response, setResponse] = useState('')

    const [showT, setShowT] = useState(false)

    const toggleShowT = () => setShowT(!showT)

    const changeForm = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleLogin = (e) => {
        e.preventDefault()
        axios.post("api/auth/login", {
            ...form
        })
            .then((response) => {
                setResponse(response.data.message)
                dispatch(logInUser(response.data))
            }, (error) => {
                setResponse(error.response.data.message)
            })
        toggleShowT()
        handleCloseL()
    }

    return (
        <>
            <ToastMsg showT={showT} toggleShowT={toggleShowT} response={response}  />
            <Form>
                <Modal show={showL} onHide={handleCloseL}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={form.email}
                                onChange={changeForm}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={form.password}
                                onChange={changeForm}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="primary"
                            type={"submit"}
                            onClick={handleLogin}
                        >
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </>
    )
}


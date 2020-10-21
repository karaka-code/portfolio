import React from "react";
import {Toast} from "react-bootstrap";
import "./Styles.css"

const ToastMsg = ({showT, toggleShowT, response}) => {
    return (
        <Toast  className="toast-msg" show={showT} onClose={toggleShowT} autohide={true}>
            <Toast.Header>
                <strong className="mr-auto">Msg</strong>
            </Toast.Header>
            <Toast.Body>{response}</Toast.Body>
        </Toast>
    )
}

export default ToastMsg
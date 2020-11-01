import React from "react";
import {Button, Modal} from "react-bootstrap";


const AlertModal = ({show, handleClose, text}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>You need to login {text}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AlertModal
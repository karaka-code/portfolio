import React, {useState} from "react";
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Login, Registration} from "./Connection"
import {useSelector, useDispatch} from "react-redux";
import {logOutUser} from "../store/user/actions";


const Navigation = () => {

    const user = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [showL, setShowL] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseL = () => setShowL(false);
    const handleShowL = () => setShowL(true);

    const handleLogout = () => {
        dispatch(logOutUser(null))
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand><Link style={{color: "white"}} to="/">Home</Link></Navbar.Brand>
            <Navbar.Brand><Link style={{color: "white"}} to="/feedback">FeedBack</Link></Navbar.Brand>
            <Nav className="ml-auto">
                {
                    user !== null
                        ?
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        :
                        <>
                            <Nav.Link onClick={handleShowL}>Login</Nav.Link>
                            <Nav.Link onClick={handleShow}>Register</Nav.Link>
                        </>
                }
            </Nav>
            <Registration handleClose={handleClose} show={show}/>
            <Login handleCloseL={handleCloseL} showL={showL}/>
        </Navbar>
    )
}

export default Navigation
import React from "react";
import "./ChatCard.css"

const ChatCard = (props) => {

    return (
        <div className="message">
            <p className="time">{props.sender.name}</p>
            <p>{props.message}</p>
            <p className="time">{props.time}</p>
        </div>
    )
}

export default ChatCard
import React from "react";
import "./ChatCard.css"

const ChatCard = ({chat}) => {

    return (
        <>
            {chat
                ? <div className="msg-container">
                    <p className="msg-time">{chat.time}</p>
                    <div className="message">
                        <p style={{margin: 0, textAlign: "end"}}>{chat.sender.name}</p>
                        <p className="text">{chat.message}</p>
                    </div>
                </div>
                : null
            }
        </>


    )
}

export default ChatCard
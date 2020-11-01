import React from "react";
import "./ChatCard.css"

const ChatCard = ({chat}) => {

    console.log(chat)

    return (
        <>
            {chat
                ? <div className="message">
                    <p style={{margin: 0, textAlign: "end"}}>{chat.sender.name}</p>
                    <p className="text">{chat.message}</p>
                    <p className="time">{chat.time}</p>
                </div>
                : null
            }
        </>


    )
}

export default ChatCard
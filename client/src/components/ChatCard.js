import React from "react";
import "./ChatCard.css"

const ChatCard = ({chat}) => {

    console.log(chat)

    return (
        <>
            {chat
                ? <div className="message">
                    {/*<p>{chat.sender.name}</p>*/}
                    <p>{chat.message}</p>
                    <p className="time">{chat.time}</p>
                </div>
                : null
            }
        </>


    )
}

export default ChatCard
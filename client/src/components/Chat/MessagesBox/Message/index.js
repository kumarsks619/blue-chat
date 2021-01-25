import React from 'react'
import ReactEmoji from 'react-emoji'

import './Message.css'


function Message({ message: { user, text }, name }) {
    
    let isSentByCurrentUser = false
    const trimmedName = name.trim().toLowerCase()

    if (user === trimmedName)
        isSentByCurrentUser = true
    
    return (
        isSentByCurrentUser ? (
            <div className="message justify-end">
                <p className="message__sentText pr-10">{trimmedName}</p>
                <div className="message__textWrapper bg-blue">
                    <p className="message__text color-white">{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        ) : (
            <div className="message justify-start">
                <div className={`message__textWrapper ${user === "admin" ? "admin-message" : "bg-light"}`}>
                    <p className="message__text color-dark">{ReactEmoji.emojify(text)}</p>
                </div>
                <p className="message__sentText pl-10">{user}</p>
            </div>
        )
    )
}

export default Message

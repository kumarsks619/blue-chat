import React from 'react'

import './ChatInput.css'


function ChatInput({ message, setMessage, sendMessage }) {
    return (
        <form className="chatInput">
            <input
                type="text"
                className="chatInput__input"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage(e)}
            />
            <button
                className="chatInput__sendBtn"
                onClick={(e) => sendMessage(e)}
            >
                Send
            </button>
        </form>
    );
}

export default ChatInput

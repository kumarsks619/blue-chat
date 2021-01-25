import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

import Message from './Message'
import './MessagesBox.css'



function MessagesBox({ messages, name }) {
    return (
        <ScrollToBottom className="messagesBox" followButtonClassName="scrollToBottomBtn" debug={false}>
            {
                messages.map((message, index) => (
                    <div key={index}>
                        <Message message={message} name={name} />
                    </div>
                ))
            }
        </ScrollToBottom>
    )
}

export default MessagesBox

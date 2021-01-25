import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import InfoBar from './InfoBar';
import ChatInput from './ChatInput';
import MessagesBox from './MessagesBox'
import Sidebar from './Sidebar'
import { ENDPOINT } from '../../constants/index'
import './Chat.css'

let socket;


function Chat({ location }) {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [activeUsers, setActiveUsers] = useState([])


    useEffect(() => {
        const { name, room } = queryString.parse(location.search)
        setName(name)
        setRoom(room)

        // hitting the server-side end-point to create a web-socket
        socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] })

        // EMITTING the JOIN event that is to be handled on the server-side
        socket.emit('join', {
            name,
            room
        }, () => {
            // when the callback() in the server-side is triggered then this function will execute
        })

        return () => {
            // EMITTING the DISCONNECT event that is to be handled on the server-side
            socket.emit('disconnect')
            socket.off()        // turning off the current instance of the web-socket
        }
    }, [location.search])


    useEffect(() => {
        // WAITING for the MESSAGE event to happen
        socket.on('message', (message) => {
            setMessages([
                ...messages,
                message
            ])
        })

        // WAITING for the ROOM_DATA event to happen
        socket.on('roomData', (roomData) => {
            if (roomData.room === room)
                setActiveUsers(roomData.users)
        })
    }, [messages, room])

    
    const sendMessage = (e) => {
        e.preventDefault()

        if (message)
            // EMITTING the SEND_MESSAGE event that is to be handled on the server-side
            socket.emit('sendMessage', message, () => {
                setMessage("")
            })
    }


    return (
        <div className="chat">
            <div className="chat__box">
                <InfoBar room={room} />
                <MessagesBox messages={messages} name={name} />
                <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <Sidebar users={activeUsers} />
        </div>
    );
}

export default Chat

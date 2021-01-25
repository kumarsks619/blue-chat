import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { ENDPOINT } from '../../constants'
import onlineIcon from '../../icons/onlineIcon.png'
import './Join.css'

function Join() {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    const [activeRooms, setActiveRooms] = useState([])

    // to get all the active rooms
    useEffect(() => {
        fetchRooms().then(response => setActiveRooms(response))
    }, [])

    const fetchRooms = async () => {
        const { data } = await axios.post(ENDPOINT)
        return data
    }


    return (
        <div className="join">
            <form className="join__formWrapper">
                <h1 className="join__heading">Join</h1>
                <div>
                    <input
                        placeholder="Name"
                        className="join__input"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        placeholder="Room"
                        className="join__input mt-20"
                        type="text"
                        onChange={(e) => setRoom(e.target.value)}
                    />
                </div>
                <Link to={`/chat?name=${name}&room=${room}`}>
                    <button
                        className="button mt-20"
                        type="submit"
                        disabled={!name || !room ? true : false}
                    >
                        Sign In
                    </button>
                </Link>
            </form>
            <ul className="join__activeRooms">
                <h1 className="join__heading">Active Rooms</h1>
                {
                    activeRooms?.length > 0 && (
                        activeRooms.map((activeRoom, index) => (
                            <li key={index}>
                                {activeRoom}
                                <img src={onlineIcon} alt="active room" />
                            </li>
                        ))
                    )
                }
            </ul>
        </div>
    )
}

export default Join

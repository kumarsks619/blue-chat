import React from 'react'

import onlineIcon from '../../../icons/onlineIcon.png'
import './Sidebar.css'



function Sidebar({ users }) {
    return (
        <div className="sidebar">
            {
                users && (
                    <div>
                        <h1>Active Users</h1>
                        <div className="sidebar__activeUsers">
                            <h3>
                                {
                                    users.map(user => (
                                        <div key={user.name} className="sidebar__activeUser">
                                            {user.name}
                                            <img src={onlineIcon} alt="online" />
                                        </div>
                                    ))
                                }
                            </h3>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Sidebar

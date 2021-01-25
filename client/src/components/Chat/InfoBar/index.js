import React from 'react'

import onLineIcon from '../../../icons/onlineIcon.png'
import closeIcon from '../../../icons/closeIcon.png'
import './InfoBar.css'

function InfoBar({ room }) {
    return (
        <div className="infoBar">
            <div className="infoBar__leftContainer">
                <img 
                    className="infoBar__onlineIcon"
                    src={onLineIcon}
                    alt="online"
                />
                <h3>{room}</h3>
            </div>
            <div className="infoBar__rightContainer">
                <a href="/">
                    <img src={closeIcon} alt="close" />
                </a>
            </div>
        </div>
    )
}

export default InfoBar

import React from 'react'
import Avatar from "@material-ui/core/Avatar";
import './Chat.css'
import {Link} from 'react-router-dom'
import UndoIcon from '@material-ui/icons/Undo';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const Chat = ({name, id, lastMessageSentByCurrentUser ,message, profilePic, timestamp}) => {
    
    const checkMessageLength = (message) => {
        return message.length > (window.innerWidth/26) ? message.substr(0, window.innerWidth/26) + "..." : message;
    }

    return (
        <Link to={`/chat/${id}`}>
            <div className="chat">
                <Avatar className="chat__image" src={profilePic}  />
                <div className="chat__details">
                    <h2>{name}</h2>
                    {
                        lastMessageSentByCurrentUser === false? 
                        <p>{checkMessageLength(message)}</p> 
                        : lastMessageSentByCurrentUser === true ?
                        <div className="chat__userMessage"> 
                            <UndoIcon fontSize="small" />
                            <p className="chat__userText">{checkMessageLength(message)}</p>
                        </div>
                        :
                        <div className="chat__userMessage"> 
                            <ErrorOutlineIcon fontSize="small" />
                            <p className="chat__none">{message}</p>
                        </div>

                    }
                </div>
                <p className="chat__timestamp"> {timestamp}</p>
            </div>
        </Link>
    )
}

export default Chat;
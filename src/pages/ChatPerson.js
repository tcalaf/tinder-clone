import React from 'react'
import Header from '../components/Header';
import ChatScreen from '../components/ChatScreen'

export const ChatPerson = (props) => {

    return (
        <>
            <Header backButton="/chat"/>
            <ChatScreen {...props}/>
        </>
    )
}

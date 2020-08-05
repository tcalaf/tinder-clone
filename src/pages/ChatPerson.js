import React from 'react'
import Header from '../components/Header';
import ChatScreen from '../components/ChatScreen'

export const ChatPerson = () => {
    return (
        <>
            <Header backButton="/chat"/>
            <ChatScreen />
        </>
    )
}

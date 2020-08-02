import React from 'react'
import Header from './Header';
import ChatScreen from './ChatScreen'

export const ChatPerson = () => {
    return (
        <>
            <Header backButton="/chat"/>
            <ChatScreen />
        </>
    )
}

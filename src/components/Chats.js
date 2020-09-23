import React, { useEffect, useState, useContext } from 'react'
import './Chats.css'
import Chat from './Chat'
import firebaseApp from '../services/firebase'
import { AuthContext } from '../context/auth'
import moment from 'moment'

const Chats = () => {
    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const unsubscribe = firebaseApp.firestore().collection('chats').doc(currentUser.uid).collection('users').onSnapshot(snapshot => 
                snapshot.docs.map(person => firebaseApp.firestore().collection('people').doc(person.id).get().then(doc => setChats(prevChats => [...prevChats, 
                {...doc.data(), ...{lastMessage: person.data().messages[person.data().messages.length - 1].data}, ...{lastMessageTime: person.data().messages[person.data().messages.length - 1].timestamp}}])))   
        );

        return () => {
            unsubscribe();
        }

    }, [currentUser.uid]);


    //TODO: change message format when last message was theirs, not yours

    return (
        <>
            <div className="chats">
                {chats.map(person => {
                    return <Chat name={person.name} key={person.id} id={person.id} message={person.lastMessage} timestamp={moment(person.lastMessageTime).format('lll')} profilePic={person.url} />
                })}
            </div>
        </>
    )
}

export default Chats;

import React, { useEffect, useState, useContext } from 'react'
import './Chats.css'
import Chat from './Chat'
import firebaseApp from '../services/firebase'
import { AuthContext } from '../context/auth'

const Chats = () => {
    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const unsubscribe = firebaseApp.firestore().collection('chats').doc(currentUser.uid).collection('users').onSnapshot(snapshot => (
            snapshot.docs.map(person => firebaseApp.firestore().collection('people').doc(person.id).get().then(doc => setChats(prevChats => [...prevChats, doc.data()])))
        ));

        return () => {
            unsubscribe();
        }

    }, [currentUser.uid]);

    return (
        <>
            <div className="chats">
                {chats.map(person => (
                    <Chat name={person.name} key={person.id} id={person.id} message="Default" timestamp="Default" profilePic={person.url} />
                ))}
            </div>
        </>
    )
}

export default Chats;

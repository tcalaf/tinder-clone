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

        const checkMessages = (person) => {
            return person.data().messages.length ? true : false
        }

        const unsubscribe = firebaseApp.firestore().collection('chats').doc(currentUser.uid).collection('users').onSnapshot(snapshot => {
            setChats([]); 
            let users = snapshot.docs;
            const usersHaveMessaged = users.filter(user => checkMessages(user));
            const usersHaveNotMessaged = users.filter(user => !checkMessages(user));
            usersHaveMessaged.sort((a, b) => b.data().messages[b.data().messages.length - 1].timestamp - a.data().messages[a.data().messages.length - 1].timestamp);
            users = usersHaveMessaged.concat(usersHaveNotMessaged);

            users.map(person => firebaseApp.firestore().collection('people').doc(person.id).get().then(doc => setChats(prevChats => 
                checkMessages(person)? 
                    [...prevChats, {...doc.data(), ...{lastMessage: person.data().messages[person.data().messages.length - 1].data}, ...{lastMessageTime: moment(person.data().messages[person.data().messages.length - 1].timestamp).format('lll')}}]
                :
                    [...prevChats, {...doc.data(), ...{lastMessage: "No messages yet, tap here to create!"}, ...{lastMessageTime: ""}}]
                )));
            });

        return () => {
            unsubscribe();
        }

    }, [currentUser.uid]);

    //TODO: change message format when last message was theirs, not yours

    return (
        <>
            <div className="chats">
                {chats.map(person => {
                    return <Chat name={person.name} key={person.id} id={person.id} message={person.lastMessage} timestamp={person.lastMessageTime} profilePic={person.url} />
                })}
            </div>
        </>
    )
}

export default Chats;

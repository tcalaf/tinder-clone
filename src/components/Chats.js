import React, { useEffect, useState, useContext } from 'react'
import './Chats.css'
import Chat from './Chat'
import {chatsCollection, usersCollection} from '../services/firebase'
import { AuthContext } from '../context/auth'
import moment from 'moment'

const Chats = () => {
    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {

        const checkLastMessageSentByCurrentUser = (person) => {
            return person.data().messages[person.data().messages.length - 1].uid === currentUser.uid ? true : false;
        }

        const checkMessages = (person) => {
            return person.data().messages.length ? true : false;
        }

        const unsubscribe = chatsCollection.doc(currentUser.uid).collection('users').onSnapshot(snapshot => {
            setChats([]); 
            let users = snapshot.docs;
            const usersHaveMessaged = users.filter(user => checkMessages(user));
            const usersHaveNotMessaged = users.filter(user => !checkMessages(user));
            usersHaveMessaged.sort((a, b) => b.data().messages[b.data().messages.length - 1].timestamp - a.data().messages[a.data().messages.length - 1].timestamp);
            usersHaveNotMessaged.sort((a, b) => b.data().timestamp - a.data().timestamp);

            usersHaveMessaged.map(person => usersCollection.doc(person.id).get().then(doc => setChats(prevChats => 
                    [...prevChats, {
                        ...doc.data(), 
                        ...{lastMessage: person.data().messages[person.data().messages.length - 1].data}, 
                        ...{lastMessageTime: moment(person.data().messages[person.data().messages.length - 1].timestamp).format('lll')},
                        ...{lastMessageSentByCurrentUser: checkLastMessageSentByCurrentUser(person)}}]
                )));

            usersHaveNotMessaged.map(person => usersCollection.doc(person.id).get().then(doc => setChats(prevChats => 
                    [...prevChats, {...doc.data(), ...{lastMessage: "No messages yet"}, ...{lastMessageTime: ""}, ...{lastMessageSentByCurrentUser: 'none'}}]
                )));
            });

        return () => {
            unsubscribe();
        }

    }, [currentUser.uid]);

    return (
        <>
            <div className="chats">
                {chats.map(person => {
                    return <Chat name={person.name} key={person.id} id={person.id} lastMessageSentByCurrentUser={person.lastMessageSentByCurrentUser}
                    message={person.lastMessage} timestamp={person.lastMessageTime} profilePic={person.url} />
                })}
            </div>
        </>
    )
}

export default Chats;

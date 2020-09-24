import React, {useState, useEffect, useContext} from 'react'
import './ChatScreen.css'
import { Avatar } from '@material-ui/core'
import firebaseApp from '../services/firebase'
import firebase from "firebase";
import { AuthContext } from '../context/auth'
import moment from 'moment'
import { animateScroll } from "react-scroll";


const ChatScreen = ({match}) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const personId = match.params.id;
    const [personImage, setPersonImage] = useState('');
    const [personName, setPersonName] = useState('');
    const [matchDate, setMatchDate] = useState(null);

    const scrollToBottom = () => {
        animateScroll.scrollToBottom({duration : 0});
    }

    useEffect(() => {

        const docRef = firebaseApp.firestore().collection('chats').doc(currentUser.uid).collection('users').doc(personId);

        docRef.get().then(doc => setMatchDate(doc.data().timestamp));

        const unsubscribe = docRef.onSnapshot(doc => {setMessages(doc.data().messages); scrollToBottom();});

        firebaseApp.firestore().collection('people').doc(personId).get().then(doc => {
            setPersonImage(doc.data().url); setPersonName(doc.data().name);})

        return () => {
            unsubscribe();
        }
        

    }, [currentUser.uid, personId]);

    const handleSend = e => {
        e.preventDefault();
        if(input.length) {
            const newMessage = {data: input, uid:currentUser.uid, timestamp: Date.now()};
            setMessages([...messages, newMessage]);
            firebaseApp.firestore().collection('chats').doc(currentUser.uid).collection('users').doc(personId).update({messages: firebase.firestore.FieldValue.arrayUnion(newMessage)});
            firebaseApp.firestore().collection('chats').doc(personId).collection('users').doc(currentUser.uid).update({messages: firebase.firestore.FieldValue.arrayUnion(newMessage)});
            setInput('');
        }
    }

    return (
        <div className="chatScreen">
            <p className="chatScreen__matchTimestamp">You matched with {personName} on {moment(matchDate).format('LLL')}</p>
            <div className="chatScreen__messages">
                {messages.map(message => (
                    message.uid !== currentUser.uid ? (
                        <div className="chatScreen__message" key={message.timestamp}>
                            <Avatar
                                className="chatScreen__image"
                                alt = {personName}
                                src = {personImage}
                            />
                            <p className="chatScreen__text">{message.data}</p>
                            <p className="chatScreen__timestamp">{moment(message.timestamp).format('LT')}</p>
                        </div>
                    ) : (
                        <div className="chatScreen__message" key={message.timestamp}>                    
                            <p className="chatScreen__textUser">{message.data}</p>
                            <p className="chatScreen__timestamp">{moment(message.timestamp).format('LT')}</p>
                        </div>
                    )
                ))}
            </div>
            <form className="chatScreen__input">
                <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                className="chatScreen__inputField"
                placeholder="Type a message..." type="text" />
                <button onClick={handleSend} type="submit" className="chatScreen__inputButton">SEND</button>
            </form>
        </div>
    );
}

export default ChatScreen;
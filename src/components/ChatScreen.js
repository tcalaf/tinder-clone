import React, {useState} from 'react'
import './ChatScreen.css'
import { Avatar } from '@material-ui/core'
import firebaseApp from '../services/firebase'
import { AuthContext } from '../context/auth'

const ChatScreen = ({match}) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        {
            name: 'Mira',
            image: 'https://cdn.knd.ro/media/521/2861/35027/18765588/2/mira2.jpg?height=1350&width=1080',
            message: 'Hey iubire ♥♥♥♥',
            id:1

        }, 
        {
            name: 'Mira',
            image: 'https://cdn.knd.ro/media/521/2861/35027/18765588/2/mira2.jpg?height=1350&width=1080',
            message: 'Ce faaci?',
            id:2

        },
        {
            message:'Hey! Bine',
            id:3
        },
    ])


    const handleSend = e => {
        e.preventDefault();
        setMessages([...messages, { message: input }]);
        setInput('');
    }

    return (
        <div className="chatScreen">
            <p className="chatScreen__timestamp">YOU MATCHED WITH {match.params.id} ON 10/08/20</p>
            {messages.map(message => (
                message.name ? (
                    <div className="chatScreen__message" key={message.id}>
                        <Avatar
                            className="chatScreen__image"
                            alt = {message.name}
                            src = {message.image}
                        />
                        <p className="chatScreen__text">{message.message}</p>
                    </div>
                ) : (
                    <div className="chatScreen__message" key={message.id}>
                        <p className="chatScreen__textUser">{message.message}</p>
                    </div>
                )
            ))}
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
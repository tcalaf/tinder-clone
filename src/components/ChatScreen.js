import React, {useState} from 'react'
import './ChatScreen.css'
import { Avatar } from '@material-ui/core'
const ChatScreen = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        {
            name: 'Mira',
            image: 'https://cdn.knd.ro/media/521/2861/35027/18765588/2/mira2.jpg?height=1350&width=1080',
            message: 'Hey iubire ♥♥♥♥',

        }, 
        {
            name: 'Mira',
            image: 'https://cdn.knd.ro/media/521/2861/35027/18765588/2/mira2.jpg?height=1350&width=1080',
            message: 'Ce faaci?',

        },
        {
            message:'Hey! Bine',
        },
    ])

    const handleSend = e => {
        e.preventDefault();
        setMessages([...messages, { message: input }]);
        setInput('');
    }

    return (
        <div className="chatScreen">
            <p className="chatScreen__timestamp">YOU MATCHED WITH MIRA ON 10/08/20</p>
            {messages.map(message => (
                message.name ? (
                    <div class="chatScreen__message">
                        <Avatar
                            className="chatScreen__image"
                            alt = {message.name}
                            src = {message.image}
                        />
                        <p className="chatScreen__text">{message.message}</p>
                    </div>
                ) : (
                    <div class="chatScreen__message">
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
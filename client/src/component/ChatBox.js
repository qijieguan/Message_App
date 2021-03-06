import './styles/chat.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import uuid from 'react-uuid';
import Chat from './Chat.js';
import MessageBox from './MessageBox.js';

const ChatBox = () => {

    const [chatSet, setChatSet] = useState([]);
    const [render, setRender] = useState(false);

    useEffect(() => { 
        axios.post('/texts/', { user_id: JSON.parse(sessionStorage.getItem('user'))._id })
        .then((response) => { setChatSet(response.data) }); 
        let id = sessionStorage.getItem('select');
        if (id) { setTimeout(() => { document.getElementById(id).classList.add('highlight');}, 250); };
    }, [render]);

    const getSelect = (id) => { 
        sessionStorage.setItem('select', id); 
        document.querySelector('.chat-container').classList.remove('open');
        document.querySelector('.chat-container').classList.add('close');
        document.querySelector('.message-container').classList.add('open');
        setRender(!render); 
    }

    return (
        <div className='conversation grid'>
            <div className="chat-container">
                <div className='chat-label flex'>Chat Log</div>
                <div className='chat-set flex'>
                    {chatSet && chatSet.length ?
                        chatSet.map(chat => <Chat key={uuid()} chat={chat} getSelect={getSelect}/>)
                        :
                        <h1 className='chat-default'>No Chat Log Exists</h1>
                    }
                </div>
            </div>
            <MessageBox/>     
        </div>
                    
    );
}

export default ChatBox;
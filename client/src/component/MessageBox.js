import './styles/message.css';
import { useState, useEffect } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { FaCamera } from 'react-icons/fa';
import axios from 'axios';
import uuid from 'react-uuid';
import Text from './Text.js';

const MessageBox = () => {

    const [user, setUser] = useState("");
    const [files, setFiles] = useState("");
    const [url, setURL] = useState("");
    const [textSet, setTextSet] = useState([]);
    const [render, setRender] = useState(false);
    var textInp = document.querySelector('.text');

    const selectMsg = sessionStorage.getItem('select');

    useEffect(() => {
        setTextSet([]);   

        axios.post('/users/select/', {user_id: sessionStorage.getItem('select')})
        .then((response) => { 
            setUser(response.data);
            axios.post('/texts/select/', {
                user_id: JSON.parse(sessionStorage.getItem('user'))._id,
                friend_id: response.data._id
            }).then((response) => { setTextSet(response.data.text); });
        });
        setTimeout(() => {scrollBottom();}, 500);
    }, [render, selectMsg]);

    const scrollBottom = () => {
        let element = document.querySelector(".private-message")
        if (element) { element.scrollTop = element.scrollHeight - element.clientHeight; }
    }

    const postText = async (content) => {
        await axios.post('/texts/add/', {
            user_id: JSON.parse(sessionStorage.getItem('user'))._id,
            friend_id: user._id,
            content: content
        });
    }

    const uploadText = async () => {
        if (textInp.value) { postText(textInp.value); setRender(!render); return; }

        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', process.env.REACT_APP_PRESET_NAME);

        await fetch(process.env.REACT_APP_IMAGE_URL + '/image/upload', { method: 'POST', body: data })
        .then(res => res.json()).then(json => { postText(json.secure_url); });
        setRender(!render); 
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!textInp.value && !files) { return; }
        uploadText();
        setFiles("");
        setURL("");
        textInp.value = '';
        document.querySelector('.camera-icon').style.display = "";
        document.querySelector(".file").value="";
    }

    const goBack = () => { 
        document.getElementById(selectMsg).classList.remove('highlight');
        sessionStorage.removeItem('select'); 
        document.querySelector('.chat-container').classList.add('open');
        document.querySelector('.message-container').classList.remove('open');
        setRender(!render); 
    }

    const readFiles = (files) => {
        if (!files) { return }
        const reader = new FileReader();
        reader.addEventListener("load", () => { setURL(reader.result); setFiles(files); }, false);
        reader.readAsDataURL(files[0]); 
    }

    const previewFile = (event) => { readFiles(event.target.files); };

    const handleUpload = (e) => { e.currentTarget.childNodes[2].click(); }

    const handleChange = (e) => {
        if (e.target.value) { document.querySelector('.camera-icon').style.display = "none" } 
        else { document.querySelector('.camera-icon').style.display = ""; }
    }

    return (
        <div className='message-container'>
            <div className="private-message-header flex">
            <button className="back-btn flex" onClick={goBack}><MdArrowBack color='teal'/></button>
            <span className='flex' style={{display: user ? '' : 'none'}}>
                Messaging:<img src={user.image_url} alt=""/>
                {user.firstname + " " + user.lastname}
            </span>
            </div>
            <div className="private-message">
                {textSet && textSet.length?
                    textSet.map(text => <Text key={uuid()} textID={uuid()} friend={user} text={text}/>)
                    :<h1>Select a Conversation to Display</h1>
                }
            </div>
            <div className='text-input-wrapper' style={{display: sessionStorage.getItem('select') ? 'flex' : 'none'}}>
                <div className='text-input'>
                    <input name='text' className= 'text' placeholder='Type message here...' onChange={handleChange}/>
                    <div className='camera-wrapper' onClick={handleUpload}>
                        <img src={url} className='upload-preview' alt=''/>
                        <FaCamera className='camera-icon'/>
                        <input type="file" className="file" accept='images/*' onChange={previewFile}/>
                    </div>
                </div>
                <button onClick={handleSubmit}>Send</button>
            </div>
        </div>
    );
};

export default MessageBox;
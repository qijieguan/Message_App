import { useState } from 'react';
import uuid from 'react-uuid';
import axios from 'axios';

const Album = ({ callRender }) => {

    var user = JSON.parse(sessionStorage.getItem('user'))
    const [files, setFiles] = useState("");  
    const [url, setURL] = useState("");
    const [src, setSRC] = useState("");
    const [render, setRender] = useState(false);


    const readFiles = (files) => {
        if (!files) { return }
        const reader = new FileReader();
        reader.addEventListener("load", () => { setURL(reader.result); setFiles(files) }, false);
        reader.readAsDataURL(files[0]); 
    }

    const previewFile = (event) => { readFiles(event.target.files); };

    const uploadImage = async () => {
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', process.env.REACT_APP_PRESET_NAME);

        await fetch(process.env.REACT_APP_IMAGE_URL + '/image/upload', { method: 'POST', body: data })
        .then(res => res.json()).then(json => {
            axios.post('/users/upload_photo', {
                user_id: user._id,
                url: json.secure_url
            });
        });
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        await uploadImage();
        user.photo_album.push(url);
        sessionStorage.setItem('user', JSON.stringify(user));
        setURL("");
        setFiles("");
        document.querySelector(".file").value="";
        setRender(!render);
    }

    const handleClick = (e) => {
        let checkbox = document.querySelectorAll('.checkbox');
        checkbox.forEach(el => { 
            if (e.currentTarget.id !== el.id) { 
                el.childNodes[1].checked = false; 
                el.childNodes[0].classList.remove('checked');
            }  
        });
        e.currentTarget.childNodes[1].checked = true; 
        e.currentTarget.childNodes[0].classList.add('checked');
        setSRC(e.currentTarget.childNodes[0].src);
    }

    const handleSwitch = async (e) => {
        e.preventDefault();
        if (!src) { return; }
        await axios.post('/users/change_photo', { user_id: user._id, url: src });
        user.image_url = src;
        sessionStorage.setItem('user', JSON.stringify(user));
        setSRC("");
        return callRender();
    }

    return (
        <div className='album-section flex'>
            <div className='album-label-1'>Photo Album</div>
            <form className='upload-box grid' onSubmit={handleUpload}>
                <div>Upload pictures to album</div>
                <input type="file" className="file" accept='images/*' onChange={previewFile} required/>
                <button type='submit'>Upload</button>
            </form>
            <div className='album-label-2'>SELECT A PHOTO TO CHANGE PROFILE</div>
            <form className='album-list grid' onSubmit={handleSwitch}>
                {user.photo_album.length ?
                    user.photo_album.map(photo => 
                        <div className='photo-wrapper checkbox' key={uuid()} id={uuid()} onClick={handleClick}>
                            <img src={photo} alt=""/>
                            <input type="radio" required/>
                        </div>
                    )
                    : <h1>Photo Album is Empty</h1>
                }
                <button type='submit'>CHANGE</button>
            </form>
        </div>
    );
}

export default Album;
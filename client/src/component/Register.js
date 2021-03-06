import './styles/form.css';
import { useState } from 'react';
import axios from 'axios';


const Register = () => {

    const defaultURL = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    const [fname, setFname] = useState(""); 
    const [lname, setLname] = useState("");   
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [files, setFiles] = useState("");  
    const [url, setURL] = useState("");
    const [message, setMessage] = useState("");

    const readFiles = (files) => {
        if (!files) { return }
        const reader = new FileReader();
        reader.addEventListener("load", () => { setURL(reader.result); setFiles(files); }, false);
        reader.readAsDataURL(files[0]); 
    }

    const previewFile = (event) => { readFiles(event.target.files); };

    const uploadImage = async () => {
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', process.env.REACT_APP_PRESET_NAME);

        await fetch(process.env.REACT_APP_IMAGE_URL + '/image/upload', { method: 'POST', body: data })
        .then(res => res.json()).then(json => {
            axios.post('/users/register/', {
                username: username,
                password: password,
                image_url: json.secure_url,
                firstname: fname,
                lastname: lname
            }).then((response) => { 
                axios.post('/friends/init/', { user_id: response.data._id });
                setMessage("User is added!");
                document.querySelector(".register-msg").style.display = 'block'; 
            });
        });
    };

    const handleChange = (event) => {
        if (event.target.name === "firstname") { setFname(event.target.value); }
        else if (event.target.name === "lastname") { setLname(event.target.value); }
        else if (event.target.name === "username") { setUsername(event.target.value); }
        else { setPassword(event.target.value); }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        uploadImage();
        setUsername("");
        setPassword("");
        setURL("");
        setFname("");
        setLname("");
        setFiles([]);
        document.querySelector(".file").value="";
    };

    return(
        <form className="register-form grid" onSubmit={handleSubmit}>
            <h1 className="register-label">Register Your Account</h1>
            <h3 className="register-msg" style={{display: message.length ? 'block' : 'none'}}>{message}</h3>
      
            <div className="input-image">
                <img src={url ? url : defaultURL} className="preview-image" alt=""/>
                <input type="file" className="file" accept='images/*' onChange={previewFile} required/>
            </div>
            <div className='line'/>
            <h1 className='input-label'>First Name</h1>
            <input name="firstname" value={fname} placeholder='Ex. Mike' onChange={handleChange} required/>
            <h1 className='input-label'>Last Name</h1>
            <input name="lastname" value={lname} placeholder='Ex. Hawk' onChange={handleChange} required/>
            <h1 className='input-label'>Username</h1>
            <input name="username" value={username} placeholder="Username/Email" onChange={handleChange} required/>
            <h1 className='input-label'>Password</h1>
            <input type="password" name="password" value={password} placeholder='Atleast 5 Characters' onChange={handleChange} required/>
          
            <button className="register-btn" type='submit'>CREATE NEW ACCOUNT</button>
        </form>
    );
}



export default Register;
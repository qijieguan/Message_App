import './styles/home.css';
import Login from "./Login.js";
import { AiFillCaretDown } from 'react-icons/ai';
import axios from 'axios';
import { useEffect } from 'react';

const Home = () => { 

    var clickSwitch = false;

    useEffect(() => {
        if (!sessionStorage.getItem('visited')) {
            //guestSignIn();
        }   
    }, []);

    
    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    const guestSignIn = async () => {
        await axios.post(baseURL + '/users/login/', { username: 'guest', password: 'password', })
        .then(async (response) => { 
            await axios.get(baseURL + '/users/auth/', { headers: { "x-access-token": response.data } })
            .then(async (response) => {
                if (response.data.auth) {
                    sessionStorage.setItem("isLogged", true);
                    axios.post(baseURL + '/users/load/', { username: 'guest' })
                    .then((response) => { 
                        sessionStorage.setItem("user", JSON.stringify(response.data)); 
                        sessionStorage.setItem('visited', true);
                        window.location.href = "/Dashboard/Post";
                    });
                }
            });
        });
    }

    const handleClick = () => {
        clickSwitch = !clickSwitch;
        if (clickSwitch) {
            document.getElementsByClassName('features-dropdown')[0]?.classList.add("active");
        }
        else {
            document.getElementsByClassName('features-dropdown')[0]?.classList.remove("active"); 
        }
    }

    return ( 
        <div className="home flex">
            <div className='home-intro'>
                <h1>Messaging Application</h1>
                <span>A application for digital networking and communication between users</span>
            </div>
            <div className="home-login"><Login/></div>
            <div className='home-body left home-body-1 flex'>
                <div className='home-text home-text-1 flex'>
                    <h1 className='text-label'>1. Create New Account</h1>
                    <div>
                        Access registration link from login form. 
                    </div><br/>
                    <div>
                        Enter valid credientials to add your account to our system.
                    </div>
                </div>
                <img className='home-image' src="https://cdn.pixabay.com/photo/2021/03/08/12/32/facebook-6078995_960_720.png" alt=""/>
            </div>
            <div className='home-body right home-body-2 flex' style={{marginLeft: 'auto'}}>
                <img className='home-image' src="https://media.istockphoto.com/id/1407212383/photo/concept-of-cyber-security-in-two-step-verification-multi-factor-authentication-information.jpg?b=1&s=170667a&w=0&k=20&c=2TeTgPZk6RjJnlaD7rlLS7JENOsR1qihsID-btv_mQw=" alt=""/>
                <div className='home-text home-text-2 flex'>
                    <h1 className='text-label'>2. Enter Login Credientials</h1>
                    <div>
                        Sign in your new account with your username and password.
                    </div><br/>
                    <div>
                        Authenticate your account to complete login. 
                    </div>
                </div>
            </div>
            <div className='home-body left home-body-3 flex'>
                <div className='home-text home-text-3 flex'>
                    <h1 className='text-label'>3. Ready to Network the World</h1>
                    <div className='feature-wrapper flex' onClick={() => {handleClick()} }>
                        <span>Features</span>
                        <AiFillCaretDown className='arrow-down'/>
                    </div>
                    <ul className='features-dropdown flex'>
                        <li>Find and follow new users</li>
                        <li>Private messaging inside chatbox</li>
                        <li>Customize personal profile</li>
                    </ul>
                </div>
                <img className='home-image' src="https://images.pexels.com/photos/2055500/pexels-photo-2055500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
            </div>
        </div> 
    ); }

export default Home;
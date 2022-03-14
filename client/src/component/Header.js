import './styles/nav.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AiOutlineWechat } from 'react-icons/ai';

const Header = () => {

    const location = useLocation();

    useEffect(() => { 
        window.scrollTo(0,0);
        toggleRipple(); 
        let element = document.getElementById(location.pathname);
        if (element) {
            element.style.color = 'teal'; 
            element.style.borderLeft = '3px solid teal';
            element.style.pointerEvents = 'none';
        }
    }, [location]);

    const toggleRipple = () => {
        let buttons = document.querySelectorAll("button");
        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                let x = e.clientX - e.target.offsetLeft;
                let y = e.clientY - e.target.offsetTop;

                let ripples = document.createElement('span');
                ripples.classList.add("ripples");

                if (this.getBoundingClientRect().width <= 200) { ripples.classList.add('rippleSmall') }
                else if (this.getBoundingClientRect().width <= 400) { ripples.classList.add('rippleMedium') }
                else { ripples.classList.add('rippleLarge') }

                ripples.style.left = x + 'px';
                ripples.style.top = y + 'px';

                this.appendChild(ripples);
            
                setTimeout(() => ripples.remove(), 1000);
            });
        })
    }

    return (
        <> 
            {!sessionStorage.getItem("isLogged") ?
                <header id="App-header">
                    <h1>CHAT APP <AiOutlineWechat size={40} style={{margin: '0 0 8px 8px'}}/></h1>
                    <div id="header-btns">
                        <Link to='/'><button id="login-btn">Login</button></Link>
                        <Link to='/About'><button id="about-btn">About</button></Link>
                    </div>
                </header>
                :
                <div id='header-alt'>
                    <img id="header-img" alt=""/>
                    <h1> Chill <span>n'</span> Chat <span>Freely</span></h1>
                    <div id='header-overlay'/>
                </div>
            }
        </>
    );
}


export default Header;
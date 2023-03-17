import './styles/search.css';
import { useState, useEffect } from "react";
import User from './User.js';
import uuid from 'react-uuid';
import axios from 'axios';
import { FcGlobe } from 'react-icons/fc';
import Menu from './Menu.js';

const Search = () => {

    const [users, setUsers] = useState("");

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    useEffect(() => { axios.get(baseURL + '/users/').then((response) => { setUsers(response.data); }); }, []);

    return(
        <>
            <Menu/>
            <div className="search">
                <div className='search-wrapper grid'>
                    <div className='search-wrapper-label flex'><FcGlobe size={80} style={{marginRight: '1rem'}}/>DISCOVER NEW PEOPLE</div>
                    {users.length > 0 ? users.map(user => <User key={uuid()} user={user}/>) : ""} 
                </div>
            </div>
        </>
    );
}

export default Search;
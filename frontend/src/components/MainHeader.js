import { useCallback } from 'react';
import UserService from '../Services/userService';
import authService from '../Services/authService';
import UserData from '../models/UserData';

export default function MainHeader({ setUser = (username) => { }, isLoggedIn = false }) {
    const handleEnter = (e) => {
        //13 is the key code for Enter
        if (e.keyCode === 13) {
            Login(e.target.value);
        }
    };

    const onLogin = (e) => {
        const username = document.getElementById("username")?.value;
        Login(username);
    };

    const onLogOut = useCallback((e) => {
        authService.removeUser();
        setUser(new UserData());
    }, [setUser]);

    const Login = useCallback((username) => {
        UserService.Login(username)
            .then((res) => res.json())
            .then((user) => {
                const userData = new UserData(user);
                authService.setUser(JSON.stringify(user));
                setUser(userData);
            })
            .catch((error) => console.log(error));
    }, [setUser]);

    return (
        <header>
            <a href="/" className="main-link px-3 mx-4">
                <img className="me-2" src="https://placehold.co/64" alt="profile" width="64"
                    height="64" />
                Home
            </a>
            {
                !isLoggedIn
                    ?
                    <div>
                        <input className="mx-2" type="password" id="username" onKeyUp={(e) => handleEnter(e)} />
                        <button className="me-2" type="button" onClick={(e) => onLogin(e)}>Log In</button>
                    </div>
                    :
                    <button className="me-2" type="button" onClick={(e) => onLogOut(e)}>Log Out</button>
            }
        </header>
    );
}
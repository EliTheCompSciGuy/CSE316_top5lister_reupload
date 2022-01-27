import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'

export default function SplashScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const history = useHistory();
    function login(){
        history.push("/login/");
    }

    function create(){
        history.push("/register/");
    }

    function guest(){
        const user = {
            email: "Guest@guest.com",
            password: "password",
            user:"Guest"
        }
        auth.continueAsGuest(user, store)
    }
    
    return (
        <div id="splash-screen">
            <div id ="splash-screen-title">
                Welcome to The Top 5 Lister<br />
                By Elijah Harris <br />
            </div>
            <div id ="splash-screen-description">
                This site aims to give people a platforrm to organize <br />
                and share their preferences. <br />
                You can make a Top 5 List of whatever you want! <br />
                Games? Food? Programming Languages? <br />
                The possibilities are endless! <br />
                You can also engage with other peoples' created lists as well. <br />
            </div>
            <Button
                    style={{
                        borderRadius: 10,
                        backgroundColor: "#abdba0",
                        fontSize: "24px",
                        color: "black"
                    }}
                    id='create-button'
                    variant="contained"
                    onClick={create}>
                        Create Account
                </Button>
                <Button
                    style={{
                        borderRadius: 10,
                        backgroundColor: "#abdba0",
                        fontSize: "24px",
                        color: "black"
                    }}
                    id='login-button'
                    variant="contained"
                    onClick={login}>
                        Log In
                </Button>
                <Button
                    style={{
                        borderRadius: 10,
                        backgroundColor: "#abdba0",
                        fontSize: "24px",
                        color: "black"
                    }} 
                    id='guest-button'
                    variant="contained"
                    onClick={guest}>
                        Continue As Guest
                </Button>
        </div>
    )
}
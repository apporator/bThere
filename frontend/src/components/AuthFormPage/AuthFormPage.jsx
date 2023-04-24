import { useDispatch, useSelector } from 'react-redux';
import './AuthFormPage.css'
import { useEffect, useState } from 'react';
import {isValidEmail, logIt} from '../../util/util'
import { login, signup } from '../../store/session';
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'

export default function AuthFormPage (props) {

    const {mode} = props;
    // console.log(mode, "MODE");

    // debugger;
    const sessionUser = useSelector((state) => (state.session.user))

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);


    
    
    const dispatch = useDispatch();

    if (sessionUser) return <Redirect to="/" />;

    function handleSubmit (e) {
        // e.preventDefault(); 
        console.log(mode, "MODE!");
        // try {
            if(!e) {
                console.log("fake login");
                dispatch(login('test@gmail.com', '1234567'));
            }
            else if(mode === 'login') {
                e.preventDefault(); 
                console.log("attempting login");
                dispatch(login(email, password)).catch((res) => res.json()).then((data) => {console.log(data)});
            } else if (mode === 'signup') {
                e.preventDefault(); 
                console.log("attempting signup");
                dispatch(signup(email, password));
            }
   
    }
    return (
        <div className="wrapper">
            <div className='auth-body'>
               <div className="auth-pane">
                    <div className="auth-header">
                        <img className='logo' src={logo}/>
                        Sign in to your account <br/>
                        Or sign up free
                    </div>
                    <div className="auth-form">
                    <form onSubmit={handleSubmit} >
                        <div className="form-fields">
                            <span className='auth-element'>
                                <label htmlFor='email'>EMAIL ADDRESS</label>
                                <input type='text' id='email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
                            </span>
                            <span className='auth-element'>
                                <label htmlFor='password'>PASSWORD</label>
                                <input type='password' id='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                            </span>
                            <span className='auth-element'>
                                <input className='auth-button' type='submit' value='Login'/>
                            </span>
                        </div>
                    </form>
                    <span className='auth-element'>
                        <button className='auth-button' onClick={() => (handleSubmit(false))}>Demo User Login</button>
                    </span>
                    </div>
                    <span className='error-msg'>Errors</span>
               </div>
            </div>
        </div>
    );
}


     // } catch (error) {
        //     console.log("there was an error");
        // }

        // let validEmail = isValidEmail(email);
        // let validPassword = password.length >= 7;
        // setErrors([]);
        
        // if (validEmail && validPassword) {
        //     if (mode === "login") {
        //         console.log("logging in")
        //         dispatch(login(email, password));
        //     } else if (mode === "signup") {
        //         console.log("signing in")
        //         dispatch(signup(email, password));
        //     } else {
        //         throw "invalid mode";
        //     }
        // } else if (!validEmail && !validPassword) {
        //     console.log("seconds");
        //     setErrors(['Please retry with a valid email and a password longer than 6 characters.']);
        // } else if (!validEmail) {
        //     setErrors(['Please retry with a valid email.'])
        // } else if(!validPassword) {
        //     setErrors(['Please retry with a password longer than 7 characters.']);
        // }
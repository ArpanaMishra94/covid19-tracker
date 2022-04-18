import React, { useState } from 'react'
import './LoginPage.css';
import { auth } from "./firebase";
import {useHistory} from 'react-router';

function LoginPage() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[hasAccount, setHasAccount] = useState(false);
     
    const signIn = e => {
        e.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth) {
                    history.push("/appContent")
                    document.location.reload()
                }
            })
            .catch(error => alert(error.message))

    }
    
    const register = e => {
        e.preventDefault();
        auth
           .createUserWithEmailAndPassword(email, password)
           .then((auth) => {
               if (auth) {
                   history.push("/appContent")
                   document.location.reload()
               }
           })
           .catch(error => alert(error.message))
    } 

    return (
        <section className="login">
          <div className="loginContainer">
            <h1>Covid19 Tracker</h1>
                <label>UserName</label>
                <input type="text" value = {email} onChange = {e => setEmail(e.target.value)} />
                {/* <p className="errorMsg"></p> */}
                <label>Password</label>
                <input type="password" value = {password} onChange = {e => setPassword(e.target.value)} />
                {/* <p className="errorMsg"></p> */}
                <div className="btnContainer"> 
                {hasAccount ? (
                    <>
                    <button type = "submit" onClick={signIn}>Sign in</button>
                    <p>Don't have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
                    </>
                ):(
                    <>
                    <button onClick={register}>Sign up</button>
                     <p>Have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>
                    </>
                )

                }
             </div>
            </div>
        </section>
    )
}

export default LoginPage

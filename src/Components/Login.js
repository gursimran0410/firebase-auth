import React, {useCallback, useContext} from 'react'
import {withRouter, Redirect} from 'react-router'
import {Link} from 'react-router-dom' 
import app from '../firebaseConfig/firebaseConfig'
import 'firebase/firestore'
import firebase from 'firebase'
import {AuthContext} from './auth'

var db = app.firestore()
var provider = new firebase.auth.GoogleAuthProvider()

const Login = ({history}) => {

    const handleLogin = useCallback(
        async event => {
            event.preventDefault()
            const {email,password} = event.target.elements
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value,password.value)
                history.push("/")
            }catch (error){
                alert(error)
            }
        },[history])

    const handleGoogleSignIn = useCallback(
        async event => {
            event.preventDefault()
            try {
                await app
                    .auth()
                    .signInWithPopup(provider)
                history.push("/")
            } catch (error){
                alert(error)
            }
        },[history])

    const {currentUser} = useContext(AuthContext)

    if(currentUser){
        return <Redirect to="/" />
    }

    return (
        <div style={{maxWidth:"40%",margin:"10px 33% auto auto"}}>
            <fieldset>
                <legend>Sign In</legend>
                <form onSubmit={handleLogin} style={{padding:"20px"}} method="post">
                    <label>
                        Email:
                        <input name="email" type="email" placeholder="Email" />
                    </label>
                    <br/><br/>
                    <label>
                        Password:
                        <input name="password" type="password" placeholder="Password" />
                    </label>
                    <br/><br/>
                    <button type="submit">Log In</button>
                    <br/><br/>
                    <button onClick={handleGoogleSignIn}>Sign In With Google</button>
                    <br/><br/>
                    <Link to="/signup" style={{textDecoration: 'none', fontSize: "15px"}}>Don't Have An Account?</Link>
                </form>
            </fieldset>
        </div>
    )
}

export default withRouter(Login)
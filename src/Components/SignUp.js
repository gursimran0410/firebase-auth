import React, {useCallback} from 'react'
import app from '../firebaseConfig/firebaseConfig'
import {Link} from 'react-router-dom' 
import 'firebase/firestore'
import firebase from 'firebase'

var db = app.firestore()
var provider = new firebase.auth.GoogleAuthProvider()

const SignUp = ({history}) => {

const handleSignUp = useCallback(async event => {
    event.preventDefault()
    const {email,password} = event.target.elements
    try{
        await app
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then(()=>{
                db.collection("users").add({
                    name: email.value,
                    item1: 0,
                    item2: 0
                })
            })
            history.push('/')
        }   catch (error) {
            alert(error)
        }
    }, [history])

const handleGoogleSignIn = useCallback(
    async event => {
        event.preventDefault()
        try {
            await app
                .auth()
                .signInWithPopup(provider)
                .then(result => {
                    db.collection("users").add({
                        name: result.user.email,
                        item1: 0,
                        item2: 0
                    })
                })
            history.push("/")
        } catch (error){
            alert(error)
        }
    },[history])

    return (
        <div style={{maxWidth:"40%",margin:"10px 33% auto auto"}}>
            <fieldset>
                <legend>Sign Up</legend>
                <form onSubmit={handleSignUp} style={{padding:"20px"}} method="post">
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
                    <button type="submit">Sign Up</button>
                    <br/><br/>
                    <button onClick={handleGoogleSignIn}>Sign In With Google</button>
                    <br/><br/>
                    <Link to="/login" style={{textDecoration: 'none', fontSize: "15px"}}>Already Have An Account?</Link>
                </form>
            </fieldset>
        </div>
    )
}

export default SignUp
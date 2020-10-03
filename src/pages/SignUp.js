import React, { useState, useContext } from "react";
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Card, Logo, Form, Input, Button} from '../components/AuthForm';
import { AuthContext } from '../context/auth'
import firebaseApp from '../services/firebase'

export const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const history = useHistory();
    const { currentUser, setCreatedProfile } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to={'/'} />
    }

    function validateForm() {
        return email.length > 4 && password.length > 4 && passwordVerify.length > 4;
    }

    const handleSignUp = () => {
        if (password !== passwordVerify) {
            alert("Those passwords didn't match. Try again.")
            return;            
        }
        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
        .catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/weak-password') {
                alert('The password is too weak.');
            } else if (errorCode === 'auth/email-already-in-use') {
                alert('Already exists an account with the given email address.');
            } else if (errorCode === 'auth/invalid-email') {
                alert ('Email address is not valid.');
            } else if (errorCode === 'auth/operation-not-allowed') {
                alert ('Email/password accounts are not enabled.'); 
            } else {
                alert(errorMessage);
            }
        }).then(() => {setCreatedProfile(false); history.push('/createProfile')})
    }

    return (
        <Card>
            <Logo src={process.env.REACT_APP_SIGNUP_PHOTO}/>
            <Form>
                <Input type="email" value={email} onChange={e => {setEmail(e.target.value)}} placeholder="email" autoFocus/>
                <Input type="password" value={password} onChange={e => {setPassword(e.target.value)}} placeholder="password" />
                <Input type="password" value={passwordVerify} onChange={e => {setPasswordVerify(e.target.value)}} placeholder="password again" />
                <Button block disabled={!validateForm()} onClick={handleSignUp} type="submit">Sign Up</Button>
            </Form>
            <Link to="/login">Already have an account?</Link>
        </Card>
    );
}


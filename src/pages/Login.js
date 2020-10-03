import React, { useState, useContext } from "react";
import { Link, useHistory, Redirect } from 'react-router-dom';
import { Card, Logo, Form, Input, Button } from '../components/AuthForm';
import firebaseApp from '../services/firebase'
import { AuthContext } from '../context/auth'

export const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {referer} = props.location.state || {referer: {pathname: '/'}};
    const history = useHistory();
    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to={referer.pathname} />
    }

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleLogin() {
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
        .catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Password is invalid for the given email, or the account corresponding to the email does not have a password set.');
            } else if (errorCode === 'auth/user-disabled') {
                alert('User corresponding to the given email has been disabled.');
            } else if (errorCode === 'auth/invalid-email') {
                alert ('Email address is not valid.');
            } else if (errorCode === 'auth/user-not-found') {
                alert ('There is no user corresponding to the given email.'); 
            } else {
                alert(errorMessage);
            }
        }).then(() => history.push(referer.pathname))
    }

    return (
        <Card>
            <Logo src={process.env.REACT_APP_LOGIN_PHOTO}/>
            <Form>
                <Input type="email" value={email} onChange={e => {setEmail(e.target.value)}} placeholder="email" autoFocus/>
                <Input type="password" value={password} onChange={e => {setPassword(e.target.value)}} placeholder="password" />
                <Button block disabled={!validateForm()} onClick={handleLogin} type="submit">Sign In</Button>
            </Form>
            <Link to="/signup">Don't have an account?</Link>
        </Card>
    );
}

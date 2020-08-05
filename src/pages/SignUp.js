import React, { useState, useContext } from "react";
import { Link, useHistory, Redirect } from 'react-router-dom';
import { Card, Logo, Form, Input, Button} from '../components/AuthForm';
import firebaseApp from '../firebase'
import { AuthContext } from '../context/auth'

export const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const history = useHistory();

    function validateForm() {
        return email.length > 0 && password.length > 0 && password === passwordVerify;
    }

    const handleSignUp = () => {
        try {
            firebaseApp.auth().createUserWithEmailAndPassword(email, password);
            history.push('/');
        } catch(error) {
            alert(error);
        }
    }

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to={'/'} />
    }

    return (
        <Card>
            <Logo src="https://www.getminute.com/wp-content/uploads/2016/06/signup-blue.png"/>
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


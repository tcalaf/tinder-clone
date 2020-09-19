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

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleLogin() {
        try {
            firebaseApp.auth().signInWithEmailAndPassword(email, password);
            history.push(referer.pathname);
        } catch(error) {
            alert(error);
        }

    }

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to={referer.pathname} />
    }

    return (
        <Card>
            <Logo src="https://image.flaticon.com/icons/png/512/295/295128.png"/>
            <Form>
                <Input type="email" value={email} onChange={e => {setEmail(e.target.value)}} placeholder="email" autoFocus/>
                <Input type="password" value={password} onChange={e => {setPassword(e.target.value)}} placeholder="password" />
                <Button block disabled={!validateForm()} onClick={handleLogin} type="submit">Sign In</Button>
            </Form>
            <Link to="/signup">Don't have an account?</Link>
        </Card>
    );
}

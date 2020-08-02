import React, { useState } from "react";
import "./Login.css";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import database from './firebase'
import { useAppContext } from "./libs/contextLib";
import { useHistory } from "react-router-dom";

export const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { userHasAuthenticated } = useAppContext();
    const history = useHistory();

    function validateForm() {
        return email.length > 0 && password.length > 0;
      }

    function handleSubmit(event) {
        event.preventDefault();
        userHasAuthenticated(true);
        const {from} = props.location.state || {from: {pathname: '/'}};
        history.push(from.pathname);
        /*
        const user = {
            email: email,
            password: password,
        }
        database.collection('newUsers').add(user)
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });*/
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <Button block disabled={!validateForm()} type="submit">
                    Login
                </Button>                
            </form>
        </div>
    );
}

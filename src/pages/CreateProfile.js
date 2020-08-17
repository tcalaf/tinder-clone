import React, {useContext, useState} from 'react';
import { Card, Logo, Form, Input, Button} from '../components/AuthForm';
import { Link, useHistory} from 'react-router-dom';
import { AuthContext } from '../context/auth';
import firebaseApp from '../firebase'

export const CreateProfile = () => {
    const { currentUser } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [age, setAge] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const history = useHistory();

    function validateForm() {
        return name.length > 0 && age.length > 0 && location.length > 0 && profilePic.length > 0;
    }

    const handleSignUp = () => {
        let uid = currentUser.uid;
        firebaseApp.firestore().collection('people').doc(uid).set({id:uid, name:name, location:location, age:age, url:profilePic});
        history.push('/');
    }

    return (
        <Card>
            <Logo src="https://static.thenounproject.com/png/736591-200.png"/>
            <Form>
                <Input value={name} onChange={e => {setName(e.target.value)}} placeholder="Name" autoFocus/>
                <Input type="number" value={age} onChange={e => {setAge(e.target.value)}} placeholder="Age" />
                <Input value={location} onChange={e => {setLocation(e.target.value)}} placeholder="Location" />
                <Input value={profilePic} onChange={e => {setProfilePic(e.target.value)}} placeholder="Profile Picture" />
                <Button block disabled={!validateForm()} onClick={handleSignUp} type="submit">Create Profile</Button>
            </Form>
            <Link to="/login">Already have an account?</Link>
        </Card>
    );
}

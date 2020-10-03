import React, {useContext, useEffect, useState } from 'react';
import { Card, Logo, Form, Input, Button, Select} from '../components/AuthForm';
import { Redirect, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import {storage, usersCollection, createdProfileCollection} from '../services/firebase'
import { Beforeunload } from 'react-beforeunload';
import getCoordinates from "../helpers/Geolocation"

export const CreateProfile = (props) => {
    const { currentUser, createdProfile, setCreatedProfile } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState(null);
    const [gender, setGender] = useState(null);
    const [file, setFile] = useState(null);
    const history = useHistory();
    const {referer} = props.location.state || {referer: {pathname: '/'}};

    useEffect(() => {
        if(currentUser && createdProfile === false) {
            createdProfileCollection.doc(currentUser.uid).set({createdProfile : false});
        }
    },[createdProfile, currentUser])

    if (!currentUser) {      
        return <Redirect to={'/signup'} />
    } else if (currentUser && createdProfile === true) {
        return <Redirect to={referer.pathname} />
    }

    const checkAge = age => {
        return age >= 18 ? true : false;
    }

    const computeAge = birthDate => {
        const bDay  = new Date(birthDate);
        const age = ~~ ((Date.now() - bDay) / (31557600000));
        return age;
    }

    function validateForm() {
        return name.length > 0 && gender != null && birthday != null && file !== null;
    }

    const getPicture = () => {
        const storageRef = storage.ref(`/images/${currentUser.uid}`);
        storageRef.put(file).then(() => storageRef.getDownloadURL().then(result => usersCollection.doc(currentUser.uid).set({url: result}, {merge: true})));
    }

    const handleSignUp = () => {
        if (!checkAge(computeAge(birthday))) {
            alert("Sorry, but you are too young! You need to be over 18 to access this website!");
            return;
        }
        let uid = currentUser.uid;
        getCoordinates(currentUser.uid);
        getPicture();
        usersCollection.doc(uid).set({id:uid, name:name, gender:gender, age:computeAge(birthday), swiped:[]}, {merge: true});
        createdProfileCollection.doc(uid).update({createdProfile : true});
        setCreatedProfile(true);
        history.push('/');
    }

    return (
        <Beforeunload onBeforeunload={() => {return "You'll lose your data!";}}>
            <Card>
                <Logo src={process.env.REACT_APP_CREATE_PROFILE_PHOTO}/>
                <Form>
                    <Input value={name} onChange={e => {setName(e.target.value)}} placeholder="Full Name" autoFocus/>
                    <Select defaultValue={'DEFAULT'} onChange={e => {setGender(e.target.value)}}> 
                        <option value="DEFAULT" hidden disabled>Gender</option>
                        <option value="male">Male</option> <option value="female">Female</option> </Select>
                    <Input type="date" onChange={e => {setBirthday(e.target.value)}} placeholder="Age" />
                   <Input type="file" onChange={e => {setFile(e.target.files[0])}} placeholder="Profile Picture" />
                    <Button block disabled={!validateForm()} onClick={handleSignUp} type="submit">Create Profile</Button>
                </Form>
            </Card>
        </Beforeunload>
    );
}

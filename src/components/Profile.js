import React, { useContext, useEffect ,useState } from 'react'
import './Profile.css'
import { AuthContext } from '../context/auth';
import {usersCollection} from '../services/firebase'

const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const [user, setUser] = useState([]);

    useEffect(() => {
        usersCollection.doc(currentUser.uid).get().then(doc => setUser(doc.data()));
    }, [currentUser.uid])
    
    return (
        <>
            <div className="profile__header">
                <h1>Hello, {user.name}</h1>
                <p>This is how people will see you</p>
            </div>
            <div className="profile__tinderCard">
                <div style = {{backgroundImage: `url(${user.url})`}} className="card"> 
                    <h3>{user.name}, {user.age}</h3>
                    <br />
                    <h4>{user.location}</h4>
                </div>
            </div>
        </>
    )
}

export default Profile
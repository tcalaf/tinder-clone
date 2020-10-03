import React,{ useState, useEffect, useContext} from 'react'
import TinderCard from "react-tinder-card"
import './TinderCards.css'
import {usersCollection} from '../services/firebase'
import { AuthContext } from '../context/auth'
import SwipeButtons from "../components/SwipeButtons"
import handleSwipe from "../helpers/HandleSwipe"

const TinderCards = () => {
    const [people, setPeople] = useState([]);
    const [currentUserAlreadySwiped, setCurrentUserAlreadySwiped] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        usersCollection.get().then(collection => setPeople(collection.docs.map(doc => doc.data())));
        const userDocRef = usersCollection.doc(currentUser.uid);
        const unsubscribe = userDocRef.onSnapshot(function(doc) {
            if (doc.exists) {
                setCurrentUserAlreadySwiped(doc.data().swiped);
            }
        }) 

        return () => {
            unsubscribe();
        }
    }, [currentUser.uid]);

    const hasAlreadyBeenSwiped = (person) => {
        if (!notYouself(person)) {
            return false;
        } else {
            let personId = person.id;
            return !currentUserAlreadySwiped.includes(personId) ? true : false;       
        }
    }

    const notYouself = (person) => {
        return person.id !== currentUser.uid ? true : false
    }

    return (
        <div className="pe">
            <div className="tinderCards__cardContainer">
                { people.filter(hasAlreadyBeenSwiped)
                  .map((person) => (
                    <React.Fragment key={person.id} >
                        <TinderCard className="swipe" 
                            onSwipe={direction => handleSwipe(direction, person, currentUser.uid)} 
                            preventSwipe={['up', 'down']}>

                            <div style = {{backgroundImage: `url(${person.url})`}} className="card"> 
                                <h3>{person.name}, {person.age}</h3>
                                <br />
                                <h4>{person.location}</h4>
                            </div>
                        </TinderCard>
                        <SwipeButtons person={person} currentUserUID={currentUser.uid}/>
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default TinderCards

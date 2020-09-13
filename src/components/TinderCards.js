import React,{ useState, useEffect, useContext } from 'react'
import TinderCard from "react-tinder-card"
import './TinderCards.css'
import firebaseApp from '../firebase'
import { AuthContext } from '../context/auth'
import firebase from "firebase";

const TinderCards = () => {
    const [people, setPeople] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const collection = firebaseApp.firestore().collection('people');

    useEffect(() => {

        collection.get().then(collection => setPeople(collection.docs.map(doc => doc.data())));

    }, [collection]);


    const handleSwipeRight = (personId) => {
        collection.doc(currentUser.uid).update({matches: firebase.firestore.FieldValue.arrayUnion(personId)});
        let personMatches;
        let docRef = collection.doc(personId);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                personMatches = doc.data().matches;
                if(personMatches.includes(currentUser.uid)) {
                    console.log("match");
                }             
            }
        })
    }

    return (
        <div>
            <div className="tinderCards__cardContainer">
                { people.filter(person => (person.id !== currentUser.uid? true : false))
                  .map((person) => (
                    <TinderCard className="swipe" key={person.name} 
                        onSwipe={direction => (direction === 'right' && handleSwipeRight(person.id))} 
                        preventSwipe={['up', 'down']}>

                        <div style = {{backgroundImage: `url(${person.url})`}} className="card"> 
                            <h3>{person.name}, {person.age}</h3>
                            <br />
                            <h4>{person.location}</h4>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </div>
    )
}

export default TinderCards

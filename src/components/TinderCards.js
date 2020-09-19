import React,{ useState, useEffect, useContext} from 'react'
import TinderCard from "react-tinder-card"
import './TinderCards.css'
import firebaseApp from '../services/firebase'
import { AuthContext } from '../context/auth'
import firebase from "firebase";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const TinderCards = () => {
    const [people, setPeople] = useState([]);
    const [currentUserAlreadySwiped, setCurrentUserAlreadySwiped] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const collection = firebaseApp.firestore().collection('people');
    const matches = firebaseApp.firestore().collection('matches').doc('matches');

    useEffect(() => {
        const collection = firebaseApp.firestore().collection('people');
        collection.get().then(collection => setPeople(collection.docs.map(doc => doc.data())));
        const userDocRef = collection.doc(currentUser.uid);
        userDocRef.get().then(function(doc) {
            if (doc.exists) {
                setCurrentUserAlreadySwiped(doc.data().swiped);
            }
        }) 
    }, [currentUser.uid]);

    const popUpMatch = (person) => {
        let name = person.name;
        alertify.alert('Congrats!', name + " also likes you!", function(){ 
            alertify.success('You can now start chatting!'); 
        });
        firebaseApp.firestore().collection('chats').doc(currentUser.uid).collection('users').doc(person.id).set({messages: []});
        firebaseApp.firestore().collection('chats').doc(person.id).collection('users').doc(currentUser.uid).set({messages: []});
    }

    const handleSwipeRight = (person) => {
        const personId = person.id;
        collection.doc(currentUser.uid).update({swiped: firebase.firestore.FieldValue.arrayUnion(personId)}); //TODO Reuse for swipe left(must optimize)
        matches.set({[currentUser.uid + '&' + personId] : true}, {merge: true});
        matches.get().then(doc => {
            const data = doc.data();
            const match = personId + '&' + currentUser.uid;
            if(data[match]) {
                console.log("match");
                popUpMatch(person);
            }
        })
        
    }

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
        <div>
            <div className="tinderCards__cardContainer">
                { people.filter(hasAlreadyBeenSwiped)
                  .map((person) => (
                    <TinderCard className="swipe" key={person.name} 
                        onSwipe={direction => (direction === 'right' && handleSwipeRight(person))} 
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

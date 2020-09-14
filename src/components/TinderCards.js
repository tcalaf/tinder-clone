import React,{ useState, useEffect, useContext} from 'react'
import TinderCard from "react-tinder-card"
import './TinderCards.css'
import firebaseApp from '../firebase'
import { AuthContext } from '../context/auth'
import firebase from "firebase";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const TinderCards = () => {
    const [people, setPeople] = useState([]);
    const [currentUserLiked, setCurrentUserLiked] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const collection = firebaseApp.firestore().collection('people');

    useEffect(() => {
        const collection = firebaseApp.firestore().collection('people');
        collection.get().then(collection => setPeople(collection.docs.map(doc => doc.data())));
        const userDocRef = collection.doc(currentUser.uid);
        userDocRef.get().then(function(doc) {
            if (doc.exists) {
                setCurrentUserLiked(doc.data().liked);
            }
        }) 
    },[currentUser.uid]);

    const popUpMatch = (person) => {
        let name = person.name;
        alertify.alert('Congrats!', name + " also likes you!", function(){ 
            alertify.success('You can now start chatting!'); 
        });
    }

    const handleSwipeRight = (person) => {
        const personId = person.id;
        collection.doc(currentUser.uid).update({liked: firebase.firestore.FieldValue.arrayUnion(personId)});
        let personMatches;
        let docRef = collection.doc(personId);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                personMatches = doc.data().liked;
                if(personMatches.includes(currentUser.uid)) {
                    console.log("match");
                    popUpMatch(person);
                }             
            }
        })
    }

    const hasAlreadyBeenSwiped = (person) => {
        if (!notYouself(person)) {
            return false;
        } else {
            let personId = person.id;
            //console.log(currentUserLiked);
            //console.log(personId);
            return !currentUserLiked.includes(personId) ? true : false;       
        }
    }

    const notYouself = (person) => {
        return person.id !== currentUser.uid ? true : false
    }

    // console.log(people);

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

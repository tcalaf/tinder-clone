import {usersCollection, matchesCollection, chatsCollection} from '../services/firebase'
import firebase from "firebase";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const handleSwipe = (direction, person, currentUserUID) => {
    if(direction === 'right' || direction === 'left') {
        usersCollection.doc(currentUserUID).update({swiped: firebase.firestore.FieldValue.arrayUnion(person.id)});
    }
    if (direction === 'right') {
        handleSwipeRight(person, currentUserUID);
    }
}

const handleSwipeRight = (person, currentUserUID) => {
    const personId = person.id;
    matchesCollection.set({[currentUserUID + '&' + personId] : true}, {merge: true});
    matchesCollection.get().then(doc => {
        const data = doc.data();
        const match = personId + '&' + currentUserUID;
        if(data[match]) {
            popUpMatch(person, currentUserUID);
        }
    })
    
}

const popUpMatch = (person, currentUserUID) => {
    let name = person.name;
    alertify.alert('Congrats!', name + " also likes you!", function(){ 
        alertify.success('You can now start chatting!'); 
    });
    chatsCollection.doc(currentUserUID).collection('users').doc(person.id).set({messages: [], timestamp: Date.now()});
    chatsCollection.doc(person.id).collection('users').doc(currentUserUID).set({messages: [], timestamp: Date.now()});
}

export default handleSwipe;
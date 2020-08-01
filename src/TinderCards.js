import React,{ useState, useEffect } from 'react'
import TinderCard from "react-tinder-card"
import './TinderCards.css'
import database from './firebase'

const TinderCards = () => {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        const unsubscribe = database.collection('people').onSnapshot(snapshot => (
            setPeople(snapshot.docs.map(doc => doc.data()))
        ))

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <div>
            <div className="tinderCards__cardContainer">
                {people.map((person) => (
                    <TinderCard
                        className="swipe"
                        key={person.name}
                        preventSwipe={['up', 'down']}
                    >
                        <div 
                            style = {{backgroundImage: `url(${person.url})`}}
                            className="card"
                        > 
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

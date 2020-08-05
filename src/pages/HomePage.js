import React from 'react'
import Header from '../components/Header';
import TinderCards from "../components/TinderCards";
import SwipeButtons from "../components/SwipeButtons"

export const HomePage = () => {
    return (
        <>
            <Header />
            <TinderCards />
            <SwipeButtons />
        </>
    )
}

import React from 'react'
import Header from './Header';
import TinderCards from "./TinderCards";
import SwipeButtons from "./SwipeButtons"

export const HomePage = () => {
    return (
        <>
            <Header />
            <TinderCards />
            <SwipeButtons />
        </>
    )
}

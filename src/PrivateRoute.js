// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from './context/auth';

export const PrivateRoute = ({component: Component, ...rest }) => {
    const {currentUser} = useContext(AuthContext);
    
    return (
        <Route
            {...rest}
            render={props => currentUser ? 
                <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { referer: props.location } }} />}
        />
    )
}
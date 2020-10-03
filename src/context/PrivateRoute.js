import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from './auth';

export const PrivateRoute = ({component: Component, ...rest }) => {
    const {currentUser, createdProfile} = useContext(AuthContext);
    
    return (
        <Route
            {...rest}
            render={props => 
                currentUser && createdProfile? 
                    <Component {...props} />
                : currentUser && !createdProfile?
                    <Redirect to={{ pathname: '/createProfile', state: { referer: props.location } }} />
                :
                    <Redirect to={{ pathname: '/login', state: { referer: props.location } }} />
            }/>
    )
}
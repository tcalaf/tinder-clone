import React from 'react'
import './Header.css'
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import {Link, useHistory} from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import firebaseApp from '../services/firebase';

const Header = ({backButton, signOutButton}) => {
    const history = useHistory();

    return (
        <div className="header">
            {backButton ? (
                <IconButton onClick ={() => history.replace(backButton)}>
                    <ArrowBackIosIcon fontSize="large" className="header__icon" />
                </IconButton>
            ) : (
                <Link to="/profile">
                    <IconButton>
                        <PersonIcon className="header__icon" fontSize="large"/>
                    </IconButton>
                </Link>
            )}

            <Link to="/">
                <img 
                className="header__logo"
                src="https://image.freepik.com/free-vector/illustration-medical-icon_53876-6166.jpg" 
                alt="app logo"/>
            </Link>

            {signOutButton ? (
                <IconButton>
                    <ExitToAppIcon className="header__icon" fontSize="large" onClick={() => firebaseApp.auth().signOut()}/>
                </IconButton>
            ) : (
                <Link to="/chat">
                    <IconButton>
                        <ForumIcon className="header__icon" fontSize="large"/>
                    </IconButton>
                </Link>
            )}
                
        </div>
    )
}
export default Header

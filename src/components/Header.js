import React from 'react'
import './Header.css'
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import {Link, useHistory} from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import firebaseApp from '../services/firebase';
import HeadRoom from 'react-headroom'

const Header = ({backButton, signOutButton}) => {
    const history = useHistory();

    return (
        <HeadRoom>
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
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Coeur_Heart_Blue.png" 
                    alt="app logo"/>
                </Link>

                {signOutButton ? (
                    <IconButton onClick={() => firebaseApp.auth().signOut()}>
                        <ExitToAppIcon className="header__icon" fontSize="large"/>
                    </IconButton>
                ) : (
                    <Link to="/chat">
                        <IconButton>
                            <ForumIcon className="header__icon" fontSize="large"/>
                        </IconButton>
                    </Link>
                )}
                    
            </div>
        </HeadRoom>
    )
}
export default Header

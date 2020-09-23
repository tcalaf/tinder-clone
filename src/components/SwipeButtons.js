import React from 'react'
import './SwipeButtons.css'
import CloseIcon from '@material-ui/icons/Close';
import StarRateIcon from '@material-ui/icons/StarRate';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from "@material-ui/core/IconButton";
import handleSwipe from "../helpers/HandleSwipe"

const SwipeButtons = ({person, currentUserUID}) => {
    return (
        <div className="swipeButtons">
            <IconButton className="swipeButtons__left" onClick={() => handleSwipe('left', person, currentUserUID)}>
                <CloseIcon fontSize="large" />
            </IconButton>        
            <IconButton className="swipeButtons__star" onClick={() => alert("TODO:")}>
                <StarRateIcon fontSize="large" />
            </IconButton> 
            <IconButton className="swipeButtons__right" onClick={() => handleSwipe('right', person, currentUserUID)}>
                <FavoriteIcon fontSize="large" />
            </IconButton> 
        </div>

    )
}

export default SwipeButtons;

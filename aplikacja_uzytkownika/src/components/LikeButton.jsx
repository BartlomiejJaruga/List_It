import React from 'react';
import '../styles/LikeButton.css';

const LikeButton = ({ likes, onLike }) => {
    return (
        <div className="like_containter">
            <h2 className={`like_counter ${ likes > 0 ? "like_counter_red" : ""} `}>{likes}</h2>
            <button className={`like_button ${ likes > 0 ? "like_button_given" : ""} `} onClick={onLike}>
                { likes > 0
                ? <i className="fa fa-heart fa-inverse" aria-hidden="true" />
                : <i className="fa fa-heart-o fa-inverse" aria-hidden="true" /> }
            </button>
            
        </div>
        
    );
};

export default LikeButton;

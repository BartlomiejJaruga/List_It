import React from 'react';
import '../styles/EventDetails.css';

const EventDetails = ({ isExpanded, date, time, location }) => {
    return (
        <div className="event-details">
            <div className="event_details_date_and_time">
                {isExpanded ? <h5>Kiedy?</h5> : ""}
                <h5>{date}</h5>
                {isExpanded ? <h5>{time}</h5> : ""}
            </div>
            <div className="event_datails_place">
                {isExpanded ? <h5>Gdzie?</h5> : ""}
                <h5>{location}</h5>
            </div>
        </div>
    );
};

export default EventDetails;

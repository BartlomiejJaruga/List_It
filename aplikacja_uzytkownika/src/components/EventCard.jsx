import React, {useEffect, useRef} from 'react';
import EventDetails from './EventDetails';
import CommentsSection from './CommentsSection';
import LikeButton from './LikeButton';
import '../styles/EventCard.css';

const EventCard = ({
    event,
    isExpanded,
    onToggleExpand,
    likes,
    onLike,
    comments,
    onAddComment,
    newComment,
    setNewComment,
    showComments,
    onToggleComments
}) => {
    const eventCardRef = useRef(null);

    useEffect(() => {
        if (isExpanded && eventCardRef.current) {
            const scrollTimeout = setTimeout(() => {
                eventCardRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 400);
            return () => clearTimeout(scrollTimeout);
        }
    }, [isExpanded]);

    return (
        <div 
            ref={eventCardRef} 
            className={`event-card ${isExpanded ? 'expanded' : ''}`} 
            onClick={onToggleExpand}
        >
            <h2 className="event-title">{event.title}</h2>
            <EventDetails isExpanded={isExpanded} date={event.date} time={event.time} location={event.location} />
            {isExpanded && (
                <>
                    <p className="event_description">{event.description}</p>
                    <div className="event_card_button_container">
                        <button className="event_card_comments_button" onClick={(e) => { e.stopPropagation(); onToggleComments(); }}>
                            Komentarze
                        </button>
                        <LikeButton likes={likes} onLike={(e) => { e.stopPropagation(); onLike(); }} />
                    </div>
                    {showComments && (
                        <CommentsSection
                            comments={comments}
                            newComment={newComment}
                            setNewComment={setNewComment}
                            onAddComment={(e) => { e.stopPropagation(); onAddComment(newComment); }}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default EventCard;

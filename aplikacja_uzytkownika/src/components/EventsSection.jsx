import React, { useState } from 'react';
import EventCard from './EventCard';
import '../styles/EventsSection.css';

const eventsData = [
    {
        id: 1,
        title: 'Konferencja naukowa',
        date: '2024-06-10',
        time: '18:00',
        location: 'WEEIA A2',
        description: 'Międzynarodowa konferencja naukowa poświęcona najnowszym osiągnięciom w dziedzinie informatyki i technologii. Zapraszamy do uczestnictwa i prezentacji własnych badań.'
    },
    {
        id: 2,
        title: 'Godziny rektorskie',
        date: '2024-04-29',
        time: '10:00',
        location: 'Politechnika',
        description: 'Z okazji zbliżającej się Majówki studenci będą w stanie wcześniej wrócić do rodzinnych miast. Dla wydziału EEIA: od 18:00. Dla wydziału BINOŻ: od 13:00.'
    },
    {
        id: 3,
        title: 'Głaskanie kotków',
        date: '2024-04-22',
        time: '19:00',
        location: 'Kampus B',
        description: 'Czy brakuje Ci kotów gdy jesteś na zajęciach? 22.04 na pewno Ci nie ich nie zabraknie! Przyjdź do budynku Lodexu na kampusie B gdzie będą czekały na Ciebie koty do pogłaskania!'
    }
];

const EventsSection = () => {
    const [expandedEvent, setExpandedEvent] = useState(null);
    const [likes, setLikes] = useState({});
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState({});

    const toggleExpand = (event) => {
        setExpandedEvent(expandedEvent === event.id ? null : event.id);
    };

    const toggleComments = (eventId) => {
        setShowComments({ ...showComments, [eventId]: !showComments[eventId] });
    };

    const addLike = (eventId) => {
        setLikes({ ...likes, [eventId]: (likes[eventId] || 0) + 1 });
    };

    const addComment = (eventId, comment) => {
        if (comment.trim() === '') return;

        const eventComments = comments[eventId] || [];
        setComments({
            ...comments,
            [eventId]: [...eventComments, comment],
        });
        setNewComment('');
    };

    const sortedEvents = eventsData.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB;
    });

    return (
        <div className="container">
            {sortedEvents.map((event) => (
                <EventCard
                    key={event.id}
                    event={event}
                    isExpanded={expandedEvent === event.id}
                    onToggleExpand={() => toggleExpand(event)}
                    likes={likes[event.id] || 0}
                    onLike={() => addLike(event.id)}
                    comments={comments[event.id] || []}
                    onAddComment={(comment) => addComment(event.id, comment)}
                    newComment={newComment}
                    setNewComment={setNewComment}
                    showComments={showComments[event.id] || false}
                    onToggleComments={() => toggleComments(event.id)}
                />
            ))}
        </div>
    );
};

export default EventsSection;
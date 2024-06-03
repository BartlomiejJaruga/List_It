import React from 'react';
import '../styles/CommentsSection.css';

const CommentsSection = ({ comments, newComment, setNewComment, onAddComment }) => {
    return (
        <div className="comments-section">
            {comments.map((comment, index) => (
                <div key={index} className="comment">
                    <h4>Anonymus</h4>
                    {comment}
                </div>
            ))}
            <input
                type="text"
                className="new-comment-input"
                value={newComment}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Dodaj nowy komentarz"
            />
            <button className="add_new_comment_button" onClick={onAddComment}>
                Dodaj komentarz
            </button>
        </div>
    );
};

export default CommentsSection;
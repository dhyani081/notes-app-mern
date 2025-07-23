import React from "react";

const NoteList = ({ notes, onEdit, onDelete }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const truncateContent = (content, maxLength = 150) => {
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength) + "...";
    };

    return (
        <div className="notes-list">
            {notes.map((note) => (
                <div key={note._id} className="note-card">
                    <div className="note-header">
                        <h3 className="note-title">{note.title}</h3>
                        <div className="note-actions">
                            <button 
                                onClick={() => onEdit(note)}
                                className="edit-button"
                                title="Edit note"
                            >
                                ✏️
                            </button>
                            <button 
                                onClick={() => onDelete(note._id)}
                                className="delete-button"
                                title="Delete note"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                    
                    <div className="note-content">
                        <p>{truncateContent(note.content)}</p>
                    </div>
                    
                    <div className="note-footer">
                        <small className="note-date">
                            Created: {formatDate(note.createdAt)}
                        </small>
                        {note.updatedAt !== note.createdAt && (
                            <small className="note-date">
                                Updated: {formatDate(note.updatedAt)}
                            </small>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NoteList;


import React, { useEffect, useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { authAPI } from '../services/authAPI';
import { fetchNotes, createNote, updateNote, deleteNote } from '../services/notesAPI.js';
import Navbar from '../components/layout/Navbar';
import NoteForm from '../component/NoteForm';
import NoteList from '../component/NoteList';
import {toast} from 'react-toastify'; 

const Dashboard = () => {
    const { user } = useAuth();
    const [notes, setNotes] = useState([]);
    const [editingNote, setEditingNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadNotes = async () => {
        try {
            setLoading(true);
            // const response = await authAPI.fetchNotes();
            const response = await fetchNotes();
            setNotes(response.data || []);
            setError('');
        } catch (error) {
            console.error('Error loading notes:', error);
            toast.error('Failed to load notes');
            setError('Failed to load notes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNotes();
    }, []);

    const handleCreateOrUpdate = async (noteData) => {
        try {
            if (editingNote) {
                // await authAPI.updateNote(editingNote._id, noteData);
                await updateNote(editingNote._id, noteData);
                toast.success('Note Updated Successfully')
            } else {
                // await authAPI.createNote(noteData);
                await createNote(noteData);
                toast.success('Note Created Successfully')
            }
            setEditingNote(null);
            loadNotes();
        } catch (error) {
            console.error('Error saving note:', error);
            toast.error('Failed to save note')
            setError('Failed to save note');
        }
    };

    const handleEdit = (note) => {
        setEditingNote(note);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                // await authAPI.deleteNote(id);
                await deleteNote(id);
                toast.success('Note Deleted')
                loadNotes();
            } catch (error) {
                console.error('Error deleting note:', error);
                toast.error('Failed to delete note')
                setError('Failed to delete note');
            }
        }
    };

    const handleCancelEdit = () => {
        setEditingNote(null);
    };

    return (
        <div className="page-container">
            <Navbar />
            <main className="main-content">
                <div className="dashboard-container">
                    <header className="dashboard-header">
                        <h1>Welcome back, {user?.username}!</h1>
                        <p>Manage your notes below</p>
                    </header>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="dashboard-content">
                        <section className="note-form-section">
                            <h2>{editingNote ? 'Edit Note' : 'Create New Note'}</h2>
                            <NoteForm 
                                onSubmit={handleCreateOrUpdate}
                                initialData={editingNote}
                                onCancel={editingNote ? handleCancelEdit : null}
                            />
                        </section>

                        <section className="notes-list-section">
                            <h2>Your Notes ({notes.length})</h2>
                            {loading ? (
                                <div className="loading-container">
                                    <div className="loading-spinner"></div>
                                    <p>Loading notes...</p>
                                </div>
                            ) : notes.length === 0 ? (
                                <div className="empty-state">
                                    <p>No notes yet. Create your first note above!</p>
                                </div>
                            ) : (
                                <NoteList 
                                    notes={notes}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            )}
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;


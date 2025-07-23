
import apiClient from './authAPI';

export const notesAPI = {
    // Get all notes
    fetchNotes: async () => {
        const response = await apiClient.get('/notes');
        return response.data;
    },

    // Create new note
    createNote: async (noteData) => {
        const response = await apiClient.post('/notes', noteData);
        return response.data;
    },

    // Get single note
    getNote: async (id) => {
        const response = await apiClient.get(`/notes/${id}`);
        return response.data;
    },

    // Update note
    updateNote: async (id, noteData) => {
        const response = await apiClient.patch(`/notes/${id}`, noteData);
        return response.data;
    },

    // Delete note
    deleteNote: async (id) => {
        const response = await apiClient.delete(`/notes/${id}`);
        return response.data;
    }
};

// Legacy exports for backward compatibility
export const fetchNotes = notesAPI.fetchNotes;
export const createNote = notesAPI.createNote;
export const updateNote = notesAPI.updateNote;
export const deleteNote = notesAPI.deleteNote;
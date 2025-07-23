import React, { useState, useEffect } from 'react';

const NoteForm = ({ onSubmit, initialData, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                content: initialData.content || ''
            });
        } else {
            setFormData({ title: '', content: '' });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (formData.title.length > 100) {
            newErrors.title = 'Title cannot exceed 100 characters';
        }
        
        if (!formData.content.trim()) {
            newErrors.content = 'Content is required';
        } else if (formData.content.length > 5000) {
            newErrors.content = 'Content cannot exceed 5000 characters';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        onSubmit({
            title: formData.title.trim(),
            content: formData.content.trim()
        });
        
        if (!initialData) {
            setFormData({ title: '', content: '' });
        }
    };

    const handleCancel = () => {
        setFormData({ title: '', content: '' });
        setErrors({});
        if (onCancel) {
            onCancel();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="note-form">
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={errors.title ? 'error' : ''}
                    placeholder="Enter note title"
                    maxLength={100}
                />
                {errors.title && (
                    <span className="field-error">{errors.title}</span>
                )}
                <small className="char-count">
                    {formData.title.length}/100 characters
                </small>
            </div>
            
            <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className={errors.content ? 'error' : ''}
                    placeholder="Enter note content"
                    rows={6}
                    maxLength={5000}
                />
                {errors.content && (
                    <span className="field-error">{errors.content}</span>
                )}
                <small className="char-count">
                    {formData.content.length}/5000 characters
                </small>
            </div>
            
            <div className="form-actions">
                <button type="submit" className="submit-button">
                    {initialData ? 'Update Note' : 'Create Note'}
                </button>
                {onCancel && (
                    <button 
                        type="button" 
                        onClick={handleCancel}
                        className="cancel-button"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default NoteForm;


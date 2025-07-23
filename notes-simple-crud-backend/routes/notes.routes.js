import express from "express";
import Notes from "../models/notes.model.js";
import { authenticateToken } from "../middleware/auth.js";
import { validateNote, handleValidationErrors } from "../middleware/validation.js";

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all notes for authenticated user
router.get("/", async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user._id })
            .sort({ updatedAt: -1 }); // Sort by most recently updated
        
        res.status(200).json({
            success: true,
            message: "Notes retrieved successfully",
            data: notes
        });
    } catch (error) {
        console.error("Get notes error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// Create new note
router.post("/", validateNote, handleValidationErrors, async (req, res) => {
    try {
        const { title, content } = req.body;
        
        const note = new Notes({
            user: req.user._id,
            title,
            content
        });
        
        const savedNote = await note.save();
        
        res.status(201).json({
            success: true,
            message: "Note created successfully",
            data: savedNote
        });
        return res.status(201).json(payload)
    } catch (error) {
        console.error("Create note error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// Get single note by ID
router.get("/:id", async (req, res) => {
    try {
        const note = await Notes.findOne({
            _id: req.params.id,
            user: req.user._id
        });
        
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Note retrieved successfully",
            data: note
        });
    } catch (error) {
        console.error("Get note error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// Update note
router.patch("/:id", validateNote, handleValidationErrors, async (req, res) => {
    try {
        const { title, content } = req.body;
        
        const note = await Notes.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user._id
            },
            { title, content },
            { new: true, runValidators: true }
        );
        
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            data: note
        });
    } catch (error) {
        console.error("Update note error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// Delete note
router.delete("/:id", async (req, res) => {
    try {
        const note = await Notes.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });
        
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Note deleted successfully"
        });
    } catch (error) {
        console.error("Delete note error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

export default router;
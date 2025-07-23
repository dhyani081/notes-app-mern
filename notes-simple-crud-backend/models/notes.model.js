

import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

    title: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true,
    },
},

{
    timestamps: true,
}
)

const Notes = mongoose.model("Notes", notesSchema)

export default Notes




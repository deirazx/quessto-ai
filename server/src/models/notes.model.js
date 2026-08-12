const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    revisionMode: {
        type: String,
        required: true
    },
    examType: {
        type: String,
        required: true
    },
    includeDiagrams: {
        type: Boolean,
        default: true
    },
    extraInfo: {
        type: String,
        default: ""
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;

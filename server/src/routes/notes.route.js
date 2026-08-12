const express = require("express");
const notesRouter = express.Router();
const { generateNotes, getMyNotes, getNoteById, downloadNotePdf } = require("../controllers/notes.controller");
const { protect } = require("../middleware/protect.middleware");

notesRouter.post("/generate", protect, generateNotes);
notesRouter.get("/", protect, getMyNotes);
notesRouter.get("/:noteId", protect, getNoteById);
notesRouter.get("/:noteId/pdf", protect, downloadNotePdf);

module.exports = notesRouter;

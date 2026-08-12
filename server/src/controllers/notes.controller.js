const Note = require("../models/notes.model");
const User = require("../models/user.model");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const PDFDocument = require("pdfkit");

const generateNotes = async (req, res) => {
    try {
        const { topic, revisionMode, examType, includeDiagrams, extraInfo } = req.body;
        const userId = req.user._id;

        // 1. Credit Validation
        if (req.user.credits < 12) {
            return res.status(403).json({ message: "Insufficient credits. Generating notes requires 12 credits." });
        }

        // 2. API Key Check
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ message: "GEMINI_API_KEY environment variable is missing on the server." });
        }

        // 3. Initialize Generative AI
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

        // 4. Formulate Prompt
        const modeText = revisionMode === 'comprehensive'
            ? 'highly detailed, comprehensive study guide with step-by-step explanations, definitions, key formulas, examples, and deep conceptual coverage'
            : 'highly condensed quick-revision cheat-sheet format, containing only key definitions, formulas, bullet points, and quick recall cards';

        const diagramText = includeDiagrams
            ? 'Include ASCII/text-based diagrams or structured flowcharts to visually map out conceptual flows where applicable.'
            : 'Do not include any diagrams.';

        const prompt = `
            You are an elite academic professor. Generate clean, professional, markdown formatted study notes.
            
            Subject/Topic: ${topic}
            Target Level: ${examType} syllabus standards.
            Notes Style: ${modeText}
            Diagrams & Layouts: ${diagramText}
            Additional Custom Instructions: ${extraInfo || 'None'}
            
            Structure the response using clear headings, sub-headings, bullet lists, bold text, and code/blockquotes for citations. Do not wrap the response in markdown blocks like \`\`\`markdown. Output raw markdown text.
        `;

        // 5. Call Gemini
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        if (!responseText) {
            return res.status(500).json({ message: "Received empty response from AI engine." });
        }

        // 6. Deduct Credit
        req.user.credits -= 12;
        await req.user.save();

        // 7. Save Note record
        const note = await Note.create({
            userId,
            topic,
            revisionMode,
            examType,
            includeDiagrams,
            extraInfo,
            content: responseText
        });

        res.status(200).json({
            message: "Notes generated successfully",
            note,
            remainingCredits: req.user.credits
        });
    } catch (error) {
        console.error("Notes generation error:", error);
        res.status(500).json({ message: `Notes generation failed: ${error.message}` });
    }
};

const getMyNotes = async (req, res) => {
    try {
        const userId = req.user._id;
        const notes = await Note.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({ notes });
    } catch (error) {
        res.status(500).json({ message: `Failed to fetch notes: ${error.message}` });
    }
};

const getNoteById = async (req, res) => {
    try {
        const { noteId } = req.params;
        const note = await Note.findById(noteId);
        
        if (!note) {
            return res.status(404).json({ message: "Note not found." });
        }
        
        if (note.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to access this note." });
        }
        
        res.status(200).json({ note });
    } catch (error) {
        res.status(500).json({ message: `Failed to retrieve note: ${error.message}` });
    }
};

const downloadNotePdf = async (req, res) => {
    try {
        const { noteId } = req.params;
        const note = await Note.findById(noteId);
        
        if (!note) {
            return res.status(404).json({ message: "Note not found." });
        }
        
        if (note.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to download this note." });
        }
        
        const doc = new PDFDocument({ margin: 50 });
        
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename="${note.topic.replace(/[^a-zA-Z0-9]/g, "_")}_notes.pdf"`);
        
        doc.pipe(res);
        
        // Premium PDF Header Styling
        doc.fillColor("#4f46e5").font("Helvetica-Bold").fontSize(26).text("CONCEPTO.AI", { align: "center" });
        doc.moveDown(0.2);
        doc.fillColor("#9ca3af").font("Helvetica").fontSize(10).text("GENERATE SMARTER EXAM NOTES", { align: "center" });
        doc.moveDown(1.5);
        
        // Topic Title
        doc.fillColor("#111827").font("Helvetica-Bold").fontSize(20).text(note.topic);
        doc.moveDown(0.5);
        
        // Metadata Box
        doc.fillColor("#6b7280").font("Helvetica-Bold").fontSize(9).text("METADATA PROFILE:");
        doc.font("Helvetica").text(`Depth Mode: ${note.revisionMode === 'comprehensive' ? 'Comprehensive Study Pack' : 'Quick Summary Pack'}`);
        doc.text(`Exam Target: ${note.examType.toUpperCase()}`);
        doc.text(`Conceptual Diagram Layouts: ${note.includeDiagrams ? 'Enabled' : 'Disabled'}`);
        doc.text(`Generated Date: ${new Date(note.createdAt).toLocaleDateString()}`);
        doc.moveDown(1.5);
        
        doc.strokeColor("#e5e7eb").lineWidth(1).moveTo(50, doc.y).lineTo(doc.page.width - 50, doc.y).stroke();
        doc.moveDown(1.5);
        
        // Parse Markdown Content
        const lines = note.content.split("\n");
        doc.fillColor("#374151").fontSize(11).font("Helvetica");
        
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();
            
            if (line.startsWith("# ")) {
                doc.moveDown(1);
                doc.fillColor("#1f2937").font("Helvetica-Bold").fontSize(16).text(line.replace("# ", ""));
                doc.moveDown(0.5);
            }
            else if (line.startsWith("## ")) {
                doc.moveDown(0.8);
                doc.fillColor("#374151").font("Helvetica-Bold").fontSize(14).text(line.replace("## ", ""));
                doc.moveDown(0.4);
            }
            else if (line.startsWith("### ")) {
                doc.moveDown(0.6);
                doc.fillColor("#4b5563").font("Helvetica-Bold").fontSize(12).text(line.replace("### ", ""));
                doc.moveDown(0.3);
            }
            else if (line.startsWith("* ") || line.startsWith("- ")) {
                doc.fillColor("#4b5563").font("Helvetica").fontSize(11);
                const cleanText = line.replace(/^[\*\-]\s+/, "");
                doc.text(`•  ${cleanText}`, { indent: 15 });
                doc.moveDown(0.2);
            }
            else if (line === "---") {
                doc.moveDown(0.5);
                doc.strokeColor("#f3f4f6").lineWidth(0.5).moveTo(50, doc.y).lineTo(doc.page.width - 50, doc.y).stroke();
                doc.moveDown(0.8);
            }
            else if (line.length > 0) {
                doc.fillColor("#4b5563").font("Helvetica").fontSize(11);
                const cleanText = line.replace(/\*\*/g, "");
                doc.text(cleanText);
                doc.moveDown(0.4);
            }
        }
        
        doc.end();
    } catch (error) {
        console.error("PDF download compilation failed:", error);
        res.status(500).json({ message: `Failed to compile PDF: ${error.message}` });
    }
};

module.exports = { generateNotes, getMyNotes, getNoteById, downloadNotePdf };

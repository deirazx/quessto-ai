const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    credits: {
        type: Number,
        default: 50,
    },
    isCreditAvailiable: {
        type: Boolean,
        default: true
    },
    // notes: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Notes",
    //     default: []
    // }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
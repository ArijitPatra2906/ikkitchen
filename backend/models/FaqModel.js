const mongoose = require("mongoose");

const FaqSchema = new mongoose.Schema({
    question: {
        type: String,
        repuired: true,
    },
    answer: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const FaqModel = mongoose.model("Faq", FaqSchema)
module.exports = FaqModel;
const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    course: {
        type: String,
        repuired: true,
    },
    duration: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: false,
    },
    message: {
        type: String,
        required: false,
    },
}, { timestamps: true });

const CourseModel = mongoose.model("Course", CourseSchema)
module.exports = CourseModel;
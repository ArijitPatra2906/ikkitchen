const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
        unique: true
    },
    pic: {
        type: String,
    }
}, { timestamps: true });

const Blog = mongoose.model("Blog", BlogSchema)
module.exports = Blog;
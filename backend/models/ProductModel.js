const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    perportionrate: {
        type: String,
        required: true,
    },
    halfkgRate: {
        type: String,
        required: true,
    },
    fullkgRate: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema)
module.exports = Product;
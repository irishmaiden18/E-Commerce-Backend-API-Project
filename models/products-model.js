// import mongoose
const mongoose = require("mongoose")

// create a product schema
const productSchema = new mongoose.Schema (
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            default: ""
        },
        price: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
)

// create a product model
const Product = mongoose.model("Product", productSchema)

// export the product model
module.exports = Product
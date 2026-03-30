// import mongoose
const mongoose = require("mongoose")

// create a customer schema using mongoose
const customerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        address: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
)

// create a customer model
const Customer = mongoose.model("Customer", customerSchema)

// export the customer model
module.exports = Customer
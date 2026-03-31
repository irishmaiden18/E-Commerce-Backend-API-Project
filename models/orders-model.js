// import mongoose
const mongoose = require("mongoose")

// a variable that gives us access to mongoDB's unique generated ID type
const ObjectId = mongoose.Schema.Types.ObjectId

// create order schema
const orderSchema = new mongoose.Schema (
    {
        customer: {
            // to refer to another data type that we've created in our MongoDB database, utilize both the ObjectId type and a reference (ref) to the specific model we want
            type: ObjectId,
            ref: "customer",
            required: true,
        },
        items: {
            // to refer to another data type that we've created in our MongoDB database, utilize both the ObjectId type and a reference (ref) to the specific model we want
            // array of product data
            type: [{type: ObjectId, ref: "Product"}],
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

// create the order model
const Order = mongoose.model("Order", orderSchema)

// export the order model
module.exports = Order
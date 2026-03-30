// import mongoose
const mongoose = require("mongoose")
const Customer = require("./customers-model")

// a variable that gives us access to mongoDB's unique generated ID type
const ObjectId = mongoose.Schema.Types.ObjectId

// create shopping cart schema
const shoppingCartSchema = new mongoose.Schema(
    {
        customer: {
            // to refer to another data type that we've created in our MongoDB database, utilize both the ObjectId type and a reference (ref) to the specific model we want
            type: ObjectId,
            ref: "Customer",
            required: true,
            unique: true
        },
        items: {
            // to refer to another data type that we've created in our MongoDB database, utilize both the ObjectId type and a reference (ref) to the specific model we want
            // array of product data
            type: [{type: ObjectId, ref: "Product"}],
            default: []
        }
    },
    {
        timestamps: true,
    }
)

// create the shopping cart model
const ShoppingCart = mongoose.model("ShoppingCart", shoppingCartSchema)

// export the shopping cart model
module.exports = ShoppingCart

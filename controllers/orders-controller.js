// import the Order model
const Order = require("../models/orders-model")
const { getShoppingCartById } = require("./shopping-cart-controller")

// a function that creates an order based on a shopping cart id
const createOrder = async (orderData) => {

    try {

        // make sure shopping cart exists in our database
        // get shopping cart by id
        const foundShoppingCart = await getShoppingCartById(orderData.id)

        // if it is not in our database
        if (!foundShoppingCart) {

            // throw an error
            throw Error("Shopping cart NOT found in database!")
        }

        // if it is, create the new order
        const newOrder = await Order.create({
            customer: foundShoppingCart.customer,
            items: foundShoppingCart.items,
            totalPrice: foundShoppingCart.totalPrice,
            status: "pending"
        })

        // return the new order
        return newOrder
        
    } catch (error) {
        
        // propogate the error to the router file
        throw error

    }
}

// export controller functionality
module.exports = { createOrder }
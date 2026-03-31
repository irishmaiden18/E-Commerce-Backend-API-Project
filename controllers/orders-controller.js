// import the Order model
const Order = require("../models/orders-model")

// import the shopping-cart controller functionality
const { getShoppingCartById } = require("./shopping-cart-controller")

// a function to get all orders based on a customer id
const getOrdersByCustomerId = async (customerId) => {

    try {

        // let filteredOrders be all the orders in the database that have a customer property matching the id we are searching
        const filteredOrders = await Order.find({customer: customerId}).populate(["items", "customer"])

        // return filtered orders as an array
        return filteredOrders
        
    } catch (error) {
        
        // propogate the error to the router file
        throw error
    }
}

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
module.exports = { getOrdersByCustomerId, createOrder }
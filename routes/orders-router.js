// import express
const express = require("express")

// set up router
const router = express.Router()

// import orders controller functionality
const { createOrder, getOrdersByCustomerId } = require("../controllers/orders-controller")

// handle GET (read) requests to /api/v1/orders/:id
router.get("/:customerId", async (req, res) => {

    try {

        // call the getOrdersByCustomerId controller function
        const foundOrders = await getOrdersByCustomerId(req.params.customerId)

        // send a success response to the user
        res.json ({
            message: "success",
            payload: foundOrders
        })
        
    } catch (error) {
        
        // send a failure response to the user
        res.status(500).json ({
            message: "failure",
            payload: error.message
        })
    }
})

// handle POST (create) requests to /api/v1/orders
router.post("/", async (req, res) => {

    try {

        // call the createOrder controller function
        const newOrder = await createOrder(req.body)

        // send a success response to the user
        res.json ({
            message: "success",
            payload: newOrder
        })
        
    } catch (error) {
        
        // send a failure response to the user
        res.status(500).json ({
            message: "failure",
            payload: error.message
        })
    }
})

// export the router
module.exports = router
// import express
const express = require("express")
const { createOrder } = require("../controllers/orders-controller")

// set up router
const router = express.Router()

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
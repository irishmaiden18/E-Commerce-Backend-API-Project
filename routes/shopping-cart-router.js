// import express
const express = require("express")

// set up router
const router = express.Router()

// import controller functionality
const { addItemToCart, createShoppingCart } = require("../controllers/shopping-cart-controller")

// handle POST (create) requests to /api/v1/shoppingCarts
router.post("/", async (req, res) => {

    try {

        // call the createShoppingCart controller function
        const newShoppingCart = await createShoppingCart(req.body)

        // send a success response to the user
        res.json ({
            message: "success",
            payload: newShoppingCart
        })
        
    } catch (error) {
        
        // send a failure response to the user
        res.status(500).json ({
            message: "failure",
            payload: error.message
        })
    }
})

// handle PUT (update) requests to /api/v1/shoppingCarts/:id
router.put("/:id", async (req, res) => {

    try {

        // call the addItemToCart controller function
        const updatedCart = await addItemToCart(req.params.id, req.body)

        // send a success response to the user
        res.json ({
            message: "success",
            payload: updatedCart
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
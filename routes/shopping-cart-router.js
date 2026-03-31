// import express
const express = require("express")

// set up router
const router = express.Router()

// import controller functionality
const { addItemToCart, createShoppingCart, removeItemFromCart } = require("../controllers/shopping-cart-controller")

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

// handle PUT (addItem) requests to /api/v1/shoppingCarts/:id
router.put("/addItem/:id", async (req, res) => {

    try {

        // call the addItemToCart controller function, taking in the shoppingCart Id as req.params.id
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

//handle PUT (removeItem) requests to /api/v1/shoppingCarts/:id
router.put("/removeItem/:id", async (req, res) => {

    try {

        // call the removeItemFromCart controller function
        const updatedCart = await removeItemFromCart(req.params.id, req.body)

        // send a success response to the user
        res.json ({
            message: "success",
            messageDetail: `${req.body.items} has been successfully removed from the database!`,
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
// import express
const express = require("express")

// set up router
const router = express.Router()

// import controller functionality
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/products-controller")

// handle GET (read) requests to /api/v1/products
router.get("/", async (req, res) => {

    try {

        // call the getProducts controller function
        const products = await getProducts()

        // send a success response to the user
        res.json ({
            message: "success",
            payload: products
        })
        
    } catch (error) {
        
        // send a failure message to the user
        res.status(500).json ({
            message: "failure",
            payload: error.message
        })
    }
})

// handle GET by Id (read) requests to /api/v1/products/:id
router.get("/:id", async (req, res) => {

    try {

        // call the getProductById controller function
        const product = await getProductById(req.params.id)

        // send a success response to the user
        res.json ({
            message: "success",
            payload: product
        })
        
    } catch (error) {
        
        // send a failure response to the user
        res.status(404).json ({
            message: "failure",
            payload: error.message
        })
    }
})

// handle POST (create) requests to /api/v1/products
router.post("/", async (req, res) => {

    try {

        // call the createProducts controller function
        const newProduct = await createProduct(req.body)

        // send a success response to the user
        res.json ({
            message: "success",
            payload: newProduct
        })
        
    } catch (error) {
        
        // send a failure response to the user
        res.status(500).json ({
            message: "failure",
            payload: error.message
        }) 
    }
})

// handle PUT (update) requests to /api/v1/products/:id
router.put("/:id", async (req, res) => {

    try {

        // call the updateProduct controller function
        const updatedProduct = await updateProduct(req.params.id, req.body)

        // send a success response to the user
        res.json ({
            message: "success",
            payload: updatedProduct
        })
        
    } catch (error) {

        // send a failure response to the user
        res.status(404).json ({
            message: "failure",
            payload: error.message
        })
        
    }
})

// handle DELETE requests to /api/v1/products/:id
router.delete("/:id", async (req, res) => {

    try {

        // call the deleteProduct controller function
        const productToDelete = await deleteProduct(req.params.id)

        // send a success response to the user
        res.json ({
            message: "success",
            payload: `${productToDelete.name} has been successfully removed from the database!`
        })
        
    } catch (error) {
        
        // send a failure response to the user
        res.status(404). json ({
            message: "failure",
            payload: error.message
        })
    }
})

// export the router
module.exports = router
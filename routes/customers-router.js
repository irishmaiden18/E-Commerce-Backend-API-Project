// import express
const express = require("express")

// set up router
const router = express.Router()

// import controller functionality
const { createCustomer, getCustomers, getCustomerById, updateCustomer, deleteCustomer } = require("../controllers/customers-controller")

// import customer model
const Customer = require("../models/customers-model")

// handle GET (read) requests to /api/v1/customers
router.get("/", async (req, res) => {

    try {

        // call the getCustomers controller function
        const customers = await getCustomers()

        // send a success response to the user
        res.json ({
            message: "success",
            payload: customers
        })
        
    } catch (error) {
        
        // send a failure response to the user
        res.status(500).json ({
            message: "failure",
            payload: error.message
        })
    }
})

// handle GET by Id (read) requests to /api/v1/customers/:id
router.get("/:id", async (req, res) => {

    try {
        
        // call the getCustomerById controller function
        const customer = await getCustomerById(req.params.id)

        // send a success response
        res.json ({
            message: "success",
            payload: customer
        })
        
    } catch (error) {
        
        // send a failure response to the user
        res.status(404).json ({
            message: "failure",
            payload: error.message
        })
    }
})

// handle POST (create) requests to /api/v1/customers
router.post("/", async (req, res) => {

    try {

        // call the controller createCustomer controller function
        const newCustomer = await createCustomer(req.body)

        // send a success response to the user
        res.json ({
            message: "success",
            payload: newCustomer
        })
        
    } catch (error) {
        
        // send a failure response to the user
        res.status(500).json ({
            message: "failure",
            payload: error.message
        })
    }

})

// handle PUT (update) requests to /api/v1/customers/:id
router.put("/:id", async (req, res) => {

    try {

        // call the updateCustomer controller function
        const updatedUser = await updateCustomer(req.params.id, req.body)

        // send a success response to the user
        res.json ({
            message: "success",
            payload: updatedUser
        })
        
    } catch (error) {

        // send a failure response to the user
        res.status(404).json ({
            message: "failure",
            payload: error.message
        })
        
    }
})

// handle DELETE requests to /api/v1/customers/:id
router.delete("/:id", async (req, res) => {

    try {
        
        // call the deleteCustomer controller function
        const deletedCustomer = await deleteCustomer(req.params.id)

        // send a success response to the user
        res.json ({
            message: "success",
            payload: `${deletedCustomer.name} has been successfully removed from the database!`
        })

    } catch (error) {
        
        // send a failure response to the user
        res.status(404).json ({
            message: "failure",
            payload: error.message
        })
    }
})

// export the router
module.exports = router
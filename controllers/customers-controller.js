// import the Customers mdoel
const Customer = require("../models/customers-model")

// a function that will return all the customers
const getCustomers = async () => {

    try {

        // get a list of all the customers
        const customers = await Customer.find()

        // return the customer list
        return customers
        
    } catch (error) {
       
        // propogate the error to the router file
        throw error

    }
}

// a function that will take in a customerID and return the data associated with that customer
const getCustomerById = async (customerId) => {

    try {

        // find the customer by the customerId given
        const customer = await Customer.findById(customerId)

        // make sure the customerId given is in the database
        // if there is no customer found
        if (!customer) {

            // throw an error
            throw Error ("Customer NOT found in database!")
        }

        // if a customer was found, return the customer
        return customer
        
    } catch (error) {
        
        // propogate the error to the router file
        throw error

    }
}

// a function that will take in customerData and create a new data entry based on that data
const createCustomer = async (customerData) => {

    try {

        // create the new customer from the customerData provided
        const newCustomer = await Customer.create(customerData)

        // return the new customer
        return newCustomer
        
    } catch (error) {
        
        // propogate the error to the router file
        throw error

    }
}

// export the controller functions
module.exports = { createCustomer, getCustomers, getCustomerById}
// import the Product model
const Product = require("../models/products-model")

// a function that gets a list of products
const getProducts = async () => {

    try {
        
        // get a list of all the products
        const products = await Product.find()

        // return the list
        return products
        
    } catch (error) {
        
        // propogate the error to the router file
        throw error

    }
}

// a function to get a single product based on a productId
const getProductById = async (productId) => {

    try {

        // find product by the given productId
        const product = await Product.findById(productId)

        // check whether the searched for product is in the database
        // if the product was not found in the database
        if (!product) {

            // throw an error
            throw Error("Product NOT found in the database!")
        }

        // if the product was found, return the product
        return product
        
    } catch (error) {

        // propogate the error to the router file
        throw error
        
    }
}

// a function that takes in productData and creates a new data entry based on that data
const createProduct = async (productData) => {

    try {

        // create the new product from the productData
        const newProduct = await Product.create(productData)

        // return the new product
        return newProduct
        
    } catch (error) {
        
        // propogate the error to the router file
        throw error

    }
}

// export the controller functions
module.exports = { createProduct, getProducts, getProductById }
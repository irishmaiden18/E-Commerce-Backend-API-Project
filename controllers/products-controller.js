// import the Product model
const Product = require("../models/products-model")

// a function that gets a list of products
const getProducts = async (queryData) => {

    try {
        
        // object that will keep track of all our filter queries
        const filterObject = {}

        // filter based on category
        // check whether the category query data exists
        // if it does
        if (queryData.category) {

            // add it to our filterObject
            filterObject.category = queryData.category
        }

        // filter based on in-stock status
        // check whether the in-stock query data exists
        // if it does
        if (queryData.stock) {

            // determine what the query data is
            // if the query data is "out-of-stock"
            if (queryData.stock === "out-of-stock") {

                // add to our filter object stock = equal to zero (which is out of stock)
                filterObject.stock = {
                    $eq: 0
                }
            
            // if the query data is anything else, but it DOES exist
            } else {

                // add to our filter object stock = greater than or equal to 1 (which is in stock)
                filterObject.stock = {
                    $gte: 1
                }
            }
        }

        // filter based on price range
        // get everything between minPrice and maxPrice
        // add a price range to our query object regardless of whether there is query data
        filterObject.price = {

            // if minPrice exists, add greater than or equal to queryData.minPrice, if it doesn't exist use a minPrice of zero
            $gte: queryData.minPrice || 0,

            // and if maxPrice exists, add less than or equal to queryData.maxPrice, if it doesn't exist use maxPrice of Infinity
            $lte: queryData.maxPrice || Infinity
        }

        // sorting
        // object that will keep track of all our sort queries
        const sortObject = {}

        // add sort data to our sort query object regardeless of whether there is sort query data, using defaults
        // sortObject[queryData.sortBy || name] evaluates queryData.sortBy first then takes that property, if it doesn't exist, it fills in name
        // queryData.sortOrder || "asc" takes in sortOrder query data, but if it doesn't exist it sorts by ascending
        sortObject[queryData.sortBy || "name"] = queryData.sortOrder || "asc"

        // get a list of all the products filtered on the properties of the filterObject, and sorted by the properties of the sortObject, if there are no properties we get them all
        const products = await Product.find(filterObject).sort(sortObject)

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

// a function that updates a product based on a productId and product data
const updateProduct = async (productId, productData) => {

    try {

        // find the product by productId and then update it with the productData
        const productToUpdate = await Product.findByIdAndUpdate(
            productId,
            productData,
            {new: true}
        )

        // check whether the product to update is in the database
        // if the product was NOT found
        if (!productToUpdate) {

            // throw an error
            throw Error("Product NOT found in the database!")
        }

        // if the product was in the database, return the updated product
        return productToUpdate
        
    } catch (error) {
        
        // propogate the error to the router file
        throw error
    }
}

// a function that deletes a product based on a productId
const deleteProduct = async (productId) => {

    try {

        // find the product by id then delete it
        const productToDelete = await Product.findByIdAndDelete(productId)

        // check whether the product to delete is in the database
        // if the productToDelete was not found in the database
        if (!productToDelete) {

            // throw an error
            throw Error ("Product was NOT found in the database!")
        }

        // if the productToDelete was found in the database, return it
        return productToDelete
        
    } catch (error) {
        
        // propogate the error to the router file
        throw error
    }
}

// export the controller functions
module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct }
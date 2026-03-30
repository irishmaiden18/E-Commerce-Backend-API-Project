// import the Product model
const Product = require("../models/products-model")

// import the ShoppingCart model
const ShoppingCart = require("../models/shopping-cart-model")

// a function that will take in shopping cart data and create a new data entry based on that data
const createShoppingCart = async (shoppingCartData) => {

    try {

        // create a shopping cart the same way we would normally create data entries
        const newShoppingCart = await ShoppingCart.create(shoppingCartData)

        // return the new shopping cart
        return newShoppingCart
        
    } catch (error) {
        
        // propogate the error to the router file
        throw Error("Error creating shopping cart")
    }
}

// a function that finds the customer and then updates the customer's shopping car tot add a product ObjectId to the list of items in the cart
const addItemToCart = async (shoppingCartId, productId) => {

    try {

        // make sure the productId is in the database
        // find the product by the id
        const foundProduct = await Product.findById(productId.items)

        // if the product was NOT found in the database
        if(!foundProduct) {
            
            // throw an error
            throw Error("Product ID NOT found in database!")
        }

        // make sure the shoppingCartId is in the database
        // find the shopping cart by the given id
        const foundShoppingCart = await ShoppingCart.findById(shoppingCartId)

        // if the shopping cart was NOT found in our database
        if (!foundShoppingCart) {

            // throw an error
            throw Error("Shopping Cart ID NOT found in database!")
        }

        // make sure the product isn't already in the list of items for the given shopping cart
        const existingProduct = foundShoppingCart.items.find((item) => {
            return item.equals(foundProduct._id)
        })

        // if the product is found in the shopping cart,
        if (existingProduct) {

            // throw an error
            throw Error("Product is already in shopping cart")
        }

        // If both the product and the shopping cart were found in our database, and the product isn't already in the shoping cart then find the shopping cart in our database and update by pushing the new item into the existing array of items
        const updatedShoppingCart = await ShoppingCart.findByIdAndUpdate(
            shoppingCartId,
            {$push: productId},
            {new: true}
        )

        // return the updated shopping cart
        return updatedShoppingCart
        
    } catch (error) {
        
        // propogate the error to the router file
        throw error
    }
}

// export controller functions
module.exports = { addItemToCart, createShoppingCart }
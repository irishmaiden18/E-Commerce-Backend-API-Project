// npm init -y
// npm i express morgan mongoose dotenv

// import express
const express = require("express")

// set up the express app
const app = express()

// import morgan
const logger = require("morgan")

// set up middleware

// set up morgan
app.use(logger("dev"))

// format our express body
app.use(express.json())

// connect to MongoDB
const connectToMongoDB = require("./database/connectToMongoDB")

// import and use the customer router
const customersRouter = require("./routes/customers-router")
app.use("/api/v1/customers", customersRouter)

// import and use the product router
const productsRouter = require("./routes/products-router")
app.use("/api/v1/products", productsRouter)

// set up the port
const PORT = 3000

// start listening
app.listen(PORT, () => {

    // log a message to the console so we know the server is listening successfully
    console.log(`Server is listening on Port: ${PORT}`)

    // call the connectToMongoDB function
    connectToMongoDB()

})
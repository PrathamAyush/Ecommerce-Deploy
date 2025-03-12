require("dotenv").config();
const express = require("express");
const app = express();
const port = 3200;
const cors = require("cors");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const user = require("./routes/userRoutes");
const products = require("./routes/productRoutes");
const cart = require("./routes/cartRoutes");
const order = require("./routes/orderRoutes");
const path = require("path");

app.use(express.json())
app.use(cors())


//prevent the mongoose deprecation warning
mongoose.set('strictQuery', true);

//calling database connectivity
require("./dataBase/conn");

//calling authorization routes for registration and login prossese
app.use("/api/auths/", auth);

//calling userRoutes
app.use("/api/users/", user);

//calling productRoutes
app.use("/api/product/", products);

//calling Cart
app.use("/api/cart/", cart);

//calling order
app.use("/api/order/", order);

//Paypal API
app.get("/api/keys/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || "Sand Box")
});
// I am not shareing Paypal Client Id for Security reasons I think You understand better


//configure static page for deployement and deployment
app.use(express.static(path.join(__dirname, "./client/build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

app.listen(port, () => {
    console.log("Server started on port", port);
});

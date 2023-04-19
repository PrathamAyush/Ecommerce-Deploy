// Not implemanted this facility yet cart is managed by Frontend Context API

const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    products: [
        {
            productId: {
                type: String
            },
            quantity: {
                type: Number,
                default: 1
            },
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model("Cart", CartSchema);
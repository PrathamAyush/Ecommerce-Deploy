const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    img: {
        type: String,
        require: true,
    },
    disc: {
        type: String,
        require: true
    },
    category: {
        type: Array,
    },
    price: {
        type: String,
        require: true,
    },
    inStock: {
        type: Number,
        default: 1
    },
    rating: {
        type: Number,
        default: 0
    },
    numOfReview: {
        type: Number,
        default: 0
    },
    feturedProduct: {
        type: Boolean,
        default: false
    },
    flipDeal: {
        type: Boolean,
        default: false
    },
    review: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                require: true
            },
            comment: {
                type: String
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("products", ProductSchema);
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    /*lastName: {
        type: String,
        require: true
    }*/
    phone: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
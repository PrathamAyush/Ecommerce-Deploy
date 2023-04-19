const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middleWare/authMiddleware");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const router = require("express").Router();

//updation route
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    const { password } = req.body;
    if (password) {
        const hashedpassword = await bcrypt.hash(password, 16);
        req.body.password = hashedpassword;
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }

});

//Delete user by itself this facility not implenanted on frontend right now
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User Deleted")
    } catch (error) {
        res.status(500).json(error)
    }
});

//Listing and Getting all the users on Admin Panal
router.get("/user", verifyTokenAndAdmin, async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;
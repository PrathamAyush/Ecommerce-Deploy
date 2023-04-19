const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middleWare/authMiddleware");
const Cart = require("../models/cartModel");
const router = require("express").Router();

//Create Products
router.post("/", verifyToken, async (req, res) => {
    const createCart = new Cart(req.body)
    try {

        const savedCartItem = await createCart.save();
        res.status(201).json(savedCartItem)
        console.log(savedCartItem)

    } catch (error) {
        res.status(500).json(error)
    }

});
router.post("/", async (req, res) => {
    const createCart = new Cart(req.body)
    try {

        const savedCartItem = await createCart.save();
        res.status(201).json(savedCartItem)
        console.log(savedCartItem)

    } catch (error) {
        res.status(500).json(error)
    }

})

//updation route
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {

    try {
        const updatedCartItem = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedCartItem);
    } catch (error) {
        res.status(500).json(error);
    }

});

//Delete 
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart item Deleted")
    } catch (error) {
        res.status(500).json(error)
    }
});

//viewing user cart by id
router.get("/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
});

//Get All Cart Detailes on Admin Panal
router.get("/", verifyTokenAndAdmin, async (req, res) => {

    try {
        const allCartsDetails = await Cart.find();
        res.status(200).json(allCartsDetails)
    } catch (error) {
        res.status(500).json(error)
    }

})

module.exports = router;
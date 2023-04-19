const { verifyTokenAndAdmin } = require("../middleWare/authMiddleware");
const products = require("../models/productsModel");
const multer = require("multer")
const path = require("path")
const router = require("express").Router();

//requiring Storage for imageFile uploding

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/"); // Set the destination folder
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); // Set the filename
//     },
// });

// const upload = multer({ storage: storage });


//Create Products by Admin only
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const createProduct = new products(req.body);
    try {

        const savedProduct = await createProduct.save();
        res.status(201).json(savedProduct)
        console.log(savedProduct)

    } catch (error) {
        res.status(500).json(error)
    }

})

//updation of Products by Admin
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedProduct = await products.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error);
    }

});

//Deleteion of Product By Admin only
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await products.findByIdAndDelete(req.params.id);
        res.status(200).json("product Deleted")
    } catch (error) {
        res.status(500).json(error)
    }
});

//Anyone can view products by id it's public
router.get("/:id", async (req, res) => {
    try {
        const productId = await products.findById(req.params.id);
        if (productId) {
            res.status(200).json(productId)
            console.log(productId)
        } else {
            res.status(404).json({ message: "Product No Longer Aveliable" })
        }
    } catch (error) {
        res.status(404).json({ message: "Product No Longer Aveliable" })
    }
});

//Listing and Getting all the products and also getting product by filtering like latest added and category
router.get("/", async (req, res) => {

    const queryNew = req.query.new;
    const queryCategory = req.query.category;
    try {
        let product;
        if (queryNew) {
            product = await products.find().sort({ createdAt: -1 }).limit(5);
        } else if (queryCategory) {
            if (queryCategory) {
                product = await products.find({
                    category: {
                        $in: [queryCategory]
                    }
                })
            } else {
                res.status(500).json({ message: "Somthing went wrong=>|<=Server Error" })
            }

        }
        else {
            product = await products.find();
        }

        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: "Somthing went wrong=>|<=Server Error" })
    }
});

//Searching Product using searchBox route
router.get("/search/:key", async (req, res) => {

    const searchQuery = req.params.key;
    let product;

    product = await products.find({

        "$or": [
            { title: { $regex: searchQuery, $options: "i" } },
            { category: { $regex: searchQuery, $options: "i" } },
        ],

    });
    res.status(200).json(product)

}
);


module.exports = router;
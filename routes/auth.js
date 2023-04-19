const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
//const { JWT_SECRET } = (process.env.JWT_SECRET);

// Registration Routes

router.post("/register", (req, res) => {
    const { firstName, lastName, phone, email, password } = req.body;

    if (!firstName || !lastName || !phone || !email || !password) {
        return res.status(400).json({ err: "Fill All Mandetory Fields" })
    }
    User.findOne({ email: email })
        .then((userInDb) => {
            if (userInDb) {
                return res.status(502).json({ message: "User Already Exist" })
            }
            bcrypt.hash(password, 16)
                .then((hashPassword) => {
                    const newUser = new User({ firstName, lastName, fullName: `${firstName} ${lastName}`, phone, email, password: hashPassword });
                    newUser.save()
                        .then(() => {
                            console.log(newUser)
                            return res.status(201).json({ message: "user Registered success" })
                        }).catch((err) => {
                            return res.status(500).json({ message: "error" })
                        })
                }).catch((err) => {
                    console.log(err);
                });
        });
});

//Login Route

router.post("/login", (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ result: "fill the field first" })
    }

    User.findOne({ email: email })
        .then((userInDb) => {
            if (!userInDb) {
                res.status(404).json({ message: "user not found" });
                return
            }
            bcrypt.compare(password, userInDb.password)
                .then((userMatch) => {
                    if (userMatch) {

                        const token = JWT.sign({ id: userInDb._id, isAdmin: userInDb.isAdmin }, process.env.JWT_SECRET);

                        //sending all info of user except password 
                        const userInfo = { "id": userInDb._id, "fullName": userInDb.fullName, "email": userInDb.email, "phone": userInDb.phone, "Admin": userInDb.isAdmin };
                        return res.status(200).json({ result: { user: userInfo, token: token } })
                    }
                    else {
                        return res.status(401).json({ message: "Invalid Credential" })
                    }
                }).catch((err) => {
                    res.status(401).json(err);
                    console.log(err)
                })
        })
})

module.exports = router;
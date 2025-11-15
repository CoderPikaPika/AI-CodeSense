const express = require("express");
const loginRouter = express.Router();
const Model = require("../Models/signup");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


loginRouter.post("/api/signup", async (req, res) => {
    const { username, email, password } = req.body;
    const existingUser = await Model.findOne({ username });
    const existingEmail = await Model.findOne({ email });
    if (existingUser) {
        return res.json({ message: "Username Taken" });
    }
    else if (existingEmail) {
        return res.json({ message: "Email Already Registered" });
    }
    else {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                const data = new Model({ username, email, password: hash });
                await data.save()
                return res.json({ message: "Registered Successfully" });
            })
        })

    }
})

loginRouter.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await Model.findOne({ username });
    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result === true) {
            token = jwt.sign({ username }, "kukie",)
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,             // required for HTTPS
                sameSite: 'none',         // allows cross-origin cookies
                path: '/',
                maxAge: 24 * 60 * 60 * 1000, // optional: 1 day
            });

            return res.json({ message: "Present" });
        }
        else {
            return res.json({ message: "Not Present" })
        }
    })
})

loginRouter.get("/api/verify", verifier, (req, res) => {
    res.json({ message: "Valid", user: req.user })

})

loginRouter.post("/api/username", verifier, (req, res) => {
    if (req.user) {
        return res.json({ username: req.user.username, state: "true" });
    }
    else {
        return res.json({ state: "false" });
    }
})

loginRouter.post("/api/disconnect", verifier, (req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'LoggedOut' });
})



function verifier(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: "No Token" })
    }

    jwt.verify(token, 'kukie', (err, user) => {
        if (err) {
            return res.json({ message: "Invalid Token" })
        }
        req.user = user;
        next();
    })
}

module.exports = loginRouter;
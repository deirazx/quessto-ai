const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token provided' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decodedToken.id)

        if (!req.user) {
            return res.status(401).json({
                message: "Not authorized, user not found"
            })
        }

        next()
    } catch (error) {
        console.error('Auth error:', error.message);
        res.status(401).json({ message: 'Not authorized, invalid token' });
    }
}

module.exports = { protect }
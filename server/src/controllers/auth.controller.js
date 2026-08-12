const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const GenerateToken = (userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return token
}


const googleAuth = async (req, res) => {
    try {
        const { name, email } = req.body
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ name, email });
        }

        const token = GenerateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            samesite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({ message: "User authenticated successfully", user })
    } catch (error) {
        console.log("Error during Google auth", error)
        res.status(500).json({ message: `googleSignup Error: ${error}` })
    }
}

const logOut = async (req, res) => {
    try {
        await res.clearCookie("token");
        res.status(200).json({ message: "User logout successfully" });
    } catch (error) {
        res.status(500).json({ message: `Logout Error!! ${error}` });
    }
}

const getCurrectUser = async (req, res) => {
    try {
        console.log(req.user)
        res.status(200).json({
            message: "Successfully get current user",
            user: req.user
        })

    } catch (error) {
        console.log("Error while getting current user", error)
        res.status(400).json({
            message: "Error while getting current user"
        })
    }
}

module.exports = { googleAuth, logOut, getCurrectUser };
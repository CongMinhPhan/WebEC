const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        // Lay thong tin email, password trong body req
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Please provide email and password");
        }
        // tim user theo email
        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email,
            };
            const TOKEN_SECRET_KEY = "WEB_MINH";
            const token = await jwt.sign(tokenData, TOKEN_SECRET_KEY, { expiresIn: '8h' });

            const tokenOption = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Sử dụng secure trong môi trường production
                sameSite: 'strict'
            };

            res.cookie("token", token, tokenOption).status(200).json({
                message: "Login successfully",
                data: token,
                success: true,
                error: false
            });
        } else {
            throw new Error("Incorrect password");
        }
    } catch (err) {
        res.status(400).json({
            message: err.message || "Failed to sign in",
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;

const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

/**
 * Middleware to verify JWT token and authenticate users
 * Adds user information to req.user if token is valid
 */
async function authenticate(req, res, next) {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided or invalid format. Use 'Bearer <token>'"
            });
        }

        // Extract token (remove 'Bearer ' prefix)
        const token = authHeader.substring(7);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. Token is empty."
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add user info to request object
        req.user = decoded;

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Invalid token."
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token has expired. Please login again."
            });
        }

        return res.status(401).json({
            success: false,
            message: "Authentication failed.",
            error: error.message
        });
    }
}

module.exports = authenticate;

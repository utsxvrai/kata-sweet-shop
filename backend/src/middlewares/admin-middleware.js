const { UserRepository } = require("../repositories");

/**
 * Middleware to check if authenticated user has ADMIN role
 * Must be used AFTER authenticate middleware
 */
async function isAdmin(req, res, next) {
    try {
        // Check if user is authenticated (should be set by auth middleware)
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Authentication required. Please login first."
            });
        }

        // Fetch user from database to check role
        const userRepository = new UserRepository();
        const user = await userRepository.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Check if user has ADMIN role
        if (user.role !== 'ADMIN') {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admin privileges required."
            });
        }

        // Add full user object to request for later use
        req.adminUser = user;

        next();
    } catch (error) {
        console.error("Error in admin middleware:", error);
        return res.status(500).json({
            success: false,
            message: "Authorization check failed.",
            error: error.message
        });
    }
}

module.exports = isAdmin;

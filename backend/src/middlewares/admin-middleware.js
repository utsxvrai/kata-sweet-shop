const { UserRepository } = require("../repositories");

async function isAdmin(req, res, next) {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Authentication required. Please login first."
            });
        }

        const userRepository = new UserRepository();
        const user = await userRepository.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        if (user.role !== 'ADMIN') {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admin privileges required."
            });
        }

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

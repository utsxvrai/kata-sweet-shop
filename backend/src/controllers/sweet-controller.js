const { SweetService } = require("../services");

/**
 * Add a new sweet to the inventory
 * POST /api/v1/sweets
 */
async function addSweet(req, res) {
    try {
        const { name, category, price, quantity } = req.body;

        // Validation
        if (!name || !category || !price || !quantity) {
            return res.status(400).json({
                success: false,
                message: "All fields are required: name, category, price, quantity"
            });
        }

        if (price <= 0 || quantity < 0) {
            return res.status(400).json({
                success: false,
                message: "Price must be positive and quantity cannot be negative"
            });
        }

        const sweet = await SweetService.addSweet({
            name,
            category,
            price: parseFloat(price),
            quantity: parseInt(quantity)
        });

        return res.status(201).json({
            success: true,
            message: "Sweet added successfully",
            data: sweet
        });
    } catch (error) {
        console.error("Error in addSweet controller:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to add sweet",
            error: error.message
        });
    }
}

/**
 * Get all sweets
 * GET /api/v1/sweets
 */
async function listSweets(req, res) {
    try {
        const sweets = await SweetService.listSweets();

        return res.status(200).json({
            success: true,
            message: "Sweets retrieved successfully",
            data: sweets,
            count: sweets.length
        });
    } catch (error) {
        console.error("Error in listSweets controller:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve sweets",
            error: error.message
        });
    }
}

/**
 * Search sweets with filters
 * GET /api/v1/sweets/search?name=&category=&minPrice=&maxPrice=
 */
async function searchSweets(req, res) {
    try {
        const { name, category, minPrice, maxPrice } = req.query;

        const filters = {
            name: name || undefined,
            category: category || undefined,
            minPrice: minPrice ? parseFloat(minPrice) : undefined,
            maxPrice: maxPrice ? parseFloat(maxPrice) : undefined
        };

        const sweets = await SweetService.searchSweets(filters);

        return res.status(200).json({
            success: true,
            message: "Search completed successfully",
            data: sweets,
            count: sweets.length
        });
    } catch (error) {
        console.error("Error in searchSweets controller:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to search sweets",
            error: error.message
        });
    }
}

/**
 * Update sweet details
 * PUT /api/v1/sweets/:id
 */
async function updateSweet(req, res) {
    try {
        const { id } = req.params;
        const { name, category, price, quantity } = req.body;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                success: false,
                message: "Invalid sweet ID"
            });
        }

        const updateData = {};
        if (name) updateData.name = name;
        if (category) updateData.category = category;
        if (price !== undefined) updateData.price = parseFloat(price);
        if (quantity !== undefined) updateData.quantity = parseInt(quantity);

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No fields provided for update"
            });
        }

        const sweet = await SweetService.updateSweet(parseInt(id), updateData);

        return res.status(200).json({
            success: true,
            message: "Sweet updated successfully",
            data: sweet
        });
    } catch (error) {
        console.error("Error in updateSweet controller:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update sweet",
            error: error.message
        });
    }
}

/**
 * Delete a sweet
 * DELETE /api/v1/sweets/:id
 */
async function deleteSweet(req, res) {
    try {
        const { id } = req.params;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                success: false,
                message: "Invalid sweet ID"
            });
        }

        await SweetService.deleteSweet(parseInt(id));

        return res.status(200).json({
            success: true,
            message: "Sweet deleted successfully"
        });
    } catch (error) {
        console.error("Error in deleteSweet controller:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete sweet",
            error: error.message
        });
    }
}

/**
 * Restock a sweet (add quantity)
 * POST /api/v1/sweets/:id/restock
 */
async function restockSweet(req, res) {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                success: false,
                message: "Invalid sweet ID"
            });
        }

        if (!quantity || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a positive number"
            });
        }

        const sweet = await SweetService.restockSweet(parseInt(id), parseInt(quantity));

        return res.status(200).json({
            success: true,
            message: "Sweet restocked successfully",
            data: sweet
        });
    } catch (error) {
        console.error("Error in restockSweet controller:", error);
        
        if (error.message === "Sweet not found") {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to restock sweet",
            error: error.message
        });
    }
}

/**
 * Purchase a sweet (reduce quantity)
 * POST /api/v1/sweets/:id/purchase
 */
async function purchaseSweet(req, res) {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                success: false,
                message: "Invalid sweet ID"
            });
        }

        if (!quantity || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a positive number"
            });
        }

        const sweet = await SweetService.purchaseSweet(parseInt(id), parseInt(quantity));

        return res.status(200).json({
            success: true,
            message: "Purchase successful",
            data: sweet
        });
    } catch (error) {
        console.error("Error in purchaseSweet controller:", error);
        
        if (error.message === "Sweet not found") {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }

        if (error.message === "Insufficient stock") {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to purchase sweet",
            error: error.message
        });
    }
}

module.exports = {
    addSweet,
    listSweets,
    searchSweets,
    updateSweet,
    deleteSweet,
    restockSweet,
    purchaseSweet
};
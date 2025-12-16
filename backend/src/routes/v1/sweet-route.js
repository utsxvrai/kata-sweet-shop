const express = require("express");
const router = express.Router();
const { SweetController } = require("../../controllers");
const { authenticate, isAdmin } = require("../../middlewares");

// Public routes (no authentication required - if you want them public)
// OR protect all routes - let's protect all as per requirements

// Get all sweets (Protected - requires authentication)
router.get("/", authenticate, SweetController.listSweets);

// Search sweets with filters (Protected - requires authentication)
router.get("/search", authenticate, SweetController.searchSweets);

// Add a new sweet (Protected - requires authentication)
router.post("/", authenticate, SweetController.addSweet);

// Update sweet details (Protected - requires authentication)
router.put("/:id", authenticate, SweetController.updateSweet);

// Delete a sweet (Protected - Admin only)
router.delete("/:id", authenticate, isAdmin, SweetController.deleteSweet);

// Restock a sweet (Protected - Admin only)
router.post("/:id/restock", authenticate, isAdmin, SweetController.restockSweet);

// Purchase a sweet (Protected - requires authentication)
router.post("/:id/purchase", authenticate, SweetController.purchaseSweet);

module.exports = router;

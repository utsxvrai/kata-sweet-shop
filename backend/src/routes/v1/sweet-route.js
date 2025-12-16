const express = require("express");
const router = express.Router();
const { SweetController } = require("../../controllers");

// Get all sweets
router.get("/", SweetController.listSweets);

// Search sweets with filters
router.get("/search", SweetController.searchSweets);

// Add a new sweet
router.post("/", SweetController.addSweet);

// Update sweet details
router.put("/:id", SweetController.updateSweet);

// Delete a sweet
router.delete("/:id", SweetController.deleteSweet);

// Restock a sweet
router.post("/:id/restock", SweetController.restockSweet);

// Purchase a sweet
router.post("/:id/purchase", SweetController.purchaseSweet);

module.exports = router;

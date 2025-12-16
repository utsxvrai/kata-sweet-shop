const express = require("express");
const router = express.Router();
const { SweetController } = require("../../controllers");
const { authenticate, isAdmin } = require("../../middlewares");

router.get("/", authenticate, SweetController.listSweets);

router.get("/search", authenticate, SweetController.searchSweets);

router.post("/", authenticate, SweetController.addSweet);

router.put("/:id", authenticate, SweetController.updateSweet);

router.delete("/:id", authenticate, isAdmin, SweetController.deleteSweet);

router.post("/:id/restock", authenticate, isAdmin, SweetController.restockSweet);

router.post("/:id/purchase", authenticate, SweetController.purchaseSweet);

module.exports = router;

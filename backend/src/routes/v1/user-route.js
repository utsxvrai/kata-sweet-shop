const express = require("express");
const router = express.Router();
const {UserController} = require("../../controllers");


router.post("/register", UserController.register);
router.post("/signin", UserController.signin);


module.exports = router;

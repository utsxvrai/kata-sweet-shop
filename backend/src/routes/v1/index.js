const express = require('express');
const  userRoute  = require('./user-route');
const sweetRoute = require('./sweet-route');

const router = express.Router();

router.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});

router.use('/user', userRoute);
router.use('/sweets', sweetRoute);

module.exports = router;

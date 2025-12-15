const express = require('express');
const  userRoute  = require('./user-route');

const router = express.Router();

router.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});

router.use('/user', userRoute);

module.exports = router;

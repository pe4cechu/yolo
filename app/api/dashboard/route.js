const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/dashboard');

router.get('/', dashboardController.dashboard)
router.post('/', dashboardController.updated);

module.exports = router;

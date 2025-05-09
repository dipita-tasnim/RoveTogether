const express = require('express');
const router = express.Router();
const sosController = require('../controllers/sos.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Protected routes
router.post('/trigger', authMiddleware, sosController.triggerSOS);
router.put('/emergency-contact/:userId', authMiddleware, sosController.updateEmergencyContact);
router.get('/active-alerts', authMiddleware, sosController.getActiveSOSAlerts);

module.exports = router;
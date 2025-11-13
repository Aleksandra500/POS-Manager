const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// GLOBALNI CHAT
router.get('/', messageController.getAllMessages);
router.post('/', messageController.addMessage);

// PRIVATNI CHAT
router.get('/private/:roomId', messageController.getPrivateMessages);
router.post('/private', messageController.addPrivateMessage);

module.exports = router;

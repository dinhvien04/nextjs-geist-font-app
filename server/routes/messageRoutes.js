const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { auth, adminAuth } = require('../middleware/auth');
const { uploadFile } = require('../middleware/upload');

// Get all messages
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      deletedBy: { $ne: req.user._id }
    })
    .populate('sender', 'username avatar')
    .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send a text message
router.post('/', auth, async (req, res) => {
  try {
    const { content } = req.body;
    
    const message = new Message({
      content,
      sender: req.user._id,
      messageType: 'text'
    });

    await message.save();
    
    const populatedMessage = await message.populate('sender', 'username avatar');
    
    // Emit through Socket.IO (will be implemented in socket handler)
    req.app.get('io').emit('new message', populatedMessage);

    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Upload and send file/image message
router.post('/upload', auth, uploadFile.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    const messageType = req.file.mimetype.startsWith('image/') ? 'image' : 'file';
    
    const message = new Message({
      content: req.body.content || req.file.originalname,
      sender: req.user._id,
      messageType,
      fileUrl: req.file.path,
      fileName: req.file.originalname,
      fileSize: req.file.size
    });

    await message.save();
    
    const populatedMessage = await message.populate('sender', 'username avatar');
    
    req.app.get('io').emit('new message', populatedMessage);

    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Send voice message
router.post('/voice', auth, uploadFile.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No audio file uploaded');
    }

    const message = new Message({
      content: 'Voice message',
      sender: req.user._id,
      messageType: 'voice',
      fileUrl: req.file.path,
      fileName: req.file.originalname,
      fileSize: req.file.size
    });

    await message.save();
    
    const populatedMessage = await message.populate('sender', 'username avatar');
    
    req.app.get('io').emit('new message', populatedMessage);

    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete (hide) a message
router.delete('/:id', auth, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // Only message sender or admin can delete messages
    if (message.sender.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await message.softDelete(req.user._id);
    
    req.app.get('io').emit('message deleted', {
      messageId: message._id,
      deletedBy: req.user._id
    });

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin Routes

// Get all messages (including deleted ones) - Admin only
router.get('/admin/all', adminAuth, async (req, res) => {
  try {
    const messages = await Message.find({})
      .populate('sender', 'username email')
      .populate('deletedBy', 'username')
      .sort({ createdAt: -1 });
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Permanently delete message - Admin only
router.delete('/admin/:id', adminAuth, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    await message.remove();
    
    req.app.get('io').emit('message permanently deleted', message._id);

    res.json({ message: 'Message permanently deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

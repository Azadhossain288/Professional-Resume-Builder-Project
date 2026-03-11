const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const auth = require('../middleware/auth');

// Save resume
router.post('/save', auth, async (req, res) => {
  try {
    const resume = new Resume({
      user: req.user.id,
      ...req.body
    });
    await resume.save();
    res.status(201).json({ message: 'Resume saved!', resume });
  } catch (err) {
    res.status(500).json({ message: 'Error saving resume' });
  }
});

// Get all resumes
router.get('/all', auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching resumes' });
  }
});

// Get single resume
router.get('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
});

// Update resume
router.put('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json({ message: 'Resume updated!', resume });
  } catch (err) {
    res.status(500).json({ message: 'Error updating' });
  }
});

// Delete resume
router.delete('/:id', auth, async (req, res) => {
  try {
    await Resume.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user.id 
    });
    res.json({ message: 'Resume deleted!' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting' });
  }
});

module.exports = router;
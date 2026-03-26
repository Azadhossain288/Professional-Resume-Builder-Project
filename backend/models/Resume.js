const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  template: {
    type: String,
    default: 'modern'
  },
  personalInfo: {
    name: String,
    title: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
  },
  summary: {
    type: String,
    default: ''
  },
  experience: [{
    id: Number,
    role: String,
    company: String,
    duration: String,
    description: String,
  }],
  education: [{
    id: Number,
    degree: String,
    school: String,
    year: String,
  }],
  skills: [String],
  projects: [{
    id: Number,
    name: String,
    tech: String,
    link: String,
    description: String,
  }]
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
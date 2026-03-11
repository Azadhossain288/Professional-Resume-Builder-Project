const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: 'My Resume'
  },
  template: {
    type: String,
    default: 'modern'
  },
  personal: {
    firstName: String,
    lastName: String,
    jobTitle: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    summary: String
  },
  education: [{
    degree: String,
    school: String,
    year: String,
    gpa: String
  }],
  experience: [{
    role: String,
    company: String,
    duration: String,
    desc: String
  }],
  skills: [String],
  projects: [{
    name: String,
    tech: String,
    desc: String,
    link: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
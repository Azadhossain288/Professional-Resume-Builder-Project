const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected!'))
  .catch(err => console.log('❌ MongoDB Error:', err));

// --- Routes ---

// ১. Auth Routes (লগইন ও রেজিস্ট্রেশন)
app.use('/api/auth', require('./routes/auth'));

// ২. Resume Routes (রেজ্যুমে সেভ ও লোড করা)
app.use('/api/resume', require('./routes/resume'));

// ৩. Contact Routes (যোগাযোগ ফর্ম)
app.use('/api/contact', require('./routes/contact'));

// ৪. AI Routes (Gemini AI Summary Generator) ✨ নতুন যোগ করা হয়েছে
app.use('/api/ai', require('./routes/ai'));

// Test route (সার্ভার চেক করার জন্য)
app.get('/', (req, res) => {
  res.json({ message: '🚀 Resume Builder API is Running Smoothly!' });
});

// Port Setting
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
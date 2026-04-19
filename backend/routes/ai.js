const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// এখানে API Version 'v1' ফোর্স করছি কারণ 'v1beta' আপনার জন্য কাজ করছে না
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/generate-summary', async (req, res) => {
    try {
        const { jobTitle, skills } = req.body;
        console.log("🚀 Requesting AI for:", jobTitle);

        // v1beta এ এরর দিলে গুগল সরাসরি 'gemini-1.5-flash' কে এভাবে চেনে
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash" 
        }, { apiVersion: 'v1' }); // এটিই আসল ম্যাজিক লাইন

        const prompt = `Write a short 2-sentence professional resume summary for a ${jobTitle}. Skills: ${skills?.join(', ') || 'relevant skills'}.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        console.log("✅ AI Success!");
        res.json({ summary: text });

    } catch (error) {
        console.error("❌ ERROR DETAILS:", error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
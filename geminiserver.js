const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Your Gemini API key
const GEMINI_API_KEY = 'AIzaSyBQ4UAskk_Z61mOULIQHTcWk-v5JLLRyBE';

// Create an instance of GoogleGenerativeAI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Endpoint to handle prompt from frontend
app.post('/api/fetch-text', async (req, res) => {
    const { prompt } = req.body;

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Generate content using the provided prompt
        const result = await model.generateContent([prompt]);

        // Send the response back to the frontend
        res.json({ text: result.response.text() });
    } catch (error) {
        console.error('Error communicating with Gemini API:', error);
        res.status(500).json({ error: 'Failed to fetch text from Gemini API' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

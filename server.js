const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Serve static files from current directory
app.use(express.static('.'));

// Proxy endpoint for JDoodle API
app.post('/api/execute', async (req, res) => {
    try {
        const { script, language } = req.body;
        
        const response = await fetch('https://api.jdoodle.com/v1/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                script: script,
                language: language,
                versionIndex: "0",
                clientId: "557fa1c76e7b1bec7d9b7c16a658ecaa",
                clientSecret: "a14182a38bdb1b0ec159e50bc1a1ad71a360af6f928eb2fa63adfeb71a7046c7"
            }),
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

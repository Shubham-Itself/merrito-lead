// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve index.html

app.post('/submit-form', async (req, res) => {
  const { name, email, mobile, field_school_of_interest , source } = req.body;

  try {
    const response = await fetch('https://api.nopaperforms.io/lead/v1/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-key': process.env.ACCESS_KEY,
        'secret-key': process.env.SECRET_KEY
      },
      body: JSON.stringify({
        name,
        email,
        mobile,
        field_school_of_interest,

      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit form', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
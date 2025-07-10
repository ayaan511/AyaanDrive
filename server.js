const express = require('express');
const multer = require('multer');
const { GITHUB_USERNAME, REPO_NAME, GITHUB_TOKEN } = require('./config');

const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Serve static files (front-end)
app.use(express.static(__dirname));

// Upload endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = `files/${req.file.originalname}`;
  const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${filePath}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'AyaanDrive'
      },
      body: JSON.stringify({
        message: `Upload ${req.file.originalname}`,
        content: req.file.buffer.toString('base64')
      })
    });

    const result = await response.json();
    if (!response.ok) {
      return res.status(500).json({ error: result.message });
    }

    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/main/${filePath}`;
    res.json({ success: true, url: rawUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List uploaded files
app.get('/files', async (req, res) => {
  const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/files`;
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'User-Agent': 'AyaanDrive'
      }
    });
    const result = await response.json();
    if (!response.ok) {
      return res.status(500).json({ error: result.message });
    }
    const names = result.map(item => item.name);
    res.json(names);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Download a file
app.get('/download/:filename', (req, res) => {
  const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/main/files/${req.params.filename}`;
  res.redirect(rawUrl);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes (adjust as needed for security)
app.use(cors());

// Serve static files from the '3dModels' directory
app.use('/3dmodels', express.static(path.join(__dirname, '3dModels')));

// API endpoint to get the list of 3D objects
app.get('/api/3d-objects', (req, res) => {
  const modelsDir = path.join(__dirname, '3dModels');

  fs.readdir(modelsDir, (err, files) => {
    if (err) {
      console.error('Error reading 3D models directory:', err);
      return res.status(500).json({ error: 'Failed to read models directory' });
    }

    // Filter for .glb and .gltf files
    const modelFiles = files.filter(file => file.endsWith('.glb') || file.endsWith('.gltf'));

    // Map to objects with name and URL
    // server.js (inside the /api/3d-objects route)
const models = folders.map(folder => {
      const modelPath = path.join(modelsDirectory, folder, `${folder}.gltf`);
      return {
        name: folder,
        url: `/3dModels/${folder}/${folder}.gltf`
      };
    });

    res.json(models);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

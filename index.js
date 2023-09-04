const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files (CSS, images, etc.) from a 'public' folder
app.use(express.static('public'));

// Define a route to render the HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Define an API endpoint to fetch weather data
app.get('/weather', async (req, res) => {
  try {
    const { city, apiKey } = req.query;
    if (!city || !apiKey) {
      throw new Error('City and API key are required.');
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await axios.get(apiUrl);

    const weatherData = response.data;
    res.json(weatherData);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

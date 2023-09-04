const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files (CSS, images, etc.) from a 'public' folder
app.use(express.static('public'));

// Replace 'YOUR_WEATHERBIT_API_KEY' with your actual Weatherbit API key
const apiKey = 'da1327bd0946469a972e7ead42535237';
const apiUrl = `https://api.weatherbit.io/v2.0/current?&key=${apiKey}`;

app.use(express.json());

// Define a route to render the HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Define an API endpoint to fetch weather data
app.get('/weather', async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      throw new Error('City is required.');
    }

    const response = await axios.get(`${apiUrl}&city=${city}`);
    const weatherData = response.data.data[0];

    if (weatherData) {
      const temperature = weatherData.temp;
      const description = weatherData.weather.description;
      res.json({ temperature, description });
    } else {
      res.json({ error: 'City not found.' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

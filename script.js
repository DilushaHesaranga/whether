document.addEventListener('DOMContentLoaded', () => {
  const cityInput = document.getElementById('cityInput');
  const getWeatherButton = document.getElementById('getWeather');
  const weatherInfo = document.getElementById('weatherInfo');

  getWeatherButton.addEventListener('click', async () => {
    const city = cityInput.value;
    if (!city) {
      alert('Please enter a city name.');
      return;
    }

    // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
    const apiKey = 'da1327bd0946469a972e7ead42535237';

    try {
      const response = await fetch(`/weather?city=${city}&apiKey=${apiKey}`);
      const data = await response.json();

      if (data.weather) {
        const temperature = data.main.temp - 273.15; // Convert to Celsius
        const description = data.weather[0].description;
        weatherInfo.textContent = `Temperature: ${temperature.toFixed(2)}°C, Description: ${description}`;
      } else {
        weatherInfo.textContent = 'City not found.';
      }
    } catch (error) {
      console.error('Error:', error);
      weatherInfo.textContent = 'An error occurred while fetching weather data.';
    }
  });
});

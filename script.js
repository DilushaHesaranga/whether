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

    try {
      const response = await fetch(`/weather?city=${city}`);
      const data = await response.json();

      if (data.temperature && data.description) {
        const tempValue = document.getElementById('tempValue');
        const descValue = document.getElementById('descValue');

        tempValue.textContent = data.temperature;
        descValue.textContent = data.description;
      } else {
        weatherInfo.textContent = 'City not found.';
      }
    } catch (error) {
      console.error('Error:', error);
      weatherInfo.textContent = 'An error occurred while fetching weather data.';
    }
  });
});

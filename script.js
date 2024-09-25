document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '2de9182cb2ff3a227c9428d76865f254';  
    const weatherData = document.getElementById('weatherData');
    const cityInput = document.getElementById('cityInput');
    const getWeatherBtn = document.getElementById('getWeatherBtn');

    getWeatherBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();  
        if (city === '') {
            alert('Please enter a city name');
            return;
        }
        getWeather(city);
    });

    async function getWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (response.ok) {
                displayWeather(data);  
            } else {
                handleError(data);  
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('Unable to fetch weather data. Please check your internet connection or try again later.');
        }
    }

    function handleError(data) {
        if (data.cod === '404') {
            alert('City not found. Please enter a valid city name.');
        } else {
            alert(`Error: ${data.message}`);
        }
    }

    function displayWeather(data) {
    
        weatherData.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Feels like: ${data.main.feels_like} °C</p>
            <p>Humidity: ${data.main.humidity} %</p>
            <p>Weather: ${data.weather[0].description}</p>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
        `;
    }
});

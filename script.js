const apiKey = "f87800657f418728ecfb2ab568582c87";

const weatherDataEl = document.getElementById("weather-data"); // Correcting the variable name
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value;
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}°C`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed} m/s`,
    ];

    // Clear previous weather data
    weatherDataEl.innerHTML = "";

    // Update the DOM with new data
    const weatherHTML = `
      <div>
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}" />
        <p>${temperature}°C</p>
        <p>${description}</p>
        <p>${details.join(" | ")}</p>
      </div>
    `;
    weatherDataEl.innerHTML = weatherHTML;
  } catch (error) {
    console.error("Failed to fetch weather data:", error); // Log the error
    weatherDataEl.innerHTML = `<p>Error fetching weather data. Please try again later.</p>`; // Inform the user
  }
}

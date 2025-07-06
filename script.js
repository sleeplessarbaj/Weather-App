async function fetchWeather() {
  console.log("Search triggered!");

  const searchInput = document.getElementById('search').value.trim();
  const weatherDataSection = document.getElementById("weather-data");
  weatherDataSection.style.display = "none"; 

  const apiKey = "Api key"; // WeatherAPI.com key

  if (searchInput === "") {
    console.log("Empty input!");
    weatherDataSection.style.display = "block";
    weatherDataSection.innerHTML = `
      <div>
        <h2>Empty Input!</h2>
        <p>Please try again with a valid <u>city name</u>.</p>
      </div>
    `;
    return;
  }

  const weatherURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(searchInput)}`;
  console.log("Fetching weather:", weatherURL);

  try {
    const response = await fetch(weatherURL);
    if (!response.ok) {
      console.error("Bad weather response:", response.status);
      weatherDataSection.style.display = "block";
      weatherDataSection.innerHTML = `
        <div>
          <h2>City Not Found</h2>
          <p>Please check your spelling and try again.</p>
        </div>
      `;
      return;
    }

    const data = await response.json();
    console.log("Weather data:", data);

    weatherDataSection.style.display = "flex";
    weatherDataSection.innerHTML = `
      <img src="${data.current.condition.icon}" alt="${data.current.condition.text}" width="100" />
      <div>
        <h2>${data.location.name}, ${data.location.country}</h2>
        <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
        <p><strong>Condition:</strong> ${data.current.condition.text}</p>
        <p><strong>Feels like:</strong> ${data.current.feelslike_c}°C</p>
      </div>
    `;
  } catch (error) {
    console.error("Weather fetch error:", error);
    weatherDataSection.style.display = "block";
    weatherDataSection.innerHTML = `
      <div>
        <h2>Error</h2>
        <p>Could not fetch weather data. Please try again later.</p>
      </div>
    `;
  }

  document.getElementById("search").value = "";
}

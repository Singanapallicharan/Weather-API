const apiKey = "8d2e5df3cb5db503d529fe887a43864c";
        
        const inputElement = document.querySelector('.js-city-input');
        const searchButton = document.querySelector('.js-search-bar');
        const tempElement = document.querySelector('.temperature');
        const cityElement = document.querySelector('.city-name');
        const humidityElement = document.querySelector('.humidity');
        const windElement = document.querySelector('.wind');
        const weatherIcon = document.querySelector('.weather-icon');

        async function checkWeather(city) {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
            
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error("City not found!");
                
                const data = await response.json();
                console.log(data);
                
                cityElement.innerHTML = data.name;
                tempElement.innerHTML = `${Math.round(data.main.temp)}°C`;
                humidityElement.innerHTML = `${data.main.humidity}%`;
                windElement.innerHTML = `${data.wind.speed} km/h`;

                // Change weather icon based on conditions
                const weatherCondition = data.weather[0].main.toLowerCase();
                if (weatherCondition.includes("cloud")) {
                    weatherIcon.src = "images/clouds.png";
                } else if (weatherCondition.includes("rain")) {
                    weatherIcon.src = "images/rain.png";
                } else if (weatherCondition.includes("clear")) {
                    weatherIcon.src = "images/clear.png";
                } else {
                    weatherIcon.src = "images/default.png";
                }
                
            } catch (error) {
                alert(error.message);
            }
        }

        searchButton.addEventListener('click', function() {
            const city = inputElement.value.trim();
            if (city) {
                checkWeather(city);
            } else {
                alert("Please enter a city name.");
            }
        });

        // Initial Weather for a default city
        checkWeather("Bengaluru");

    
$(document).ready(function() {
    const apiKey = 'f9bbc6ac50ec9b9d88bc05c30a459ffe'; // Replace 'YOUR_API_KEY' with your actual API key

    // Function to fetch 5-day weather forecast for a city
    function fetchWeatherForecast(cityName) {
        // Construct the API request URL for forecast
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

        // Fetch weather forecast data using fetch API
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Weather forecast data:', data);
                // Process the weather forecast data
                const forecastList = data.list;

                // Extract and display forecast details (e.g., for the next 5 days)
                displayForecast(cityName, forecastList);
            })
            .catch(error => {
                console.error('Error fetching weather forecast data:', error);
                alert('Failed to fetch weather forecast. Please try again.');
            });
    }

    // Function to display 5-day forecast details in the modal
    function displayForecast(cityName, forecastList) {
        // Update modal title with city name
        $('#weatherModalLabel').text(`5-Day Weather Forecast for ${cityName}`);

        // Clear previous forecast data in the modal body
        $('#modalBody').empty();

        // Loop through forecast data (every 8th entry for daily forecast)
        for (let i = 0; i < forecastList.length; i += 8) {
            const forecast = forecastList[i];
            const date = new Date(forecast.dt * 1000); // Convert timestamp to date
            const temperature = forecast.main.temp;
            const windSpeed = forecast.wind.speed;

            // Create forecast entry HTML
            console.log(forecast)
            $("#day0temp").text("Temperature: "+forecastList[0].main.temp+" °C")
            $("#day1temp").text("Temperature: "+forecastList[7].main.temp+" °C")
            $("#day2temp").text("Temperature: "+forecastList[15].main.temp+" °C")
            $("#day3temp").text("Temperature: "+forecastList[23].main.temp+" °C")
            $("#day4temp").text("Temperature: "+forecastList[31].main.temp+" °C")
            $("#day5temp").text("Temperature: "+forecastList[39].main.temp+" °C")

            $("#day0wind").text("wind: "+forecastList[0].wind.speed+" km/h")
            $("#day1wind").text("wind: "+forecastList[7].wind.speed+" km/h")
            $("#day2wind").text("wind: "+forecastList[15].wind.speed+" km/h")
            $("#day3wind").text("wind: "+forecastList[23].wind.speed+" km/h")
            $("#day4wind").text("wind: "+forecastList[31].wind.speed+" km/h")
            $("#day5wind").text("wind: "+forecastList[39].wind.speed+" km/h")

            $("#humidity1").text("humidity: "+forecastList[7].main.humidity+" %")
            $("#humidity0").text("humidity: "+forecastList[0].main.humidity+" %")
            $("#humidity2").text("humidity: "+forecastList[15].main.humidity+" %")
            $("#humidity3").text("humidity: "+forecastList[23].main.humidity+" %")
            $("#humidity4").text("humidity: "+forecastList[31].main.humidity+" %")
            $("#humidity5").text("humidity: "+forecastList[39].main.humidity+" %")

            $("#date1").text("date: "+forecastList[7].dt_txt)
            $("#date2").text("date: "+forecastList[15].dt_txt)
            $("#date3").text("date: "+forecastList[23].dt_txt)
            $("#date4").text("date: "+forecastList[31].dt_txt)
            $("#date5").text("date: "+forecastList[39].dt_txt)

            $(".cityName").text(cityName)
            const forecastEntry = `
                <div class="forecast-entry">
                    <p><strong>Date:</strong> ${date.toLocaleDateString()}</p>
                    <p><strong>Temperature:</strong> ${temperature} °C</p>
                    <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
                    <hr>
                </div>
            `;

            // Append forecast entry to modal body
            $('#modalBody').append(forecastEntry);
        }

        // Show the weather forecast modal
        $('#weatherModal').modal('show');
    }

    // Event listener for search button click
    $('#button-addon2').click(function() {
        const cityName = $('.search-input').val().trim();

        if (cityName !== '') {
            // Fetch weather forecast for the entered city
            fetchWeatherForecast(cityName);
        } else {
            alert('Please enter a city name.');
        }
    });
});
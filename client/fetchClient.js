// fetch data for index 1
import {
    weatherData,
    event,
    temperaturePrediction,
    precipitationPrediction,
    weatherPrediction,
} from "./model";


// function fetchWeatherData() {
//     fetch(`http://localhost:8080/forecast/${citySelector.value}`)
//     .then(response => response.json())
//     .then(data => {
//         displayHourlyForecast(data, selectedHour? selectedHour : new Date().getHours());  
//     })
//     .catch(error => console.error('Error fetching forecast data:', error));
// }

// function displayHourlyForecast(data, selectedHour) {
//     const selectedHourData = data.filter(entry => {
//         const entryTime = new Date(entry.time);
//         return entryTime.getHours() - 2 === selectedHour;
//     });

//     const jsonString = JSON.stringify(selectedHourData, undefined, 4); 
//     hourlyForecastDiv.textContent = jsonString;
// }

// hourSelector.addEventListener('change', () => {
//     selectedHour = parseInt(hourSelector.value);
//     fetchWeatherData();
// });

// citySelector.addEventListener('change', () => {
//     citySelector.value;
//     fetchWeatherData();
// });

// weatherDataButton.addEventListener('click', () => {
//     window.location.href = 'weather_data.html';
// });

// weatherFormButton.addEventListener('click', () => {
//     window.location.href = 'weather_form.html';
//     });
    
// fetchWeatherData();

export async function apiClient() {
    const data = {
        get: async function () {
            const res = await fetch("http://localhost:8080/data");
            const data = await res.json();
            return data.map((d) =>
                weatherData(d.value, d.type, d.unit, event(d.time, d.place))
            );
        },
        place: async function (place) {
            return {
                get: async function () {
                    const res = await fetch(
                        `http://localhost:8080/data/${place}`
                    );
                    const data = await res.json();
                    return data.map((d) =>
                        weatherData(
                            d.value,
                            d.type,
                            d.unit,
                            event(d.time, d.place)
                        )
                    );
                },
            };
        },
    };

    const forecast = {
        get: async function () {
            const res = await fetch("http://localhost:8080/forecast");
            const data = await res.json();
            return {
                temperatures: data
                    .filter((d) => d.type === "temperature")
                    .map((d) =>
                        temperaturePrediction(
                            weatherPrediction(
                                d.to,
                                d.from,
                                d.type,
                                d.unit,
                                event(d.time, d.place)
                            )
                        )
                    ),
                precipitations: data
                    .filter((d) => d.type === "precipitation")
                    .map((d) =>
                        precipitationPrediction(
                            d.precipitation_types,
                            weatherPrediction(
                                d.to,
                                d.from,
                                d.type,
                                d.unit,
                                event(d.time, d.place)
                            )
                        )
                    ),
                wind: data
                    .filter((d) => d.type === "wind")
                    .map((d) =>
                        wind(
                            d.directions,
                            weatherPrediction(
                                d.to,
                                d.from,
                                d.type,
                                d.unit,
                                event(d.time, d.place)
                            )
                        )
                    ),
                temperaturePredictions: data
                    .filter((d) => d.type === "temperature")
                    .map((d) =>
                        temperaturePrediction(
                            weatherPrediction(
                                d.to,
                                d.from,
                                d.type,
                                d.unit,
                                event(d.time, d.place)
                            )
                        )
                    ),
                cloudCoverages: data
                    .filter((d) => d.type === "cloud coverage")
                    .map((d) =>
                        cloudCoveragePrediction(
                            d.to,
                            d.from,
                            d.type,
                            d.unit,
                            event(d.time, d.place)
                        )
                    ),
            };
        },
    };

    const forecastPlace = {
        get: async function (place) {
            const res = await fetch(`http://localhost:8080/data/${place}`);
            const data = await res.json();
            return {
                temperatures: data
                    .filter((d) => d.type === "temperature")
                    .map((d) =>
                        temperaturePrediction(
                            weatherPrediction(
                                d.to,
                                d.from,
                                d.type,
                                d.unit,
                                event(d.time, d.place)
                            )
                        )
                    ),
                precipitations: data
                    .filter((d) => d.type === "precipitation")
                    .map((d) =>
                        precipitationPrediction(
                            d.precipitation_types,
                            weatherPrediction(
                                d.to,
                                d.from,
                                d.type,
                                d.unit,
                                event(d.time, d.place)
                            )
                        )
                    ),
                wind: data
                    .filter((d) => d.type === "wind")
                    .map((d) =>
                        wind(
                            d.directions,
                            weatherPrediction(
                                d.to,
                                d.from,
                                d.type,
                                d.unit,
                                event(d.time, d.place)
                            )
                        )
                    ),
                temperaturePredictions: data
                    .filter((d) => d.type === "temperature")
                    .map((d) =>
                        temperaturePrediction(
                            weatherPrediction(
                                d.to,
                                d.from,
                                d.type,
                                d.unit,
                                event(d.time, d.place)
                            )
                        )
                    ),
                cloudCoverages: data
                    .filter((d) => d.type === "cloud coverage")
                    .map((d) =>
                        cloudCoveragePrediction(
                            d.to,
                            d.from,
                            d.type,
                            d.unit,
                            event(d.time, d.place)
                        )
                    ),
            };
        },
    };
}


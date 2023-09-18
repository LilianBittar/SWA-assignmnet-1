// fetch data for index 1
import {
    weatherData,
    event,
    temperaturePrediction,
    precipitationPrediction,
    weatherPrediction,
} from "./model";

async function apiClient() {
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

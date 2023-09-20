// fetch data for index 1
import {
    weatherData,
    event,
    weatherPrediction,
    temperaturePrediction,
    precipitationPrediction,
    windPrediction,
    precipitation,
    wind,
    cloudCoverge,
    cloudCoveragePrediction,
    temperature,
} from "./model";

export function apiClient(baseUrl) {
    baseUrl = baseUrl ?? "http://localhost:8080";
    const _mapPredicitons = (data) => {
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
                .filter((d) => d.type === "wind speed")
                .map((d) =>
                    windPrediction(
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
    };
    const _mapWeatherData = (data) => {
        return {
            temperatures: data
                .filter((d) => d.type === "temperature")
                .map((d) =>
                    temperature(
                        weatherData(
                            d.value,
                            d.type,
                            d.unit,
                            event(d.time, d.place)
                        )
                    )
                ),
            precipitations: data
                .filter((d) => d.type === "precipitation")
                .map((d) =>
                    precipitation(
                        d.precipitation_type,
                        weatherData(
                            d.value,
                            d.type,
                            d.unit,
                            event(d.time, d.place)
                        )
                    )
                ),
            wind: data
                .filter((d) => d.type === "wind speed")
                .map((d) =>
                    wind(
                        d.direction,
                        weatherData(
                            d.value,
                            d.type,
                            d.unit,
                            event(d.time, d.place)
                        )
                    )
                ),
            cloudCoverages: data
                .filter((d) => d.type === "cloud coverage")
                .map((d) =>
                    cloudCoverge(
                        d.value,
                        d.type,
                        d.unit,
                        event(d.time, d.place)
                    )
                ),
        };
    };
    const data = {
        get: async function () {
            const res = await fetch(`${baseUrl}/data`);
            const data = await res.json();
            return _mapWeatherData(data);
        },
        post: async function (data) {
            const res = await fetch(`${baseUrl}/data`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: data,
            });

            return await res.json();
        },
        place: function (place) {
            return {
                get: async function () {
                    const res = await fetch(`${baseUrl}/data/${place}`);
                    const data = await res.json();
                    return _mapWeatherData(data);
                },
            };
        },
    };

    const forecast = {
        get: async function () {
            const res = await fetch(`${baseUrl}/forecast`);
            const data = await res.json();
            return _mapPredicitons(data);
        },
    };

    const forecastPlace = {
        get: async function (place) {
            const res = await fetch(`${baseUrl}/forecast/${place}`);
            const data = await res.json();
            return _mapPredicitons(data);
        },
    };
    return {
        forecast,
        forecastPlace,
        data,
    };
}

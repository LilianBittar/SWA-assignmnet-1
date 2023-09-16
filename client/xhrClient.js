// API Client for index 2
import {
    weatherData,
    event,
    temperature,
    precipitation,
    temperaturePrediction,
    precipitationPrediction,
    weatherPrediction,
    wind,
    cloudCoverge,
    cloudCoveragePrediction,
} from "./model";

/***
 * API Wrapper for https://github.com/olehougaard/weather_report.
 * Uses XMLHttpRequest making requests to the API.
 *
 * @param baseUrl {string}
 *
 */
export function xhrApiClient(baseUrl) {
    if (!baseUrl) {
        baseUrl = "http://localhost:8080";
    }

    const GET = "GET";
    const _getJson = async (endpoint) => {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(GET, `${baseUrl}/${endpoint}`);
            xhr.onload = () => {
                if (xhr.status < 200 || xhr.status > 299) {
                    reject();
                }

                resolve(JSON.parse(xhr.responseText));
            };

            xhr.send();
        });
    };

    const POST = "POST";
    const _postJson = async (endpoint, data) => {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(POST, `${baseUrl}/${endpoint}`);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = () => {
                if (xhr.status < 200 || xhr.status > 299) {
                    reject();
                }

                resolve(JSON.parse(xhr.responseText));
            };
            xhr.send(JSON.stringify(data));
        });
    };

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
                        p.precipitation_type,
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
            const data = await _getJson("data");
            return _mapWeatherData(data);
        },

        post: async function (data) {
            const res = await _postJson(data);
            return res;
        },

        place: async function (place) {
            return {
                get: async function () {
                    const data = await _getJson(`data/${place}`);
                    return _mapWeatherData(data);
                },
            };
        },
    };

    const forecast = {
        get: async function () {
            const data = await _getJson("forecast");
            return _mapPredicitons(data);
        },

        place: function (place) {
            return {
                get: async function () {
                    const data = await _getJson(`forecast/${place}`);
                    return _mapPredicitons(data);
                },
            };
        },
    };

    return {
        data,
        forecast,
    };
}

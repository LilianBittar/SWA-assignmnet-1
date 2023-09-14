// API Client for index 2
import {
    weatherData,
    event,
    temperature,
    precipitation,
    temperaturePrediction,
    precipitationPrediction,
    weatherPrediction,
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

    const data = {
        get: async function () {
            const data = await _getJson("data");
            return data.map((d) =>
                weatherData(d.value, d.type, d.unit, event(d.time, d.place))
            );
        },
        place: async function (place) {
            return {
                get: async function () {
                    const data = await _getJson(`data/${place}`);
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
            };
        },
    };

    return {
        data,
        forecast,
    };
}

import { createEmitter } from "./emitter";
import { xhrApiClient } from "./xhrClient";
import { apiClient } from "./fetchClient";

export function createWeatherModel(client) {
    const _weatherDataSubjects = {
        All: "WEATHER_DATA",
        Aarhus: "WEATHER_DATA_AARHUS",
        Horsens: "WEATHER_DATA_HORSENS",
        Copenhagen: "WEATHER_DATA_COPENHAGEN",
    };
    const _forecastUpdateSubjects = {
        All: "WEATHER_UPDATE",
        Aarhus: "WEATHER_UPDATE_AARHUS",
        Horsens: "WEATHER_UPDATE_HORSENS",
        Copenhagen: "WEATHER_UPDATE_COPENHAGEN",
    };
    const _emitter = createEmitter();
    const _apiUrl = "http://localhost:8080";
    const _client = xhrApiClient(_apiUrl);
    const _fetchClient = apiClient();

    const getWeatherData = () => {
        if (client === "xhr") {
            _client.data
                .get()
                .then((d) => _emitter.emit(_weatherDataSubjects["All"], d));
            _client.data
                .place("Aarhus")
                .get()
                .then((d) => _emitter.emit(_weatherDataSubjects["Aarhus"], d));
            _client.data
                .place("Copenhagen")
                .get()
                .then((d) =>
                    _emitter.emit(_weatherDataSubjects["Copenhagen"], d)
                );
            _client.data
                .place("Horsens")
                .get()
                .then((d) => _emitter.emit(_weatherDataSubjects["Horsens"], d));
        }
        if (client === "fetch") {
            _fetchClient.data
                .get()
                .then((d) => _emitter.emit(_weatherDataSubjects["All"], d));
            _fetchClient.data
                .place("Aarhus")
                .get()
                .then((d) => _emitter.emit(_weatherDataSubjects["Aarhus"], d));
            _fetchClient.data
                .place("Copenhagen")
                .get()
                .then((d) =>
                    _emitter.emit(_weatherDataSubjects["Copenhagen"], d)
                );
            _fetchClient.data
                .place("Horsens")
                .get()
                .then((d) => _emitter.emit(_weatherDataSubjects["Horsens"], d));
        }
    };

    const getWeatherDataByFetch = () => {};

    getWeatherData();
    // const ONE_MINUTE = 60_000;
    setInterval(async () => {
        if (client === "xhr") {
            _client.forecast
                .get()
                .then((d) => _emitter.emit(_forecastUpdateSubjects["All"], d));
            _client.forecast
                .place("Aarhus")
                .get()
                .then((d) =>
                    _emitter.emit(_forecastUpdateSubjects["Aarhus"], d)
                );
            _client.forecast
                .place("Copenhagen")
                .get()
                .then((d) =>
                    _emitter.emit(_forecastUpdateSubjects["Copenhagen"], d)
                );
            _client.forecast
                .place("Horsens")
                .get()
                .then((d) =>
                    _emitter.emit(_forecastUpdateSubjects["Horsens"], d)
                );
        }

        if (client === "fetch") {
            _fetchClient.forecast
                .get()
                .then((d) => _emitter.emit(_forecastUpdateSubjects["All"], d));
            _fetchClient.forecastPlace
                .get("Aarhus")
                .then((d) =>
                    _emitter.emit(_forecastUpdateSubjects["Aarhus"], d)
                );
            _fetchClient.forecastPlace
                .get("Copenhagen")
                .then((d) =>
                    _emitter.emit(_forecastUpdateSubjects["Copenhagen"], d)
                );
            _fetchClient.forecastPlace
                .get("Horsens")
                .then((d) =>
                    _emitter.emit(_forecastUpdateSubjects["Horsens"], d)
                );
        }
        getWeatherData();
    }, 1000);

    const sendNewWeatherData = async (data) => {
        if (client === "fetch") {
            await _fetchClient.data.post(data);
        } else if (client === "xhr") {
            await _client.data.post(data);
        }
    };

    /***
     * Valid places: All | Horsens | Aarhus | Copenhagen
     */
    const subscribeToForecastUpdates = (place, listenerFn) => {
        _emitter.on(_forecastUpdateSubjects[place], listenerFn);
    };

    /***
     * Valid places: All | Horsens | Aarhus | Copenhagen
     */
    const subscribeToWeatherData = (place, listenerFn) => {
        _emitter.on(_weatherDataSubjects[place], listenerFn);
    };

    return {
        subscribeToForecastUpdates,
        subscribeToWeatherData,
        getWeatherData,
        getWeatherDataByFetch,
        sendNewWeatherData,
    };
}

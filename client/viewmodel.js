import { createBindableObjectProperty } from "./bindableProperty";

export function createViewModel(model) {
    let horsensWeatherData = createBindableObjectProperty();
    let aarhusWeatherData = createBindableObjectProperty();
    let copenhagenWeatherData = createBindableObjectProperty();

    let horsensForecast = createBindableObjectProperty();
    let aarhusForecast = createBindableObjectProperty();
    let copenhagenForecast = createBindableObjectProperty();

    model.subscribeToWeatherData("Horsens", (data) =>
        horsensWeatherData.setProperty(data)
    );
    model.subscribeToWeatherData("Aarhus", (data) =>
        aarhusWeatherData.setProperty(data)
    );
    model.subscribeToWeatherData("Copenhagen", (data) =>
        copenhagenWeatherData.setProperty(data)
    );

    model.subscribeToForecastUpdates("Horsens", (data) => {
        horsensForecast.setProperty(data);
    });
    model.subscribeToForecastUpdates("Aarhus", (data) => {
        aarhusForecast.setProperty(data);
    });
    model.subscribeToForecastUpdates("Copenhagen", (data) => {
        copenhagenForecast.setProperty(data);
    });

    return {
        horsensWeatherData,
        aarhusWeatherData,
        copenhagenWeatherData,
        horsensForecast,
        aarhusForecast,
        copenhagenForecast,
    };
}

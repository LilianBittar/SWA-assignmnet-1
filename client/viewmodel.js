import { createBindableObjectProperty } from "./bindableProperty";

export function createViewModel(model) {
    let horsensWeatherData = createBindableObjectProperty();
    let aarhusWeatherData = createBindableObjectProperty();
    let copenhagenWeatherData = createBindableObjectProperty();

    model.subscribeToWeatherData("Horsens", (data) =>
        horsensWeatherData.setProperty(data)
    );
    model.subscribeToWeatherData("Aarhus", (data) =>
        aarhusWeatherData.setProperty(data)
    );
    model.subscribeToWeatherData("Copenhagen", (data) =>
        copenhagenWeatherData.setProperty(data)
    );

    return {
        horsensWeatherData,
        aarhusWeatherData,
        copenhagenWeatherData,
    };
}

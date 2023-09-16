import { createBindableObjectProperty } from "./bindableProperty";

export function createViewModel(model) {
    let allWeatherDataProperty = createBindableObjectProperty();

    model.subscribeToWeatherData("All", (data) =>
        allWeatherDataProperty.setProperty(data)
    );

    return {
        allWeatherDataProperty,
    };
}

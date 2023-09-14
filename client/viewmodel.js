import { createBindableStringProperty } from "./bindableProperty";

export function createViewModel(model) {
    let testProperty = createBindableStringProperty("TEST");

    model.onNewNumber((number) => testProperty.setProperty(number));

    return {
        testProperty,
    };
}

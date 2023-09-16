import { createViewModel } from "./viewmodel";
import { initView } from "./view";
import { xhrApiClient } from "./xhrClient";
import { createWeatherModel } from "./weathermodel";

const client = xhrApiClient("http://localhost:8080");

client.forecast
    .place("Horsens")
    .get()
    .then((d) => console.log(d));
console.log("Client loaded");

const model = createWeatherModel("xhr");
const viewModel = createViewModel(model);

initView(viewModel);

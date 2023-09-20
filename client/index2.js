import { createViewModel } from "./viewmodel";
import { initView } from "./view";
import { createWeatherModel } from "./weathermodel";

console.log("Client loaded");
const model = createWeatherModel("fetch");
const viewModel = createViewModel(model);
initView(viewModel);

import { createViewModel } from "./viewmodel";
import { initView } from "./view";
import { xhrApiClient } from "./xhrClient";
import { createDummyModel } from "./dummyModel";

const client = xhrApiClient("http://localhost:8080");

client.forecast
    .place("Horsens")
    .get()
    .then((d) => console.log(d));
console.log("Client loaded");

const model = createDummyModel();
const viewModel = createViewModel(model);

model.start();

initView(viewModel);

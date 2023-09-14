import { xhrApiClient } from "./xhrClient";
const client = xhrApiClient("http://localhost:8080");

client.forecast
    .place("Horsens")
    .get()
    .then((d) => console.log(d));
console.log("Client loaded");

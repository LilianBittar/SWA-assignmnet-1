import { xhrApiClient } from "./xhrClient";
const client = xhrApiClient("http://localhost:8080");

client.data.get().then((d) => console.log(d));
console.log(client);
console.log("Client loaded");

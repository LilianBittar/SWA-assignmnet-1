import { xhrApiClient } from "../xhrClient";

export async function debug() {
    const _client = xhrApiClient();
    const data = await _client.forecast.place("Horsens").get();
    console.log("HERE");
    console.log(forecastComponent(data));
}

export function forecastComponent({ data }) {
    const getTime = (dateString) => {
        return Number(date.split("T")[1].slice(0, 2));
    };

    const getHours = (data, property) => {
        return data[property]
            .map((t) => getTime(t.getTime()))
            .sort((a, b) => a - b);
    };

    const generateHeaders = () => {
        return getHours(data, "temperatures")
            .map((t) => `<th>${t}</th>`)
            .join();
    };

    const generateTableRows = () => {};

    const html = `
        <table>
            ${generateHeaders()}
            <tbody>

            </tbody>
        </table>
    `;

    return html;
}

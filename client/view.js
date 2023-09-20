// Horsens
export const initView = (viewModel) => {
    const forecastElements = {
        temperature: {},
        wind: {},
        cloud: {},
        precipitation: {},
    };

    const latestDataElements = {
        temperature: {},
        wind: {},
        cloud: {},
        precipitation: {},
    };

    const citySelect = document.querySelector("#citySelector");
    const lastDaySummary = {
        minTempElement: document.querySelector("#minTemp"),
        maxTempElement: document.querySelector("#maxTemp"),
        totalPrecElement: document.querySelector("#totalPrecipitation"),
        avgWindElement: document.querySelector("#avgWindSpeed"),
    };

    const updateLocators = () => {
        const cities = ["horsens", "aarhus", "copenhagen"];
        const dataTypes = ["temperature", "precipitation", "wind", "cloud"];
        cities.forEach((c) => {
            lastDayElements[c] = document.querySelector(`#${c}-last-day-data`);
            dataTypes.forEach((t) => {
                forecastElements[t][c] = document.querySelector(
                    `#${c}-${t}-forecast`
                );
                latestDataElements[t][c] = document.querySelector(
                    `#${c}-latest-${t}-data`
                );
            });
        });
    };

    const getHour = (data) => {
        return data.getTime().split("T")[1].slice(0, 2);
    };

    const clearChildNodes = (node) => {
        if (!node) {
            return;
        }
        while (node.hasChildNodes()) {
            node.removeChild(node.firstChild);
        }
    };

    const updateLatestTemperature = (city, data) => {
        const tempTd = document.createElement("td");
        const timeTd = document.createElement("td");
        updateLocators();
        const nodeToUpdate = latestDataElements["temperature"][city];

        const temps = data.temperatures
            .map((t) => {
                return {
                    temperature: `${t.getValue()} ${t.getUnit()}`,
                    time: new Date(t.getTime()),
                };
            })
            .sort((a, b) => a.time.getTime() - b.time.getTime());

        const latestTemp = temps[temps.length - 1];

        tempTd.textContent = latestTemp.temperature;
        timeTd.textContent = latestTemp.time;

        clearChildNodes(nodeToUpdate);

        nodeToUpdate.appendChild(tempTd);
        nodeToUpdate.appendChild(timeTd);
    };

    const updateLatestPrecipitation = (city, data) => {
        const preTd = document.createElement("td");
        const timeTd = document.createElement("td");
        const preTypeTd = document.createElement("td");
        updateLocators();
        const nodeToUpdate = latestDataElements["precipitation"][city];

        const pres = data.precipitations
            .map((p) => {
                return {
                    precipiation: `${p.getValue()} ${p.getUnit()}`,
                    time: new Date(p.getTime()),
                    type: p.getPrecipitationType(),
                };
            })
            .sort((a, b) => a.time.getTime() - b.time.getTime());

        const latestPre = pres[pres.length - 1];

        preTd.textContent = latestPre.precipiation;
        timeTd.textContent = latestPre.time;
        preTypeTd.textContent = latestPre.type;

        clearChildNodes(nodeToUpdate);

        nodeToUpdate.append(preTd);
        nodeToUpdate.append(timeTd);
        nodeToUpdate.append(preTypeTd);
    };

    const updateLatestWind = (city, data) => {
        const windTd = document.createElement("td");
        const timeTd = document.createElement("td");
        const dirTd = document.createElement("td");
        updateLocators();
        const nodeToUpdate = latestDataElements["wind"][city];

        const wind = data.wind
            .map((w) => {
                return {
                    wind: `${w.getValue()} ${w.getUnit()}`,
                    time: new Date(w.getTime()),
                    direction: w.getDirection(),
                };
            })
            .sort((a, b) => a.time.getTime() - b.time.getTime());

        const latestWind = wind[wind.length - 1];

        windTd.textContent = latestWind.wind;
        timeTd.textContent = latestWind.time;
        dirTd.textContent = latestWind.direction;

        clearChildNodes(nodeToUpdate);

        nodeToUpdate.append(windTd);
        nodeToUpdate.append(timeTd);
        nodeToUpdate.append(dirTd);
    };

    const updateLatestCloud = (city, data) => {
        const cloudTd = document.createElement("td");
        const timeTd = document.createElement("td");
        updateLocators();
        const nodeToUpdate = latestDataElements["cloud"][city];

        const cloud = data.cloudCoverages
            .map((c) => {
                return {
                    cloud: `${c.getValue()} ${c.getUnit()}`,
                    time: new Date(c.getTime()),
                };
            })
            .sort((a, b) => a.time.getTime() - b.time.getTime());

        const latestCloud = cloud[cloud.length - 1];

        cloudTd.textContent = latestCloud.cloud;
        timeTd.textContent = latestCloud.time;

        clearChildNodes(nodeToUpdate);

        nodeToUpdate.appendChild(cloudTd);
        nodeToUpdate.appendChild(timeTd);
    };

    const updateForecasts = (city, data) => {
        updateLocators();
        forecastElements["temperature"][city].innerHTML = data.temperatures.map(
            (d) =>
                `Hour: ${getHour(
                    d
                )}. Temperature: ${d.getMin()} - ${d.getMax()} ${d.getUnit()} <br>`
        );

        forecastElements["precipitation"][city].innerHTML =
            data.precipitations.map(
                (d) =>
                    `Hour: ${getHour(
                        d
                    )}. Precipitation: ${d.getMin()} - ${d.getMax()} ${d.getUnit()}. Precipitation Types: ${d
                        .getExpectedTypes()
                        .join(",")} <br>`
            );

        forecastElements["wind"][city].innerHTML = data.wind.map(
            (d) =>
                `Hour: ${getHour(
                    d
                )}. Wind Speed: ${d.getMin()} - ${d.getMax()} ${d.getUnit()}. Expected Directions: ${d
                    .getExpectedDirections()
                    .join(",")} <br>`
        );

        forecastElements["cloud"][city].innerHTML = data.cloudCoverages.map(
            (d) =>
                `Hour: ${getHour(
                    d
                )}. Temperature: ${d.getMin()} - ${d.getMax()} ${d.getUnit()} <br>`
        );
    };

    viewModel.horsensWeatherData.bind((data) => {
        updateLocators();
        updateLatestTemperature("horsens", data);
        updateLatestPrecipitation("horsens", data);
        updateLatestWind("horsens", data);
        updateLatestCloud("horsens", data);
        updateLastDayData("horsens", data);
    });

    viewModel.aarhusWeatherData.bind((data) => {
        updateLocators();
        updateLatestTemperature("aarhus", data);
        updateLatestPrecipitation("aarhus", data);
        updateLatestWind("aarhus", data);
        updateLatestCloud("aarhus", data);
        updateLastDayData("aarhus", data);
    });

    viewModel.copenhagenWeatherData.bind((data) => {
        updateLocators();
        updateLatestTemperature("copenhagen", data);
        updateLatestPrecipitation("copenhagen", data);
        updateLatestWind("copenhagen", data);
        updateLatestCloud("copenhagen", data);
        updateLastDayData("copenhagen", data);
    });

    viewModel.horsensForecast.bind((data) => {
        updateLocators();
        updateForecasts("horsens", data);
    });

    viewModel.aarhusForecast.bind((data) => {
        updateLocators();
        updateForecasts("aarhus", data);
    });

    viewModel.copenhagenForecast.bind((data) => {
        updateLocators();
        updateForecasts("copenhagen", data);
    });
};

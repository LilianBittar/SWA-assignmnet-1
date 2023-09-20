// Horsens
export const initView = (viewModel) => {
    /**
     * @type {HTMLSelectElement}
     */
    const citySelect = document.querySelector("#citySelector");
    /**
     * @type {HTMLButtonElement}
     */
    const generateDataBtn = document.querySelector("#generate-data-btn");
    const sendDataBtn = document.querySelector("#send-data-btn");
    const newWeatherDataPreview = document.querySelector("#post-data-preview");

    generateDataBtn.onclick = () => {
        viewModel.generateNewWeatherData();
    };
    sendDataBtn.addEventListener("click", () => {
        viewModel.sendWeatherData();
    });

    viewModel.newWeatherDataProperty.bind((data) => {
        newWeatherDataPreview.textContent = data;
    });

    const lastDaySummary = {
        minTempElement: document.querySelector("#minTemp"),
        maxTempElement: document.querySelector("#maxTemp"),
        totalPrecElement: document.querySelector("#totalPrecipitation"),
        avgWindElement: document.querySelector("#avgWindSpeed"),
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

    const updateLatestTemperature = (data, _) => {
        const tempTd = document.createElement("td");
        const timeTd = document.createElement("td");
        const nodeToUpdate = document.querySelector("#last-day-data");

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

    const updateLatestPrecipitation = (data, _) => {
        const preTd = document.createElement("td");
        const timeTd = document.createElement("td");
        const preTypeTd = document.createElement("td");
        const nodeToUpdate = document.querySelector("#last-day-data");

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

    const updateLatestWind = (data, _) => {
        const windTd = document.createElement("td");
        const timeTd = document.createElement("td");
        const dirTd = document.createElement("td");
        const nodeToUpdate = document.querySelector("#last-day-data");

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

    const updateLatestCloud = (data, _) => {
        const cloudTd = document.createElement("td");
        const timeTd = document.createElement("td");
        const nodeToUpdate = document.querySelector("#last-day-data");

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

    const updateMaxTemp = (data, _) => {
        lastDaySummary.maxTempElement.textContent = data;
    };
    const updateMinTemp = (data, _) => {
        lastDaySummary.minTempElement.textContent = data;
    };
    const updateAvgWind = (data, _) => {
        lastDaySummary.avgWindElement.textContent = data;
    };
    const updateTotalPrecipitation = (data, _) => {
        lastDaySummary.totalPrecElement.textContent = data;
    };

    const updateForecasts = (data) => {
        const getSelector = (type) => `#${type}-forecast`;
        const getElement = (type) => document.querySelector(getSelector(type));

        getElement("temperature").innerHTML = data.temperatures.map(
            (d) =>
                `Hour: ${getHour(
                    d
                )}. Temperature: ${d.getMin()} - ${d.getMax()} ${d.getUnit()} <br>`
        );

        getElement("precipitation").innerHTML = data.precipitations.map(
            (d) =>
                `Hour: ${getHour(
                    d
                )}. Precipitation: ${d.getMin()} - ${d.getMax()} ${d.getUnit()}. Precipitation Types: ${d
                    .getExpectedTypes()
                    .join(",")} <br>`
        );

        getElement("wind").innerHTML = data.wind.map(
            (d) =>
                `Hour: ${getHour(
                    d
                )}. Wind Speed: ${d.getMin()} - ${d.getMax()} ${d.getUnit()}. Expected Directions: ${d
                    .getExpectedDirections()
                    .join(",")} <br>`
        );

        getElement("cloud").innerHTML = data.cloudCoverages.map(
            (d) =>
                `Hour: ${getHour(
                    d
                )}. Temperature: ${d.getMin()} - ${d.getMax()} ${d.getUnit()} <br>`
        );
    };

    const bindToLastDaySummary = (city, _) => {
        viewModel
            .getLastDaySummaryProperty(city)
            ["maxTemperature"].bind(updateMaxTemp);
        viewModel
            .getLastDaySummaryProperty(city)
            ["minTemperature"].bind(updateMinTemp);
        viewModel
            .getLastDaySummaryProperty(city)
            ["avgWind"].bind(updateAvgWind);
        viewModel
            .getLastDaySummaryProperty(city)
            ["totalPrecipitation"].bind(updateTotalPrecipitation);
    };

    const unbindToLastDaySummary = (city, _) => {
        viewModel
            .getLastDaySummaryProperty(city)
            ["maxTemperature"].unbind(updateMaxTemp);
        viewModel
            .getLastDaySummaryProperty(city)
            ["minTemperature"].unbind(updateMinTemp);
        viewModel
            .getLastDaySummaryProperty(city)
            ["avgWind"].unbind(updateAvgWind);
        viewModel
            .getLastDaySummaryProperty(city)
            ["totalPrecipitation"].unbind(updateTotalPrecipitation);
    };

    const bindToWeatherData = (city) => {
        if (city === "horsens") {
            viewModel.horsensWeatherData.bind(updateLatestTemperature);
            viewModel.horsensWeatherData.bind(updateLatestCloud);
            viewModel.horsensWeatherData.bind(updateLatestPrecipitation);
            viewModel.horsensWeatherData.bind(updateLatestWind);
        } else if (city === "aarhus") {
            viewModel.aarhusWeatherData.bind(updateLatestTemperature);
            viewModel.aarhusWeatherData.bind(updateLatestCloud);
            viewModel.aarhusWeatherData.bind(updateLatestPrecipitation);
            viewModel.aarhusWeatherData.bind(updateLatestWind);
        } else if (city === "copenhagen") {
            viewModel.copenhagenWeatherData.bind(updateLatestCloud);
            viewModel.copenhagenWeatherData.bind(updateLatestPrecipitation);
            viewModel.copenhagenWeatherData.bind(updateLatestTemperature);
            viewModel.copenhagenWeatherData.bind(updateLatestWind);
        }
    };

    const unbindToWeatherData = (city) => {
        if (city === "horsens") {
            viewModel.horsensWeatherData.unbind(updateLatestCloud);
            viewModel.horsensWeatherData.unbind(updateLatestPrecipitation);
            viewModel.horsensWeatherData.unbind(updateLatestTemperature);
            viewModel.horsensWeatherData.unbind(updateLatestWind);
        } else if (city === "aarhus") {
            viewModel.aarhusWeatherData.unbind(updateLatestCloud);
            viewModel.aarhusWeatherData.unbind(updateLatestPrecipitation);
            viewModel.aarhusWeatherData.unbind(updateLatestTemperature);
            viewModel.aarhusWeatherData.unbind(updateLatestWind);
        } else if (city === "copenhagen") {
            viewModel.copenhagenWeatherData.unbind(updateLatestCloud);
            viewModel.copenhagenWeatherData.unbind(updateLatestPrecipitation);
            viewModel.copenhagenWeatherData.unbind(updateLatestTemperature);
            viewModel.copenhagenWeatherData.unbind(updateLatestWind);
        }
    };

    const unbindToForecast = (city) => {
        if (city === "horsens") {
            viewModel.horsensForecast.unbind(updateForecasts);
        } else if (city === "aarhus") {
            viewModel.aarhusForecast.unbind(updateForecasts);
        } else if (city === "copenhagen") {
            viewModel.copenhagenForecast.unbind(updateForecasts);
        }
    };

    const bindToForecast = (city) => {
        if (city === "horsens") {
            viewModel.horsensForecast.bind(updateForecasts);
        } else if (city === "aarhus") {
            viewModel.aarhusForecast.bind(updateForecasts);
        } else if (city === "copenhagen") {
            viewModel.copenhagenForecast.bind(updateForecasts);
        }
    };

    citySelect.addEventListener("change", (e) => {
        viewModel.currentCity.setProperty(e.currentTarget.value);
    });

    viewModel.currentCity.bind((curr, prev) => {
        const lastCity = prev.toLowerCase();
        const newCity = curr.toLowerCase();

        unbindToLastDaySummary(lastCity);
        bindToLastDaySummary(newCity);

        unbindToWeatherData(lastCity);
        bindToWeatherData(newCity);

        unbindToForecast(lastCity);
        bindToForecast(newCity);
    });

    viewModel.currentCity.setProperty(citySelect.value);
};

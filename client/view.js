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

    const updateLocators = () => {
        const cities = ["horsens", "aarhus", "copenhagen"];
        const dataTypes = ["temperature", "precipitation", "wind", "cloud"];
        cities.forEach((c) => {
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

    const horsensLastDayData = document.querySelector("#horsens-last-day-data");

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

    const updateLastDayData = (data) => {
        const maxTemp = document.createElement("td");
        const minTemp = document.createElement("td");
        const totalPrec = document.createElement("td");
        const windSpeed = document.createElement("td");

        const temps = data.temperatures.map((t) => {
            return {
                temperature: t.getValue(),
                unit: t.getUnit(),
                time: new Date(t.getTime()),
            };
        });
        const pres = data.precipitations.map((p) => {
            return {
                precipiation: p.getValue(),
                unit: p.getUnit(),
                time: new Date(p.getTime()),
                type: p.getPrecipitationType(),
            };
        });
        const winds = data.wind.map((w) => {
            return {
                wind: w.getValue(),
                unit: w.getUnit(),
                time: new Date(w.getTime()),
                direction: w.getDirection(),
            };
        });

        const today = new Date();
        const lastDayStart = new Date(today);
        lastDayStart.setDate(today.getDay() - 1);
        const lastDayEnd = new Date(today);

        //temp
        const lastDayTemp = temps.filter((t) => {
            return t.time >= lastDayStart && t.time <= lastDayEnd;
        });
        const lastDayTempSort = lastDayTemp.sort(
            (a, b) => a.temperature - b.temperature
        );

        maxTemp.textContent = `${
            lastDayTempSort[lastDayTemp.length - 1].temperature
        } ${lastDayTempSort[lastDayTemp.length - 1].unit}`;
        minTemp.textContent = `${lastDayTemp[0].temperature} ${lastDayTemp[0].unit}`;

        //pres
        const lastDayPres = pres.filter((p) => {
            return p.time >= lastDayStart && p.time <= lastDayEnd;
        });
        const lastDayPresSum = lastDayPres.reduce((total, value) => {
            return Number(total) + Number(value.precipiation);
        }, 0);
        const avgPres = lastDayPresSum / lastDayPres.length;
        totalPrec.textContent = `${avgPres.toFixed(2)} ${lastDayPres[0].unit}`;

        //wind
        const lastDayWind = winds.filter((w) => {
            return w.time >= lastDayStart && w.time <= lastDayEnd;
        });
        const lastDayWindSum = lastDayWind.reduce((total, value) => {
            return Number(total) + Number(value.wind);
        }, 0);
        const avgWind = lastDayWindSum / lastDayWind.length;
        windSpeed.textContent = `${avgWind.toFixed(2)} ${lastDayWind[0].unit}`;

        clearChildNodes(horsensLastDayData);
        horsensLastDayData.appendChild(maxTemp);
        horsensLastDayData.appendChild(minTemp);
        horsensLastDayData.appendChild(totalPrec);
        horsensLastDayData.appendChild(windSpeed);
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
        updateLastDayData(data);
    });

    viewModel.aarhusWeatherData.bind((data) => {
        updateLocators();
        updateLatestTemperature("aarhus", data);
        updateLatestPrecipitation("aarhus", data);
        updateLatestWind("aarhus", data);
        updateLatestCloud("aarhus", data);
    });

    viewModel.copenhagenWeatherData.bind((data) => {
        updateLocators();
        updateLatestTemperature("copenhagen", data);
        updateLatestPrecipitation("copenhagen", data);
        updateLatestWind("copenhagen", data);
        updateLatestCloud("copenhagen", data);
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

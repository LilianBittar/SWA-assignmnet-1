// Horsens
export const initView = (viewModel) => {
    const horsensTemperatureForecast = document.querySelector(
        "#horsens-tempreature-forecast"
    );

    const horsensPrecipitationForecast = document.querySelector(
        "#horsens-precipitation-forecast"
    );

    const horsensWindForecast = document.querySelector(
        "#horsens-wind-forecast"
    );

    const horsensCloudForecast = document.querySelector(
        "#horsens-cloud-forecast"
    );

    const horsensLatestTemperatureData = document.querySelector(
        "#horsens-latest-temperaure-data"
    );

    const horsensLatestPrecipitationData = document.querySelector(
        "#horsens-latest-precipitation-data"
    );

    const horsensLatestWindData = document.querySelector(
        "#horsens-latest-wind-data"
    );

    const horsensLatestCloudData = document.querySelector(
        "#horsens-latest-cloud-data"
    );

    const horsensLastDayData = document.querySelector(
        "#horsens-last-day-data"
    );

    const getHour = (data) => {
        return data.getTime().split("T")[1].slice(0, 2);
    };

    const clearChildNodes = (node) => {
        while (node.hasChildNodes()) {
            node.removeChild(node.firstChild);
        }
    };

    const updateLastDayData = (data) => {
        const maxTemp = document.createElement("td");
        const minTemp = document.createElement("td");
        const totalPrec = document.createElement("td");
        const windSpeed = document.createElement("td");

        const temps = data.temperatures
            .map((t) => {
                return {
                    temperature: t.getValue(),
                    unit: t.getUnit(),
                    time: new Date(t.getTime()),
                };
            });
        const pres = data.precipitations
            .map((p) => {
                return {
                    precipiation: p.getValue(),
                    unit: p.getUnit(),
                    time: new Date(p.getTime()),
                    type: p.getPrecipitationType(),
                };
            });
        const winds = data.wind
        .map((w) => {
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
        const lastDayTempSort = lastDayTemp.sort((a, b) => a.temperature - b.temperature);

        maxTemp.textContent =
            `${lastDayTempSort[lastDayTemp.length - 1].temperature} ${lastDayTempSort[lastDayTemp.length - 1].unit}`;
        minTemp.textContent = `${lastDayTemp[0].temperature} ${lastDayTemp[0].unit}`;

        //pres
        const lastDayPres = pres.filter((p) => {
            return p.time >= lastDayStart && p.time <= lastDayEnd;
        });
        const lastDayPresSum = lastDayPres.reduce((total, value) => {
            return total + value.precipiation
        });
        const avgPres = lastDayPresSum / lastDayPres.length;
        totalPrec.textContent = `${avgPres}`;

        //wind
        const lastDayWind = winds.filter((w) => {
            return w.time >= lastDayStart && w.time <= lastDayEnd;
        });
        const lastDayWindSum = lastDayWind.reduce((total, value) => {
            return total + value.wind
        });
        const avgWind = lastDayWindSum / lastDayWind.length;
        windSpeed.textContent = `${avgWind}`;

        clearChildNodes(horsensLastDayData);
        horsensLastDayData.appendChild(maxTemp);
        horsensLastDayData.appendChild(minTemp);
        horsensLastDayData.appendChild(totalPrec);
        horsensLastDayData.appendChild(windSpeed);
    };

    const updateLatestTemperature = (data) => {
        const tempTd = document.createElement("td");
        const timeTd = document.createElement("td");
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
        clearChildNodes(horsensLatestTemperatureData);
        horsensLatestTemperatureData.appendChild(tempTd);
        horsensLatestTemperatureData.appendChild(timeTd);
    };

    const updateLatestPrecipitation = (data) => {
        const preTd = document.createElement("td");
        const timeTd = document.createElement("td");
        const preTypeTd = document.createElement("td");
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
        clearChildNodes(horsensLatestPrecipitationData);
        horsensLatestPrecipitationData.append(preTd);
        horsensLatestPrecipitationData.append(timeTd);
        horsensLatestPrecipitationData.append(preTypeTd);
    };

    const updateLatestWind = (data) => {
        const windTd = document.createElement("td");
        const timeTd = document.createElement("td");
        const dirTd = document.createElement("td");
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
        clearChildNodes(horsensLatestWindData);
        horsensLatestWindData.append(windTd);
        horsensLatestWindData.append(timeTd);
        horsensLatestWindData.append(dirTd);
    };

    const updateLatestCloud = (data) => {
        const cloudTd = document.createElement("td");
        const timeTd = document.createElement("td");
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
        clearChildNodes(horsensLatestCloudData);
        horsensLatestCloudData.appendChild(cloudTd);
        horsensLatestCloudData.appendChild(timeTd);
    };

    viewModel.horsensWeatherData.bind((data) => {
        updateLatestTemperature(data);
        updateLatestPrecipitation(data);
        updateLatestWind(data);
        updateLatestCloud(data);
        updateLastDayData(data);
    });

    viewModel.horsensForecast.bind((data) => {
        horsensTemperatureForecast.innerHTML = data.temperatures.map(
            (d) =>
                `Hour: ${getHour(
                    d
                )}. Temperature: ${d.getMin()} - ${d.getMax()} ${d.getUnit()} <br>`
        );

        horsensPrecipitationForecast.innerHTML = data.precipitations.map(
            (d) =>
                `Hour: ${getHour(
                    d
                )}. Precipitation: ${d.getMin()} - ${d.getMax()} ${d.getUnit()}. Precipitation Types: ${d
                    .getExpectedTypes()
                    .join(",")} <br>`
        );

        horsensWindForecast.innerHTML = data.wind.map(
            (d) =>
                `Hour: ${getHour(
                    d
                )}. Wind Speed: ${d.getMin()} - ${d.getMax()} ${d.getUnit()}. Expected Directions: ${d
                    .getExpectedDirections()
                    .join(",")} <br>`
        );

        horsensCloudForecast.innerHTML = data.cloudCoverages.map(
            (d) =>
                `Hour: ${getHour(
                    d
                )}. Temperature: ${d.getMin()} - ${d.getMax()} ${d.getUnit()} <br>`
        );
    });
};

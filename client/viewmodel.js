import {
    createBindableObjectProperty,
    createBindableStringProperty,
} from "./bindableProperty";

import { generateWeatherData } from "./dataGenerator";

export function createViewModel(model) {
    let horsensWeatherData = createBindableObjectProperty();
    let aarhusWeatherData = createBindableObjectProperty();
    let copenhagenWeatherData = createBindableObjectProperty();

    let horsensForecast = createBindableObjectProperty();
    let aarhusForecast = createBindableObjectProperty();
    let copenhagenForecast = createBindableObjectProperty();

    let currentCity = createBindableStringProperty();

    const newWeatherDataProperty = createBindableStringProperty();

    let lastDaySummary = {
        horsens: {
            maxTemperature: createBindableStringProperty(),
            minTemperature: createBindableStringProperty(),
            avgWind: createBindableStringProperty(),
            totalPrecipitation: createBindableStringProperty(),
        },
        aarhus: {
            maxTemperature: createBindableStringProperty(),
            minTemperature: createBindableStringProperty(),
            avgWind: createBindableStringProperty(),
            totalPrecipitation: createBindableStringProperty(),
        },
        copenhagen: {
            maxTemperature: createBindableStringProperty(),
            minTemperature: createBindableStringProperty(),
            avgWind: createBindableStringProperty(),
            totalPrecipitation: createBindableStringProperty(),
        },
    };

    const updateLastDaySummary = (city, data) => {
        console.log("View Model::LastDay", city, data);
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

        lastDaySummary[city]["maxTemperature"].setProperty(
            `${lastDayTempSort[lastDayTemp.length - 1].temperature} ${
                lastDayTempSort[lastDayTemp.length - 1].unit
            }`
        );
        lastDaySummary[city]["minTemperature"].setProperty(
            `${lastDayTemp[0].temperature} ${lastDayTemp[0].unit}`
        );

        //pres
        const lastDayPres = pres.filter((p) => {
            return p.time >= lastDayStart && p.time <= lastDayEnd;
        });
        const lastDayPresSum = lastDayPres.reduce((total, value) => {
            return Number(total) + Number(value.precipiation);
        }, 0);
        // const avgPres = lastDayPresSum / lastDayPres.length;
        lastDaySummary[city]["totalPrecipitation"].setProperty(
            `${lastDayPresSum.toFixed(2)} ${lastDayPres[0].unit}`
        );

        //wind
        const lastDayWind = winds.filter((w) => {
            return w.time >= lastDayStart && w.time <= lastDayEnd;
        });
        const lastDayWindSum = lastDayWind.reduce((total, value) => {
            return Number(total) + Number(value.wind);
        }, 0);
        const avgWind = lastDayWindSum / lastDayWind.length;
        lastDaySummary[city]["avgWind"].setProperty(
            `${avgWind.toFixed(2)} ${lastDayWind[0].unit}`
        );
    };

    model.subscribeToWeatherData("Horsens", (data) => {
        horsensWeatherData.setProperty(data);
        updateLastDaySummary("horsens", data);
    });
    model.subscribeToWeatherData("Aarhus", (data) => {
        aarhusWeatherData.setProperty(data);
        updateLastDaySummary("aarhus", data);
    });
    model.subscribeToWeatherData("Copenhagen", (data) => {
        copenhagenWeatherData.setProperty(data);
        updateLastDaySummary("copenhagen", data);
    });

    model.subscribeToForecastUpdates("Horsens", (data) => {
        horsensForecast.setProperty(data);
    });
    model.subscribeToForecastUpdates("Aarhus", (data) => {
        aarhusForecast.setProperty(data);
    });
    model.subscribeToForecastUpdates("Copenhagen", (data) => {
        copenhagenForecast.setProperty(data);
    });

    const getLastDaySummaryProperty = (city) => {
        return lastDaySummary[city];
    };

    const sendWeatherData = () => {
        model.sendNewWeatherData(newWeatherDataProperty.read());
    };

    const generateNewWeatherData = () => {
        const data = generateWeatherData();
        newWeatherDataProperty.setProperty(JSON.stringify(data));
    };

    return {
        horsensWeatherData,
        aarhusWeatherData,
        copenhagenWeatherData,
        horsensForecast,
        aarhusForecast,
        copenhagenForecast,
        currentCity,
        getLastDaySummaryProperty,
        generateNewWeatherData,
        sendWeatherData,
        newWeatherDataProperty,
    };
}

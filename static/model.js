const { type } = require("express/lib/response")

export function event(time, place) {
    const getTime = () => time
    const getPlace = () => place
    return {
        getTime, getPlace
    } 
}

export function weatherData(value, type, unit, event) {
    const getValue = () => value
    const getType = () => type
    const getUnit = () => unit
    return {
        ...event, getValue, getUnit, getType
    }
}

export function temperature(weatherData) {
    const convertToF = () => weatherData.getUnit() === 'F' ? weatherData.getValue() : weatherData.getValue() * 1.8 + 32
    const convertToC = () => weatherData.getUnit() === 'C' ? weatherData.getValue() : (weatherData.getValue() - 32) * 5/9
    return {
        ...weatherData, convertToF, convertToC
    }
}

export function precipitation(precipitationType, weatherData) {
    const getPrecipitationType = () => precipitationType
    const convertToInches = () => weatherData.getUnit() === 'inches' ? weatherData.getValue() : weatherData.getValue() / 25.4
    const convertToMM = () => weatherData.getUnit() === 'mm' ? weatherData.getValue() : weatherData.getValue() * 25.4
    return {
        ...weatherData, getPrecipitationType, convertToInches, convertToMM
    }
}

export function wind(direction, weatherData) {
    const getDirection = () => direction
    const convertToMPH = () => weatherData.getUnit() === 'mph' ? weatherData.getValue() : weatherData.getValue() * 2.237
    const convertToMS = () => weatherData.getUnit() === 'm/s' ? weatherData.getValue() : weatherData.getValue() / 2.237
    return {
        ...weatherData, getDirection, convertToMPH, convertToMS
    }
}

const cloudCoverge = weatherData

export function weatherPrediction(max, min, type, unit, event) {
    const getMax = () => max
    const getMin = () => min
    const getType = () => type
    const matches = (data) => {
        return data.getValue() >= min && data.getValue() <= max && data.getUnit() === unit && event.getPlace() === data.getPlace() && type === data.getType()
    }
    const getUnit = () => unit
    return {
        ...event, getMax, getMin, getType, matches, getUnit
    }
}

export function temperaturePrediction(weatherPrediction) {
    const convertToF = () => weatherPrediction.getUnit() === 'F' ? weatherPrediction.getMax() : weatherPrediction.getMax() * 1.8 + 32
    const convertToC = () => weatherPrediction.getUnit() === 'C' ? weatherPrediction.getMax() : (weatherPrediction.getMax() - 32) * 5/9
    return {
        ...weatherPrediction, convertToF, convertToC
    }
}

export function precipitationPrediction(expectedTypes, weatherPrediction) {
    const getExpectedTypes = () => expectedTypes
    const convertToInches = () => weatherPrediction.getUnit() === 'inches' ? weatherPrediction.getMax() : weatherPrediction.getMax() / 25.4
    const convertToMM = () => weatherPrediction.getUnit() === 'mm' ? weatherPrediction.getMax() : weatherPrediction.getMax() * 25.4
    const matches = (data) => {
        return expectedTypes === data.getTime() && weatherPrediction.getPlace() === data.getPlace() && expectedTypes.some(type => type === data.getType()) 
    }
    return {
        ...weatherPrediction, getPrecipitationType, convertToInches, convertToMM
    }
}

export function windPrediction(expectedDirections, weatherPrediction) {
    const getExpectedDirections = () => expectedDirections
    const convertToMPH = () => weatherPrediction.getUnit() === 'mph' ? weatherPrediction.getMax() : weatherPrediction.getMax() * 2.237
    const convertToMS = () => weatherPrediction.getUnit() === 'm/s' ? weatherPrediction.getMax() : weatherPrediction.getMax() / 2.237
    const matches = (data) => {
        return expectedDirections === data.getTime() && weatherPrediction.getPlace() === data.getPlace() && expectedDirections.some(type => direction === data.getType()) 
    }
    return {
        ...weatherPrediction, getDirection, convertToMPH, convertToMS
    }
}

const cloudCoveragePrediction = weatherPrediction

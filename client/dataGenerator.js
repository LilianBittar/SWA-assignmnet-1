export function generateWeatherData() {
    const places = ["Horsens", "Aarhus", "Copenhagen"];
    const types = [
      "temperature",
      "precipitation",
      "wind speed",
      "cloud coverage",
    ];
    const data = [];
  
    for (const place of places) {
      for (const type of types) {
        const entry = {
          place,
          type,
          time: "2023-09-12T22:00:00.000Z",
        };
  
        switch (type) {
          case "temperature":
            entry.value = getRandomNumber(0, 30, 1);
            entry.unit = "C";
            break;
          case "precipitation":
            entry.value = getRandomNumber(0, 20, 0.1);
            entry.precipitation_type = getRandomPrecipitationType();
            entry.unit = "mm";
            break;
          case "wind speed":
            entry.value = getRandomNumber(0, 30, 0.1);
            entry.direction = getRandomWindDirection();
            entry.unit = "m/s";
            break;
          case "cloud coverage":
            entry.value = getRandomNumber(0, 100, 1);
            entry.unit = "%";
            break;
          default:
            break;
        }
  
        data.push(entry);
      }
    }
  
    return data;
  }
  
  function getRandomNumber(min, max, decimalPlaces) {
    const randomNumber = Math.random() * (max - min) + min;
    return parseFloat(randomNumber.toFixed(decimalPlaces));
  }
  
  function getRandomPrecipitationType() {
    const types = ["rain", "snow", "sleet", "hail"];
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex];
  }
  
  function getRandomWindDirection() {
    const directions = ["North", "South", "East", "West"];
    const randomIndex = Math.floor(Math.random() * directions.length);
    return directions[randomIndex];
  }
  
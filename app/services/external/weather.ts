import { fetchWeatherApi } from 'openmeteo';

const params = {
	"latitude": 26.7663,
	"longitude": 83.3689,
	"hourly": "temperature_2m"
};

export const getCurrentWeather = async (): Promise<number | null> => {
  try {
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const hourly = response.hourly()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
      hourly: {
        time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
          (t) => new Date((t + utcOffsetSeconds) * 1000)
        ),
        temperature2m: hourly.variables(0)!.valuesArray()!,
      },

    };
    // Return the current temperature
    const currentTemperature = weatherData.hourly.temperature2m[0];
    return currentTemperature ?? null;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

import { getCurrentWeather } from "@/app/services/external/weather";

export const Weather = async () => {
  let currentTemperature = null;
  try {
    currentTemperature = await getCurrentWeather();
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
  return (
    <div>
      {typeof currentTemperature === "number" && (
        <li className="px-4 py-2">
          Current Temperature: {currentTemperature.toFixed(1)}°C
        </li>
      )}
    </div>
  )
}

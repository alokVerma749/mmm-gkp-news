import { getCurrentWeather } from "@/app/services/external/weather";
import { toast } from "@/hooks/use-toast";

export const Weather = async () => {
  let currentTemperature = null;
  try {
    currentTemperature = await getCurrentWeather();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    toast({
      title: 'Error fetching weather data'
    })
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

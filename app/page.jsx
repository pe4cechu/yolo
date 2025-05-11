"use client";


import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import Home from "./public/icons/home.svg";
import Exit from "./public/icons/exit.svg";
import Setting from "./public/icons/setting.svg";
import Weather from "./public/icons/weather.svg";
import Electric from "./public/icons/electric.svg";
import Temperature from "./public/icons/temperature.svg";
import Light from "./public/icons/light.svg";
import Water from "./public/icons/water.svg";
import Image from "next/image";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const weatherCodeToDescription = (code) => {
  const weatherDescriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Drizzle: Light",
    53: "Drizzle: Moderate",
    55: "Drizzle: Dense",
    61: "Rain: Slight",
    63: "Rain: Moderate",
    65: "Rain: Heavy",
    71: "Snow: Slight",
    73: "Snow: Moderate",
    75: "Snow: Heavy",
    80: "Rain showers: Slight",
    81: "Rain showers: Moderate",
    82: "Rain showers: Violent",
    95: "Thunderstorm: Slight",
    96: "Thunderstorm: Moderate",
    99: "Thunderstorm: Severe",
  };
  return weatherDescriptions[code] || "Unknown weather";
};

const Track = () => {
  const [user, setUser] = useState(null);
  const [timeRange, setTimeRange] = useState("Daily");
  const [dataType, setDataType] = useState("Energy");
  const [sliderValue, setSliderValue] = useState(0);
  const [mode, setMode] = useState(false); // false = Off, true = On
  const [color, setColor] = useState("red"); // Default color is red
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [location, setLocation] = useState("Fetching location...");
  const [weather, setWeather] = useState({ temp: "Loading...", description: "Loading..." });
  const [sensor, setSensor] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                .then((response) => response.json())
                .then((data) => {
                  setLocation(data.address.city || data.address.town || "Unknown Location");
                })
                .catch(() => setLocation("Unable to fetch location"));
          },
          () => setLocation("Location access denied")
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null); // Ensure user is null if no data is found
    }
  }, []);

  useEffect(() => {
    const fetchWeatherWithLocation = async (latitude, longitude) => {
      try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        setWeather({
          temp: `${Math.round(data.current_weather.temperature)}°C`,
          description: weatherCodeToDescription(data.current_weather.weathercode),
        });
      } catch (error) {
        console.error("Error fetching weather:", error);
        setWeather({ temp: "N/A", description: "Unable to fetch weather" });
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherWithLocation(latitude, longitude);
          },
          () => {
            setLocation("Location access denied");
            setWeather({ temp: "N/A", description: "Unable to fetch weather" });
          }
      );
    } else {
      setLocation("Geolocation not supported");
      setWeather({ temp: "N/A", description: "Unable to fetch weather" });
    }
  }, []);


  const handleTimeChange = (e) => {
    const value = e.target.value;
    setTimeRange(value === "week" ? "Daily" : value === "month" ? "Weekly" : "Monthly");
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setDataType(
        value === "energy"
            ? "Energy"
            : value === "temperature"
                ? "Temperature"
                : value === "light"
                    ? "Light"
                    : "Humidity"
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    localStorage.removeItem("token"); // Clear token if used
    setUser(null); // Update state to reflect logout
    router.push("/dang_nhap"); // Redirect to login page
  };

  const handleDaySelection = (day, isSelected) => {
    setSelectedDays((prev) =>
        isSelected ? [...prev, day] : prev.filter((d) => d !== day)
    );
  };

  return (
      <section>
        <div className="container mx-auto px-5 py-10 md:py-14 text-[#2E59BE]">
          <div className="flex flex-wrap -m-4 text-center">
            {/* Track 1 */}
            <div className="pb-4 px-80 md:w-full sm:w-1/2 w-full">
              <div className="border-2 hover:shadow-lg border-gray-200 bg-gray-100 px-4 py-6 rounded-4xl flex justify-between items-center">
                {/* Left Content */}
                <div className="pl-10 flex flex-col text-left">
                  <h2 className="text-3xl font-poppins-semi-bold">
                    Hi, {user ? user.name : "Guest"}!
                  </h2>
                  <p className="text-sm">{new Date().toLocaleDateString()}</p>
                  <p className="text-sm">{location}</p>
                </div>

                <div className="pr-12 flex justify-between items-center">
                  <div className="flex flex-col text-left">
                    <h2 className="text-5xl font-poppins-bold">{weather.temp}</h2>
                    <p className="text-sm">{weather.description}</p>
                  </div>
                  <Image
                      src={Weather}
                      alt="Weather Icon"
                      width={80}
                      height={80}
                      priority={true}
                  />
                </div>
              </div>
            </div>

            {/* Track 2 */}
            <div className="py-4 pl-80 pr-10 md:w-1/2 sm:w-1/2 w-full">
              <div className="border-2 hover:shadow-lg border-gray-200 bg-gray-100 px-4 py-6 rounded-4xl">
                <div className="flex items-center justify-between px-8">
                  <div className="bg-[#D9D9D9] rounded-full overflow-hidden p-1">
                    <Image
                        src={Electric}
                        alt="Electric Icon"
                        width={38}
                        height={38}
                        priority={true}
                    />
                  </div>

                  <div className="text-5xl font-poppins-bold text-[#668DB4]">{sensor.energy} kWh</div>
                </div>
                <h2 className="pt-10 title-font font-poppins-semi-bold text-lg text-[#668DB4]">
                  Total Energy
                </h2>
              </div>
            </div>

            {/* Track 3 */}
            <div className="py-4 pr-80 pl-10 md:w-1/2 sm:w-1/2 w-full">
              <div className="border-2 hover:shadow-lg border-gray-200 bg-gray-100 px-4 py-6 rounded-4xl">
                <div className="flex items-center justify-between px-8">
                  <div className="bg-[#D9D9D9] rounded-full overflow-hidden p-1">
                    <Image
                        src={Temperature}
                        alt="Temperature Icon"
                        width={38}
                        height={38}
                        priority={true}
                    />
                  </div>

                  <div className="text-5xl font-poppins-bold text-[#668DB4]">{sensor.temperature} °C</div>
                </div>
                <h2 className="pt-10 title-font font-poppins-semi-bold text-lg text-[#668DB4]">
                  Current Temperature
                </h2>
              </div>
            </div>

            {/* Track 4 */}
            <div className="py-4 pl-80 pr-10 md:w-1/2 sm:w-1/2 w-full">
              <div className="border-2 hover:shadow-lg border-gray-200 bg-gray-100 px-4 py-6 rounded-4xl">
                <div className="flex items-center justify-between px-8">
                  <div className="bg-[#D9D9D9] rounded-full overflow-hidden p-1">
                    <Image
                        src={Light}
                        alt="Light Icon"
                        width={38}
                        height={38}
                        priority={true}
                    />
                  </div>

                  <div className="text-5xl font-poppins-bold text-[#668DB4]">{sensor.light} lux</div>
                </div>
                <h2 className="pt-10 title-font font-poppins-semi-bold text-lg text-[#668DB4]">
                  Current Light Intensity
                </h2>
              </div>
            </div>

            {/* Track 5 */}
            <div className="py-4 pr-80 pl-10 md:w-1/2 sm:w-1/2 w-full">
              <div className="border-2 hover:shadow-lg border-gray-200 bg-gray-100 px-4 py-6 rounded-4xl">
                <div className="flex items-center justify-between px-8">
                  <div className="bg-[#D9D9D9] rounded-full overflow-hidden p-1">
                    <Image
                        src={Water}
                        alt="Water Icon"
                        width={38}
                        height={38}
                        priority={true}
                    />
                  </div>

                  <div className="text-5xl font-poppins-bold text-[#668DB4]">{sensor.humidity} %</div>
                </div>
                <h2 className="pt-10 title-font font-poppins-semi-bold text-lg text-[#668DB4]">
                  Current Humidity
                </h2>
              </div>
            </div>

            {/* Track 6 */}
            <div className="py-16 px-80 md:w-full sm:w-1/2 w-full">
              <div className="border-2 hover:shadow-lg border-gray-200 bg-[#2E59BE] text-white px-4 py-6 rounded-4xl flex justify-between items-center">
                {/* Left Content */}
                <div className="pl-10 flex flex-col text-left">
                  <h2 className="text-3xl font-poppins-semi-bold">AI Face Recognition</h2>
                </div>

                <div className="pr-10 flex justify-between items-center">
                  <button
                      className="px-6 py-2 border-2 border-white rounded-full text-white font-poppins-bold hover:bg-white hover:text-[#2E59BE] transition"
                      onClick={() => window.location.href = "https://b2ec7fd1b1e400b249.gradio.live/"}
                  >
                    Try Now
                  </button>
                </div>
              </div>
            </div>

            {/* Track 7 */}
            <div className="py-4 px-80 md:w-full sm:w-1/2 w-full">
              <div className="px-4 py-6 rounded-4xl flex justify-between items-center">
                {/* Left Content */}
                <div className="flex flex-col text-left">
                  <h2 className="text-4xl font-poppins-semi-bold">Chart</h2>
                </div>

                {/* Right Content */}
                <div className="flex gap-4 w-full justify-end">
                  {/* Time Selector Dropdown */}
                  <div className="relative flex-1 max-w-[150px]">
                    <select
                        className="w-full pl-2 py-2 rounded-full text-gray-700 border border-gray-300 hover:bg-gray-300 transition"
                        onChange={handleTimeChange}
                    >
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="year">This Year</option>
                    </select>
                  </div>

                  {/* Type Selector Dropdown */}
                  <div className="relative flex-1 max-w-[150px]">
                    <select
                        className="w-full pl-2 py-2 rounded-full text-gray-700 border border-gray-300 hover:bg-gray-300 transition"
                        onChange={handleTypeChange}
                    >
                      <option value="energy">Energy</option>
                      <option value="temperature">Temperature</option>
                      <option value="light">Light</option>
                      <option value="humidity">Humidity</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Graphs Section */}
              <div className="bg-white rounded-4xl shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-poppins-semi-bold mb-4">Device Time</h2>
                <Line
                    data={{
                      labels: ["00:00", "06:00", "12:00", "18:00", "24:00"],
                      datasets: [
                        {
                          label: "Active Devices",
                          data: [5, 10, 15, 7, 12],
                          borderColor: "#2E59BE",
                          backgroundColor: "rgba(46, 89, 190, 0.2)",
                          tension: 0.4,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { display: true, position: "top" },
                      },
                    }}
                />
              </div>

              <div className="bg-white rounded-4xl shadow-lg p-6">
                <h2 className="text-2xl font-poppins-semi-bold mb-4">
                  {timeRange} {dataType}
                </h2>
                <Bar
                    data={{
                      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                      datasets: [
                        {
                          label: "Temperature (°C)",
                          data: [30, 32, 31, 29, 28, 27, 26],
                          backgroundColor: "#668DB4",
                        },
                        {
                          label: "Humidity (%)",
                          data: [70, 65, 75, 80, 60, 55, 50],
                          backgroundColor: "#2E59BE",
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { display: true, position: "top" },
                      },
                    }}
                />
              </div>
            </div>

            {/* Track 8 */}
            <div className="pt-16 px-80 md:w-full w-full">
              {/* Left Content */}
              <div className="px-4 py-6 flex flex-col text-left">
                <h2 className="text-4xl font-poppins-semi-bold">Device Control</h2>
              </div>

              <div className="bg-white rounded-4xl shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-poppins-semi-bold mb-4">Fan Control</h2>
                <div className="flex items-center gap-4">
                  <label htmlFor="fanSpeed" className="text-lg font-poppins-medium whitespace-nowrap">
                    Wind Speed:
                  </label>
                  <input
                      id="fanSpeed"
                      type="range"
                      min="0"
                      max="100"
                      value={sliderValue}
                      onChange={(e) => setSliderValue(e.target.value)}
                      className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                  />
                  <span id="fanSpeedValue" className="text-lg font-poppins-medium">
                    {sliderValue}
                  </span>
                </div>
              </div>
            </div>

            {/* Track 9 */}
            <div className="px-80 md:w-full w-full">
              {/* Mode and Color Section */}
              <div className="bg-white rounded-4xl shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-poppins-semi-bold mb-4">Light Control</h2>
                <div className="flex items-center gap-4 mb-6">
                  <label htmlFor="modeSwitch" className="text-lg pr-20 font-poppins-medium whitespace-nowrap">
                    Mode:
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-red-400 font-poppins-medium">Off</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                          id="modeSwitch"
                          type="checkbox"
                          checked={mode}
                          onChange={(e) => setMode(e.target.checked)}
                          className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#2E59BE] peer-focus:ring-2 peer-focus:ring-blue-300 transition"></div>
                      <div className="absolute w-5 h-5 bg-white rounded-full left-1 top-0.5 peer-checked:translate-x-5 transition"></div>
                    </label>
                    <span className="text-lg text-green-400 font-poppins-medium">On</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label htmlFor="color" className="text-lg pr-20 font-poppins-medium whitespace-nowrap">
                    Color:
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="color"
                        value="red"
                        checked={color === "red"}
                        onChange={(e) => setColor(e.target.value)}
                        className="cursor-pointer"
                    />
                    <span className="text-lg text-red-400 font-poppins-medium">Red</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="color"
                        value="green"
                        checked={color === "green"}
                        onChange={(e) => setColor(e.target.value)}
                        className="cursor-pointer"
                    />
                    <span className="text-lg text-green-400 font-poppins-medium">Green</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="color"
                        value="blue"
                        checked={color === "blue"}
                        onChange={(e) => setColor(e.target.value)}
                        className="cursor-pointer"
                    />
                    <span className="text-lg text-blue-500 font-poppins-medium">Blue</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Track 10 */}
            <div className="pb-20 px-80 md:w-full w-full relative">
              <div className="bg-white rounded-4xl shadow-lg p-6 mb-8">
                <div className="relative mb-4">
                  <h2 className="text-2xl font-poppins-semi-bold text-center">Scheduler</h2>
                  <button
                      className={`absolute top-0 right-0 px-4 py-2 rounded-full transition ${
                          selectedDays.length > 0 && fromTime && toTime
                              ? "bg-[#2E59BE] text-white hover:bg-blue-600 cursor-pointer"
                              : "bg-gray-300 text-white cursor-not-allowed"
                      }`}
                      onClick={() => alert("Add button clicked")}
                      disabled={!(selectedDays.length > 0 && fromTime && toTime)}
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {/* Time Scheduler */}
                  <div className="flex items-center justify-center gap-4">
                    <label htmlFor="fromTime" className="text-lg font-poppins-medium whitespace-nowrap">
                      From:
                    </label>
                    <input
                        id="fromTime"
                        type="time"
                        className="border border-gray-300 rounded-lg px-2 py-1"
                        onChange={(e) => setFromTime(e.target.value)}
                    />
                    <label htmlFor="toTime" className="ml-14 text-lg font-poppins-medium whitespace-nowrap">
                      To:
                    </label>
                    <input
                        id="toTime"
                        type="time"
                        className="border border-gray-300 rounded-lg px-2 py-1"
                        onChange={(e) => setToTime(e.target.value)}
                    />
                  </div>

                  {/* Day Selector */}
                  <div className="flex flex-wrap gap-4">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <button
                            key={day}
                            onClick={() =>
                                setSelectedDays((prev) =>
                                    prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
                                )
                            }
                            className={`px-4 py-2 rounded-full border-2 ${
                                selectedDays.includes(day)
                                    ? "border-[#2E59BE] text-[#2E59BE]"
                                    : "border-gray-300 text-gray-400"
                            } transition cursor-pointer`}
                        >
                          {day}
                        </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

const page = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(null);
  const [activePriceRange, setActivePriceRange] = useState(null);

  const applyFilters = (category, priceRange) => {
    let filteredProducts = products;

    if (category) {
      filteredProducts = filteredProducts.filter(
          (p) => p.category === category,
      );
    }

    if (priceRange) {
      const [min, max] = priceRange;
      filteredProducts = filteredProducts.filter(
          (p) => p.price >= min && p.price <= max,
      );
    }

    setData(filteredProducts);
  };

  const filterByCategory = (category) => {
    const newCategory = activeCategory === category ? null : category;
    setActiveCategory(newCategory);
    applyFilters(newCategory, activePriceRange);
  };

  const filterByPriceRange = (range) => {
    const isSameRange =
        activePriceRange &&
        activePriceRange[0] === range[0] &&
        activePriceRange[1] === range[1];

    const newRange = isSameRange ? null : range;
    setActivePriceRange(newRange);
    applyFilters(activeCategory, newRange);
  };

  return (
      <div>
        <Track />

        {/* Filter system */}
        <div
            className="fixed bottom-10 left-125 right-125 bg-white text-black p-4 px-10 rounded-full shadow-lg"
            style={{ backgroundColor: "#fff" }}
        >
          <div className="container mx-auto">
            <div className="flex items-center justify-between gap-2 text-lg">
              {/* Dashboard Button (Align Left) */}
              <div>
                <button
                    onClick={() => filterByCategory("vegetable")}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer ${
                        activeCategory === "vegetable"
                            ? "text-green-500 bg-green-100"
                            : "bg-[#2E59BE] text-white hover:bg-gray-300"
                    }`}
                >
                  <Image src={Home} alt="Home Icon" width={24} height={24} />
                  Dashboard
                </button>
              </div>

              {/* Setting Icon (Align Center) */}
              <div className="flex justify-center pr-20">
                <Image src={Setting} alt="Setting Icon" width={37} height={37} />
              </div>

              {/* Exit Icon (Align Right) */}
              <div className="flex justify-end">
                <Image
                    src={Exit}
                    alt="Exit Icon"
                    width={32}
                    height={32}
                    onClick={() => {
                      localStorage.removeItem("user"); // Clear user data
                      localStorage.removeItem("token"); // Clear token if used
                      router.push("/dang_nhap"); // Redirect to login page
                    }}
                    className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        <style jsx global>{`
          body {
            background-color: #f5f4fa;
          }
        `}</style>
      </div>
  );
};

export default page;

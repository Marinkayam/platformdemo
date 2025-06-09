import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Cloud, CloudRain, Sun, Wind, ChevronDown, ChevronUp, Thermometer, Droplets, Filter, Search, X, Shirt, Umbrella, Snowflake, SunDim } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterDropdown } from "@/components/invoices/filters/FilterDropdown";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Mock data for weather conditions
const MOCK_WEATHER_DATA = [
  {
    name: "United States",
    city: "New York",
    weather: {
      weather: [{ id: 800, main: "Clear" }],
      main: { temp: 22, humidity: 65 },
      wind: { speed: 3.5 }
    }
  },
  {
    name: "United Kingdom",
    city: "London",
    weather: {
      weather: [{ id: 500, main: "Rain" }],
      main: { temp: 15, humidity: 82 },
      wind: { speed: 5.2 }
    }
  },
  {
    name: "Japan",
    city: "Tokyo",
    weather: {
      weather: [{ id: 801, main: "Clouds" }],
      main: { temp: 28, humidity: 70 },
      wind: { speed: 2.8 }
    }
  },
  {
    name: "Australia",
    city: "Sydney",
    weather: {
      weather: [{ id: 800, main: "Clear" }],
      main: { temp: 32, humidity: 45 },
      wind: { speed: 4.1 }
    }
  },
  {
    name: "Germany",
    city: "Berlin",
    weather: {
      weather: [{ id: 701, main: "Mist" }],
      main: { temp: 18, humidity: 75 },
      wind: { speed: 3.2 }
    }
  }
];

// Mock data for weekly forecast
const MOCK_FORECAST_DATA = [
  {
    date: "2024-03-18",
    day: "Monday",
    weather: { id: 800, main: "Clear" },
    temp: { min: 18, max: 25 },
    humidity: 65,
    wind: 3.5
  },
  {
    date: "2024-03-19",
    day: "Tuesday",
    weather: { id: 500, main: "Rain" },
    temp: { min: 16, max: 22 },
    humidity: 75,
    wind: 4.2
  },
  {
    date: "2024-03-20",
    day: "Wednesday",
    weather: { id: 801, main: "Clouds" },
    temp: { min: 17, max: 23 },
    humidity: 70,
    wind: 3.8
  },
  {
    date: "2024-03-21",
    day: "Thursday",
    weather: { id: 800, main: "Clear" },
    temp: { min: 19, max: 26 },
    humidity: 60,
    wind: 3.2
  },
  {
    date: "2024-03-22",
    day: "Friday",
    weather: { id: 500, main: "Rain" },
    temp: { min: 15, max: 21 },
    humidity: 80,
    wind: 4.5
  },
  {
    date: "2024-03-23",
    day: "Saturday",
    weather: { id: 801, main: "Clouds" },
    temp: { min: 16, max: 22 },
    humidity: 72,
    wind: 3.9
  },
  {
    date: "2024-03-24",
    day: "Sunday",
    weather: { id: 800, main: "Clear" },
    temp: { min: 18, max: 24 },
    humidity: 68,
    wind: 3.4
  }
];

const getWeatherIcon = (weatherCode: number) => {
  if (weatherCode >= 200 && weatherCode < 300) return <CloudRain className="w-6 h-6 text-grey-700" />;
  if (weatherCode >= 300 && weatherCode < 400) return <CloudRain className="w-6 h-6 text-grey-700" />;
  if (weatherCode >= 500 && weatherCode < 600) return <CloudRain className="w-6 h-6 text-grey-700" />;
  if (weatherCode >= 600 && weatherCode < 700) return <Cloud className="w-6 h-6 text-grey-700" />;
  if (weatherCode >= 700 && weatherCode < 800) return <Wind className="w-6 h-6 text-grey-700" />;
  if (weatherCode === 800) return <Sun className="w-6 h-6 text-warning-main" />;
  return <Cloud className="w-6 h-6 text-grey-700" />;
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

type WeatherFilters = {
  country: string[];
  condition: string[];
  minTemp: string;
  maxTemp: string;
};

interface ActiveFilterBadgeProps {
  label: string;
  value: string;
  onRemove: () => void;
}

function ActiveFilterBadge({ label, value, onRemove }: ActiveFilterBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary-lighter text-primary-main border border-primary-light rounded-full text-xs font-normal"
    >
      <span>{label}: {value}</span>
      <button
        onClick={onRemove}
        className="hover:bg-primary-light rounded-full p-0.5 transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        <X className="h-3 w-3" />
      </button>
    </motion.div>
  );
}

function WeatherActiveFilters({ filters, onRemoveFilter }: { filters: WeatherFilters; onRemoveFilter: (key: string, value: string) => void }) {
  const activeFilterItems = useMemo(() => {
    const activeFilterItems: { key: string; label: string; value: string }[] = [];
    
    if (filters.country.length > 0) {
      filters.country.forEach(country => {
        activeFilterItems.push({ key: 'country', label: 'Country', value: country });
      });
    }
    
    if (filters.condition.length > 0) {
      filters.condition.forEach(condition => {
        activeFilterItems.push({ key: 'condition', label: 'Condition', value: condition });
      });
    }
    
    if (filters.minTemp) {
      activeFilterItems.push({ key: 'minTemp', label: 'Min Temp', value: `${filters.minTemp}°C` });
    }
    
    if (filters.maxTemp) {
      activeFilterItems.push({ key: 'maxTemp', label: 'Max Temp', value: `${filters.maxTemp}°C` });
    }
    
    return activeFilterItems;
  }, [filters]);

  if (activeFilterItems.length === 0) {
    return null;
  }

  return (
    <motion.div 
      className="flex flex-wrap gap-2 pt-2"
      initial={{ opacity: 0, height: 0 }}
      animate={{ 
        opacity: activeFilterItems.length > 0 ? 1 : 0,
        height: activeFilterItems.length > 0 ? 'auto' : 0 
      }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence>
        {activeFilterItems.map((filter) => (
          <ActiveFilterBadge
            key={`${filter.key}-${filter.value}`}
            label={filter.label}
            value={filter.value}
            onRemove={() => onRemoveFilter(filter.key, filter.value)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

const getWeatherStatusText = (weatherCode: number, mainCondition: string) => {
  if (mainCondition === "Clear") return "Clear skies";
  if (mainCondition === "Rain") return "Rainy day";
  if (mainCondition === "Clouds") {
    return "Cloudy";
  }
  if (mainCondition === "Mist") return "Misty conditions";
  return mainCondition; // Fallback
};

const getWearingSuggestions = (weather: any, temperature: number) => {
  const suggestions = [];
  
  if (temperature > 25) {
    suggestions.push("Light clothing, shorts, and t-shirts. Don't forget sunscreen!");
  } else if (temperature >= 15 && temperature <= 25) {
    suggestions.push("Comfortable layers, light jacket or cardigan. A sweater for evenings.");
  } else if (temperature < 15) {
    suggestions.push("Warm layers, a substantial jacket, and maybe a hat and gloves.");
  }

  const weatherMain = weather.weather[0].main.toLowerCase();

  if (weatherMain.includes("rain")) {
    suggestions.push("Carry an umbrella or wear a waterproof jacket.");
  } else if (weatherMain.includes("clear") || weatherMain.includes("sun")) {
    suggestions.push("Sunglasses and a hat are good for sunny conditions.");
  } else if (weatherMain.includes("cloud")) {
    suggestions.push("Expect mild weather; dress in layers.");
  } else if (weatherMain.includes("snow")) {
    suggestions.push("Heavy winter coat, waterproof boots, and thermal wear.");
  } else if (weatherMain.includes("mist") || weatherMain.includes("fog")) {
    suggestions.push("Dress in layers and be mindful of reduced visibility.");
  }

  return suggestions;
};

export default function WeatherDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<typeof MOCK_WEATHER_DATA | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isForecastExpanded, setIsForecastExpanded] = useState(false);
  const [filters, setFilters] = useState<WeatherFilters>({
    country: [],
    condition: [],
    minTemp: '',
    maxTemp: '',
  });
  const [isWearingSuggestionsModalOpen, setIsWearingSuggestionsModalOpen] = useState(false);
  const [selectedCityWeather, setSelectedCityWeather] = useState<typeof MOCK_WEATHER_DATA[0] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Simulate network delay
        await delay(1500);
        // Randomly simulate an error (10% chance)
        if (Math.random() < 0.1) {
          throw new Error('Failed to fetch weather data');
        }
        setWeatherData(MOCK_WEATHER_DATA);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredData = useMemo(() => {
    if (!weatherData) return [];
    
    return weatherData.filter(data => {
      const matchesCountry = filters.country.length === 0 || 
        filters.country.includes(data.name);
      
      const matchesCondition = filters.condition.length === 0 || 
        filters.condition.includes(data.weather.weather[0].main);
      
      const temp = data.weather.main.temp;
      const matchesMinTemp = !filters.minTemp || temp >= parseInt(filters.minTemp);
      const matchesMaxTemp = !filters.maxTemp || temp <= parseInt(filters.maxTemp);
      
      return matchesCountry && matchesCondition && matchesMinTemp && matchesMaxTemp;
    });
  }, [weatherData, filters]);

  const uniqueConditions = useMemo(() => {
    if (!weatherData) return [];
    return Array.from(new Set(weatherData.map(data => data.weather.weather[0].main)));
  }, [weatherData]);

  const uniqueCountries = useMemo(() => {
    if (!weatherData) return [];
    return Array.from(new Set(weatherData.map(data => data.name)));
  }, [weatherData]);

  const handleFilterChange = (key: keyof WeatherFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleRemoveFilter = (key: string, value: string) => {
    if (key === 'minTemp' || key === 'maxTemp') {
      setFilters(prev => ({ ...prev, [key]: '' }));
    } else {
      setFilters(prev => ({
        ...prev,
        [key]: Array.isArray(prev[key as keyof WeatherFilters]) 
          ? (prev[key as keyof WeatherFilters] as string[]).filter(item => item !== value)
          : []
      }));
    }
  };

  const handleRowClick = (data: typeof MOCK_WEATHER_DATA[0]) => {
    setSelectedCityWeather(data);
    setIsWearingSuggestionsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-grey-900">Weather Dashboard</h1>
        <p className="text-grey-600 mt-2">Current weather conditions across major cities</p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Global Weather Overview</h2>

          <div className="space-y-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <FilterDropdown
                label="Country"
                value={filters.country}
                options={uniqueCountries}
                onSelect={(value) => handleFilterChange("country", value)}
                multiSelect
                searchable
              />
              
              <FilterDropdown
                label="Weather Condition"
                value={filters.condition}
                options={uniqueConditions}
                onSelect={(value) => handleFilterChange("condition", value)}
                multiSelect
              />

              <div className="relative">
                <Input
                  type="number"
                  placeholder="Min temp..."
                  value={filters.minTemp}
                  onChange={(e) => handleFilterChange("minTemp", e.target.value)}
                  className="w-44 pr-16"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-grey-500">°C</span>
              </div>

              <div className="relative">
                <Input
                  type="number"
                  placeholder="Max temp..."
                  value={filters.maxTemp}
                  onChange={(e) => handleFilterChange("maxTemp", e.target.value)}
                  className="w-44 pr-16"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-grey-500">°C</span>
              </div>
            </div>

            <WeatherActiveFilters
              filters={filters}
              onRemoveFilter={handleRemoveFilter}
            />
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-main"></div>
            </div>
          ) : error ? (
            <div className="text-error-main text-center py-8">
              Failed to load weather data. Please try again later.
            </div>
          ) : (
            <>
              {filteredData.length === 0 ? (
                <div className="text-center py-8 text-grey-600">
                  No weather data matches the current filters.
                </div>
              ) : (
                <div className="rounded-xl border overflow-hidden bg-white">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Country</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Condition</TableHead>
                        <TableHead>Temperature</TableHead>
                        <TableHead>Humidity</TableHead>
                        <TableHead>Wind Speed</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.map((data) => (
                        <TableRow key={data.name} onClick={() => handleRowClick(data)} className="cursor-pointer hover:bg-grey-50">
                          <TableCell className="font-medium">{data.name}</TableCell>
                          <TableCell>{data.city}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getWeatherIcon(data.weather.weather[0].id)}
                              <span>{getWeatherStatusText(data.weather.weather[0].id, data.weather.weather[0].main)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-primary-lighter">
                              {Math.round(data.weather.main.temp)}°C
                            </Badge>
                          </TableCell>
                          <TableCell>{data.weather.main.humidity}%</TableCell>
                          <TableCell>{Math.round(data.weather.wind.speed)} m/s</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Weekly Forecast</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsForecastExpanded(!isForecastExpanded)}
              className="h-8 w-8 p-0"
            >
              {isForecastExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {isForecastExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {MOCK_FORECAST_DATA.map((forecast) => (
                <div key={forecast.date} className="rounded-xl border bg-white p-4">
                  <h3 className="text-lg font-semibold mb-3">{forecast.day}</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      {getWeatherIcon(forecast.weather.id)}
                      <span className="text-grey-700">{forecast.weather.main}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-grey-600">
                      <Thermometer className="h-4 w-4" />
                      <span>
                        <span className="font-medium text-grey-900">{forecast.temp.max}°C</span>
                        <span className="mx-1">/</span>
                        <span>{forecast.temp.min}°C</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-grey-600">
                      <Droplets className="h-4 w-4" />
                      <span>{forecast.humidity}% humidity</span>
                    </div>

                    <div className="flex items-center gap-2 text-grey-600">
                      <Wind className="h-4 w-4" />
                      <span>{Math.round(forecast.wind)} m/s</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog open={isWearingSuggestionsModalOpen} onOpenChange={setIsWearingSuggestionsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Wearing Suggestions for {selectedCityWeather?.city}</DialogTitle>
            <DialogDescription>
              Based on the current weather:
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2">
            {selectedCityWeather && (  
              <div className="flex items-center gap-2 text-grey-700">
                {getWeatherIcon(selectedCityWeather.weather.weather[0].id)}
                <span>{selectedCityWeather.weather.weather[0].main} at {Math.round(selectedCityWeather.weather.main.temp)}°C</span>
              </div>
            )}
            {selectedCityWeather && getWearingSuggestions(selectedCityWeather.weather, selectedCityWeather.weather.main.temp).map((suggestion, index) => (
              <div key={index} className="flex items-start gap-2">
                <Shirt className="h-5 w-5 text-primary-main flex-shrink-0 mt-0.5" />
                <p className="text-grey-700">{suggestion}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-4">
            <Button onClick={() => setIsWearingSuggestionsModalOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 
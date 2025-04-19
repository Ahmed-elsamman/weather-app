export interface CurrentWeatherResponse {
  lat: string;
  lon: string;
  elevation: number;
  timezone: string;
  units: string;
  current: CurrentWeatherDetails;
  hourly: HourlyForecast;
  daily: DailyForecast;
}

export interface CurrentWeatherDetails {
  icon: string;
  icon_num: number;
  summary: string;
  temperature: number;
  wind: WindDetails;
  precipitation: PrecipitationDetails;
  cloud_cover: number;
}

export interface WindDetails {
  speed: number;
  angle: number;
  dir: string;
}

export interface PrecipitationDetails {
  total: number;
  type: string;
}

export interface HourlyForecast {
  data: HourlyForecastDetails[];
}

export interface HourlyForecastDetails {
  date: string;
  weather: string;
  icon: number;
  summary: string;
  temperature: number;
  wind: WindDetails;
  cloud_cover: CloudCoverDetails;
  precipitation: PrecipitationDetails;
}

export interface CloudCoverDetails {
  total: number;
}

export interface DailyForecast {
  data: DailyForecastDetails[];
}

export interface DailyForecastDetails {
  day: string;
  weather: string;
  icon: number;
  summary: string;
  all_day: AllDayDetails;
  morning: any; // Replace with a proper type if morning data is available
  afternoon: any; // Replace with a proper type if afternoon data is available
  evening: any; // Replace with a proper type if evening data is available
}

export interface AllDayDetails {
  weather: string;
  icon: number;
  temperature: number;
  temperature_min: number;
  temperature_max: number;
  wind: WindDetails;
  cloud_cover: CloudCoverDetails;
  precipitation: PrecipitationDetails;
}
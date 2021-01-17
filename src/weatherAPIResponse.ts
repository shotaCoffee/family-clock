export
type WeatherAPIResponse = {
  current: {
    clouds: number
    dew_point: number
    dt: number
    feels_like: number
    // NOTE 湿度
    humidity: number
    // NOTE 気圧
    pressure: number
    sunrise: number
    sunset: number
    // NOTE 温度
    temp: number
    uvi: number
    visibility: number
    weather: Weather[]
    wind_deg: number
    wind_speed: number
  }
  // daily: Daily[]
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
}

export type Weather = {
  description: string
  icon: string
  id: number
  main: string
}

export type Daily = {
  clouds: number
  dew_point: number
  dt: number
  feels_like: {
    day: number,
    night: number,
    eve: number,
    morn: number
  }
  humidity: number
  pop: number
  pressure: number
  sunrise: number
  sunset: number
  temp: {
    day: number
    eve: number
    max: number
    min: number
    morn: number
    night: number
  }
  uvi: number
  weather: []
  wind_deg: number
  wind_speed: number
}

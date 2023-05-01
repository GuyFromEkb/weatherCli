import { homedir } from 'os'
import { join } from 'path'

export const enum ApiEndPoint {
  BaseURL = 'http://api.openweathermap.org',
  WeatherByDay = 'data/2.5/weather',
}

export const enum StorageKey {
  ApiKey = 'api-key',
  City = 'city',
}

export const STORAGE_FOLDER_PATH = join(homedir(), 'weatherCli')
export const STORAGE_FILE_PATH = join(STORAGE_FOLDER_PATH, 'config.json')

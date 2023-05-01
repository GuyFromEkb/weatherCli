import axios from 'axios'
import { getValueByKey } from '../services/storage.service.js'
import { printError } from '../services/log.service.js'
import { IResWeatherError, IWeatherData } from './types.js'
import { ApiEndPoint, STORAGE_FILE_PATH, StorageKey } from '../constants/index.js'

const axiosInstance = axios.create({
  baseURL: ApiEndPoint.BaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000,
})

export class Api {
  static getWeather = async () => {
    try {
      const { data } = await axiosInstance.get<IWeatherData>(ApiEndPoint.WeatherByDay, {
        params: {
          appid: await getValueByKey(StorageKey.ApiKey),
          q: await getValueByKey(StorageKey.City),
          units: 'metric',
          lang: 'ru',
        },
      })
      console.log('POGODA', data)
    } catch (error) {
      if (axios.isAxiosError<IResWeatherError>(error)) {
        printError(error.response?.data.message ?? 'Ошибка при получении данных с сервера')
      } else {
        printError(`Ошибка при извлечении данных из конфигурационного файла, проверьте ${STORAGE_FILE_PATH}`)
      }
    }
  }
}

import { Api } from './api/index.js'
import { StorageKey } from './constants/index.js'
import { getArgsFromArgv } from './helpers/getArgsFromArgv.js'
import { printHello, printSuccess } from './services/log.service.js'
import { saveKeyValue } from './services/storage.service.js'

const weatherCli = async () => {
  const args = getArgsFromArgv(process.argv)

  await Api.getWeather()

  if (args.h) {
    printHello()
  }
  if (args.t) {
    saveKeyValue(StorageKey.ApiKey, args.t)
    printSuccess('Токен успешно сохранён')
  }
}

weatherCli()

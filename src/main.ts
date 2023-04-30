import { getArgsFromArgv } from './helpers/getArgsFromArgv.js'
import { printError, printHello, printSuccess } from './services/log.service.js'
import { saveKeyValue } from './services/storage.service.js'

const weatherCli = async () => {
  const args = getArgsFromArgv(process.argv)

  if (args.h) {
    printHello()
  }
  if (args.t) {
    saveKeyValue('api-key', args.t)
    printSuccess('Токен успешно сохранён')
  }
}

weatherCli()

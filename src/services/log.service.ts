import chalk from 'chalk'
import { log } from 'console'

const printError = (error: string) => {
  log(chalk.bgRed(' Error '))
  log(error)
}
const printSuccess = (message: string) => {
  log(chalk.bgGreen(' SUCCESS '))
  log(message)
}

const printHello = () => {
  log(chalk.bgCyan(' HELP '))
  log(chalk`
{bold -h} вывод помощи
{bold -t} {italic [API_KEY]} сохранения токена
{bold -s} {italic [CITY]} установка города
Без параметров - вывод погоды
`)
}

export { printError, printHello, printSuccess }

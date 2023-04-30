import { promises, constants } from 'fs'
import { homedir } from 'os'
import { join } from 'path'

const FOLDER_PATH = join(homedir(), 'weatherCli')
const FILE_PATH = join(FOLDER_PATH, 'config.json')

export const saveKeyValue = async (jsonKey: string, value: unknown) => {
  let jsonData = { [jsonKey]: value }
  const [jsonIsExist, folderIsExist] = await Promise.all([fileIsExist(FILE_PATH), fileIsExist(FOLDER_PATH)])

  if (jsonIsExist) {
    const file = await promises.readFile(FILE_PATH, {
      encoding: 'utf-8',
    })

    const parsedJsonData: { [key: string]: unknown } = JSON.parse(file)
    jsonData = { ...parsedJsonData, ...jsonData }
  }

  if (!folderIsExist) {
    await promises.mkdir(FOLDER_PATH)
  }

  await promises.writeFile(FILE_PATH, JSON.stringify(jsonData))
}

const fileIsExist = async (path: string) => {
  try {
    await promises.access(path, constants.F_OK)
    return true
  } catch (error) {
    return false
  }
}

import { promises, constants } from 'fs'
import { STORAGE_FILE_PATH, STORAGE_FOLDER_PATH } from '../constants/index.js'

export const saveKeyValue = async (jsonKey: string, value: unknown) => {
  let jsonData = { [jsonKey]: value }
  const [jsonIsExist, folderIsExist] = await Promise.all([
    fileIsExist(STORAGE_FILE_PATH),
    fileIsExist(STORAGE_FOLDER_PATH),
  ])

  if (jsonIsExist) {
    const file = await promises.readFile(STORAGE_FILE_PATH, {
      encoding: 'utf-8',
    })

    const parsedJsonData: { [key: string]: unknown } = JSON.parse(file)
    jsonData = { ...parsedJsonData, ...jsonData }
  }

  if (!folderIsExist) {
    await promises.mkdir(STORAGE_FOLDER_PATH)
  }

  await promises.writeFile(STORAGE_FILE_PATH, JSON.stringify(jsonData))
}

export const getValueByKey = async (jsonKey: string) => {
  const jsonIsExist = await fileIsExist(STORAGE_FILE_PATH)
  if (!jsonIsExist) return undefined

  const file = await promises.readFile(STORAGE_FILE_PATH, {
    encoding: 'utf-8',
  })

  return JSON.parse(file)[jsonKey]
}

const fileIsExist = async (path: string) => {
  try {
    await promises.access(path, constants.F_OK)
    return true
  } catch (error) {
    return false
  }
}

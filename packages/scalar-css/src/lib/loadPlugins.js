import { readdirSync } from 'fs'
import { resolve } from 'path'

export const loadPlugins = (config) => {
  const pluginPath = resolve(__dirname, './plugins')
  const files = readdirSync(pluginPath)
  return files.map((file) => require(resolve(pluginPath, file)).default(config))
}

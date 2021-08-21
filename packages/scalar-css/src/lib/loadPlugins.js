import { readdirSync } from 'fs'
import { resolve } from 'path'

export function loadPlugins(dir) {
  const pluginPath = resolve(__dirname, dir)
  const files = readdirSync(pluginPath)
  return files.map((file) => require(resolve(pluginPath, file)).default)
}

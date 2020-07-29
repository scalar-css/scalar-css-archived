import fs from 'fs'
import path from 'path'
import postcss from 'postcss'

export function loadCssFile(file, directory = 'defaults/') {
  const filepath = path.resolve(__dirname, `../${directory}${file}`)
  return postcss.parse(fs.readFileSync(filepath, 'utf8'), { from: filepath })
}

export function processParams(params) {
  return params.split(',').map(param => param.trim())
}

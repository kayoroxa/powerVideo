const fs = require('fs')
const joinPath = require('path').join

function newRequire(path) {
  if (!path.endsWith('.tsx')) path = path + '.tsx'

  const fileString = fs.readFileSync(joinPath(module.parent?.path, path), {
    encoding: 'utf-8',
  })

  let newString = fileString.replace(/:[^}]*?(?==)|interface[\s\S]*?}/g, '')

  newString = newString.replace(/(<[\s\S]*)(className)/g, '$1class')

  // eslint-disable-next-line no-unused-vars
  function parseHTML(html) {
    var t = document.createElement('template')
    t.innerHTML = html
    return t.content
  }

  newString = newString.replace(/(<[\s\S]*?<\/.*>)/g, 'parseHTML(`$1`)')

  return eval(newString)
}

module.exports = newRequire

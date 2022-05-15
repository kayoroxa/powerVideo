// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms))
// }

function Observer() {
  let nameObserver = ''

  const esperando = []

  function addEventListener(evento, func) {
    esperando.push({ evento, func: func, nameObserver })
  }

  async function notify(evento, params) {
    // await sleep(10)
    let result
    esperando.forEach(e => {
      if (e.evento === evento && e.nameObserver === nameObserver) {
        result = e.func(params)
      }
    })
    return result
  }

  // function get(evento, func) {

  // }

  function especifiqueObserver(name) {
    nameObserver = name
    return {
      addEventListener,
      on: addEventListener,
      notify,
    }
  }

  return especifiqueObserver
}
const obs = Observer()

module.exports = obs

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms))
// }

function Observer() {
  let nameObserver = ''

  const esperando = []

  function addEventListener(evento, func, id = false) {
    if (id) {
      const index = esperando.findIndex(item => item.id === id)

      if (index !== -1) {
        esperando[index].evento = evento
        esperando[index].func = func

        return
      }
    }

    esperando.push({ evento, func: func, nameObserver, id })
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

  function removeEventListener(id) {
    const index = esperando.findIndex(item => item.id === id)

    if (index !== -1) {
      esperando.splice(index, 1)
    }
  }
  // function get(evento, func) {

  // }

  function especifiqueObserver(name) {
    nameObserver = name
    return {
      addEventListener,
      on: addEventListener,
      notify,
      removeEventListener,
      remove: removeEventListener,
    }
  }

  return especifiqueObserver
}
const obs = Observer()

module.exports = obs

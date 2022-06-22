function Bug(active) {
  return (...condition) => {
    if (active) console.log(Boolean(condition[0]), condition[1])
  }
}

module.exports = Bug(true)

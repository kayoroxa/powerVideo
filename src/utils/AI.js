function average(ar) {
  let r = 0
  for (let i = 0; i < ar.length; i++) {
    r = r + ar[i]
  }
  return r / ar.length
}

function AI(x, ...data) {
  const knowY = data.map(d => d[1])
  const knowX = data.map(d => d[0])

  let i = 0,
    nr = 0,
    dr = 0,
    averageX = 0,
    averageY = 0,
    a = 0,
    b = 0

  averageX = average(knowX)
  averageY = average(knowY)

  for (i = 0; i < knowX.length; i++) {
    nr = nr + (knowX[i] - averageX) * (knowY[i] - averageY)
    dr = dr + (knowX[i] - averageX) * (knowX[i] - averageX)
  }
  b = nr / dr
  a = averageY - b * averageX

  return a + b * x
}

// const result = AI(130, [90, 1000], [120, 1300], [150, 1800], [100, 1200])

// console.log(result)

module.exports = AI

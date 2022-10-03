const { Text3 } = require('../../utils/api/Text3')

module.exports = async () => {
  const script = [
    //
    '{what} {we} {been} {junking} {forever}',
  ]
  const texts = script[0].match(/\{.*\}/g).map(v => Text3(v))

  texts[0].show()
}

const { Line } = require('../../utils/api/line')
const { Text3 } = require('../../utils/api/Text3')

const titleStyle = {
  fontSize: '50px',
  color: 'hsl(212, 14%, 19%)',
  textShadow:
    '2px 0 0 #011628, -2px 0 0 #011628, 0 2px 0 #011628, 0 -2px 0 #011628, 1px 1px #011628, -1px -1px 0 #011628, 1px -1px 0 #011628, -1px 1px 0 #011628',
}

const myText = (text, top) =>
  Text3(text.replace(/=[^}]+/g, ''))
    .setStyle(titleStyle)
    .set_x_y({
      x: 'center',
      y: top || 400,
    })

const myLine = (elem, minLength) =>
  Line(elem, {
    padding: minLength < 16 ? 200 : 50,
    paddingY: 100,
    color: 'white',
    radius: 30,
  })

const mySublinhado = elem =>
  Line(elem, {
    padding: 0,
    color: 'hsl(218, 23%, 21%)',
    height: 7,
  })

module.exports = {
  myLine,
  mySublinhado,
  myText,
}

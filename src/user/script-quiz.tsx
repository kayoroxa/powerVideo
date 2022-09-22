const Html = require('../utils/api/Html')

const { Text3 } = require('../utils/api/Text3')

const colors = {
  line: '#7dd4fc',
  text: 'hsl(218, 23%, 21%)',
  text2: 'hsl(347, 83%, 60%)',
  background: '#ffffff', //'#e8f1f2',
  S: 'hsl(284, 79%, 24%)',
}

const fontSize = 90
// const fontSizeAlternatives = 60

module.exports = async () => {
  const title = Text3(`you {have} a idea`)
    .setStyle({
      fontSize: fontSize + 'px',
      lineHeight: '0 !important',
      color: colors.text,
    })
    .set_x_y({ x: 'center', y: 150 })

  title.show()

  const title2 = Html(
    <div className="olá">
      <div>man</div>
    </div>
  )
    .setStyle({
      fontSize: fontSize + 'px',
      lineHeight: '0 !important',
      color: colors.text,
    })
    .set_x_y({ x: 'center', y: 300 })

  title2.show()
}

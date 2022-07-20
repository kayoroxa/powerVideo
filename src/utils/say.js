function setSpeech() {
  return new Promise(function (resolve) {
    let synth = window.speechSynthesis
    let id: any

    id = setInterval(() => {
      if (synth.getVoices().length !== 0) {
        resolve(synth.getVoices())
        clearInterval(id)
      }
    }, 10)
  })
}

const utter = new SpeechSynthesisUtterance()
utter.lang = 'en_US'
console.log('1 vezinha')

setSpeech().then(() => {
  const synth = window.speechSynthesis
  const voices = synth.getVoices()
  console.log('1 vez')
  var selectedOption = 'Google US English'

  if (language === 'fr') {
    selectedOption = 'Google français'
  }
  if (language === 'es') {
    selectedOption = 'Google español'
  }

  voices.forEach(voice => {
    if (voice.name === selectedOption) {
      utter.voice = voice
    }
  })

  setUtterThis(utter)
  setConfig(true)
})

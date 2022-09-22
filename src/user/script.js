/* eslint-disable */
const req = require('../utils/ts')

const changeText = require('./script-changeText') //bug
const changeMultiText = require('./script-changeMultiText') //bug
const nextTo = require('./script-nextTo') //bug
const textSize = require('./script-textSize') //bug
const traduçãoParcelada = require('./tradução-parcelada') //bug

const lineAndSublinhar = require('./script-sublinhar')
const line = require('./bible')
const lineWalking = require('./script-audio-texto-video')
const textMorph = require('./script-text-morph')
const morphLetters = require('./script-morph-letters')
const pronounce = require('./script-pronounce')
const blocksSubtitle = require('./script-style-if')
const wordsSounds = require('./script-words-sounds')
const lyricsHighlight = require('./script-lyrics-highlight')
const muchacha = require('./script-muchacha')
const readHtml = require('./script-readHtml')
const pattern = require('./script-pattern')
// const quiz = req('./script-quiz')

require('./script-cursor-magic')

module.exports = blocksSubtitle

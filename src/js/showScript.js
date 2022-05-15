const obs = require('../utils/observer')

const userScript = require('../user/script')

obs('dom').notify('show', userScript[0])

//on key down

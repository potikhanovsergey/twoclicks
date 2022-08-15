const { withBlitz } = require("@blitzjs/next")

const nextTranslate = require("next-translate")

module.exports = nextTranslate(withBlitz())

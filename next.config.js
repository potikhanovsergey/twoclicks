const { withBlitz } = require("@blitzjs/next")
const { i18n } = require("./next-i18next.config")

module.exports = withBlitz({
  i18n,
})

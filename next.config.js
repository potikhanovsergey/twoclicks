const { withBlitz } = require("@blitzjs/next")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const nextTranslate = require("next-translate")

module.exports = withBundleAnalyzer(nextTranslate(withBlitz()))

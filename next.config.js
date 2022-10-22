const { withBlitz } = require("@blitzjs/next")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const nextTranslate = require("next-translate")

module.exports = withBundleAnalyzer(
  nextTranslate(
    withBlitz({
      images: {
        domains: ["img.youtube.com", "i.ibb.co"],
        deviceSizes: [320, 576, 640, 768, 828, 992, 1080, 1200, 1400],
      },
    })
  )
)

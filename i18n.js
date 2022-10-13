module.exports = {
  locales: ["ru", "en"],
  defaultLocale: "ru",
  pages: {
    "*": ["common"],
    "/": ["landing", "home"],
    "/404": ["404"],
    "/components": ["components"],
    "/profile": ["pages"],
    "/profile/premium": ["premium"],
    "/profile/statistics": ["statistics"],
    "/profile/support": ["support"],
    "rgx:^/build": ["build", "pages"],
  },
}

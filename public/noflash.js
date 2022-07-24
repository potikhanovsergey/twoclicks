;(function initTheme() {
  const theme = localStorage.getItem("skillcase-color-scheme").replace(/"/g, "") || "light"
  if (theme === "dark") {
    document.querySelector("html").classList.add(theme)
  }
})()

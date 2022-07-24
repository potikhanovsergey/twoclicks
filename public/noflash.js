const theme = localStorage.getItem("skillcase-color-scheme")?.replace(/"/g, "")
if (theme) {
  document.querySelector("html").setAttribute("data-theme", theme)
}

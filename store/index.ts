import { ColorScheme } from "@mantine/core"
import { setCookie } from "cookies-next"
import { makeAutoObservable, action } from "mobx"

class Store {
  colorScheme: ColorScheme = "light"

  constructor() {
    makeAutoObservable(this)
  }
  /////////// ACTIONS //////////////
  @action
  toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (this.colorScheme === "dark" ? "light" : "dark")
    this.colorScheme = nextColorScheme
    // when color scheme is updated save it to cookie
    setCookie("skillcase-color-scheme", nextColorScheme, { maxAge: 60 * 60 * 24 * 30 })
  }
}

export const AppStore = new Store()

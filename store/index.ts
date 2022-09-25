import { ColorScheme } from "@mantine/core"
import { Page } from "@prisma/client"
import { setCookie } from "cookies-next"
import { makeAutoObservable, action } from "mobx"

class Store {
  colorScheme: ColorScheme = "light"
  portfolios: Page[] = []
  havePortfoliosLoaded: boolean = false

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

  @action
  setPortfolios = (portfolios: Page[]) => {
    this.portfolios = portfolios
    this.havePortfoliosLoaded = true
  }

  @action
  removePortfolio = (id: string) => {
    if (this.portfolios) {
      this.portfolios = this.portfolios.filter((p) => p.id !== id)
    }
  }
}

export const AppStore = new Store()

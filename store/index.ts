import { ColorScheme } from "@mantine/core"
import { Page } from "@prisma/client"
import { setCookie } from "cookies-next"
import { makeAutoObservable, action } from "mobx"

class Store {
  colorScheme: ColorScheme = "light"
  pages: Page[] = []
  havePagesLoaded: boolean = false

  constructor() {
    makeAutoObservable(this)
  }
  /////////// ACTIONS //////////////
  @action
  toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (this.colorScheme === "dark" ? "light" : "dark")
    this.colorScheme = nextColorScheme
    // when color scheme is updated save it to cookie
    setCookie("twoclicks-color-scheme", nextColorScheme, { maxAge: 60 * 60 * 24 * 30 })
  }

  @action
  setPages = (pages: Page[]) => {
    this.pages = pages
    this.havePagesLoaded = true
  }

  @action
  removePage = (id: string) => {
    if (this.pages) {
      this.pages = this.pages.filter((p) => p.id !== id)
    }
  }

  @action
  updatePage(partialPage: Partial<Page> & { id: string }) {
    this.pages = this.pages.map((page) => {
      if (page.id === partialPage.id) {
        return { ...page, ...partialPage }
      }
      return page
    })
  }
}

export const AppStore = new Store()

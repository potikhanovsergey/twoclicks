import { getSession } from "@blitzjs/auth"
import { useQuery } from "@blitzjs/rpc"
import { ColorScheme } from "@mantine/core"
import { Portfolio } from "@prisma/client"
import getUserPortfolios from "app/portfolios/queries/getUserPortfolios"
import { setCookie } from "cookies-next"
import { makeAutoObservable, action } from "mobx"
import { useEffect } from "react"

class Store {
  colorScheme: ColorScheme = "light"
  portfolios: Portfolio[] | null = null
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
  setPortfolios = (portfolios: Portfolio[]) => {
    this.portfolios = portfolios
  }

  @action
  removePortfolio = (id: string) => {
    if (this.portfolios) {
      this.portfolios = this.portfolios.filter((p) => p.id !== id)
    }
  }
}

export const AppStore = new Store()

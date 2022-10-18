import { ColorScheme } from "@mantine/core"
import { Page } from "@prisma/client"
import { setCookie } from "cookies-next"
import { makeAutoObservable, action } from "mobx"

class Store {
  searchValue: string = ""

  constructor() {
    makeAutoObservable(this)
  }
  /////////// ACTIONS //////////////
}

export const FeedStore = new Store()

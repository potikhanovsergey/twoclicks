import { makeAutoObservable } from "mobx"

class Store {
  searchValue: string = ""
  feedType: string = "All"
  sortType: string = "Popular"

  constructor() {
    makeAutoObservable(this)
  }
  /////////// ACTIONS //////////////
}

export const FeedStore = new Store()

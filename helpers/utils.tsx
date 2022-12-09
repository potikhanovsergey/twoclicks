import { IPage } from "types"
import zlib from "zlib"

export const formatDate = (inputDate) => {
  let date, month, year
  date = inputDate.getDate()
  month = inputDate.getMonth() + 1
  year = inputDate.getFullYear()
  date = date.toString().padStart(2, "0")
  month = month.toString().padStart(2, "0")
  return `${date}/${month}/${year}`
}

export const deflate = (data) => {
  const dataBuffer = Buffer.from(JSON.stringify(data))
  return zlib.deflateSync(dataBuffer).toString("base64")
}

export const inflateBase64 = (str: string) => {
  return JSON.parse(zlib.inflateSync(Buffer.from(str, "base64")).toString())
}

export function getPageWithInflatedData(page) {
  return {
    ...page,
    data: inflateBase64(page.data),
  } as IPage
}

export function getPageWithDeflatedData(page) {
  return {
    ...page,
    data: deflate(page.data),
  } as IPage & { data: string }
}

export function isAlphanumeric(str) {
  return /^[A-Za-z0-9]*$/.test(str)
}

import { rpcHandler } from "@blitzjs/rpc"
import { api } from "app/blitz-server"

export default api(rpcHandler({ onError: console.log }))

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
}
